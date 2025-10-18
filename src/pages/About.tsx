import { motion } from "framer-motion";
import { Award, Heart, Shield, Sparkles } from "lucide-react";
import aboutbg from "@/assets/about-gold.jpg";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering the finest quality jewelry with exceptional craftsmanship.",
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Every piece is created with love and dedication to make your moments special.",
    },
    {
      icon: Shield,
      title: "Trust",
      description: "Certified authenticity and transparency in every transaction.",
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Blending traditional artistry with contemporary designs.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
    <section
  className="relative py-20 overflow-hidden bg-cover bg-center text-white"
  style={{ backgroundImage: `url(${aboutbg})` }}
>
  {/* Optional overlay */}
  <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-oswald font-bold mb-6">
              Our Story
            </h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Crafting timeless elegance since generations, Bhulaxmi Jewellers has been
              the trusted name in luxury jewelry.
            </p>
          </motion.div>
        </div>
      </section>




      {/* Values Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-oswald font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-card hover-lift"
              >
                <div className="w-16 h-16 mx-auto mb-4 luxury-gradient rounded-full flex items-center justify-center">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-oswald font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "50+", label: "Years of Excellence" },
              { number: "10k+", label: "Happy Customers" },
              { number: "500+", label: "Unique Designs" },
              { number: "100%", label: "Certified Gold" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-oswald font-bold text-black mb-2">
  {stat.number}
</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
