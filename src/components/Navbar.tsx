import { Link, useLocation } from "react-router-dom";
import { User, Menu, X, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "@/hooks/useWishlist";
import { CartSheet } from "@/components/CartSheet";
import { CompareSheet } from "@/components/CompareProducts";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CurrencySelector } from "@/components/MultiCurrency";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const wishlist = useWishlist();

  // Dynamic theme
  const navbarTheme = useMemo(() => {
    const path = location.pathname;
    if (path.includes("/gold")) return "luxury-gradient text-white";
    if (path.includes("/silver")) return "silver-gradient text-foreground";
    if (path.includes("/diamond")) return "diamond-gradient text-accent-foreground";
    if (path.includes("/gems")) return "gems-gradient text-white";
    return "luxury-brown-gradient";
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Visual Search", path: "/visual-search" },
    { name: "Rewards", path: "/loyalty" },
    { name: "Gold", path: "/gold" },
    { name: "Silver", path: "/silver" },
    { name: "Diamond", path: "/diamond" },
    { name: "Gems", path: "/gems" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 shadow-lg transition-all duration-500 ${navbarTheme} border-b border-[#d7b56d]/40`}
    >
      <div className="container mx-auto px-3 sm:px-4 py-3 lg:py-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 lg:space-x-3 group flex-shrink-0">
            <div className="w-10 h-10 lg:w-12 lg:h-12 luxury-gradient rounded-full flex items-center justify-center group-hover:glow-gold transition-all duration-300 shadow-lg">
              <span className="text-black font-serif font-bold text-lg lg:text-xl">BJ</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg lg:text-xl font-serif font-bold block leading-tight">Bhulaxmi</span>
              <span className="text-[10px] lg:text-xs tracking-wider uppercase opacity-80">Jewellers</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-all duration-300 relative group px-2 py-1 text-sm xl:text-base whitespace-nowrap ${
                  location.pathname === link.path ? "opacity-100 font-semibold" : "opacity-75 hover:opacity-100"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 luxury-gradient transition-transform duration-300 origin-left ${
                    location.pathname === link.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5 lg:gap-3 flex-shrink-0 m-auto">
            {/* Desktop: Currency & Theme */}
            <div className="hidden sm:flex items-center gap-1.5 lg:gap-3">
              <CurrencySelector />
              <ThemeToggle />
            </div>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:scale-110 transition-transform h-9 w-9 lg:h-10 lg:w-10"
              asChild
            >
              <Link to="/wishlist">
                <Heart className="h-4 w-4 lg:h-5 lg:w-5" />
                {wishlist.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] lg:text-xs rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center font-bold animate-pulse">
                    {wishlist.items.length}
                  </span>
                )}
              </Link>
            </Button>

            {/* Compare (Desktop) */}
            <div className="hidden sm:block relative font-black">
              <CompareSheet />
            </div>

            {/* Cart */}
            <div className="relative flex items-center">
              <CartSheet>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:scale-110 transition-transform h-9 w-9 lg:h-10 lg:w-10"
                >
                  <ShoppingCart className="h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
              </CartSheet>
            </div>

            {/* User */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex relative hover:scale-110 transition-transform h-9 w-9 lg:h-10 lg:w-10"
            >
              <User className="h-4 w-4 lg:h-5 lg:w-5" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9 flex items-center justify-center relative z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 pb-4 border-t border-border/30 pt-4"
            >
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-3 px-4 font-medium transition-colors rounded-lg ${
                      location.pathname === link.path
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-white hover:bg-muted hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-around sm:hidden">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm">Account</span>
                </Button>
                <ThemeToggle />
                <CurrencySelector />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
