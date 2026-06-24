import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ContractorsModule } from './contractors/contractors.module';
import { ProcessesModule } from './processes/processes.module';
import { ContractsModule } from './contracts/contracts.module';
import { OccurrencesModule } from './occurrences/occurrences.module';
import { MeasurementsModule } from './measurements/measurements.module';
import { AlterationsModule } from './alterations/alterations.module';
import { CommunicationsModule } from './communications/communications.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ContractorsModule,
    ProcessesModule,
    ContractsModule,
    OccurrencesModule,
    MeasurementsModule,
    AlterationsModule,
    CommunicationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
