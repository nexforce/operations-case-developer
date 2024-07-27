import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
  } from "class-validator";
  
  export class ProductDTO {
   
    @IsString()
    @IsOptional()
    id!: string;
   
    @IsString()
    @IsNotEmpty()
    name!: string;
  
    @IsString()
    @IsOptional()
    description!: string;
  
    @IsNumber()
    @IsNotEmpty()
    price!: number;
  
    @IsString()
    @IsNotEmpty()
    category!: string;
  
    @IsNumber()
    @IsNotEmpty()
    stock!: number;
  }
  
  export class UpdateProductDTO {
    @IsString()
    @IsOptional()
    name!: string;
  
    @IsString()
    @IsOptional()
    description!: string;
  
    @IsNumber()
    @IsOptional()
    price!: number;
  
    @IsString()
    @IsOptional()
    category!: string;
  
    @IsNumber()
    @IsOptional()
    stock!: number;
  }
  