FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app/

EXPOSE 8000

RUN npm install

CMD [ "npm", "start" ]
