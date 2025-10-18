import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 luxury-gradient rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-oswald font-bold text-xl">BLX</span>
              </div>
              <div>
                <span className="text-2xl font-oswald font-bold block leading-tight">BHULAXMI JEWELLERS</span>
                <span className="text-xs tracking-wider uppercase opacity-80">PRIVATE LIMITED</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs mb-3">
              Timeless elegance in every piece. Crafting luxury jewelry with tradition and trust since 1997.
            </p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                Bhulaxmi916@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <span className="h-3 w-3 flex items-center justify-center">📞</span>
                9819072971
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-oswald font-semibold mb-4">Collections</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/gold" className="text-muted-foreground hover:text-primary transition-colors">
                  Gold Jewelry
                </Link>
              </li>
              <li>
                <Link to="/silver" className="text-muted-foreground hover:text-primary transition-colors">
                  Silver Jewelry
                </Link>
              </li>
              <li>
                <Link to="/diamond" className="text-muted-foreground hover:text-primary transition-colors">
                  Diamond Jewelry
                </Link>
              </li>
              <li>
                <Link to="/gems" className="text-muted-foreground hover:text-primary transition-colors">
                  Precious Gems
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-oswald font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping-returns" className="text-muted-foreground hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/size-guide" className="text-muted-foreground hover:text-primary transition-colors">Size Guide</Link></li>
              <li><Link to="/care-instructions" className="text-muted-foreground hover:text-primary transition-colors">Care Instructions</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-oswald font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/refund-policy" className="text-muted-foreground hover:text-primary transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-oswald font-semibold mb-4">Stay Connected</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to receive exclusive offers and updates.
            </p>
            <div className="flex gap-3">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Mail className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
      <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
  <p>&copy; 2025 BHU LAXMI JEWELLERS PRIVATE LIMITED. All rights reserved.</p>
  <div className="flex gap-6 mt-4 md:mt-0">
    <Link 
      to="/privacy" 
      className="hover:text-primary cursor-pointer transition-colors"
    >
      Privacy Policy
    </Link>
    <Link 
      to="/terms" 
      className="hover:text-primary cursor-pointer transition-colors"
    >
      Terms of Service
    </Link>
  </div>
</div>
      </div>
    </footer>
  );
};

export default Footer;
