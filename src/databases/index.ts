import mongoose from 'mongoose'

const {MONGO_HOST, MONGO_PORT, MONGO_DATABASE} = process.env

if (!MONGO_HOST || !MONGO_PORT || !MONGO_DATABASE)
  throw new Error('Missing environment variables.')

const db = {
  primary: {
    url: `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`,
  },
}

export async function connect() {
  try {
    await mongoose.connect(db.primary.url)
    console.log('🟢 Database is connected.')
  } catch (error) {
    console.error(`🔴 Unable to connect to the database: ${error}.`)
    process.exit(1)
  }
}

export async function disconnect() {
  await mongoose
    .disconnect()
    .then(() => {
      console.log('🟢 Mongoose disconnected through app termination')
      process.exit(0)
    })
    .catch((err: Error) => {
      console.log(
        '🔴 Mongoose could not be disconnected through app termination',
        err
      )
      process.exit(1)
    })
}
