export type ProductImage = {
  id: number;
  url: string;
  fileName: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: ProductImage[];
  createdAt: string;
  updatedAt?: string;
};

