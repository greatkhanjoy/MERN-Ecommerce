FROM node:16

#Working DIRECTORY
WORKDIR /app

#Copy package.json  Files
COPY package*.json ./

#install dependencies
RUN npm install

#Copy Source Files
COPY . .
# Build
# RUN npm run build

#expose the api port
EXPOSE 5000

CMD ["node", "backend/server.js"]