import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Public pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Reservation from './pages/Reservation';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';

// Admin pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import MenuManagement from './pages/admin/MenuManagement';
import OrderManagement from './pages/admin/OrderManagement';
import ReservationManagement from './pages/admin/ReservationManagement';

// Components
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        style: { background: '#1a1a1a', color: '#f5f5f5', border: '1px solid rgba(255,255,255,0.05)' },
                        success: { iconTheme: { primary: '#d97706', secondary: '#fff' } },
                    }}
                />

                <Routes>
                    {/* Public routes */}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/reservations" element={<Reservation />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order-confirmation" element={<OrderConfirmation />} />
                    </Route>

                    {/* Admin routes */}
                    <Route path="/admin/login" element={<Login />} />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <AdminLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Dashboard />} />
                        <Route path="menu" element={<MenuManagement />} />
                        <Route path="orders" element={<OrderManagement />} />
                        <Route path="reservations" element={<ReservationManagement />} />
                    </Route>
                </Routes>
            </CartProvider>
        </AuthProvider>
    );
}
