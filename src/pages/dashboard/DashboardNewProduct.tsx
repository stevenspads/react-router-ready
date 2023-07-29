import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { addProduct } from '../../utils/fake-api';
import { isValidPrice, isValidUrl } from '../../utils';

export async function action({ request }: { request: Request }) {
  const errors: { [key: string]: string } = {};

  try {
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const brand = formData.get('brand') as string;
    const category = formData.get('category') as string;
    const imageUrl = formData.get('imageUrl') as string;

    if (typeof title !== 'string' || title.length < 2) {
      errors.title = 'Product name must be more than one character.';
    } else if (!isValidPrice(price)) {
      errors.price = 'Enter a valid price.';
    } else if (!isValidUrl(imageUrl)) {
      errors.imageUrl = 'Image URL must be a valid URL.';
    }

    if (Object.keys(errors).length) {
      return { errors };
    }

    await addProduct({
      title,
      description,
      price: parseFloat(price),
      brand,
      category,
      imageUrl,
    });

    return redirect(`/dashboard/products`);
  } catch (e) {
    errors.form = 'Product creation failed. Please try again later.';
    return { errors };
  }
}

export default function DashboardNewProduct() {
  const actionData = useActionData() as { errors: { [key: string]: string } };
  const { errors } = actionData ?? {};
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="space-y-12">
      <header>
        <h1 className="font-bold text-3xl md:text-4xl">New Product</h1>
        <p className="text-lg">Create a new product.</p>
      </header>

      {errors?.form && <div className="bg-red-50 p-3 rounded text-red-800">{errors?.form}</div>}

      <Form method="post" className="space-y-6">
        <label className="flex flex-col space-y-1">
          <span className="font-medium">Product title</span>
          <input type="text" name="title" required className="border p-2 rounded" />
          {errors?.title && <p className="text-red-800 text-sm">{errors.title}</p>}
        </label>
        <label className="flex flex-col space-y-1">
          <span className="font-medium">Product description</span>
          <textarea name="description" className="border p-2 rounded" />
        </label>
        <label className="flex flex-col space-y-1">
          <span className="font-medium">Price</span>
          <input type="text" name="price" required className="border p-2 rounded" />
          {errors?.price && <p className="text-red-800 text-sm">{errors.price}</p>}
        </label>
        <label className="flex flex-col space-y-1">
          <span className="font-medium">Brand</span>
          <input type="text" name="brand" required className="border p-2 rounded" />
          {errors?.brand && <p className="text-red-800 text-sm">{errors.brand}</p>}
        </label>
        <label className="flex flex-col space-y-1">
          <span className="font-medium">Category</span>
          <input type="text" name="category" required className="border p-2 rounded" />
          {errors?.category && <p className="text-red-800 text-sm">{errors.category}</p>}
        </label>
        <label className="flex flex-col space-y-1">
          <span className="font-medium">Image URL</span>
          <input type="text" name="imageUrl" required className="border p-2 rounded" />
          {errors?.imageUrl && <p className="text-red-800 text-sm">{errors.imageUrl}</p>}
        </label>
        <div>
          <button
            type="submit"
            className="bg-black hover:bg-gray-800 px-4 py-2 rounded text-white"
            disabled={isSubmitting}
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}
