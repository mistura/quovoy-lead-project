import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { Lead } from '@prisma/client';
export declare class LeadsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateLeadDto): Promise<Lead>;
    findAll(): Promise<Lead[]>;
    findOne(id: number): Promise<Lead | null>;
    update(id: number, data: Partial<Lead>): Promise<Lead>;
    remove(id: number): Promise<Lead>;
}
