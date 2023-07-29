export type Product = {
  id: string;
  title: string;
  description?: string;
  price: number;
  brand: string;
  category: string;
  imageUrl: string;
  isInWishlist?: boolean;
  createdAt: number;
};

export type ProductDto = Omit<Product, 'id' | 'createdAt'>;

export type EditProductDto = Partial<ProductDto>;
