import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateProdutoDto } from './dto/create-produto.dto'
import { UpdateProdutoDto } from './dto/update-produto.dto'

@Injectable()
export class ProdutosService {
    constructor(private prisma: PrismaService) { }

    async criar(dto: CreateProdutoDto) {
        return this.prisma.produto.create({ data: dto })
    }

    async listarTodos() {
        return this.prisma.produto.findMany({
            orderBy: { createdAt: 'desc' }
        })
    }

    async buscarPorId(id: number) {
        const produto = await this.prisma.produto.findUnique({ where: { id } })

        if (!produto) {
            throw new NotFoundException('Produto não encontrado')
        }

        return produto
    }

    async atualizar(id: number, dto: UpdateProdutoDto) {
        await this.buscarPorId(id) // valida que existe

        return this.prisma.produto.update({
            where: { id },
            data: dto
        })
    }

    async deletar(id: number) {
        await this.buscarPorId(id) // valida que existe

        return this.prisma.produto.delete({ where: { id } })
    }

    async marcarComoVendido(id: number) {
        await this.buscarPorId(id)

        return this.prisma.produto.update({
            where: { id },
            data: {
                status: 'VENDIDO',
                vendidoEm: new Date()
            }
        })
    }
}