import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory, getRandomProduct, type Product } from "@/data/products";
import { Sparkles, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FilterBar } from "@/components/FilterBar";
import { toast } from "sonner";
import gemsBg from "@/assets/gems-page.jpg"; // replace with your actual image path
import ruby from "@/assets/gems-page/ruby.jpg"; // replace with your actual image path
import sapphire from "@/assets/gems-page/Sapphire.jpeg"; // replace with your actual image path
import tanzanite from "@/assets/gems-page/tanzanite.webp"; // replace with your actual image path
import opal from "@/assets/gems-page/opal.webp"; // replace with your actual image path
import emerald from "@/assets/gems-page/emerald.jpg"; // replace with your actual image path


const Gems = () => {
  const allProducts = getProductsByCategory('gems');
  const [discoveredGem, setDiscoveredGem] = useState<Product | null>(null);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);

  const maxPrice = useMemo(() => 
    Math.max(...allProducts.map(p => p.price)), 
    [allProducts]
  );

  const products = useMemo(() => {
    let filtered = allProducts.filter(product =>
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
  }, [allProducts, searchTerm, sortBy, priceRange]);

  const discoverRandomGem = () => {
    setIsDiscovering(true);
    const randomGem = getRandomProduct('gems');
    
    setTimeout(() => {
      if (randomGem) {
        setDiscoveredGem(randomGem);
        toast.success(`Discovered: ${randomGem.name}!`);
      }
      setIsDiscovering(false);
    }, 1500);
  };

 const gemInfo = [
  {
    type: 'Emerald',
    meaning: 'Symbol of rebirth and love',
    image: emerald,
  },
  {
    type: 'Ruby',
    meaning: 'Stone of passion and energy',
    image: ruby,
  },
  {
    type: 'Sapphire',
    meaning: 'Wisdom and royalty',
    image: sapphire,
  },
  {
    type: 'Tanzanite',
    meaning: 'Transformation and insight',
    image: tanzanite,
  },
  {
    type: 'Opal',
    meaning: 'Creativity and imagination',
    image: opal,
  },
];


 return (
  <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 relative overflow-hidden">
    {/* Background animation */}
    <div className="absolute inset-0 opacity-30">
      <div className="absolute inset-0 gems-gradient animate-pulse" />
    </div>

    {/* Floating particles */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1.5 h-1.5 rounded-full ${
            ['bg-purple-400', 'bg-pink-400', 'bg-blue-400', 'bg-yellow-400', 'bg-red-400'][i % 5]
          }`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            x: [null, Math.random() * window.innerWidth],
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>

    {/* 🌟 Hero Section */}
    <section
      className="relative min-h-[55vh] md:h-[60vh] flex items-center justify-center bg-center bg-cover bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url(${gemsBg})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              textShadow: [
                "0 0 25px rgba(236,72,153,0.6)",
                "0 0 50px rgba(168,85,247,0.9)",
                "0 0 25px rgba(236,72,153,0.6)",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="text-4xl sm:text-5xl md:text-7xl font-oswald font-bold mb-4 
              bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 
              bg-clip-text text-transparent bg-[length:200%_auto] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          >
            Precious Gems
          </motion.h1>

          <p className="text-base sm:text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto font-light mb-10 tracking-wide">
            Vibrant Precious Stones — Nature’s Colorful Masterpieces
          </p>

          {/* Button */}
          <Button
            onClick={discoverRandomGem}
            disabled={isDiscovering}
            className="bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 
              hover:from-purple-500 hover:to-pink-600 
              text-white font-semibold px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg rounded-full shadow-lg 
              transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            {isDiscovering ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                </motion.div>
                Discovering...
              </>
            ) : (
              <>
                <Diamond className="mr-2 h-5 w-5" />
                Discover Random Gem
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </section>

    {/* 💎 Discovered Gem Section */}
    <AnimatePresence>
      {discoveredGem && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="container mx-auto px-4 mb-12"
        >
          <Card className="p-6 sm:p-8 gems-gradient text-white max-w-2xl mx-auto rounded-2xl shadow-xl">
            <h3 className="text-xl sm:text-2xl font-oswald font-bold mb-4 text-center">
              ✨ Gem Discovery ✨
            </h3>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={discoveredGem.image}
                alt={discoveredGem.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-xl"
              />
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-lg sm:text-xl font-bold mb-2">{discoveredGem.name}</h4>
                <p className="mb-2 text-sm sm:text-base">{discoveredGem.description}</p>
                {discoveredGem.gemType && (
                  <p className="text-xs sm:text-sm opacity-90">
                    <span className="font-semibold">Gem Type:</span> {discoveredGem.gemType}
                  </p>
                )}
                <p className="text-xl sm:text-2xl font-bold mt-3">
                  ${discoveredGem.price.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>

    {/* 🌈 Gem Info Cards */}
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl sm:text-3xl font-oswald font-bold text-white text-center mb-8">
        Gemstone Meanings
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
        {gemInfo.map((gem, index) => (
          <motion.div
            key={gem.type}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            className="p-4 rounded-xl text-center text-white bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 shadow-lg">
              <img src={gem.image} alt={gem.type} className="w-full h-full object-cover" />
            </div>
            <h4 className="font-semibold text-sm sm:text-base mb-1">{gem.type}</h4>
            <p className="text-xs sm:text-sm opacity-80">{gem.meaning}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* 🛍 Product Grid */}
    <section className="container mx-auto px-4 pb-16">
      <FilterBar
        onSearchChange={setSearchTerm}
        onSortChange={setSortBy}
        onPriceRangeChange={setPriceRange}
        priceRange={priceRange}
        maxPrice={maxPrice}
      />

      <h2 className="text-2xl sm:text-3xl font-oswald font-bold text-white text-center mb-10 sm:mb-12">
        Our Gemstone Collection
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ rotate: 3, scale: 1.05 }}
            className="group"
          >
            <div className="relative">
              <ProductCard {...product} index={index} />
            </div>
            {product.gemType && (
              <div className="mt-3 text-center">
                <span className="inline-block px-4 py-1 sm:py-2 gems-gradient text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg">
                  {product.gemType}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>

    {/* Footer */}
    <footer className="border-t border-white/20 bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-purple-900/50 backdrop-blur-md py-6 sm:py-8">
      <div className="container mx-auto px-4 text-center text-white/80 text-xs sm:text-sm">
        <p>Natural gemstones • Ethically sourced • Certified authentic</p>
      </div>
    </footer>
  </div>
);

};

export default Gems;
