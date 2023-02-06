# start dev environment

```shell
cp docker-compose.example.yml docker-compose.yml
cp .env.local.example .env.local
docker-compose up -d
docker-compose exec app bash
npm i
npm run dev
```

# start eslint
```shell
npm run eslint
```

# create production build & preview
```shell
npm run build
npm run preview
```

# webchat shortcuts

**Show bot typing indicator:**
```shell
typing
typing 3
```
