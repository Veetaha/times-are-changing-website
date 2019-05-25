FROM node:11.15.0
WORKDIR /usr/app

COPY . .

# workaround npm install --prefix warning
RUN npm set unsafe-perm true 

RUN npm install

EXPOSE ${PORT}

RUN npm run build

ENV NODE_ENV=production

CMD ["npm", "run", "backend:container:start"]