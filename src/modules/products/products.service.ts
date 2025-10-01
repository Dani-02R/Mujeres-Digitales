import { Injectable, NotFoundException } from '@nestjs/common';
import { IProducts } from 'src/interfaces';
import { Not } from 'typeorm';

@Injectable()
export class ProductsService {
    private products: IProducts[] = [
        {id : 1, name: 'Televisor', description: 'Televisor de 25 pulgadas marca LG', price: 1000000},
        {id : 2, name: 'Celular', description: 'Celular marca Samsung', price: 800000},
        {id : 3, name: 'Tablet', description: 'Tablet marca Apple', price: 1200000},
        {id : 4, name: 'Audifonos', description: 'Audifonos marca Sony', price: 200000},
        {id : 5, name: 'Smartwatch', description: 'Smartwatch marca Huawei', price: 300000},
    ]

    findAll(): IProducts[] {
        return this.products;
    }
    findOne(id: number): IProducts {
        const productFind = this.products.find(product => product.id === id);
        if(!productFind) {
            throw new NotFoundException(`Producto con id ${id} no encontrado`);
        }
        return productFind;
    }

    create(product: Omit<IProducts, 'id'>): IProducts {
        const newId = this.products.length > 0
        ? this.products[this.products.length - 1].id + 1
        : 1;
        const newProduct: IProducts = { id: newId, ...product };
        this.products.push(newProduct);
        return newProduct;
    }

    update(id: number, newProduct: Omit<IProducts, 'id'>): IProducts {
         const product = this.findOne(id);
         Object.assign(product, newProduct);
            return product;
    }

    remove(id: number): void {
        const product = this.products.findIndex((product) => product.id === id);
        this.products.splice(product, 1);
    }
}

