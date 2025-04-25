import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { WavehouseService } from './wavehouse.service';

@Controller('wavehouse')
export class WavehouseController {
    constructor(private readonly service: WavehouseService) {}

    @Get()
    async getAll() {
        const data = await this.service.findAll();
        return {
            status: 'success',
            message: 'Danh sách warehouse đã được lấy thành công',
            data: data,
        };
    } 

    @Get(':id')
    async getOne(@Param('id') id: number) {
        const warehouse = await this.service.findOne(id);
        if (!warehouse) {
          return {
            status: 'error',
            message: `Warehouse với ID ${id} không tồn tại`,
            data: null,
          };
        }
        return {
          status: 'success',
          message: `Warehouse với ID ${id} đã được lấy thành công`,
          data: warehouse,
        };
    }
  
    @Post()
    async create(@Body() body) {
        const newWarehouse = await this.service.create(body);
        return {
            status: 'success',
            message: 'Warehouse mới đã được tạo thành công',
        };
    }
  
    @Put(':id')
    async update(@Param('id') id: number, @Body() body) {
        const updatedWarehouse = await this.service.update(id, body);
        if (updatedWarehouse.affected === 0) {
          return {
            status: 'error',
            message: `Không thể cập nhật warehouse với ID ${id}`,
          };
        }
        return {
          status: 'success',
          message: `Warehouse với ID ${id} đã được cập nhật thành công`,
        };
      }
  
    @Delete(':id')
    async delete(@Param('id') id: number) {
        const result = await this.service.delete(id);
        if (result.affected === 0) {
          return {
            status: 'error',
            message: `Không thể xóa warehouse với ID ${id}`,
          };
        }
        return {
          status: 'success',
          message: `Warehouse với ID ${id} đã được xóa thành công`,
        };
    }
}
