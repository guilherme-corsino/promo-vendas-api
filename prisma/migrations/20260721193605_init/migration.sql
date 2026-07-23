-- CreateEnum
CREATE TYPE "StatusProduto" AS ENUM ('EM_ESTOQUE', 'VENDIDO');

-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "categoria" TEXT NOT NULL,
    "fotoUrl" TEXT,
    "precoCompra" DECIMAL(65,30) NOT NULL,
    "precoVenda" DECIMAL(65,30) NOT NULL,
    "status" "StatusProduto" NOT NULL DEFAULT 'EM_ESTOQUE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vendidoEm" TIMESTAMP(3),

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);
