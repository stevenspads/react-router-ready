import { Navigate, ParamParseKey, Params, useFetcher, useLoaderData } from 'react-router-dom';
import { loader } from './dashboard/DashboardProduct';
import { editProduct } from '../utils/fake-api';

const path = 'products/:productId';

export async function action({
  request,
  params: { productId },
}: {
  request: Request;
  params: Params<ParamParseKey<typeof path>>;
}) {
  if (!productId) {
    throw new Error('Product not found.');
  }

  try {
    const formData = await request.formData();

    const isInWishlist = formData.get('wishlist') === 'true';

    return editProduct(productId, { isInWishlist });
  } catch (e) {
    const error = 'An error occured. Please try again later.';
    return { error };
  }
}

export default function SingleProduct() {
  const product = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'loading';

  if (!product) {
    return <Navigate to="/products" replace={true} />;
  }

  let isInWishlist = product.isInWishlist;
  if (fetcher.formData && !fetcher.data?.error) {
    isInWishlist = fetcher.formData.get('wishlist') === 'true';
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
      <section className="space-y-6">
        {fetcher.data?.error && <div className="bg-red-50 p-3 rounded text-red-800">{fetcher.data?.error}</div>}
        <fetcher.Form method="post">
          <button
            name="wishlist"
            type="submit"
            value={isInWishlist ? 'false' : 'true'}
            className="bg-black hover:bg-gray-800 px-4 py-2 rounded text-white"
            disabled={isSubmitting}
          >
            {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
        </fetcher.Form>
      </section>
    </div>
  );
}
