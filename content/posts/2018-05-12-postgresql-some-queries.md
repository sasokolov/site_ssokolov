---
title: PostgreSQL и некоторые запросы
author: Сергей
type: post
date: 2018-05-12T08:32:04+00:00
url: /2018/05/12/postgresql-some-queries/
wp-syntax-cache-content:
  - |
    a:2:{i:1;s:11971:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="sql" style="font-family:monospace;"><span style="color: #808080; font-style: italic;">-- Таблица с постами</span>
    <span style="color: #993333; font-weight: bold;">CREATE</span> <span style="color: #993333; font-weight: bold;">TABLE</span> post<span style="color: #66cc66;">&#40;</span>
    			id bigserial <span style="color: #993333; font-weight: bold;">PRIMARY</span> <span style="color: #993333; font-weight: bold;">KEY</span><span style="color: #66cc66;">,</span>
    			person_id int8 <span style="color: #993333; font-weight: bold;">NOT</span> <span style="color: #993333; font-weight: bold;">NULL</span><span style="color: #66cc66;">,</span>
    			created_at timestamptz <span style="color: #993333; font-weight: bold;">NOT</span> <span style="color: #993333; font-weight: bold;">NULL</span><span style="color: #66cc66;">,</span>
    			something text
    		<span style="color: #66cc66;">&#41;</span>;
    <span style="color: #808080; font-style: italic;">-- Добавляем миллион записей с данными</span>
    <span style="color: #993333; font-weight: bold;">INSERT</span> <span style="color: #993333; font-weight: bold;">INTO</span>
    		post<span style="color: #66cc66;">&#40;</span>
    			person_id<span style="color: #66cc66;">,</span>
    			created_at<span style="color: #66cc66;">,</span>
    			something
    		<span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">SELECT</span>
    			<span style="color: #66cc66;">&#40;</span>random<span style="color: #66cc66;">&#40;</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">*</span> <span style="color: #cc66cc;">10</span> ^<span style="color: #cc66cc;">5</span><span style="color: #66cc66;">&#41;</span>::int8 <span style="color: #993333; font-weight: bold;">AS</span> person_id<span style="color: #66cc66;">,</span>
    			now<span style="color: #66cc66;">&#40;</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">-</span> <span style="color: #993333; font-weight: bold;">INTERVAL</span> <span style="color: #ff0000;">'1 minute'</span> <span style="color: #66cc66;">*</span><span style="color: #66cc66;">&#40;</span>random<span style="color: #66cc66;">&#40;</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">*</span> <span style="color: #cc66cc;">60</span> <span style="color: #66cc66;">*</span> <span style="color: #cc66cc;">24</span> <span style="color: #66cc66;">*</span> <span style="color: #cc66cc;">365</span> <span style="color: #66cc66;">*</span> <span style="color: #cc66cc;">2</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">AS</span> created_at<span style="color: #66cc66;">,</span>
    			<span style="color: #66cc66;">&#40;</span>
    				<span style="color: #993333; font-weight: bold;">SELECT</span>
    					string_agg<span style="color: #66cc66;">&#40;</span> substr<span style="color: #66cc66;">&#40;</span> <span style="color: #ff0000;">'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVW XYZ0123456789 '</span><span style="color: #66cc66;">,</span><span style="color: #66cc66;">&#40;</span> random<span style="color: #66cc66;">&#40;</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">*</span> <span style="color: #cc66cc;">72</span> <span style="color: #66cc66;">&#41;</span>::<span style="color: #993333; font-weight: bold;">INTEGER</span> <span style="color: #66cc66;">+</span> <span style="color: #cc66cc;">1</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">1</span> <span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span> <span style="color: #ff0000;">''</span> <span style="color: #66cc66;">&#41;</span>
    				<span style="color: #993333; font-weight: bold;">FROM</span>
    					generate_series<span style="color: #66cc66;">&#40;</span>
    						<span style="color: #cc66cc;">1</span><span style="color: #66cc66;">,</span>
    						<span style="color: #cc66cc;">100</span> <span style="color: #66cc66;">+</span> i % <span style="color: #cc66cc;">10</span> <span style="color: #66cc66;">+</span><span style="color: #66cc66;">&#40;</span>random<span style="color: #66cc66;">&#40;</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">*</span> <span style="color: #cc66cc;">2000</span><span style="color: #66cc66;">&#41;</span>::<span style="color: #993333; font-weight: bold;">INTEGER</span>
    					<span style="color: #66cc66;">&#41;</span>
    			<span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">AS</span> something <span style="color: #993333; font-weight: bold;">FROM</span> generate_series<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">1</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">1000000</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">AS</span> g<span style="color: #66cc66;">&#40;</span>i<span style="color: #66cc66;">&#41;</span>;
    &nbsp;
    <span style="color: #808080; font-style: italic;">-- Удаляем записи записи одного автора у которых совпадает время</span>
    <span style="color: #993333; font-weight: bold;">DELETE</span> <span style="color: #993333; font-weight: bold;">FROM</span> post
    <span style="color: #993333; font-weight: bold;">WHERE</span>
    	<span style="color: #66cc66;">&#40;</span>
    		person_id<span style="color: #66cc66;">,</span>
    		created_at
    	<span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">IN</span><span style="color: #66cc66;">&#40;</span>
    		<span style="color: #993333; font-weight: bold;">SELECT</span>
    			person_id<span style="color: #66cc66;">,</span>
    			created_at
    		<span style="color: #993333; font-weight: bold;">FROM</span>
    			post
    		<span style="color: #993333; font-weight: bold;">GROUP</span> <span style="color: #993333; font-weight: bold;">BY</span>
    			person_id<span style="color: #66cc66;">,</span>
    			created_at
    		<span style="color: #993333; font-weight: bold;">HAVING</span>
    			<span style="color: #993333; font-weight: bold;">COUNT</span><span style="color: #66cc66;">&#40;</span><span style="color: #66cc66;">*</span><span style="color: #66cc66;">&#41;</span> &amp;gt; <span style="color: #cc66cc;">1</span>
    	<span style="color: #66cc66;">&#41;</span>;
    &nbsp;
    <span style="color: #808080; font-style: italic;">-- Индекс по времени</span>
    <span style="color: #993333; font-weight: bold;">CREATE</span>
    	<span style="color: #993333; font-weight: bold;">INDEX</span> i_post_created_at <span style="color: #993333; font-weight: bold;">ON</span>
    	post
    		<span style="color: #993333; font-weight: bold;">USING</span> btree<span style="color: #66cc66;">&#40;</span>created_at<span style="color: #66cc66;">&#41;</span>;
    &nbsp;
    <span style="color: #808080; font-style: italic;">-- Уникальный индекс по дате и автору</span>
    <span style="color: #993333; font-weight: bold;">CREATE</span>
    	<span style="color: #993333; font-weight: bold;">UNIQUE</span> <span style="color: #993333; font-weight: bold;">INDEX</span> u_post_author_id_created_at <span style="color: #993333; font-weight: bold;">ON</span>
    	post<span style="color: #66cc66;">&#40;</span>
    		person_id<span style="color: #66cc66;">,</span>
    		created_at
    	<span style="color: #66cc66;">&#41;</span>;
    &nbsp;
    <span style="color: #808080; font-style: italic;">-- Табличка с авторами</span>
    <span style="color: #993333; font-weight: bold;">CREATE</span>
    	<span style="color: #993333; font-weight: bold;">TABLE</span>
    		person <span style="color: #993333; font-weight: bold;">AS</span> <span style="color: #993333; font-weight: bold;">SELECT</span>
    			<span style="color: #993333; font-weight: bold;">DISTINCT</span> <span style="color: #993333; font-weight: bold;">ON</span>
    			<span style="color: #66cc66;">&#40;</span>person_id<span style="color: #66cc66;">&#41;</span> person_id <span style="color: #993333; font-weight: bold;">AS</span> id<span style="color: #66cc66;">,</span>
    			<span style="color: #ff0000;">'person_'</span> <span style="color: #66cc66;">||</span> person_id <span style="color: #993333; font-weight: bold;">AS</span> name
    		<span style="color: #993333; font-weight: bold;">FROM</span>
    			post;
    &nbsp;
    <span style="color: #808080; font-style: italic;">-- Первичный ключ</span>
    <span style="color: #993333; font-weight: bold;">ALTER</span> <span style="color: #993333; font-weight: bold;">TABLE</span>
    	person <span style="color: #993333; font-weight: bold;">ADD</span> <span style="color: #993333; font-weight: bold;">PRIMARY</span> <span style="color: #993333; font-weight: bold;">KEY</span><span style="color: #66cc66;">&#40;</span>id<span style="color: #66cc66;">&#41;</span>;
    &nbsp;
    <span style="color: #808080; font-style: italic;">-- Внешний ключ. Не верьте тем, кто говорят что не нужно их использовать. С ними гораздо лучше.</span>
    <span style="color: #993333; font-weight: bold;">ALTER</span> <span style="color: #993333; font-weight: bold;">TABLE</span>
    	post <span style="color: #993333; font-weight: bold;">ADD</span> <span style="color: #993333; font-weight: bold;">CONSTRAINT</span> fk_post_person_id <span style="color: #993333; font-weight: bold;">FOREIGN</span> <span style="color: #993333; font-weight: bold;">KEY</span><span style="color: #66cc66;">&#40;</span>person_id<span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">REFERENCES</span> person<span style="color: #66cc66;">&#40;</span>id<span style="color: #66cc66;">&#41;</span>;
    <span style="color: #808080; font-style: italic;">-- Собираем статистику</span>
    analyze post;
    analyze person;</pre></td></tr></table><p class="theCode" style="display:none;">-- Таблица с постами
    create table post(
    			id bigserial primary key,
    			person_id int8 not null,
    			created_at timestamptz not null,
    			something text
    		);
    -- Добавляем миллион записей с данными
    insert into
    		post(
    			person_id,
    			created_at,
    			something
    		) select
    			(random()* 10 ^5)::int8 as person_id,
    			now()- interval '1 minute' *(random()* 60 * 24 * 365 * 2) as created_at,
    			(
    				select
    					string_agg( substr( 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVW XYZ0123456789 ',( random()* 72 )::integer + 1, 1 ), '' )
    				from
    					generate_series(
    						1,
    						100 + i % 10 +(random()* 2000)::integer
    					)
    			) as something from generate_series(1, 1000000) AS g(i);
    
    -- Удаляем записи записи одного автора у которых совпадает время
    delete from post
    where
    	(
    		person_id,
    		created_at
    	) in(
    		select
    			person_id,
    			created_at
    		from
    			post
    		group by
    			person_id,
    			created_at
    		having
    			count(*) &amp;gt; 1
    	);
    
    -- Индекс по времени
    create
    	index i_post_created_at on
    	post
    		using btree(created_at);
    
    -- Уникальный индекс по дате и автору
    create
    	unique index u_post_author_id_created_at on
    	post(
    		person_id,
    		created_at
    	);
    
    -- Табличка с авторами
    create
    	table
    		person as select
    			distinct on
    			(person_id) person_id as id,
    			'person_' || person_id as name
    		from
    			post;
    
    -- Первичный ключ
    alter table
    	person add primary key(id);
    
    -- Внешний ключ. Не верьте тем, кто говорят что не нужно их использовать. С ними гораздо лучше.
    alter table
    	post add constraint fk_post_person_id foreign key(person_id) references person(id);
    -- Собираем статистику
    analyze post;
    analyze person;</p></div>
    ";i:2;s:903:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">SELECT</span> <span style="color: #993333; font-weight: bold;">COUNT</span><span style="color: #66cc66;">&#40;</span><span style="color: #66cc66;">*</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">FROM</span> post;
    <span style="color: #993333; font-weight: bold;">COUNT</span>  
    <span style="color: #808080; font-style: italic;">---------</span>
     <span style="color: #cc66cc;">1000000</span>
    <span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">1</span> строка<span style="color: #66cc66;">&#41;</span></pre></td></tr></table><p class="theCode" style="display:none;">SELECT count(*) from post;
    count  
    ---------
     1000000
    (1 строка)</p></div>
    ";}
categories:
  - Заметки

---
<img loading="lazy" decoding="async" class="size-full wp-image-292 alignright" src="https://ssokolov.ru/wp-content/uploads/2018/05/post.png" alt="структура базы" width="335" height="148" />

Этот пост я пишу как частичную текстовую расшифровку [видео][1] с 1:14:42. Не знаю как Вам, но я не особо люблю смотреть видюшки, и легче воспринимаю написанное текстом с примерами. Поэтому делаю заметку для себя, но если оно окажется еще кому-то полезным &#8212; буду рад.

Создадим таблички вот такой структуры как на картинке и заполним их данными:

<pre lang="sql">-- Таблица с постами
create table post(
			id bigserial primary key,
			person_id int8 not null,
			created_at timestamptz not null,
			something text
		);
-- Добавляем миллион записей с данными
insert into
		post(
			person_id,
			created_at,
			something
		) select
			(random()* 10 ^5)::int8 as person_id,
			now()- interval '1 minute' *(random()* 60 * 24 * 365 * 2) as created_at,
			(
				select
					string_agg( substr( 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVW XYZ0123456789 ',( random()* 72 )::integer + 1, 1 ), '' )
				from
					generate_series(
						1,
						100 + i % 10 +(random()* 2000)::integer
					)
			) as something from generate_series(1, 1000000) AS g(i);

-- Удаляем записи записи одного автора у которых совпадает время
delete from post
where
	(
		person_id,
		created_at
	) in(
		select
			person_id,
			created_at
		from
			post
		group by
			person_id,
			created_at
		having
			count(*) &gt; 1
	);

-- Индекс по времени
create
	index i_post_created_at on
	post
		using btree(created_at);

-- Уникальный индекс по дате и автору
create
	unique index u_post_author_id_created_at on
	post(
		person_id,
		created_at
	);

-- Табличка с авторами
create
	table
		person as select
			distinct on
			(person_id) person_id as id,
			'person_' || person_id as name
		from
			post;

-- Первичный ключ
alter table
	person add primary key(id);

-- Внешний ключ. Не верьте тем, кто говорят что не нужно их использовать. С ними гораздо лучше.
alter table
	post add constraint fk_post_person_id foreign key(person_id) references person(id);
-- Собираем статистику
analyze post;
analyze person;
</pre>

Далее пишем запросы которые выбирают какие-то данные из этих таблиц.  
Первое и самое простое &#8212; посчитать количество постов, которое у нас есть в **post**

<pre lang="sql">SELECT count(*) from post;
count  
---------
 1000000
(1 строка)
</pre>

Этот запрос выполняется по следующему плану:

<pre>explain analyse select count(*) from post;
                                                      QUERY PLAN                                                      
----------------------------------------------------------------------------------------------------------------------
 Aggregate  (cost=142283.69..142283.70 rows=1 width=8) (actual time=388.014..388.014 rows=1 loops=1)
   -&gt;  Seq Scan on post  (cost=0.00..139784.35 rows=999735 width=0) (actual time=0.032..327.397 rows=1000000 loops=1)
 Planning time: 0.241 ms
 Execution time: 388.114 ms
(4 строки)
</pre>

Видим сколько оно выполнялось. Это долго, если учесть что мы просто прочитали миллион строк и подсчитали их количество.

Самый быстрый и простой способ посмотреть сколько строчек в таблице &#8212; это заглянуть в статистику. Число будет не точным, но если у нас автовакуум настроен агрессивно и делает свою работу вовремя, то на полученное число можно ориентироваться:

<pre>explain select count(*) from post;
                             QUERY PLAN                             
--------------------------------------------------------------------
 Aggregate  (cost=142281.59..142281.60 rows=1 width=8)
   -&gt;  Seq Scan on post  (cost=0.00..139782.67 rows=999567 width=0)
(2 строки)
</pre>

Мы только что запускали _analyze post;_ так что значение **999567** очень близко к точному значению.

В ситуации когда нам необходимо количество постов одного конкретного автора мы можем заставить его делать **Index Only Scan** и это будет очень быстро

<pre>explain analyze SELECT count(person_id) from post where person_id=1;
                                                                   QUERY PLAN                                                                   
------------------------------------------------------------------------------------------------------------------------------------------------
 Aggregate  (cost=48.64..48.65 rows=1 width=8) (actual time=0.143..0.144 rows=1 loops=1)
   -&gt;  Index Only Scan using u_post_author_id_created_at on post  (cost=0.42..48.61 rows=11 width=8) (actual time=0.060..0.115 rows=14 loops=1)
         Index Cond: (person_id = 1)
         Heap Fetches: 14
 Planning time: 0.395 ms
 Execution time: 0.277 ms
(6 строк)
</pre>

Здесь мы в качестве параметра **count()** подставляем то же индексированное поле, по которому ограничиваем выборку в выражении **where**, таким образом, из индекса мы получаем все необходимое для формирования результата и postgres даже не обращается к страницам самой таблицы. Тут важную роль играет селективность **person_id**. Если бы выборка получалась больше некоторого значения, то, возможно, было бы дешевле сделать **Bitmap Index Scan**. В любом случае актуальность статистики и карты видимости очень важны для правильной оценки оптимального плана.  
Больше про count() можно почитать в статье Joe Nelson [Faster PostgreSQL Counting][2] или [тут][3]

В следующем посте поговорим о пагинации и почему **offset** плохо.

 [1]: https://youtu.be/7HFecftZ1qM?t=4482
 [2]: https://gist.github.com/begriffs/67839ff18176d5879e77954bfcd38f1f
 [3]: https://www.citusdata.com/blog/2016/10/12/count-performance/