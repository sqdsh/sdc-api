# sdc-api
Небольшой модуль-враппер который позволяет вам легко взаимодействовать с [Server-Discord API](https://docs.server-discord.com).

## Установка
Варианты установки:

1. Можно установить как пакет:
```sh
$ npm install github:sqdsh/sdc-api
```
После установки, враппер будет определяться как `sdc-api`

Версия на TypeScript: **[click](https://github.com/sqdsh/sdc-type)**

2. Можно установить прямиком в папку с проектом:
```sh
$ git clone https://github.com/sqdsh/sdc-api.git
$ cd sdc-api
```

## Инициализация враппера
```js
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2MzIwMzA3Mjk5MDY0MjE4NiIsInBlcm1zIjowLCJpYXQiOjE1NzcxMjE4NDZ9.Y5qSkDQhOLsLbE6tcyp9e4ua0FtCrN1ykBBe0rJ9TXo";
// API ключ можно получить на странице редактирования вашего бота

const SDC = require("sdc-api");
const client = new SDC(apiKey);
```

## Примеры кода
```js
// Проверка на варны
client.warns("178404926869733376")
    .then((data) => {
        console.info(data);
        /* {
            "id": "178404926869733376",
            "type": "user",
            "warns": 1
        } */
    });

// Получить текущее место сервера на мониторинге
client.guildPlace("577798137230655508")
    .then((data) => {
        console.info(data);
        /* {
            "place": 199
        } */
    });

// Получить всех проголосовавших пользователей и их оценки
client.guildRated("640586112624230450")
    .then((data) => {
        console.info(data);
        /* {
            "178404926869733376": 1,
            "279220345767198723": 1,
            "340938899285344258": 1,
            "368463408112205826": 1,
            "418712700848439318": 1,
            "533245137216864286": 1
        } */
    });

// Отправить статистику бота на мониторинг
client.updateStat(client.user.id, { servers: 15450, shards: 8 })
    .then((data) => {
        console.info(data);
        /* {
            status: true
        } */
    });
```

Все методы враппера: **[клик](https://github.com/sqdsh/sdc-api/blob/master/examples/METHODS.md)**.
