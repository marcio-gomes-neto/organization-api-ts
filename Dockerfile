FROM node:14

WORKDIR /node-app

COPY package.json ./

COPY tsconfig.json ./

COPY src ./src

RUN ls -a

RUN npm install

EXPOSE 3010

CMD ["npm","start"] 
