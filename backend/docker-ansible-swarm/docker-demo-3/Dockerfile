FROM node:14-alpine
RUN apk add curl
WORKDIR /app
ADD index.js .
HEALTHCHECK --interval=5s --timeout=5s --start-period=5s --retries=4 \
    CMD curl -f http://localhost:3000 || exit 1
CMD ["node", "./index.js"]