-- CreateTable
CREATE TABLE "products" (
    "id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "link" TEXT NOT NULL,
    "daysSinceLaunch" INTEGER NOT NULL,
    "sold" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "products_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR NOT NULL,
    "first_name" VARCHAR NOT NULL,
    "last_name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "gender" VARCHAR NOT NULL,

    CONSTRAINT "users_id" PRIMARY KEY ("id")
);
