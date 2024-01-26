import express from "express"
import { PrismaClient } from "@prisma/client"
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

const prisma = new PrismaClient()

app.use(cors())
app.use(express.json());

app.get('/bands', async (_req, res) => {
  try { 
    const bands = await prisma.band.findMany();
    res.json(bands)
  } catch(err) {
    console.log(err)
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})