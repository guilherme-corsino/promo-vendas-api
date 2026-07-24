import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateProdutoDto } from './dto/create-produto.dto'
import { UpdateProdutoDto } from './dto/update-produto.dto'

@Injectable()
export class ProdutosService {
    constructor(private prisma: PrismaService) { }

    async criar(usuarioId: number, dto: CreateProdutoDto) {
        return this.prisma.produto.create({
            data: { ...dto, usuarioId }
        })
    }

    async listarTodos(usuarioId: number) {
        return this.prisma.produto.findMany({
            where: { usuarioId },
            orderBy: { createdAt: 'desc' }
        })
    }

    async buscarPorId(usuarioId: number, id: number) {
        const produto = await this.prisma.produto.findFirst({
            where: { id, usuarioId }
        })

        if (!produto) {
            throw new NotFoundException('Produto não encontrado')
        }

        return produto
    }

    async atualizar(usuarioId: number, id: number, dto: UpdateProdutoDto) {
        await this.buscarPorId(usuarioId, id)

        return this.prisma.produto.update({
            where: { id },
            data: dto
        })
    }

    async deletar(usuarioId: number, id: number) {
        await this.buscarPorId(usuarioId, id)

        return this.prisma.produto.delete({ where: { id } })
    }

    async marcarComoVendido(usuarioId: number, id: number) {
        await this.buscarPorId(usuarioId, id)

        return this.prisma.produto.update({
            where: { id },
            data: { status: 'VENDIDO', vendidoEm: new Date() }
        })
    }

    async dashboard(usuarioId: number) {
        const emEstoque = await this.prisma.produto.aggregate({
            where: { usuarioId, status: 'EM_ESTOQUE' },
            _count: { id: true },
            _sum: { precoCompra: true },
        })

        const vendidos = await this.prisma.produto.aggregate({
            where: { usuarioId, status: 'VENDIDO' },
            _count: { id: true },
            _sum: { precoCompra: true, precoVenda: true },
        })

        const totalInvestidoEstoque = Number(emEstoque._sum.precoCompra ?? 0)
        const totalInvestidoVendidos = Number(vendidos._sum.precoCompra ?? 0)
        const totalVendido = Number(vendidos._sum.precoVenda ?? 0)
        const lucroTotal = totalVendido - totalInvestidoVendidos

        return {
            resumo: {
                totalProdutos: emEstoque._count.id + vendidos._count.id,
                produtosEmEstoque: emEstoque._count.id,
                produtosVendidos: vendidos._count.id,
            },
            financeiro: {
                totalInvestidoEstoque: totalInvestidoEstoque.toFixed(2),
                totalInvestidoVendidos: totalInvestidoVendidos.toFixed(2),
                totalVendido: totalVendido.toFixed(2),
                lucroTotal: lucroTotal.toFixed(2),
            }
        }
    }
}