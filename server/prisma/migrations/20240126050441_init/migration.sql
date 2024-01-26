-- CreateTable
CREATE TABLE "Band" (
    "id" SERIAL NOT NULL,
    "color" TEXT NOT NULL,
    "value" INTEGER,
    "multiplierExp" INTEGER,
    "tolerance" INTEGER,

    CONSTRAINT "Band_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Band_color_key" ON "Band"("color");
