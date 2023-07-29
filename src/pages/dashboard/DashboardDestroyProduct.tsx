import { ParamParseKey, Params, redirect } from 'react-router-dom';
import { deleteProduct } from '../../utils/fake-api';

const path = 'dashboard/products/:productId/delete';

export async function action({ params: { productId } }: { params: Params<ParamParseKey<typeof path>> }) {
  if (!productId) {
    throw new Error('Product not found.');
  }

  await deleteProduct(productId);

  return redirect(`/dashboard/products`);
}
