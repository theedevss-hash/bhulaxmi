import { motion } from "framer-motion";
import { EnhancedCategoryCard } from "./EnhancedCategoryCard";
import goldImg from "@/assets/gold-img.jpg";
import silverImg from "@/assets/silver-img.jpg";
import diamondImg from "@/assets/diamond-img.jpg";
import gemsImg from "@/assets/gems-img.jpg";

const categories = [
  {
    id: "gold",
    title: "Gold",
    description: "Rich Golden Luxury",
    image: goldImg,
    link: "/gold",
  },
  {
    id: "silver",
    title: "Silver",
    description: "Elegant Silver Grace",
    image: silverImg,
    link: "/silver",
  },
  {
    id: "diamond",
    title: "Diamond",
    description: "Brilliant Diamond",
    image: diamondImg,
    link: "/diamond",
  },
  {
    id: "gems",
    title: "Gems",
    description: "Vibrant Precious Stones",
    image: gemsImg,
    link: "/gems",
  },
];

export const CategoryShowcase = () => {
  return (
    <section className="py-20 bg-muted/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-oswald font-bold mb-4">
            Explore Our Collections
          </h2>
          <p className="text-muted-foreground text-white text-lg max-w-2xl mx-auto">
            Discover exquisite pieces crafted with precision and passion
          </p>
        </motion.div>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <EnhancedCategoryCard
              key={category.id}
              title={category.title}
              description={category.description}
              image ={category.image}
              link={category.link}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
