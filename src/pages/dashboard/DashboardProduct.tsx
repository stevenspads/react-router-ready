import { Form, Navigate, ParamParseKey, Params, useLoaderData, useNavigation } from 'react-router-dom';
import { Product } from '../../types';
import { getProduct } from '../../utils/fake-api';

const path = 'dashboard/products/:productId';

export async function loader({
  params: { productId },
}: {
  params: Params<ParamParseKey<typeof path>>;
}): Promise<Product | null> {
  if (productId) {
    return getProduct(productId);
  }

  return null;
}

export default function DashboardProduct() {
  const product = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  if (!product) {
    return <Navigate to="/dashboard/products" replace={true} />;
  }

  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="font-bold text-3xl md:text-4xl">{product.title}</h1>
        <p className="text-lg">{product.description}</p>
      </header>
      <aside>
        <img src={product.imageUrl} />
      </aside>
      <section>
        <dl className="space-y-4">
          <div>
            <dt className="font-medium">Brand</dt>
            <dd>{product.brand}</dd>
          </div>
          <div>
            <dt className="font-medium">Category</dt>
            <dd>{product.category}</dd>
          </div>
          <div>
            <dt className="font-medium">Price</dt>
            <dd>{product.price}</dd>
          </div>
        </dl>
      </section>
      <section className="flex items-center space-x-2">
        <Form action="edit">
          <button
            type="submit"
            className="bg-black hover:bg-gray-800 px-4 py-2 rounded text-white"
            disabled={isSubmitting}
          >
            Edit
          </button>
        </Form>
        <Form
          method="post"
          action="destroy"
          onSubmit={(event) => {
            if (!confirm('Are you sure you want to delete this product?')) {
              event.preventDefault();
            }
          }}
        >
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
            disabled={isSubmitting}
          >
            Delete
          </button>
        </Form>
      </section>
    </div>
  );
}
