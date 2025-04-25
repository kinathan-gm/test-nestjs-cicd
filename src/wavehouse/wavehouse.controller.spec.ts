import { Test, TestingModule } from '@nestjs/testing';
import { WavehouseController } from './wavehouse.controller';
import { WavehouseService } from './wavehouse.service';

describe('WavehouseController', () => {
  let controller: WavehouseController;
  let service: WavehouseService;

  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WavehouseController],
      providers: [
        {
          provide: WavehouseService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<WavehouseController>(WavehouseController);
    service = module.get<WavehouseService>(WavehouseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all warehouses', async () => {
      const result = [{ MSP: 1, ten_hang: 'Item A' }];
      mockService.findAll.mockResolvedValue(result);

      const response = await controller.getAll();
      expect(response).toEqual({
        status: 'success',
        message: 'Danh sách warehouse đã được lấy thành công',
        data: result,
      });
    });
  });

  describe('getOne', () => {
    it('should return a warehouse by id', async () => {
      const warehouse = { MSP: 1, ten_hang: 'Item A' };
      mockService.findOne.mockResolvedValue(warehouse);

      const response = await controller.getOne(1);
      expect(response).toEqual({
        status: 'success',
        message: `Warehouse với ID 1 đã được lấy thành công`,
        data: warehouse,
      });
    });

    it('should return error if warehouse not found', async () => {
      mockService.findOne.mockResolvedValue(null);

      const response = await controller.getOne(999);
      expect(response).toEqual({
        status: 'error',
        message: `Warehouse với ID 999 không tồn tại`,
        data: null,
      });
    });
  });

  describe('create', () => {
    it('should create a warehouse', async () => {
      const body = { MSP: 2, ten_hang: 'Item B' };
      mockService.create.mockResolvedValue(body);

      const response = await controller.create(body);
      expect(response).toEqual({
        status: 'success',
        message: 'Warehouse mới đã được tạo thành công',
      });
    });
  });

  describe('update', () => {
    it('should update a warehouse', async () => {
      mockService.update.mockResolvedValue({ affected: 1 });

      const response = await controller.update(1, { ten_hang: 'Updated' });
      expect(response).toEqual({
        status: 'success',
        message: `Warehouse với ID 1 đã được cập nhật thành công`,
      });
    });

    it('should return error if update failed', async () => {
      mockService.update.mockResolvedValue({ affected: 0 });

      const response = await controller.update(999, { ten_hang: 'Fail' });
      expect(response).toEqual({
        status: 'error',
        message: `Không thể cập nhật warehouse với ID 999`,
      });
    });
  });

  describe('delete', () => {
    it('should delete a warehouse', async () => {
      mockService.delete.mockResolvedValue({ affected: 1 });

      const response = await controller.delete(1);
      expect(response).toEqual({
        status: 'success',
        message: `Warehouse với ID 1 đã được xóa thành công`,
      });
    });

    it('should return error if delete failed', async () => {
      mockService.delete.mockResolvedValue({ affected: 0 });

      const response = await controller.delete(999);
      expect(response).toEqual({
        status: 'error',
        message: `Không thể xóa warehouse với ID 999`,
      });
    });
  });
});
