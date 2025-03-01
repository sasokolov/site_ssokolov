---
title: "Шпаргалка rpm"
date: 2018-07-02
draft: false
categories: ["Заметки"]
author: "Сергей"
summary: "Полезные команды и макросы для работы с RPM и управления сборкой пакетов."
---

Просмотр встроенных макросов (можно фильтровать с помощью grep):
```bash
rpm --showrc
```

Просмотр результатов раскрытия конкретных макросов:

```
rpm --eval "%systemd_post daemond.service",
rpm --eval %_libdir
```

Объявит макрос в спеке в текущей секции:
```
%define _some_dir /opt/some/path
```

Объявит макрос во всей спеке (нужно объявлять в первых строках спекфайла):

```
%global _some_dir /opt/some/path
```

Общий синтаксис объявления макроса
```
%global <macro_name_here> <macro_default_value>
%define <macro_name_here> <macro_default_value>
```

Значения макроса прокидывается с помощью параметра
```
--define "<macro_name_here><macro_value>"
```

Смотрим как раскроются макросы во всей спеке:
```
rpmspec \
--define "macro_name macro_value" \
--parse some-spec-file.spec
```

Отключит debuginfo пакет
```
%global debug_package %{nil}
```

Соберет только бинарный rpm:
```
rpmbuild -bb some-spec.spec
```

Соберет пакет с исходниками:
```
rpmbuild -bs some-spec.spec
```

Соберет бинарный пакет и пакет с исходниками:

```
rpmbuild -ba some-spec.spec
```

Собрать SRPM под el5 из под el7
```
rpmbuild -bs --define "_sourcedir $PWD" --target x86_64-linux-el5 --define "_source_filedigest_algorithm md5" --define "dist .el5" specfile.spec
```