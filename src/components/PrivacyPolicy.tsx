import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import privacy from "@/assets/privacy-policy/privacy-policy.jpg";
export const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Information We Collect",
      content: "We collect information you provide directly, such as name, email, phone number, and shipping address when you make a purchase or create an account.",
    },
    {
      title: "How We Use Your Information",
      content: "Your information is used to process orders, communicate with you, improve our services, and provide personalized recommendations.",
    },
    {
      title: "Data Security",
      content: "We implement industry-standard security measures to protect your personal information. All payment transactions are encrypted and processed through secure channels.",
    },
    {
      title: "Cookies",
      content: "We use cookies to enhance your browsing experience, remember preferences, and analyze site traffic.",
    },
    {
      title: "Third-Party Services",
      content: "We may share your information with trusted third-party service providers who assist in operating our website and conducting our business.",
    },
    {
      title: "Your Rights",
      content: "You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.",
    },
  ];
 
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with background image */}
      <section
        className="relative py-20 text-white"
        style={{
          backgroundImage: `url(${privacy})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Small overlay for readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <Shield className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-5xl font-serif font-bold mb-2">Privacy Policy</h1>
            <p className="text-lg opacity-90">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Privacy Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl shadow-elegant"
              >
                <h2 className="text-2xl font-serif font-bold mb-4">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

