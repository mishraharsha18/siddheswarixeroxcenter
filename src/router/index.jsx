import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "../Layout";
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import NotFoundPage from "../pages/NotFoundPage";
import SignUpPage from "../pages/SignUp";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import ProductPage from "../pages/product/ProductPage";
import Brand from "../pages/Brand";
import PlaceOrder from "../pages/PlaceOrder";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* Public Route */}
                <Route path="/login" element={<LoginPage />} />
                {/* <Route path="/sign-up" element={<SignUpPage />} /> */}

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<AppLayout />}>
                        <Route path="home" element={<Home />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="products" element={<ProductPage />} />
                        <Route path="brands" element={<Brand />} />
                        <Route path="place-order" element={<PlaceOrder />} />
                        {/* Fallback Route */}
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
