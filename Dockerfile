FROM node
WORKDIR /app
ENTRYPOINT ["npm", "start"]
COPY . /app
RUN npm install
