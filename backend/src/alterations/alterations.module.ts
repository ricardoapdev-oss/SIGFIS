import { Module } from '@nestjs/common';
import { AlterationsService } from './alterations.service';
import { AlterationsController } from './alterations.controller';

@Module({
  controllers: [AlterationsController],
  providers: [AlterationsService],
  exports: [AlterationsService],
})
export class AlterationsModule {}
