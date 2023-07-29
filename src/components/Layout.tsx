import { Outlet, useNavigation } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import TopBarProgress from 'react-topbar-progress-indicator';

TopBarProgress.config({
  barColors: {
    0: '#fff',
    '1.0': '#000',
  },
  shadowBlur: 0,
});

export default function Layout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <main className="flex flex-col min-h-screen">
      {isLoading && <TopBarProgress />}
      <Header />
      <div className={`container mx-auto py-24 ${isLoading ? 'opacity-25' : ''}`}>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
