import { Outlet } from 'react-router-dom';
import { useScrollProgress } from '../hooks/useScrollProgress';
import Footer from './Footer';
import Navbar from './Navbar';
import SiteBackground from './SiteBackground';

export default function Layout() {
  useScrollProgress();

  return (
    <>
      <div
        id="scroll-progress"
        aria-hidden="true"
        className="fixed left-0 top-0 z-[6000] h-[3px] w-0 rounded-r bg-gradient-to-r from-gold via-terracotta to-wine"
      />
      <SiteBackground />
      <Navbar />
      <main className="relative z-[2]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
