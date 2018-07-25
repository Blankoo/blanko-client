FROM node
WORKDIR /www
ADD . /www
RUN npm install --silent
RUN npm run build
CMD ["npm", "run", "docker"]
EXPOSE 9098
