# apps/worker Dockerfile — placeholder
# TODO: Build out once the worker has actual jobs.

FROM node:20-alpine

WORKDIR /app

COPY apps/worker ./apps/worker

CMD ["echo", "Worker service not yet implemented."]
