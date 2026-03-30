import { ProductCollection, ProductSize, ProductStatus, ProductWeight, ProductVolume } from "../enums/product.enum";

export interface Product {
    _id: string;
    productStatus: ProductStatus;       // kichik harf — to'g'rilandi
    productCollection: ProductCollection;
    productName: string;
    productPrice: number;
    productLeftCount: number;
    productSize?: ProductSize;
    productWeight?: string;             // ← QO'SHILDI
    productVolume?: string;             // kichik harf — to'g'rilandi
    productCount?: string;              // ← QO'SHILDI
    productDesc?: string;
    productImages: string[];
    productViews: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductInquiry {
    order: string;
    page: number;
    limit: number;
    productCollection?: ProductCollection;
    search?: string;
}