import { Link, useLoaderData } from 'react-router-dom';
import { Product } from '../../types';
import { Card, CardContent, CardDescription, CardImage, CardTitle } from '../../components/Card';
import { getProducts } from '../../utils/fake-api';

export async function loader(): Promise<{ products: Product[] }> {
  const products = await getProducts();
  return { products };
}

export default function DashboardProducts() {
  const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <div className="space-y-12">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl md:text-4xl">Products</h1>
          <p className="text-lg">Listing of products.</p>
        </div>
        <Link to="/dashboard/products/new" className="bg-black hover:bg-gray-800 px-4 py-2 rounded text-white">
          Add New
        </Link>
      </header>
      <section>
        {products.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                <CardImage>
                  <Link to={`/dashboard/products/${product.id}`}>
                    <img src={product.imageUrl} className="object-cover aspect-square rounded-t-lg" />
                  </Link>
                </CardImage>
                <CardContent>
                  <CardTitle>
                    <Link to={`/dashboard/products/${product.id}`}>{product.title}</Link>
                  </CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="bg-gray-50 border text-gray-500 p-6 rounded-lg">No products found.</p>
        )}
      </section>
    </div>
  );
}
