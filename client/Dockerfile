FROM node:22.3.0-alpine3.19

# ARGS
ENV PIXELY_PORT=4018

# Create app directory
WORKDIR /pixely

# copy code
# will not copy files in .dockerignore
COPY . .

# Install and build
RUN npm install
RUN npm run build

# Expose the port
EXPOSE $PIXELY_PORT

# Run the app (this is the default command)
ENTRYPOINT ["sh", "-c"]
CMD ["npx vite --host --port $PIXELY_PORT"]


