
FROM node
WORKDIR /app
RUN npm install --global pm2
COPY package*.json /app
RUN npm run --silent
COPY . .
RUN npm install
RUN npm rebuild node-sass
EXPOSE 3000
CMD ["pm2-runtime","start","npm","--","start" ]
