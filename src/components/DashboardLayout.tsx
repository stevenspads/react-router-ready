import { Outlet, Link, useNavigation } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import TopBarProgress from 'react-topbar-progress-indicator';

TopBarProgress.config({
  barColors: {
    '0': '#fff',
    '1.0': '#000',
  },
  shadowBlur: 0,
});

export default function DashboardLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <main className="relative flex min-h-screen flex-col">
      {isLoading && <TopBarProgress />}
      <Header />
      <section className="container mx-auto">
        <div className="my-12 grid gap-12 md:grid-cols-[200px_1fr]">
          <nav className="space-y-3 md:w-[200px]">
            <h2 className="text-lg font-semibold">Dashboard Menu</h2>
            <ul className="space-y-3">
              <li>
                <Link to="/dashboard/products" className="underline">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="underline">
                  Back to Dashboard
                </Link>
              </li>
            </ul>
          </nav>
          <div className={isLoading ? 'opacity-25' : ''}>
            <Outlet />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
