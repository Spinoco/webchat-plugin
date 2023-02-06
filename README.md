# start dev environment
- cp docker-compose.example.yml docker-compose.yml
- cp .env.local.example .env.local
- docker-compose up -d
- docker-compose exec app bash
- npm i
- npm run dev

# start eslint
- npm run eslint

# create production build & preview
- npm run build
- npm run preview
