FROM denoland/deno:latest

# EXPOSE 3155

WORKDIR /app

USER deno

ADD . .

# RUN deno cache src/app.ts

CMD ["task", "start"]