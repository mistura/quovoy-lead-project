import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Lead } from '@prisma/client';
import { CreateLeadDto } from './dto/create-lead.dto';
import { LeadsService } from './lead.services';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  create(@Body() createLeadDto: CreateLeadDto): Promise<Lead> {
    return this.leadsService.create(createLeadDto);
  }

  @Get()
  findAll(): Promise<Lead[]> {
    return this.leadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Lead | null> {
    return this.leadsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<Lead>): Promise<Lead> {
    return this.leadsService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Lead> {
    return this.leadsService.remove(+id);
  }
}
