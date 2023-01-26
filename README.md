
# start dev environment

- cp docker-compose.example.yml docker-compose.yml
- docker-compose up -d
- docker-compose exec app bash
- npm i
- npm run dev

# start eslint
 
- npm run eslint
