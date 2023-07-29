import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  let errorMessage;

  if (isRouteErrorResponse(error)) {
    errorMessage = (
      <p>
        {error.status} {error.statusText}
      </p>
    );
  } else if (error instanceof Error) {
    errorMessage = error.message || 'Unknown Error';
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-bold text-3xl md:text-4xl">Oops!</h1>
        <p className="text-lg">An error occurred.</p>
      </header>
      <section className="space-y-6">
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{errorMessage}</i>
        </p>
      </section>
    </div>
  );
}
