---
title: "PostgreSQL and Some Queries"
date: 2018-05-12
draft: false
categories: ["Notes"]
language: "en"
author: "Sergey"
summary: "A post with examples of efficient use of count() queries in PostgreSQL, including analysis of query execution plans and optimization."
---

<img src="/images/post.png" alt="database structure" class="alignright" width="335" height="148" />

I'm writing this post as a partial text transcription of [this video](https://youtu.be/7HFecftZ1qM?t=4482) starting at 1:14:42. I don't know about you, but I don't particularly enjoy watching videos and find it easier to understand text with examples. So I'm making this note for myself, but if it turns out to be useful to someone else — I'll be glad.

Let's create tables with the structure shown in the image and fill them with data:

```sql
-- Table with posts
CREATE TABLE post(
        id bigserial PRIMARY KEY,
        person_id int8 NOT NULL,
        created_at timestamptz NOT NULL,
        something text
      );
-- Add a million records with data
INSERT INTO
      post(
        person_id,
        created_at,
        something
      ) SELECT
        (random()* 10 ^5)::int8 AS person_id,
        now()- INTERVAL '1 minute' *(random()* 60 * 24 * 365 * 2) AS created_at,
        (
          SELECT
            string_agg( substr( 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVW XYZ0123456789 ',( random()* 72 )::INTEGER + 1, 1 ), '' )
          FROM
            generate_series(
              1,
              100 + i % 10 +(random()* 2000)::INTEGER
            )
        ) AS something FROM generate_series(1, 1000000) AS g(i);
 
-- Delete records from one author that have matching timestamps
DELETE FROM post
WHERE
  (
    person_id,
    created_at
  ) IN(
    SELECT
      person_id,
      created_at
    FROM
      post
    GROUP BY
      person_id,
      created_at
    HAVING
      COUNT(*) > 1
  );
 
-- Index by timestamp
CREATE
  INDEX i_post_created_at ON
  post
    USING btree(created_at);
 
-- Unique index by date and author
CREATE
  UNIQUE INDEX u_post_author_id_created_at ON
  post(
    person_id,
    created_at
  );
 
-- Table with authors
CREATE
  TABLE
    person AS SELECT
      DISTINCT ON
      (person_id) person_id AS id,
      'person_' || person_id AS name
    FROM
      post;
 
-- Primary key
ALTER TABLE
  person ADD PRIMARY KEY(id);
 
-- Foreign key. Don't believe those who say you shouldn't use them. They're much better.
ALTER TABLE
  post ADD CONSTRAINT fk_post_person_id FOREIGN KEY(person_id) REFERENCES person(id);
-- Gather statistics
analyze post;
analyze person;
```

Next, we write queries that select some data from these tables.
First and simplest — count the number of posts we have in **post**

```sql
SELECT COUNT(*) FROM post;
COUNT  
---------
 1000000
(1 row)
```

This query is executed according to the following plan:

```
explain analyse select count(*) from post;
                                                      QUERY PLAN                                                      
----------------------------------------------------------------------------------------------------------------------
 Aggregate  (cost=142283.69..142283.70 rows=1 width=8) (actual time=388.014..388.014 rows=1 loops=1)
   ->  Seq Scan on post  (cost=0.00..139784.35 rows=999735 width=0) (actual time=0.032..327.397 rows=1000000 loops=1)
 Planning time: 0.241 ms
 Execution time: 388.114 ms
(4 rows)
```

We can see how long it took to execute. This is slow, considering that we just read a million rows and counted them.

The fastest and simplest way to see how many rows are in a table is to look at the statistics. The number won't be exact, but if we have autovacuum configured aggressively and it does its job on time, the resulting number can be relied upon:

```
explain select count(*) from post;
                             QUERY PLAN                             
--------------------------------------------------------------------
 Aggregate  (cost=142281.59..142281.60 rows=1 width=8)
   ->  Seq Scan on post  (cost=0.00..139782.67 rows=999567 width=0)
(2 rows)
```

We just ran *analyze post;* so the value **999567** is very close to the exact value.

In a situation where we need the number of posts by one specific author, we can make it do an **Index Only Scan** and this will be very fast

```
explain analyze SELECT count(person_id) from post where person_id=1;
                                                                   QUERY PLAN                                                                   
------------------------------------------------------------------------------------------------------------------------------------------------
 Aggregate  (cost=48.64..48.65 rows=1 width=8) (actual time=0.143..0.144 rows=1 loops=1)
   ->  Index Only Scan using u_post_author_id_created_at on post  (cost=0.42..48.61 rows=11 width=8) (actual time=0.060..0.115 rows=14 loops=1)
         Index Cond: (person_id = 1)
         Heap Fetches: 14
 Planning time: 0.395 ms
 Execution time: 0.277 ms
(6 rows)
```

Here, we substitute the same indexed field as a parameter for **count()** that we use to restrict the selection in the **where** expression. This way, we get everything we need from the index to form the result, and PostgreSQL doesn't even access the pages of the table itself. The selectivity of **person_id** plays an important role here. If the selection were larger than a certain value, it might be cheaper to do a **Bitmap Index Scan**. In any case, the relevance of statistics and visibility map are very important for correctly evaluating the optimal plan.
You can read more about count() in Joe Nelson's article [Faster PostgreSQL Counting](https://gist.github.com/begriffs/67839ff18176d5879e77954bfcd38f1f) or [here](https://www.citusdata.com/blog/2016/10/12/count-performance/)

In the next post, we'll talk about pagination and why **offset** is bad.