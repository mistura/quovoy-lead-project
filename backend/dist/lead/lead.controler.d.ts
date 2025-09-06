import { Lead } from '@prisma/client';
import { CreateLeadDto } from './dto/create-lead.dto';
import { LeadsService } from './lead.services';
export declare class LeadsController {
    private readonly leadsService;
    constructor(leadsService: LeadsService);
    create(createLeadDto: CreateLeadDto): Promise<Lead>;
    findAll(): Promise<Lead[]>;
    findOne(id: string): Promise<Lead | null>;
    update(id: string, body: Partial<Lead>): Promise<Lead>;
    remove(id: string): Promise<Lead>;
}
