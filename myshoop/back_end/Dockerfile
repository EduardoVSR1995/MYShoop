FROM node:18

WORKDIR /app

COPY . ./

RUN npm i

EXPOSE 4000

RUN npx prisma generate

CMD [ "npm", "run", "docker:dev:create" ]