FROM mhart/alpine-node:latest

MAINTAINER Kenny Chow

WORKDIR /app
ADD . .
ENV PORT 80
ENV HOST 0.0.0.0

# need to set Development so that npm install all the transpilers necessary
ENV NODE_ENV development
RUN npm install

EXPOSE 80

CMD ["npm", "run", "start:prod"]
