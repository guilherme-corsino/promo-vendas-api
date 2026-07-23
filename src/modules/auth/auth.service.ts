import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { PrismaService } from '../../prisma/prisma.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(dto: RegisterDto) {
        const usuarioExiste = await this.prisma.usuario.findUnique({
            where: { email: dto.email }
        })

        if (usuarioExiste) {
            throw new ConflictException('Email já cadastrado')
        }

        const senhaHash = await bcrypt.hash(dto.senha, 10)

        const usuario = await this.prisma.usuario.create({
            data: {
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash,
            }
        })

        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
        }
    }

    async login(dto: LoginDto) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { email: dto.email }
        })

        if (!usuario) {
            throw new UnauthorizedException('Credenciais inválidas')
        }

        const senhaCorreta = await bcrypt.compare(dto.senha, usuario.senha)

        if (!senhaCorreta) {
            throw new UnauthorizedException('Credenciais inválidas')
        }

        const token = this.jwtService.sign({
            sub: usuario.id,
            email: usuario.email,
        })

        return {
            accessToken: token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
            }
        }
    }
}