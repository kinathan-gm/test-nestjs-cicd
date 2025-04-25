import { Test, TestingModule } from '@nestjs/testing';
import { WavehouseController } from './wavehouse.controller';
import { WavehouseService } from './wavehouse.service';

describe('WavehouseController', () => {
  let controller: WavehouseController;
  let service: WavehouseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WavehouseController],
      providers: [
        {
          provide: WavehouseService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(['wavehouse1', 'wavehouse2']),
            findOne: jest.fn().mockResolvedValue({ id: 1, name: 'wavehouse1' }),
            create: jest.fn().mockResolvedValue({ id: 1, name: 'newWavehouse' }),
            update: jest.fn().mockResolvedValue({ id: 1, name: 'updatedWavehouse' }),
            delete: jest.fn().mockResolvedValue({ id: 1 }),
          },
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
    it('should return an array of wavehouses', async () => {
      const result = await controller.getAll();
      expect(result).toEqual(['wavehouse1', 'wavehouse2']);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('getOne', () => {
    it('should return a single wavehouse', async () => {
      const result = await controller.getOne(1);
      expect(result).toEqual({ id: 1, name: 'wavehouse1' });
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create and return a new wavehouse', async () => {
      const result = await controller.create({ name: 'newWavehouse' });
      expect(result).toEqual({ id: 1, name: 'newWavehouse' });
      expect(service.create).toHaveBeenCalledWith({ name: 'newWavehouse' });
    });
  });

  describe('update', () => {
    it('should update and return the updated wavehouse', async () => {
      const result = await controller.update(1, { name: 'updatedWavehouse' });
      expect(result).toEqual({ id: 1, name: 'updatedWavehouse' });
      expect(service.update).toHaveBeenCalledWith(1, { name: 'updatedWavehouse' });
    });
  });

  describe('delete', () => {
    it('should delete a wavehouse and return its id', async () => {
      const result = await controller.delete(1);
      expect(result).toEqual({ id: 1 });
      expect(service.delete).toHaveBeenCalledWith(1);
    });
  });
});
