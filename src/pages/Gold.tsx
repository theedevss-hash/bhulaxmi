import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory, getRandomProduct } from "@/data/products";
import { useState } from "react";
import { Sparkles, TrendingUp, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterBar } from "@/components/FilterBar";
import { LiveMetalRates } from "@/components/LiveMetalRates";
import goldBg from "@/assets/gold-page.jpg"


const Gold = () => {
  const allProducts = getProductsByCategory('gold');
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [highlightedProduct, setHighlightedProduct] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const maxPrice = Math.max(...allProducts.map(p => p.price));

  const highlightRandom = () => {
    const randomProduct = getRandomProduct('gold');
    if (randomProduct) {
      setHighlightedProduct(randomProduct.id);
      setTimeout(() => setHighlightedProduct(null), 3000);
    }
  };

  // Filter and sort products
  const handleFilterAndSort = () => {
    let filtered = [...allProducts];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredProducts(filtered);
  };

  // Re-filter when dependencies change
  useState(() => {
    handleFilterAndSort();
  });

  // Update when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setTimeout(handleFilterAndSort, 300);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    handleFilterAndSort();
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
    handleFilterAndSort();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:from-gray-900 dark:via-yellow-900/10 dark:to-gray-900">
      {/* Hero Section with Golden Theme */}
<section
  className="relative min-h-[70vh] flex items-center justify-center bg-center bg-cover bg-no-repeat"
  style={{
    backgroundImage: `url(${goldBg})`, // your jewelry image here
  }}
>
  {/* Subtle dark-gold overlay for better text contrast */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

  <div className="relative z-10 container mx-auto px-4 text-center">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated glowing crown */}
      <motion.div
        className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-400/70 to-amber-500/70 flex items-center justify-center shadow-[0_0_40px_rgba(255,215,0,0.4)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Crown className="w-14 h-14 text-white drop-shadow-lg" />
      </motion.div>

      {/* Gradient luxury text */}
      <h1
        className="text-6xl md:text-8xl font-oswald font-bold mb-4 bg-gradient-to-br from-yellow-300 via-amber-200 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)]"
      >
        Gold Collection
      </h1>

      <p className="text-xl md:text-2xl font-light tracking-wide text-amber-100/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] max-w-2xl mx-auto mb-8">
        Radiance in Every Detail — Crafted to Shine with Timeless Elegance
      </p>

      <motion.div
        animate={{
          boxShadow: [
            "0 0 30px rgba(255, 215, 0, 0.3)",
            "0 0 60px rgba(255, 215, 0, 0.6)",
            "0 0 30px rgba(255, 215, 0, 0.3)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-40 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto rounded-full shadow-[0_0_20px_rgba(255,215,0,0.6)]"
      />
    </motion.div>
  </div>
</section>



      <div className="container mx-auto px-4">
        {/* Live Metal Rates */}
        <section className="py-12 -mt-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <LiveMetalRates />
          </motion.div>
        </section>

        {/* Products Section */}
        <section className="py-12">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-oswald font-bold mb-2">
                Explore Our Gold Jewelry
              </h2>
              <p className="text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                {filteredProducts.length} of {allProducts.length} pieces available
              </p>
            </div>
            
            <Button
              onClick={highlightRandom}
              variant="outline"
              className="gap-2 border-amber-500/50 hover:bg-amber-500/10"
            >
              <Sparkles className="h-4 w-4" />
              Surprise Me
            </Button>
          </div>

          {/* Filter Bar */}
          <FilterBar
            onSearchChange={handleSearchChange}
            onSortChange={handleSortChange}
            onPriceRangeChange={handlePriceRangeChange}
            priceRange={priceRange}
            maxPrice={maxPrice}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className={`${
                  highlightedProduct === product.id
                    ? "ring-4 ring-primary shadow-[0_0_50px_rgba(251,191,36,0.6)]"
                    : ""
                } rounded-2xl transition-all duration-500`}
              >
                <ProductCard {...product} index={index} />
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-2xl text-muted-foreground">No products match your filters</p>
              <Button onClick={() => {
                setSearchTerm('');
                setPriceRange([0, maxPrice]);
                setSortBy('featured');
              }} className="mt-4">
                Clear Filters
              </Button>
            </div>
          )}
        </section>
      </div>

      {/* Footer with Gold Theme */}
      <div className="border-t border-amber-500/20 bg-gradient-to-r from-amber-500/5 via-yellow-500/5 to-amber-500/5 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Certified Authenticity • Lifetime Warranty • Free Shipping
            <Sparkles className="h-4 w-4 text-amber-500" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gold;
