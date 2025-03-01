---
title: "PostgreSQL и некоторые запросы"
date: 2018-05-12
draft: false
categories: ["Заметки"]
author: "Сергей"
summary: "Запись с примерами эффективного использования запросов count() в PostgreSQL, включая анализ планов выполнения запросов и оптимизацию."
---

<img src="/images/post.png" alt="структура базы" class="alignright" width="335" height="148" />

Этот пост я пишу как частичную текстовую расшифровку [видео](https://youtu.be/7HFecftZ1qM?t=4482) с 1:14:42. Не знаю как вам, но я не особо люблю смотреть видео, и легче воспринимаю написанное текстом с примерами. Поэтому делаю заметку для себя, но если она окажется еще кому-то полезной — буду рад.

Создадим таблички вот такой структуры как на картинке и заполним их данными:

```sql
-- Таблица с постами
CREATE TABLE post(
        id bigserial PRIMARY KEY,
        person_id int8 NOT NULL,
        created_at timestamptz NOT NULL,
        something text
      );
-- Добавляем миллион записей с данными
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
 
-- Удаляем записи записи одного автора у которых совпадает время
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
 
-- Индекс по времени
CREATE
  INDEX i_post_created_at ON
  post
    USING btree(created_at);
 
-- Уникальный индекс по дате и автору
CREATE
  UNIQUE INDEX u_post_author_id_created_at ON
  post(
    person_id,
    created_at
  );
 
-- Табличка с авторами
CREATE
  TABLE
    person AS SELECT
      DISTINCT ON
      (person_id) person_id AS id,
      'person_' || person_id AS name
    FROM
      post;
 
-- Первичный ключ
ALTER TABLE
  person ADD PRIMARY KEY(id);
 
-- Внешний ключ. Не верьте тем, кто говорят что не нужно их использовать. С ними гораздо лучше.
ALTER TABLE
  post ADD CONSTRAINT fk_post_person_id FOREIGN KEY(person_id) REFERENCES person(id);
-- Собираем статистику
analyze post;
analyze person;
```

Далее пишем запросы которые выбирают какие-то данные из этих таблиц.
Первое и самое простое — посчитать количество постов, которое у нас есть в **post**

```sql
SELECT COUNT(*) FROM post;
COUNT  
---------
 1000000
(1 строка)
```

Этот запрос выполняется по следующему плану:

```
explain analyse select count(*) from post;
                                                      QUERY PLAN                                                      
----------------------------------------------------------------------------------------------------------------------
 Aggregate  (cost=142283.69..142283.70 rows=1 width=8) (actual time=388.014..388.014 rows=1 loops=1)
   ->  Seq Scan on post  (cost=0.00..139784.35 rows=999735 width=0) (actual time=0.032..327.397 rows=1000000 loops=1)
 Planning time: 0.241 ms
 Execution time: 388.114 ms
(4 строки)
```

Видим сколько оно выполнялось. Это долго, если учесть что мы просто прочитали миллион строк и подсчитали их количество.

Самый быстрый и простой способ посмотреть сколько строчек в таблице — это заглянуть в статистику. Число будет не точным, но если у нас автовакуум настроен агрессивно и делает свою работу вовремя, то на полученное число можно ориентироваться:

```
explain select count(*) from post;
                             QUERY PLAN                             
--------------------------------------------------------------------
 Aggregate  (cost=142281.59..142281.60 rows=1 width=8)
   ->  Seq Scan on post  (cost=0.00..139782.67 rows=999567 width=0)
(2 строки)
```

Мы только что запускали *analyze post;* так что значение **999567** очень близко к точному значению.

В ситуации когда нам необходимо количество постов одного конкретного автора мы можем заставить его делать **Index Only Scan** и это будет очень быстро

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
(6 строк)
```

Здесь мы в качестве параметра **count()** подставляем то же индексированное поле, по которому ограничиваем выборку в выражении **where**, таким образом, из индекса мы получаем все необходимое для формирования результата и postgres даже не обращается к страницам самой таблицы. Тут важную роль играет селективность **person_id**. Если бы выборка получалась больше некоторого значения, то, возможно, было бы дешевле сделать **Bitmap Index Scan**. В любом случае актуальность статистики и карты видимости очень важны для правильной оценки оптимального плана.
Больше про count() можно почитать в статье Joe Nelson [Faster PostgreSQL Counting](https://gist.github.com/begriffs/67839ff18176d5879e77954bfcd38f1f) или [тут](https://www.citusdata.com/blog/2016/10/12/count-performance/)

В следующем посте поговорим о пагинации и почему использование **offset** — плохая практика.