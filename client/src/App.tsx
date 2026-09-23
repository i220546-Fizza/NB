import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { SearchOverlay } from '@/components/layout/SearchOverlay';
import { CursorGlow } from '@/components/ui/CursorGlow';
import { Loader } from '@/components/ui/Loader';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';

import Home from '@/pages/Home';
import Collection from '@/pages/Collection';
import ProductDetail from '@/pages/ProductDetail';
import Checkout from '@/pages/Checkout';
import Login from '@/pages/Login';
import OurStoryPage from '@/pages/OurStoryPage';
import Contact from '@/pages/Contact';
import StaticPage from '@/pages/StaticPage';
import NotFound from '@/pages/NotFound';

import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminOrders from '@/pages/admin/AdminOrders';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {loading && <Loader onFinish={() => setLoading(false)} />}
      {!isAdminRoute && <CursorGlow />}
      {!isAdminRoute && <Navbar onOpenSearch={() => setSearchOpen(true)} />}
      {!isAdminRoute && <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />}
      {!isAdminRoute && <CartDrawer />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/our-story" element={<OurStoryPage />} />
          <Route path="/signature" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/privacy"
            element={
              <StaticPage title="PRIVACY POLICY">
                <p>
                  NB Classic Scents respects your privacy. We collect only the
                  information necessary to process your orders and never sell
                  your data to third parties.
                </p>
              </StaticPage>
            }
          />
          <Route
            path="/terms"
            element={
              <StaticPage title="TERMS OF SERVICE">
                <p>
                  By using this site you agree to purchase products for
                  personal use and to provide accurate shipping information
                  for delivery.
                </p>
              </StaticPage>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      {!isAdminRoute && <Footer />}
    </>
  );
}
