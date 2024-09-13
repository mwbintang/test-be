import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { createProductDto, createProductSchema, findAllSchema, findAllSchemaDto } from './dto/request.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Body() createProductDto: createProductDto) {
    const result = createProductSchema.safeParse(createProductDto);
    if (!result.success) {
      throw new BadRequestException("Invalid body");
    }

    const parsedBody: createProductDto = result.data;
    return this.productService.create(parsedBody);
  }

  @Get()
  findAll(
    @Query() query: findAllSchemaDto,
  ) {
    const result = findAllSchema.safeParse(query);
    if (!result.success) {
      throw new BadRequestException("Invalid query parameters");
    }

    const parsedQuery: findAllSchemaDto = result.data;
    return this.productService.findAll(parsedQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
