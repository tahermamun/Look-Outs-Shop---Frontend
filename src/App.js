import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import NotFound from './pages/NotFound';

import ProfileLayout from './components/Profile/ProfileLayout';
import store from './store/store';
import { loadUser } from './store/userSlice';
import ProtectedRoute from './utils/ProtectedRoute';
import Spinner from './components/Spinner';

const Home = lazy(() => import('./pages/Home'));
const CustomerOrderList = lazy(() => import('./pages/Profile/CustomerOrderList'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Customer = lazy(() => import('./pages/Dashboard/Customer'));
const OrderList = lazy(() => import('./pages/Dashboard/OrderList'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const VerifyEmail = lazy(() => import('./components/VerifyModalFrom/VerifyEmail'));
const VerifyPhone = lazy(() => import('./components/VerifyModalFrom/VerifyPhone'));
const ShippingInfo = lazy(() => import('./components/ShippingInfo/ShippingInfo'));

const ForgotPassword = lazy(() => import('./components/VerifyModalFrom/ForgotPassword'));
const ForgotPasswordSend = lazy(() => import('./components/VerifyModalFrom/ForgotPasswordSend'));

function App() {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Suspense fallback={<Spinner />}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />

                    {/* // auth */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify-phone" element={<VerifyPhone />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path="/forgot-password/:token" element={<ForgotPassword />} />
                    <Route path="/forgot" element={<ForgotPasswordSend />} />

                    {/* Product and order */}
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route
                        path="/shipping"
                        element={
                            <ProtectedRoute>
                                <ShippingInfo />
                            </ProtectedRoute>
                        }
                    />

                    {/* Profile */}
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <ProfileLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Profile />} />
                        <Route path="order" element={<CustomerOrderList />} />
                    </Route>

                    {/* Admin */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute isAdmin={true} roles={['admin']}>
                                <DashboardLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Dashboard />} />
                        <Route path="customer" element={<Customer />} />
                        <Route path="order" element={<OrderList />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <ToastContainer
                    pauseOnFocusLoss={false}
                    pauseOnHover={false}
                    autoClose={2000}
                    position="top-right"
                />
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
