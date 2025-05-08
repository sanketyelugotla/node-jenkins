FROM node:22

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
