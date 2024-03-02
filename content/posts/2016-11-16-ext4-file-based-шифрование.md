---
title: ext4 file-based шифрование
author: Сергей
type: post
date: 2016-11-16T08:44:52+00:00
url: /2016/11/16/ext4-file-based-шифрование/
wp-syntax-cache-content:
  - |
    a:5:{i:1;s:475:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">sudo</span> tune2fs <span style="color: #660033;">-O</span> encrypt <span style="color: #000000; font-weight: bold;">/</span>dev<span style="color: #000000; font-weight: bold;">/</span>sda6</pre></td></tr></table><p class="theCode" style="display:none;">sudo tune2fs -O encrypt /dev/sda6</p></div>
    ";i:2;s:908:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">echo</span> 0x$<span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #c20cb9; font-weight: bold;">head</span> <span style="color: #660033;">-c</span> <span style="color: #000000;">16</span> <span style="color: #000000; font-weight: bold;">/</span>dev<span style="color: #000000; font-weight: bold;">/</span>urandom <span style="color: #000000; font-weight: bold;">|</span> xxd -p<span style="color: #7a0874; font-weight: bold;">&#41;</span><span style="color: #000000; font-weight: bold;">&gt;</span>~<span style="color: #000000; font-weight: bold;">/</span>.cryptoSalt</pre></td></tr></table><p class="theCode" style="display:none;">echo 0x$(head -c 16 /dev/urandom | xxd -p)&gt;~/.cryptoSalt</p></div>
    ";i:3;s:346:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">mkdir</span> ~<span style="color: #000000; font-weight: bold;">/</span>crypted</pre></td></tr></table><p class="theCode" style="display:none;">mkdir ~/crypted</p></div>
    ";i:4;s:805:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>sbin<span style="color: #000000; font-weight: bold;">/</span>e4crypt add_key <span style="color: #660033;">-S</span> <span style="color: #000000; font-weight: bold;">`</span><span style="color: #c20cb9; font-weight: bold;">cat</span> ~<span style="color: #000000; font-weight: bold;">/</span>.cryptoSalt<span style="color: #000000; font-weight: bold;">`</span> ~<span style="color: #000000; font-weight: bold;">/</span>crypted</pre></td></tr></table><p class="theCode" style="display:none;">/usr/sbin/e4crypt add_key -S `cat ~/.cryptoSalt` ~/crypted</p></div>
    ";i:5;s:805:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>sbin<span style="color: #000000; font-weight: bold;">/</span>e4crypt add_key <span style="color: #660033;">-S</span> <span style="color: #000000; font-weight: bold;">`</span><span style="color: #c20cb9; font-weight: bold;">cat</span> ~<span style="color: #000000; font-weight: bold;">/</span>.cryptoSalt<span style="color: #000000; font-weight: bold;">`</span> ~<span style="color: #000000; font-weight: bold;">/</span>crypted</pre></td></tr></table><p class="theCode" style="display:none;">/usr/sbin/e4crypt add_key -S `cat ~/.cryptoSalt` ~/crypted</p></div>
    ";}
categories:
  - Новости

---
Начиная с ядра 4.1 добавлена опция _CONFIG\_EXT4\_ENCRYPTION_. Эта штука включает реализацию шифрования в драйвере ext4. С его помощью можно шифровать отдельные части файловой системы, например отдельно взятую директорию.  
Так вышло что я использую на десктопе <a href="https://www.rosalinux.ru/rosa-fresh/" target="_blank">ROSA Fresh</a>, однако последний релиз этой системы хоть и имеет версию ядра выше 4.1 а вот инструментарий для такого функционала отсутствует. Необходимые утилиты появились лишь в e2fsprogs-1.43. Но не беда. На <a href="https://abf.io/" target="_blank">ABF</a> я нашел свежую сборку R9 (это пока даже не альфа) и там как раз ядро v4.8.7 и e2fsprogs-1.43.3, т.е. все необходимое уже есть. Качаем, ставим в виртуалку и пробуем.  
Я ставил опыты на файлововой системе, смонтированной в /home, устройство /dev/sda6.  
1. Сначала включим функционал **(не включайте это на загрузочном разделе. GRUB это не поймет и не сможет загрузить систему)**

<pre lang="bash">sudo tune2fs -O encrypt /dev/sda6</pre>

2. Теперь создадим файлик с солью:

<pre lang="bash">echo 0x$(head -c 16 /dev/urandom | xxd -p)>~/.cryptoSalt</pre>

3. Создадим директорию которую будем шифровать:

<pre lang="bash">mkdir ~/crypted</pre>

4. Ну и применим к ней шифрование, ключ набиваем с клавиатуры:

<pre lang="bash">/usr/sbin/e4crypt add_key -S `cat ~/.cryptoSalt` ~/crypted</pre>

Теперь в директории ~/crypted можно создавать папочки и файлики как обычно.  
После перезагрузки Вы не сможете прочитать содержимое. Точнее сможете видеть, что там есть файлы и директории, но их имена будут искажены, а содержимое файлов и вовсе не читается. Чтобы снова видеть все в нормальном виде, нужно снова выполнить 

<pre lang="bash">/usr/sbin/e4crypt add_key -S `cat ~/.cryptoSalt` ~/crypted</pre>

Ну а если Вы забыли каким ключиком и с какой солью изначально это защищали, то можете забыть про содержимое, добыть его у Вас в ряд ли получится.