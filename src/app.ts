import Server from '@infrastructure/config/server/Server.ts'

const server = new Server()

await server.start()