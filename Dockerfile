FROM node:8.9.4
EXPOSE 8080
WORKDIR /app
COPY index.js /app
CMD ["node", "index.js"]