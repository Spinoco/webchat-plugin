### initial configuration 

```shell
cp docker-compose.example.yml docker-compose.yml
cp .env.local.example .env.local
```

### start docker environment
```shell
docker-compose up -d
docker-compose exec app bash
```

### start dev server
```shell
npm i
npm run dev
```

### run eslint + stylelint
```shell
npm run lint
```

### create production build & preview
```shell
npm run build
npm run preview
```
