import { Module } from '@nestjs/common';
import { TransformationService } from './transformation.service';
import { TransformationController } from './transformation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transformation } from './entities/transformation.entity';

@Module({
  controllers: [TransformationController],
  providers: [TransformationService],
  imports: [TypeOrmModule.forFeature([Transformation])],
})
export class TransformationModule {}
