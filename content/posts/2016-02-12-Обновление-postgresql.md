---
title: Обновление PostgreSQL
author: Сергей
type: post
date: 2016-02-12T06:25:12+00:00
url: /2016/02/12/Обновление-postgresql/
wp-syntax-cache-content:
  - |
    a:2:{i:1;s:1471:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;"># cat &lt;&lt; EOF &gt; /etc/yum.repos.d/1c_personal.repo</span>
    <span style="color: #7a0874; font-weight: bold;">&#91;</span>1c_personal<span style="color: #7a0874; font-weight: bold;">&#93;</span>
    <span style="color: #007800;">name</span>=1C Personal
    <span style="color: #007800;">baseurl</span>=http:<span style="color: #000000; font-weight: bold;">//</span>abf-downloads.abf.io<span style="color: #000000; font-weight: bold;">/</span>1c_personal<span style="color: #000000; font-weight: bold;">/</span>repository<span style="color: #000000; font-weight: bold;">/</span>rosa-server67<span style="color: #000000; font-weight: bold;">/</span>x86_64<span style="color: #000000; font-weight: bold;">/</span>main<span style="color: #000000; font-weight: bold;">/</span>release<span style="color: #000000; font-weight: bold;">/</span>
    <span style="color: #007800;">enabled</span>=<span style="color: #000000;">1</span>
    <span style="color: #007800;">gpgcheck</span>=<span style="color: #000000;">0</span>
    EOF</pre></td></tr></table><p class="theCode" style="display:none;"># cat &lt;&lt; EOF &gt; /etc/yum.repos.d/1c_personal.repo
    [1c_personal]
    name=1C Personal
    baseurl=http://abf-downloads.abf.io/1c_personal/repository/rosa-server67/x86_64/main/release/
    enabled=1
    gpgcheck=0
    EOF</p></div>
    ";i:2;s:415:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #666666;"># </span><span style="color: #c20cb9; font-weight: bold;">yum install</span> -y postgresql94-server postgresql94-contrib</pre></td></tr></table><p class="theCode" style="display:none;"># yum install -y postgresql94-server postgresql94-contrib</p></div>
    ";}
categories:
  - Новости

---
<a href="https://ssokolov.ru/wp-content/uploads/2016/02/Linux_Postgres_1C.png" rel="attachment"><img loading="lazy" decoding="async" class="alignleft size-full wp-image-53" src="https://ssokolov.ru/wp-content/uploads/2016/02/Linux_Postgres_1C.png" alt="Linux_Postgres_1C" width="266" height="200" /></a>Буквально вчера на сайте [postgresql.org][1] опубликовали новость про выпуск корректирующих релизов всех поддерживаемых версий, а сегодня я уже тестирую сборочку PostgreSQL 9.4.6 для работы под базами 1C. Кому интересно, подключайте репозиторий и тестируйте.

Подключаем реп:

<pre lang="bash"># cat &lt;&lt; EOF > /etc/yum.repos.d/1c_personal.repo
[1c_personal]
name=1C Personal
baseurl=http://abf-downloads.abf.io/1c_personal/repository/rosa-server67/x86_64/main/release/
enabled=1
gpgcheck=0
EOF
</pre>

Устанавливаем:

<pre lang="bash"># yum install -y postgresql94-server postgresql94-contrib</pre>

Этот репозиторий подходит для Centos 6.7/RELS 6.7/Scientiffic Linux 6.7 и архитектуры x86_64

Есть также сборка под x86 и под версию дистрибутивов 6.6

 [1]: http://www.postgresql.org/