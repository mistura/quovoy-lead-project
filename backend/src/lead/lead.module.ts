import { Module } from '@nestjs/common';
import { LeadsController } from './lead.controler';
import { LeadsService } from './lead.services';

@Module({
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule {}
