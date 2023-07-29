import { Form } from 'react-router-dom';

export async function action({ request }: { request: Request }) {
  switch (request.method) {
    case 'GET': {
      console.log('GET');
      return null;
    }
    case 'POST': {
      console.log('POST');
      return null;
    }
    case 'PUT': {
      console.log('PUT');
      return null;
    }
    case 'PATCH': {
      console.log('PATCH');
      return null;
    }
    case 'DELETE': {
      console.log('DELETE');
      return null;
    }
    default: {
      throw new Error('Method not found.');
    }
  }
}

export default function FormsTest() {
  return (
    <>
      <Form method="post">
        <button type="submit">Post</button>
      </Form>
      <Form method="put">
        <button type="submit">Put</button>
      </Form>
      <Form method="patch">
        <button type="submit">Patch</button>
      </Form>
      <Form method="delete">
        <button type="submit">Delete</button>
      </Form>
      <Form method="get" action="/products">
        <input placeholder="Search products..." type="text" name="q" />
        <button type="submit">Search</button>
      </Form>
    </>
  );
}
