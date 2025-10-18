import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/data/products";
import { Sparkles, Filter } from "lucide-react";
import { FilterBar } from "@/components/FilterBar";
import diamondBg from "@/assets/diamond-page.webp"; // replace with your image path


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Diamond = () => {
  const baseProducts = getProductsByCategory('diamond');
  const [clarityFilter, setClarityFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);

  const maxPrice = useMemo(() => 
    Math.max(...baseProducts.map(p => p.price)), 
    [baseProducts]
  );

  const allProducts = useMemo(() => {
    let filtered = baseProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price);
      case "name":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [baseProducts, searchTerm, sortBy, priceRange]);

  const filteredProducts = clarityFilter === 'all'
    ? allProducts
    : allProducts.filter(p => p.clarity === clarityFilter);

  const clarityOptions = ['IF', 'VVS1', 'VVS2', 'VS1', 'VS2'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-950 dark:via-gray-900 dark:to-blue-950 relative overflow-hidden">
      {/* Sparkle animation overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              repeatDelay: Math.random() * 2,
            }}
          >
            <Sparkles className="text-blue-400/30" size={12} />
          </motion.div>
        ))}
      </div>

      {/* Hero Section with Glassmorphism */}
      {/* Hero Section with Background Image */}
<section
  className="relative h-[60vh] flex items-center justify-center bg-center bg-cover bg-no-repeat overflow-hidden"
  style={{
    backgroundImage: `url(${diamondBg})`,
  }}
>
  {/* Overlay for readability */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

  <div className="relative z-10 container mx-auto px-4 text-center">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="p-12 rounded-3xl shadow-2xl max-w-4xl mx-auto"
    >
      <motion.h1
        animate={{
          textShadow: [
            "0 0 25px rgba(59,130,246,0.6)",
            "0 0 50px rgba(147,197,253,0.9)",
            "0 0 25px rgba(59,130,246,0.6)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-6xl md:text-7xl font-oswald font-bold mb-4 
          bg-gradient-to-r from-blue-300 via-white to-blue-300 
          bg-clip-text text-transparent tracking-wide drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)]"
      >
        Diamond Collection
      </motion.h1>

      <p
        className="text-xl md:text-2xl font-light tracking-wide 
        text-gray-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] 
        max-w-2xl mx-auto"
      >
        Brilliant Diamond Radiance — Forever Sparkles
      </p>

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 0 20px rgba(147,197,253,0.4)",
            "0 0 50px rgba(147,197,253,0.7)",
            "0 0 20px rgba(147,197,253,0.4)",
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="w-40 h-1 bg-gradient-to-r from-blue-300 to-blue-100 mx-auto rounded-full mt-6"
      />
    </motion.div>
  </div>
</section>


      {/* Filter Section */}
      <section className="container mx-auto px-4 py-8">
        <FilterBar
          onSearchChange={setSearchTerm}
          onSortChange={setSortBy}
          onPriceRangeChange={setPriceRange}
          priceRange={priceRange}
          maxPrice={maxPrice}
        />
        
        <div className="glassmorphism p-6 rounded-2xl max-w-md">
          <div className="flex items-center gap-3 mb-3">
            <Filter className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-lg">Filter by Clarity</h3>
          </div>
          <Select value={clarityFilter} onValueChange={setClarityFilter}>
            <SelectTrigger className="w-full glassmorphism border-blue-200 dark:border-blue-800">
              <SelectValue placeholder="All Clarities" />
            </SelectTrigger>
            <SelectContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
              <SelectItem value="all">All Clarities</SelectItem>
              {clarityOptions.map(clarity => (
                <SelectItem key={clarity} value={clarity}>
                  {clarity} Clarity
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-2">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'diamond' : 'diamonds'} found
          </p>
        </div>
      </section>

      {/* Masonry Layout Products */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-3xl font-oswald font-bold mb-8 text-center">
          Brilliant Diamonds
        </h2>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={clarityFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="break-inside-avoid mb-6"
              >
                <div className="glassmorphism p-1 rounded-2xl glow-diamond">
                  <ProductCard {...product} index={index} />
                  {product.clarity && (
                    <div className="px-4 pb-3 text-center">
                      <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full">
                        {product.clarity} Clarity
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Footer with Diamond Theme */}
      <div className="border-t border-blue-200/50 dark:border-blue-800/50 glassmorphism py-8">
        <div className="container mx-auto px-4 text-center text-blue-900 dark:text-blue-100">
          <p className="text-sm">Certified diamonds • GIA graded • Ethically sourced</p>
        </div>
      </div>
    </div>
  );
};

export default Diamond;
