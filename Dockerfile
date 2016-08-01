FROM node
WORKDIR /src
ENTRYPOINT ["npm", "start"]
COPY . /src
RUN npm install
