import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('graphql')
export class GraphqlController {
  constructor(private prisma: PrismaService) {}
}
