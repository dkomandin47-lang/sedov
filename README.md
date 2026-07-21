# SEDOV — магазин автозапчастей

Адаптивный фронтенд интернет-магазина автозапчастей: каталог, поиск, фильтры, избранное, корзина, подбор по VIN и контакты. Бэкенд и оформление реальных заказов пока не подключены.

## Запуск в Docker

Требуется Docker Desktop или Docker Engine с плагином Compose.

```bash
docker compose up --build -d
```

После запуска сайт доступен по адресу [http://localhost:3000](http://localhost:3000).

Проверить состояние контейнера и посмотреть логи:

```bash
docker compose ps
docker compose logs -f web
```

Остановить и удалить контейнер:

```bash
docker compose down
```

Если порт `3000` занят, задайте другой внешний порт:

```bash
SEDOV_PORT=8080 docker compose up --build -d
```

В PowerShell:

```powershell
$env:SEDOV_PORT=8080
docker compose up --build -d
```

## Локальная разработка

Требуется Node.js `>=22.13.0`.

```bash
npm ci
npm run dev
```

Основные команды:

- `npm run dev` — режим разработки;
- `npm run build` — production-сборка;
- `npm run start` — запуск production-сборки;
- `npm run lint` — проверка исходного кода.

## Технологии

- React 19;
- Next.js 16;
- Vinext и Vite;
- Cloudflare Workers / OpenAI Sites;
- Docker и Docker Compose.
