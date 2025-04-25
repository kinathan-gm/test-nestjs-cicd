import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from './entities/warehouse.entity';

@Injectable()
export class WavehouseService {
    constructor(
        @InjectRepository(Warehouse)
        private repo: Repository<Warehouse>,
    ) {}

    findAll() {
        return this.repo.find();
    }

    findOne(id: number) {
        return this.repo.findOneBy({ MSP: id });
    }
    
    create(data: Partial<Warehouse>) {
        const wh = this.repo.create(data);
        return this.repo.save(wh);
    }
    
    update(id: number, data: Partial<Warehouse>) {
        return this.repo.update({ MSP: id }, data);
    }

    delete(id: number) {
        return this.repo.delete({ MSP: id });
    }
}
