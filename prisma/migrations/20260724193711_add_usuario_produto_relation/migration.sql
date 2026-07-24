-- AlterTable: adiciona a coluna permitindo nulo temporariamente
ALTER TABLE "Produto" ADD COLUMN "usuarioId" INTEGER;

-- Associa os produtos existentes ao usuário 1 (você)
UPDATE "Produto" SET "usuarioId" = 1 WHERE "usuarioId" IS NULL;

-- Agora torna a coluna obrigatória
ALTER TABLE "Produto" ALTER COLUMN "usuarioId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;