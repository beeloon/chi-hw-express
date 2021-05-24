FROM node:14.17.0

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]

# FROM node:14.17.0

# RUN mkdir -p /usr/src/app

# WORKDIR /usr/src/

# COPY package.json /usr/src

# WORKDIR /usr/src/app

# COPY . /usr/src/app

# RUN npm install

# EXPOSE 8080

# CMD ["npm", "run", "start"]