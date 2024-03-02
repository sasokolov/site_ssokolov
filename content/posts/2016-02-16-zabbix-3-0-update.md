---
title: Zabbix 3.0 Update
author: Сергей
type: post
date: 2016-02-16T10:21:50+00:00
url: /2016/02/16/zabbix-3-0-update/
categories:
  - Новости

---
<img loading="lazy" decoding="async" class="alignleft  wp-image-83" src="https://ssokolov.ru/wp-content/uploads/2016/02/roadmap-bulb-small.jpg" alt="roadmap-bulb-small" width="247" height="220" />Об этом релизе много говорили. На <a href="https://habrahabr.ru/company/zabbix/blog/277265/" target="_blank">Хабре</a> опубликована статься со списком наиболее значимых изменений.

Хочу заметить, что обновление прошло почти гладко. Лишь не много пришлось доработать <a href="https://github.com/dj-wasabi/puppet-zabbix" target="_blank">модуль в Puppet</a>, чтобы zabbix_server не ругался на синтаксис файла конфигурации, но это проблема даже не самого Zabbix.

Не хватает версии для RH-Based 6.x дистрибутивов, но сервер у меня на семерке, а zabbix-агенты 2.4 с сервером 3.0, вроде, не ругаются и исправно собирают данные. В общем тестируем.