import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface EnhancedCategoryCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  index: number;
}

export const EnhancedCategoryCard = ({
  title,
  description,
  image,
  link,
  index,
}: EnhancedCategoryCardProps) => {
  return (
    <Link to={link}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: index * 0.15,
          type: "spring",
          stiffness: 100,
        }}
        whileHover={{
          y: -10,
          scale: 1.03,
          transition: { duration: 0.3 },
        }}
        className="group relative h-[420px] rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl bg-gray-200"
      >
        {/* 🔸 Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />

        {/* 🔸 Overlay for text visibility */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition duration-500"></div>

        {/* 🔸 Shimmer light effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
          initial={{ x: "-100%" }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* 🔸 Text content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 z-10 flex flex-col justify-end text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white text-4xl md:text-5xl font-serif font-bold tracking-tight drop-shadow-lg"
          >
            {title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/90 text-lg font-medium mt-2 drop-shadow"
          >
            {description}
          </motion.p>
        </div>

        {/* 🔸 Subtle border glow on hover */}
        <div className="absolute inset-0 rounded-[2rem] ring-4 ring-white/0 group-hover:ring-white/30 transition-all duration-500" />
      </motion.div>
    </Link>
  );
};
