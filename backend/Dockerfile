FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

# Build TypeScript
RUN yarn build

EXPOSE 5000

CMD ["node", "dist/server.js"]