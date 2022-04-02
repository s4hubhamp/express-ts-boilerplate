import mongoose from 'mongoose'
import {logger} from '../utils/logger'

const {MONGO_HOST, MONGO_PORT, MONGO_DATABASE, RDS_HOST, RDS_USER, RDS_PASSWORD, RDS_DATABASE} = process.env

const db = {
  primary: {
    url: `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  },

  sql: {
    host: RDS_HOST,
    user: RDS_USER,
    password: RDS_PASSWORD,
    database: RDS_DATABASE,
  },
}

export async function connect() {
  try {
    await mongoose.connect(db.primary.url, db.primary.options)
    logger.info('🟢 The database is connected.')
  } catch (error) {
    logger.error(`🔴 Unable to connect to the database: ${error}.`)
    process.exit(1)
  }
}

export async function disconnect() {
  try {
    await mongoose.connection.close()
    logger.info('🟢 Disconnected from the database on app termination.')
    process.exit(0)
  } catch (error) {
    logger.error(`🔴 Unable to disconnect from the database: ${error}.`)
    process.exit(1)
  }
}
