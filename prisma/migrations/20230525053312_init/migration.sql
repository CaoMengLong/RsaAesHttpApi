-- CreateTable
CREATE TABLE "RsaKey" (
    "id" SERIAL NOT NULL,
    "publicKey" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,

    CONSTRAINT "RsaKey_pkey" PRIMARY KEY ("id")
);
