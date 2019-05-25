FROM node:11.15.0
WORKDIR /home/veetaha/my/projects/ts-nestjs-angular-template

EXPOSE ${PORT}

CMD ["npm", "run", "backend:container:dev"]