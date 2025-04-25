import { Module } from '@nestjs/common';
import { WavehouseService } from './wavehouse.service';
import { WavehouseController } from './wavehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Warehouse])],
  providers: [WavehouseService],
  controllers: [WavehouseController]
})
export class WavehouseModule {}
