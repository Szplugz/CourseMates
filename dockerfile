FROM node

WORKDIR /Users/szplugz/College/CS/Hackillinois/berry

COPY package.json /Users/szplugz/College/CS/Hackillinois/berry/package.json
COPY package-lock.json /Users/szplugz/College/CS/Hackillinois/berry/package-lock.json

RUN npm install

COPY . /Users/szplugz/College/CS/Hackillinois/berry/

RUN npm start