FROM node:11.15.0
WORKDIR /home/veetaha/my/projects/times-are-changing

EXPOSE ${PORT}

CMD ["npm", "run", "backend:container:dev"]