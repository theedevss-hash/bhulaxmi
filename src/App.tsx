import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AIShoppingAssistant } from "@/components/AIShoppingAssistant";
import { SupportChatbot } from "@/components/SupportChatbot";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Gold from "./pages/Gold";
import Silver from "./pages/Silver";
import Diamond from "./pages/Diamond";
import Gems from "./pages/Gems";
import Wishlist from "./pages/Wishlist";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import ShippingReturns from "./pages/ShippingReturns";
import SizeGuide from "./pages/SizeGuide";
import CareInstructions from "./pages/CareInstructions";
import RefundPolicy from "./pages/RefundPolicy";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Loyalty from "./pages/Loyalty";
import VisualSearchPage from "./pages/VisualSearchPage";
import Account from "./pages/Account";
import { CurrencyProvider } from "./components/MultiCurrency";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { TermsOfService } from "./components/TermsOfService";
import Subscribers from "./admin/Subscribers";
import RecentOrders from "./admin/RecentOrders";
import Customers from "./pages/CustomerDashboard";

// ✅ Admin imports
import AdminSidebar from "./admin/AdminSidebar";
import AdminDashboard from "./pages/AdminDashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
// import Customers from "./pages/Customers";
import AdminLogin from "./pages/AdminLogin";
import ProductManager from "./admin/ProductManager";
import DeliveryTracking from "./pages/DeliveryTracking";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerRegister from "./pages/CustomerRegister";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerNotify from "./admin/CustomerNotify";

const queryClient = new QueryClient();

const App: React.FC = () => {
 const [isAdmin, setIsAdmin] = React.useState(localStorage.getItem("admin") === "true");

React.useEffect(() => {
  const stored = localStorage.getItem("admin") === "true";
  setIsAdmin(stored);
}, []);


const handleLogout = () => {
  localStorage.removeItem("admin");
  window.location.href = "/";
};


  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CurrencyProvider>
          <Toaster />
          <Sonner />

          <Routes>
            {/* 🛍️ SHOP ROUTES */}
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/gold" element={<Gold />} />
              <Route path="/silver" element={<Silver />} />
              <Route path="/diamond" element={<Diamond />} />
              <Route path="/gems" element={<Gems />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/account" element={<Account />} />
              <Route path="/loyalty" element={<Loyalty />} />
              <Route path="/visual-search" element={<VisualSearchPage />} />
              <Route path="/shipping-returns" element={<ShippingReturns />} />
              <Route path="/size-guide" element={<SizeGuide />} />
              <Route path="/care-instructions" element={<CareInstructions />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/customer/login" element={<CustomerLogin />} />
<Route path="/customer/register" element={<CustomerRegister />} />
<Route path="/customer/dashboard" element={<CustomerDashboard />} />  

            </Route>

<Route
  path="/admin/delivery"
  element={
    <div className="flex">
      <AdminSidebar onLogout={handleLogout} />
      <div className="flex-1 bg-gray-50 min-h-screen p-6">
        <DeliveryTracking/>
      </div>
    </div>
  }
/>



            {/* 💎 ADMIN LOGIN */}
            <Route
              path="/admin/login"
              element={isAdmin ? <Navigate to="/admin" /> : <AdminLogin />}
            />

            {/* 💼 ADMIN DASHBOARD ROUTES */}
            {isAdmin ? (
              <>
                <Route
                  path="/admin"
                  element={
                    <div className="flex">
                      <AdminSidebar onLogout={handleLogout} />
                      <div className="flex-1 bg-gray-50 min-h-screen p-6">
                        <AdminDashboard />
                      </div>
                    </div>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <div className="flex">
                      <AdminSidebar onLogout={handleLogout} />
                      <div className="flex-1 bg-gray-50 min-h-screen p-6">
                        <Products />
                      </div>
                    </div>
                  }
                />


                
                <Route
                  path="/admin/orders"
                  element={
                    <div className="flex">
                      <AdminSidebar onLogout={handleLogout} />
                      <div className="flex-1 bg-gray-50 min-h-screen p-6">
                        <Orders />
                      </div>
                    </div>
                  }
                />
              <Route path="/admin/subscribers" element={<Subscribers />} />
<Route path="/admin/recent-orders" element={<RecentOrders />} />
<Route path="/admin/customers" element={<Customers />} />


{/* <Route
  path="/admin/customer-notify"
  element={
    <div className="flex">
      <AdminSidebar onLogout={handleLogout} />
      <div className="flex-1 bg-gray-50 min-h-screen p-6">
        <CustomerNotify />
      </div>
    </div>
  }
/> */}

              </>

            ) : (
              <Route path="/admin/*" element={<Navigate to="/admin/login" />} />
            )}

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* 🤖 Assistants */}
          <AIShoppingAssistant />
          <SupportChatbot />
        </CurrencyProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
