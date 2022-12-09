FROM node:18
# Create app directory
WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY hardhat.config.ts ./
COPY . .
RUN npm install
# If you are building your code for production
#RUN npm ci 
# Bundle app source
EXPOSE 3000

CMD ["npm", "start"]

#docker build . -t api
#docker run -t -p 3000:3000 api
#DOCKER_BUILDKIT=0