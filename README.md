# cities-microservice

## How to run

- Just clone this repository: `git clone github.com/Matheus-Campos/cities-microservice`
- Install all dependencies: `npm install`
- Start the application server: `npm start`

PS: You'll need to set up a mongodb database and put it's connection url in .env `DATABASE_URL` entry.

## Running with Docker :whale:

Since Docker was created, you're more likely to run this project using it. In this case, all you need to have is docker-compose installed in your PC.

Just run `docker-compose up` and let the whale take care of everything.

## Testing

This microservice comes with jest configured, making it really simple to test. Simply run `npm test` and jest will do its job.

If you're running on docker, however, you'll need to create a new container, since each container only has one port 3333 (the default application port). To make this, type the following command in your terminal: `docker-compose run web npm test`.
