-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "solWalletId" TEXT,
    "inrWalletId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InrWallet" (
    "id" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "InrWallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."solWallet" (
    "id" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "solWallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InrWallet_userId_key" ON "public"."InrWallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "solWallet_userId_key" ON "public"."solWallet"("userId");

-- AddForeignKey
ALTER TABLE "public"."InrWallet" ADD CONSTRAINT "InrWallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."solWallet" ADD CONSTRAINT "solWallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
