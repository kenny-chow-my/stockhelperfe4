FROM mhart/alpine-node:latest

MAINTAINER Kenny Chow 

WORKDIR /app
ADD . .

RUN npm install

EXPOSE 8889

CMD ["npm", "run", "start:prod"]
