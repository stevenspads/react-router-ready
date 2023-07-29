/* file no longer used after we set up our routes in main.tsx */
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import ErrorPage from './pages/Error';
import Products, { loader as productsLoader } from './pages/Products';
import SingleProduct, { action as productAction } from './pages/SingleProduct';
import DashboardLayout from './components/DashboardLayout';
import DashboardIndex from './pages/dashboard/DashboardIndex';
import DashboardProducts, { loader as dashboardProductsLoader } from './pages/dashboard/DashboardProducts';
import DashboardNewProduct, { action as dashboardNewProductAction } from './pages/dashboard/DashboardNewProduct';
import DashboardProduct, { loader as dashboardProductLoader } from './pages/dashboard/DashboardProduct';
import DashboardEditProduct, { action as dashboardEditProductAction } from './pages/dashboard/DashboardEditProduct';
import { action as destroyAction } from './pages/dashboard/DashboardDestroyProduct';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: 'about',
            element: <About />,
          },
          {
            path: 'products',
            element: <Products />,
            loader: productsLoader,
          },
          {
            path: 'products/:productId',
            element: <SingleProduct />,
            loader: dashboardProductLoader,
            action: productAction,
          },
          {
            path: '*',
            element: <NotFound />,
          },
        ],
      },
    ],
  },
  {
    path: 'dashboard',
    element: <DashboardLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <DashboardIndex />,
          },
          {
            path: 'products',
            element: <DashboardProducts />,
            loader: dashboardProductsLoader,
          },
          {
            path: 'products/:productId',
            element: <DashboardProduct />,
            loader: dashboardProductLoader,
          },
          {
            path: 'products/new',
            element: <DashboardNewProduct />,
            action: dashboardNewProductAction,
          },
          {
            path: 'products/:productId/edit',
            element: <DashboardEditProduct />,
            loader: dashboardProductLoader,
            action: dashboardEditProductAction,
          },
          {
            path: 'products/:productId/destroy',
            action: destroyAction,
          },
        ],
      },
    ],
  },
]);

export { router };
