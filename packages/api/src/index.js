import os from 'os'

import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import throng from 'throng'

import context from './utils/context'
import config from './config'
import schema from './modules'

const cors = {
  credentials: true,
  allowedHeaders: ['Authorization'],
  exposedHeaders: ['Authorization'],
}

const app = express()

const WORKERS = os.cpus().length

const server = new ApolloServer({
  schema,
  context: async ({ req }) => ({
    user: await context.getUser(req),
  }),
})

server.applyMiddleware({
  path: '/api',
  app,
  cors,
})

const startServer = async () => {
  const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    promiseLibrary: global.Promise,
  }
  try {
    await Promise.all([mongoose.connect(config.MONGODB_URI, mongooseOptions), app.listen(config.PORT)])
    // eslint-disable-next-line no-console
    console.log(`Server has started on port: ${config.PORT}`)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Could not start the app: ', error)
  }
}

throng(startServer, {
  workers: WORKERS,
  lifetime: Infinity,
})
