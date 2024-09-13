import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { createProductDto, findAllSchemaDto } from './dto/request.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  async create(createProductDto: createProductDto) {
    return this.productRepository.save(createProductDto);
  }

  async findAll(parsedQuery: findAllSchemaDto) {
    const { page, limit, search } = parsedQuery
    const products = await this.productRepository.find({
      where: {
        name: ILike(`%${search}%`)
      },
      skip: (+page - 1) * +limit,
      take: +limit
    });

    const countProduct = await this.productRepository.count({
      where: {
        name: ILike(`%${search}%`)
      }
    });
    const totalPages = Math.ceil(countProduct / +limit)

    return {
      data: products,
      meta: {
        page: +page,
        limit: +limit,
        count: countProduct,
        totalPages: totalPages,
        prevPage: +page - 1 || null,
        nextPage: +page < totalPages ? +page + 1 : null
      }
    }
  }

  findOne(id: number) {
    return this.productRepository.findOne({
      where: { id }
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
