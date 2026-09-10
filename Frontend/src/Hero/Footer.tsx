import { Link } from "react-router-dom";
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const footerLinks = {
    Platform: [
      { name: "Find Teachers", href: "/access" },
      { name: "Become a Teacher", href: "/user-login" },
      { name: "How It Works", href: "/working" },
    ],
   
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
    Support: [
      { name: "Help Center", href: "/help" },
      { name: "FAQ", href: "/faq" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" },
  ];

  return (
    <footer className="bg-card border-t border-border border-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-6 gap-12">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-15 h-15 rounded-xl bg-red-600 flex items-center justify-center shadow-md">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">Tuto</span>
            </Link>
            <p className="text-lg text-gray-500 mb-6 max-w-sm">
              Connecting students with the best teachers worldwide. Your journey to academic excellence starts here.
            </p>
            
            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="font-semibold text-xl">Stay Updated</h4>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-100 border rounded-lg"
                />
                <Button size="icon" className="bg-red-600 cursor-pointer rounded-lg hover:scale-105 transition-transform">
                  <Mail className="w-8 h-8 text-white" />
                </Button>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold md:text-xl mb-4">{category}</h4>
              <ul className="space-y-3 ">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 mt-12 border-t border-border border-gray-300 gap-4">
          <p className="text-lg text-muted-foreground">
            © {new Date().getFullYear()} EduConnect. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
