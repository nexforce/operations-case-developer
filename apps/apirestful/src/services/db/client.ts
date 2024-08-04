import { PrismaClient } from '@prisma/client'

export const createClient = () => new PrismaClient({
  log: [
    'query',
    'info',
    'warn',
    'error'
  ]
})

export const db = createClient()

export const disconnect = async (db: PrismaClient) => {
  await db.$disconnect()
}

export const connect = async (db: PrismaClient) => {
  await db.$connect()
}

export const eraseRecords = async (db: PrismaClient) => {
  const tables = Object.keys(db).filter(model => !model.startsWith('_')).filter(model => !model.startsWith('$'));

  for (const model of tables) {
    try {
      await db[model].deleteMany();
      console.log(`Deleted all records from ${model}`);
    } catch (error) {
      console.error(`Failed to delete records from ${model}:`, error);
    }
  }

  await db.$disconnect();
}
