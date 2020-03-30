FROM node:12.2.0-alpine

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

WORKDIR .

RUN npm install
RUN npm install react-scripts@3.0.1 -g --silent
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5000

CMD [ "node", "server.js" ]
