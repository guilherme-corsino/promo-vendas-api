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
    Request,
} from '@nestjs/common'
import { ProdutosService } from './produtos.service'
import { CreateProdutoDto } from './dto/create-produto.dto'
import { UpdateProdutoDto } from './dto/update-produto.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('produtos')
@UseGuards(JwtAuthGuard)
export class ProdutosController {
    constructor(private readonly produtosService: ProdutosService) { }

    @Post()
    criar(@Request() req, @Body() dto: CreateProdutoDto) {
        return this.produtosService.criar(req.user.id, dto)
    }

    @Get()
    listarTodos(@Request() req) {
        return this.produtosService.listarTodos(req.user.id)
    }

    @Get('dashboard/resumo')
    dashboard(@Request() req) {
        return this.produtosService.dashboard(req.user.id)
    }

    @Get(':id')
    buscarPorId(@Request() req, @Param('id', ParseIntPipe) id: number) {
        return this.produtosService.buscarPorId(req.user.id, id)
    }

    @Patch(':id')
    atualizar(
        @Request() req,
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateProdutoDto,
    ) {
        return this.produtosService.atualizar(req.user.id, id, dto)
    }

    @Patch(':id/vender')
    marcarComoVendido(@Request() req, @Param('id', ParseIntPipe) id: number) {
        return this.produtosService.marcarComoVendido(req.user.id, id)
    }

    @Delete(':id')
    deletar(@Request() req, @Param('id', ParseIntPipe) id: number) {
        return this.produtosService.deletar(req.user.id, id)
    }
}