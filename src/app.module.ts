import { Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { PersistenceModule } from './persistence/persistence.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [
    DomainModule, 
    PersistenceModule, 
    ApplicationModule
  ],
})
export class AppModule {}
