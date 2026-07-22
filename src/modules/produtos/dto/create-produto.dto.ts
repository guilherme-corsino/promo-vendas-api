import { IsString, IsNumber, IsOptional, Min } from 'class-validator'

export class CreateProdutoDto {
    @IsString()
    nome!: string

    @IsString()
    @IsOptional()
    descricao?: string

    @IsString()
    categoria!: string

    @IsString()
    @IsOptional()
    fotoUrl?: string

    @IsNumber()
    @Min(0)
    precoCompra!: number

    @IsNumber()
    @Min(0)
    precoVenda!: number
}