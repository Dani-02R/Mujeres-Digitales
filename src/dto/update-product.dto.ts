import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends CreateProductDto {}
