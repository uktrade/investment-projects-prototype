# Investment Projects Prototype

## Development

Dependencies:
 - [node](https://nodejs.org/en/) v8.11.3
 - [yarn](https://yarnpkg.com/lang/en/)
 - [redis]( https://redis.io/)
  
Start redis:

    $ redis-server

Install npm dependencies: (open a second terminal window)
    
    $ yarn install
    
Build a Webpack bundle

    $ yarn build
    
Bring up the app

    $ yarn server
    
View the prototype: http://localhost:3000
            
## Docker

Dependencies:
 - [docker](https://www.docker.com/)
 
The [Dockerfile] is used to build two images (prototype & node) via the build command:
    
    docker build -t dit/investment-projects-prototype . 
 
Bring up the containers which will pull in a third image [redis]( https://redis.io/) via the [docker-compose.yml] configuration 

    docker-compose up

View the prototype: http://localhost:3000

[Dockerfile]:Dockerfile
[docker-compose.yml]:docker-compose.yml
