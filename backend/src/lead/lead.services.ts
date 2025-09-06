import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { Lead } from '@prisma/client';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateLeadDto): Promise<Lead> {
  return this.prisma.lead.create({
    data: {
      name: data.name,
      email: data.email,
      status: data.status ?? 'NEW', 
    },
  });
}

  async findAll(): Promise<Lead[]> {
    return this.prisma.lead.findMany();
  }

  async findOne(id: number): Promise<Lead | null> {
    return this.prisma.lead.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Partial<Lead>): Promise<Lead> {
    return this.prisma.lead.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Lead> {
    return this.prisma.lead.delete({
      where: { id },
    });
  }
}
