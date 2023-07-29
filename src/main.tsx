import React, { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigate,
} from 'react-router-dom';
import { ClerkProvider, SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Home from './pages/Home';
import DashboardIndex from './pages/dashboard/DashboardIndex';
import ErrorPage from './pages/Error';
import About from './pages/About';
import FormsTest, { action as formsTestAction } from './pages/FormsTest';
import DashboardLayout from './components/DashboardLayout';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import useAdmin from './hooks/useAdmin';
import Products, { loader as productsLoader } from './pages/Products';
import DashboardProducts, { loader as dashboardProductsLoader } from './pages/dashboard/DashboardProducts';
import './index.css';
import DashboardNewProduct, { action as dashboardNewProductAction } from './pages/dashboard/DashboardNewProduct';
import DashboardProduct, { loader as dashboardProductLoader } from './pages/dashboard/DashboardProduct';
import DashboardEditProduct, { action as dashboardEditProductAction } from './pages/dashboard/DashboardEditProduct';
import { action as dashboardDestroyProductAction } from './pages/dashboard/DashboardDestroyProduct';
import SingleProduct, { action as singleProductAction } from './pages/SingleProduct';

const ClerkProviderLayout = () => {
  const navigate = useNavigate();

  if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key');
  }

  const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <Outlet />
    </ClerkProvider>
  );
};

function Authorization({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const isAdmin = useAdmin();

  useEffect(() => {
    if (!isAdmin) {
      navigate(`/404`);
    }
  }, [isAdmin, navigate]);

  return children;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<ClerkProviderLayout />}>
      <Route path="/" element={<Layout />}>
        <Route errorElement={<ErrorPage />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/forms-test" element={<FormsTest />} action={formsTestAction} />
          <Route path="/products" element={<Products />} loader={productsLoader} />
          <Route
            path="/products/:productId"
            element={<SingleProduct />}
            loader={dashboardProductLoader}
            action={singleProductAction}
          />
          <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
          <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
      <Route path="/dashboard">
        <Route
          element={
            <>
              <SignedIn>
                <Authorization>
                  <DashboardLayout />
                </Authorization>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        >
          <Route errorElement={<ErrorPage />}>
            <Route index element={<DashboardIndex />} />
            <Route path="products" loader={dashboardProductsLoader} element={<DashboardProducts />} />
            <Route path="products/:productId" loader={dashboardProductLoader} element={<DashboardProduct />} />
            <Route path="products/new" action={dashboardNewProductAction} element={<DashboardNewProduct />} />
            <Route
              path="products/:productId/edit"
              loader={dashboardProductLoader}
              action={dashboardEditProductAction}
              element={<DashboardEditProduct />}
            />
            <Route path="products/:productId/destroy" action={dashboardDestroyProductAction} />
          </Route>
        </Route>
      </Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
