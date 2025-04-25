import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WavehouseModule } from './wavehouse/wavehouse.module';

@Module({
  imports: [
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: '', 
    database: 'bkgrocery-test', 
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, // Tự động tạo bảng từ entity (không nên dùng ở môi trường production)
  }),
  WavehouseModule,],

})
export class AppModule {}
