import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
  await prisma.band.createMany({
    data: [
      {
        color: "pink",
        value: null,
        multiplierExp: -3,
        tolerance: null,
      },
      {
        color: "silver",
        value: null,
        multiplierExp: -2,
        tolerance: 10,
      },
      {
        color: "gold",
        value: null,
        multiplierExp: -1,
        tolerance: 5,
      },
      {
        color: "black",
        value: 0,
        multiplierExp: 0,
        tolerance: null,
      },
      {
        color: "brown",
        value: 1,
        multiplierExp: 1,
        tolerance: 1,
      },
      {
        color: "red",
        value: 2,
        multiplierExp: 2,
        tolerance: 2,
      },
      {
        color: "orange",
        value: 3,
        multiplierExp: 3,
        tolerance: 0.05,
      },
      {
        color: "yellow",
        value: 4,
        multiplierExp: 4,
        tolerance: 0.02,
      },
      {
        color: "green",
        value: 5,
        multiplierExp: 5,
        tolerance: 0.5,
      },
      {
        color: "blue",
        value: 6,
        multiplierExp: 6,
        tolerance: 0.25,
      },
      {
        color: "violet",
        value: 7,
        multiplierExp: 7,
        tolerance: 0.1,
      },
      {
        color: "gray",
        value: 8,
        multiplierExp: 8,
        tolerance: 0.01,
      },
      {
        color: "white",
        value: 9,
        multiplierExp: 9,
        tolerance: null,
      },
    ],
    skipDuplicates: true,
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })