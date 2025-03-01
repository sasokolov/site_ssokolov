# Hugo Static Site для ssokolov.ru

Это статическая версия сайта [ssokolov.ru](https://ssokolov.ru/), созданная с использованием Hugo.

## Структура проекта

```
hugo-ssokolov/
├── config.toml         # Конфигурация Hugo
├── content/            # Содержимое сайта в формате Markdown
│   ├── _index.md       # Главная страница
│   ├── about/          # Страница "О себе"
│   ├── services/       # Страница "Услуги"
│   └── blog/           # Блог
├── static/             # Статические файлы
│   ├── css/
│   ├── js/
│   ├── images/         # Изображения
│   └── documents/      # Документы (PDF и др.)
└── themes/             # Тема оформления
    └── ssokolov-theme/ # Кастомная тема для сайта
```

## Запуск и сборка сайта

1. Установите Hugo: https://gohugo.io/installation/
2. Клонируйте этот репозиторий
3. Перейдите в директорию проекта: `cd hugo-ssokolov`
4. Запустите локальный сервер: `hugo server -D`
5. Откройте в браузере http://localhost:1313/
6. Для сборки статического сайта выполните: `hugo`

## Добавление контента

### Добавление новой статьи в блог:

```
hugo new blog/my-new-post.md
```

Содержание статьи начинается с frontmatter в формате YAML:

```yaml
---
title: "Название статьи"
date: 2023-05-20
draft: false
categories: ["Категория"]
tags: ["тег1", "тег2"]
author: "Сергей"
---

Содержание статьи...
```

## Кастомизация

Тема сайта находится в директории `themes/ssokolov-theme/`. Вы можете изменять шаблоны в директории `layouts` и стили в директории `static/css`.

## Лицензия

Copyright © Сергей Соколов, 2016-2023