---
title: Asterisk в RPM репозитории
author: Сергей
type: post
date: 2016-09-13T08:23:00+00:00
url: /2016/09/13/asterisk-в-rpm-репозитории/
wp-syntax-cache-content:
  - |
    a:3:{i:1;s:1940:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">cat</span> <span style="color: #000000; font-weight: bold;">&amp;</span>lt;<span style="color: #000000; font-weight: bold;">&amp;</span>lt; EOF <span style="color: #000000; font-weight: bold;">&amp;</span>gt; <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>yum.repos.d<span style="color: #000000; font-weight: bold;">/</span>asterisk.repo
    <span style="color: #7a0874; font-weight: bold;">&#91;</span>Asterisk<span style="color: #7a0874; font-weight: bold;">&#93;</span>
    <span style="color: #007800;">name</span>=Asterisk-\<span style="color: #007800;">$releasever</span>
    <span style="color: #007800;">baseurl</span>=http:<span style="color: #000000; font-weight: bold;">//</span>abf-downloads.rosalinux.ru<span style="color: #000000; font-weight: bold;">/</span>asterisk_personal<span style="color: #000000; font-weight: bold;">/</span>repository<span style="color: #000000; font-weight: bold;">/</span>rosa-server72<span style="color: #000000; font-weight: bold;">/</span>\<span style="color: #007800;">$basearch</span><span style="color: #000000; font-weight: bold;">/</span>main<span style="color: #000000; font-weight: bold;">/</span>release<span style="color: #000000; font-weight: bold;">/</span>
    <span style="color: #007800;">gpgcheck</span>=<span style="color: #000000;">0</span>
    <span style="color: #007800;">enabled</span>=<span style="color: #000000;">1</span>
    EOF</pre></td></tr></table><p class="theCode" style="display:none;">cat &amp;lt;&amp;lt; EOF &amp;gt; /etc/yum.repos.d/asterisk.repo
    [Asterisk]
    name=Asterisk-\$releasever
    baseurl=http://abf-downloads.rosalinux.ru/asterisk_personal/repository/rosa-server72/\$basearch/main/release/
    gpgcheck=0
    enabled=1
    EOF</p></div>
    ";i:2;s:375:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #666666;"># </span><span style="color: #c20cb9; font-weight: bold;">yum install</span> asterisk asterisk-configs</pre></td></tr></table><p class="theCode" style="display:none;"># yum install asterisk asterisk-configs</p></div>
    ";i:3;s:777:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;">asterisk-sounds-core-ru-alaw.noarch : Asterisk core sounds - ru - alaw.
    asterisk-sounds-core-ru-g722.noarch : Asterisk core sounds - ru - g722.
    asterisk-sounds-core-ru-gsm.noarch : Asterisk core sounds - ru - gsm.
    asterisk-sounds-core-ru-ulaw.noarch : Asterisk core sounds - ru - ulaw.</pre></td></tr></table><p class="theCode" style="display:none;">asterisk-sounds-core-ru-alaw.noarch : Asterisk core sounds - ru - alaw.
    asterisk-sounds-core-ru-g722.noarch : Asterisk core sounds - ru - g722.
    asterisk-sounds-core-ru-gsm.noarch : Asterisk core sounds - ru - gsm.
    asterisk-sounds-core-ru-ulaw.noarch : Asterisk core sounds - ru - ulaw.</p></div>
    ";}
categories:
  - Новости

---
<img loading="lazy" decoding="async" class="alignleft  wp-image-124" src="https://ssokolov.ru/wp-content/uploads/2016/09/Asterisk.gif" alt="asterisk" width="330" height="233" />Встала задачка развернуть SIP-сервер для нужд маленького офиса. Гуглегие показало большое количество HOWTO по сборке Asterisk из исходников, да еще и для RH 6.x. Мне такой подход к развертыванию сервисов решительно не нравится, по этому решил я сделать репозиторий с пакетами да еще и под 7.x  
Итак, устанавливаем, например Centos 7.2 в минимальной конфигурации и подключаем репозиторий:

<pre lang="bash">cat &lt;&lt; EOF &gt; /etc/yum.repos.d/asterisk.repo
[Asterisk]
name=Asterisk-\$releasever
baseurl=http://abf-downloads.rosalinux.ru/asterisk_personal/repository/rosa-server72/\$basearch/main/release/
gpgcheck=0
enabled=1
EOF
</pre>

И устанавливаем вполне себе штатно:

<pre lang="bash"># yum install asterisk asterisk-configs
</pre>

В качестве бонуса, так же в пакеты, я собрал русскую озвучку:

<pre lang="bash">asterisk-sounds-core-ru-alaw.noarch : Asterisk core sounds - ru - alaw.
asterisk-sounds-core-ru-g722.noarch : Asterisk core sounds - ru - g722.
asterisk-sounds-core-ru-gsm.noarch : Asterisk core sounds - ru - gsm.
asterisk-sounds-core-ru-ulaw.noarch : Asterisk core sounds - ru - ulaw.
</pre>

Особой нужны заморачиваться со сборкой всяких драйверов под голосовые железяки у меня нет, по этому их я, хоть и собрал, но не тестировал.