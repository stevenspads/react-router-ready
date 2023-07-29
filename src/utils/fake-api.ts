import { EditProductDto, Product, ProductDto } from '../types';

// fake a network request
async function fakeNetworkRequest() {
  return new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 700);
  });
}

export async function getProducts(searchTerm?: string): Promise<Product[]> {
  await fakeNetworkRequest();

  const products = localStorage.getItem('products');

  if (!products) {
    return [];
  }

  let productsList: Product[] = JSON.parse(products);

  if (searchTerm) {
    productsList = productsList.filter((product) => product.title.includes(searchTerm));
  }

  return productsList.sort((a: Product, b: Product) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
}

export async function addProduct(data: ProductDto): Promise<Product> {
  await fakeNetworkRequest();

  const id = Math.random().toString(36).substring(2, 9);
  const product = { id, createdAt: Date.now(), ...data };

  const products = await getProducts();
  products.unshift(product);
  localStorage.setItem('products', JSON.stringify(products));

  return product;
}

export async function getProduct(id: string): Promise<Product | null> {
  await fakeNetworkRequest();

  const products = localStorage.getItem('products');

  if (!products) {
    return null;
  }

  const product = JSON.parse(products).find((product: Product) => product.id === id);

  return product ?? null;
}

export async function editProduct(id: string, data: EditProductDto): Promise<Product> {
  await fakeNetworkRequest();
  const products = localStorage.getItem('products');

  if (!products) {
    throw new Error('No products found.');
  }

  const productsList: Product[] = JSON.parse(products);
  const product: Product | undefined = productsList.find((product: Product) => product.id === id);

  if (!product) {
    throw new Error('Product not found.');
  }

  const updatedProduct: Product = { ...product, ...data };
  const existingProducts: Product[] = productsList.filter((product: Product) => product.id !== id);

  localStorage.setItem('products', JSON.stringify([...existingProducts, updatedProduct]));

  return updatedProduct;
}

export async function deleteProduct(id: string): Promise<Product> {
  const products = localStorage.getItem('products');

  if (!products) {
    throw new Error('No products found.');
  }

  const productsList: Product[] = JSON.parse(products);
  const index = productsList.findIndex((product: Product) => product.id.toLowerCase() === id.toLowerCase());

  if (index === -1) {
    throw new Error('Product not found.');
  }

  const deletedProduct = productsList.splice(index, 1);
  localStorage.setItem('products', JSON.stringify(productsList));
  return deletedProduct[0];
}
