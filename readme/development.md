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
### install latest npm
```shell
npm install --legacy-peer-deps
```

### start dev server
```shell
npm i --legacy-peer-deps
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
