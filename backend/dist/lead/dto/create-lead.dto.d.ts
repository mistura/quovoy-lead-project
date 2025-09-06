import { Status } from '@prisma/client';
export declare class CreateLeadDto {
    name: string;
    email: string;
    status?: Status;
}
