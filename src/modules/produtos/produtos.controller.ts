import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common'
import { ProdutosService } from './produtos.service'
import { CreateProdutoDto } from './dto/create-produto.dto'
import { UpdateProdutoDto } from './dto/update-produto.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('produtos')
export class ProdutosController {
    constructor(private readonly produtosService: ProdutosService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    criar(@Body() dto: CreateProdutoDto) {
        return this.produtosService.criar(dto)
    }

    @Get()
    listarTodos() {
        return this.produtosService.listarTodos()
    }

    @Get('dashboard/resumo')
    @UseGuards(JwtAuthGuard)
    dashboard() {
        return this.produtosService.dashboard()
    }

    @Get(':id')
    buscarPorId(@Param('id', ParseIntPipe) id: number) {
        return this.produtosService.buscarPorId(id)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    atualizar(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateProdutoDto,
    ) {
        return this.produtosService.atualizar(id, dto)
    }

    @Patch(':id/vender')
    @UseGuards(JwtAuthGuard)
    marcarComoVendido(@Param('id', ParseIntPipe) id: number) {
        return this.produtosService.marcarComoVendido(id)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deletar(@Param('id', ParseIntPipe) id: number) {
        return this.produtosService.deletar(id)
    }
}