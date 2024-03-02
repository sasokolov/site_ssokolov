---
title: Postgres + GSSAPI
author: Сергей
type: post
date: 2016-03-02T15:19:06+00:00
url: /2016/03/02/postgres-gssapi/
wp-syntax-cache-content:
  - |
    a:6:{i:1;s:726:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;">C:\<span style="color: #000000; font-weight: bold;">&gt;</span>ktpass <span style="color: #660033;">-princ</span> postgresql<span style="color: #000000; font-weight: bold;">/</span>srv.krb.local<span style="color: #000000; font-weight: bold;">@</span>KRB.LOCAL <span style="color: #660033;">-mapuser</span> pguser <span style="color: #660033;">-pass</span> pgpass <span style="color: #660033;">-out</span> pgpass.keytab</pre></td></tr></table><p class="theCode" style="display:none;">C:\&gt;ktpass -princ postgresql/srv.krb.local@KRB.LOCAL -mapuser pguser -pass pgpass -out pgpass.keytab</p></div>
    ";i:2;s:659:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">&#91;</span>libdefaults<span style="color: #7a0874; font-weight: bold;">&#93;</span>
            default_realm = KRB.LOCAL
            dns_lookup_realm = <span style="color: #c20cb9; font-weight: bold;">false</span>
            dns_lookup_kdc = <span style="color: #c20cb9; font-weight: bold;">true</span></pre></td></tr></table><p class="theCode" style="display:none;">[libdefaults]
            default_realm = KRB.LOCAL
            dns_lookup_realm = false
            dns_lookup_kdc = true</p></div>
    ";i:3;s:1120:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;">$ <span style="color: #c20cb9; font-weight: bold;">chown</span> postgres:postgres <span style="color: #000000; font-weight: bold;">/</span>var<span style="color: #000000; font-weight: bold;">/</span>lib<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>krb<span style="color: #000000; font-weight: bold;">/</span>pgpass.keytab
    $ <span style="color: #c20cb9; font-weight: bold;">chmod</span> <span style="color: #000000;">600</span> <span style="color: #000000; font-weight: bold;">/</span>var<span style="color: #000000; font-weight: bold;">/</span>lib<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>krb<span style="color: #000000; font-weight: bold;">/</span>pgpass.keytab</pre></td></tr></table><p class="theCode" style="display:none;">$ chown postgres:postgres /var/lib/pgsql/krb/pgpass.keytab
    $ chmod 600 /var/lib/pgsql/krb/pgpass.keytab</p></div>
    ";i:4;s:340:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #666666;"># </span>service postgresql-<span style="color: #000000;">9.4</span> reload</pre></td></tr></table><p class="theCode" style="display:none;"># service postgresql-9.4 reload</p></div>
    ";i:5;s:440:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="sql" style="font-family:monospace;">postgres<span style="color: #66cc66;">=</span># <span style="color: #993333; font-weight: bold;">CREATE</span> <span style="color: #993333; font-weight: bold;">ROLE</span> administrator LOGIN ;</pre></td></tr></table><p class="theCode" style="display:none;">postgres=# CREATE ROLE administrator LOGIN ;</p></div>
    ";i:6;s:3181:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;">$ <span style="color: #c20cb9; font-weight: bold;">whoami</span>
    administrator
    &nbsp;
    $ klist 
    Ticket cache: FILE:<span style="color: #000000; font-weight: bold;">/</span>tmp<span style="color: #000000; font-weight: bold;">/</span>krb5cc_500
    Default principal: administrator<span style="color: #000000; font-weight: bold;">@</span>KRB.LOCAL
    &nbsp;
    Valid starting     Expires            Service principal
    03<span style="color: #000000; font-weight: bold;">/</span>02<span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">16</span> <span style="color: #000000;">18</span>:09:<span style="color: #000000;">22</span>  03<span style="color: #000000; font-weight: bold;">/</span>03<span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">16</span> 04:09:<span style="color: #000000;">22</span>  krbtgt<span style="color: #000000; font-weight: bold;">/</span>KRB.LOCAL<span style="color: #000000; font-weight: bold;">@</span>KRB.LOCAL
            renew <span style="color: #000000; font-weight: bold;">until</span> 03<span style="color: #000000; font-weight: bold;">/</span>03<span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">16</span> <span style="color: #000000;">18</span>:09:<span style="color: #000000;">16</span>
    &nbsp;
    $ psql <span style="color: #660033;">-h</span> srv.krb.local postgres
    psql <span style="color: #7a0874; font-weight: bold;">&#40;</span>9.4.6<span style="color: #7a0874; font-weight: bold;">&#41;</span>
    Введите <span style="color: #ff0000;">&quot;help&quot;</span>, чтобы получить справку.
    &nbsp;
    <span style="color: #007800;">postgres</span>=<span style="color: #000000; font-weight: bold;">&gt;</span> \conninfo
    Вы подключены к базе данных <span style="color: #ff0000;">&quot;postgres&quot;</span> как пользователь <span style="color: #ff0000;">&quot;administrator&quot;</span> <span style="color: #7a0874; font-weight: bold;">&#40;</span>сервер <span style="color: #ff0000;">&quot;srv.krb.local&quot;</span>, порт <span style="color: #ff0000;">&quot;5432&quot;</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>.
    <span style="color: #007800;">postgres</span>=<span style="color: #000000; font-weight: bold;">&gt;</span></pre></td></tr></table><p class="theCode" style="display:none;">$ whoami
    administrator
    
    $ klist 
    Ticket cache: FILE:/tmp/krb5cc_500
    Default principal: administrator@KRB.LOCAL
    
    Valid starting     Expires            Service principal
    03/02/16 18:09:22  03/03/16 04:09:22  krbtgt/KRB.LOCAL@KRB.LOCAL
            renew until 03/03/16 18:09:16
    
    $ psql -h srv.krb.local postgres
    psql (9.4.6)
    Введите &quot;help&quot;, чтобы получить справку.
    
    postgres=&gt; \conninfo
    Вы подключены к базе данных &quot;postgres&quot; как пользователь &quot;administrator&quot; (сервер &quot;srv.krb.local&quot;, порт &quot;5432&quot;).
    postgres=&gt;</p></div>
    ";}
categories:
  - Заметки

---
<img loading="lazy" decoding="async" src="https://ssokolov.ru/wp-content/uploads/2016/03/secure-postgresql-deployment-17-728.jpg" alt="secure-postgresql-deployment-17-728" width="247" height="220" class="alignleft size-full wp-image-98" />Чисто ради интереса, решил попробовать настроить аутентификацию при подключению к PostgreSQL из ActiveDirectory развернутом на базе Samba 4.3. В общем, оказалось ничего сложного.

1. Заводим обычного пользователя в AD, под которым наш сервер PostgreSQL будет обращаться в AD, и выгружаем keytab следующим образом (из винды, которая в домене):

<pre lang="bash">C:\>ktpass -princ postgresql/srv.krb.local@KRB.LOCAL -mapuser pguser -pass pgpass -out pgpass.keytab
</pre>

где postgresql &#8212; имя службы (обязательно именно такое для PostgreSQL),  
srv.krb.local &#8212; FQDN сервера, на котором работает PostgreSQL,  
KRB.LOCAL &#8212; REALM нашего домена,  
pguser &#8212; пользователь, которого мы завели в домене,  
pgpass &#8212; пароль этого пользователя в домене,  
pgpass.keytab &#8212; имя файла куда выгружаем все эти данные.

2. На сервере srv.krb.local необходимо установить и настроить Kerberos клиента. Если этот сервер был ранее введен в домен, то все это у Вас уже настроено. В противном случае необходимо установить пакет krb5-workstation (у Вас же там Centos, правда?) и привести файл /etc/krb5.conf примерно к такому виду:

<pre lang="bash">[libdefaults]
        default_realm = KRB.LOCAL
        dns_lookup_realm = false
        dns_lookup_kdc = true
</pre>

а в /etc/resolv.conf nameserver должен указывать на DNS сервер, который обслуживает Ваш AD

3. Запишем файл pgpass.keytab куда-нибудь на сервер srv.krb.local, где его сможет прочитать PostgreSQL. Я например его записал в /var/lib/pgsql/krb/pgpass.keytab и выставил права:

<pre lang="bash">$ chown postgres:postgres /var/lib/pgsql/krb/pgpass.keytab
$ chmod 600 /var/lib/pgsql/krb/pgpass.keytab
</pre>

4. В Файле postgresql.conf задаем параметры:

<pre>listen_addresses = '*'
krb_server_keyfile = '/var/lib/pgsql/krb/pgpass.keytab'
</pre>

а в файле pg_hba.conf пишем:

<pre>host  all all 0.0.0.0/0 gss include_realm=0 krb_realm=KRB.LOCAL
</pre>

Только учтите, что файл просматривается сверху вниз, поэтому убедитесь, что Ваш пользователь, который должен попасть под правило в этой строке, не попал ни под какое другое правило выше.

5. Перечитываем настройки PostgreSQL:

<pre lang="bash"># service postgresql-9.4 reload
</pre>

6. Пользователи с именами аналогичными тем, что в домене должены обязательно присутствовать в PostgreSQL или же Вам потребуется делать map, используя файл pg_ident.conf, но я на этом останавливаться не буду, а просто создам пользователя в PostgreSQL как в домене, например, administrator.

<pre lang="sql">postgres=# CREATE ROLE administrator LOGIN ;
</pre>

И если Вы нигде ничего не напутали, то под этим пользователем можно подключаться к серверу с любой машины, которая есть в Вашем домене:

<pre lang="bash">$ whoami
administrator

$ klist 
Ticket cache: FILE:/tmp/krb5cc_500
Default principal: administrator@KRB.LOCAL

Valid starting     Expires            Service principal
03/02/16 18:09:22  03/03/16 04:09:22  krbtgt/KRB.LOCAL@KRB.LOCAL
        renew until 03/03/16 18:09:16

$ psql -h srv.krb.local postgres
psql (9.4.6)
Введите "help", чтобы получить справку.

postgres=> \conninfo
Вы подключены к базе данных "postgres" как пользователь "administrator" (сервер "srv.krb.local", порт "5432").
postgres=> 
</pre>

В общем это все.