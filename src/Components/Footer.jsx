import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";
import { useState, useEffect } from "react";

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      })
      .catch((err) => console.error("Error fetching settings:", err));
  }, []);

  if (!settings) return null;

  return (
    <footer className="bg-gray-600 text-white py-8 px-6">
      <div className="max-w-screen-xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-0">
          {/* Company Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-2xl font-bold">{settings.companyName}</h2>
            <p className="text-sm mt-2 text-gray-200">
              Business formation, Visa, PRO & more – all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-2 text-center md:text-left">
            <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
            <Link to="/home" className="hover:text-yellow-300 transition">
              Home
            </Link>
            <Link
              to="/BusinessFormation"
              className="hover:text-yellow-300 transition"
            >
              Business Formation
            </Link>
            <Link to="/Visa" className="hover:text-yellow-300 transition">
              Visa Services
            </Link>
            <Link to="/ProServices" className="hover:text-yellow-300 transition">
              PRO Services
            </Link>
            <Link to="/contact" className="hover:text-yellow-300 transition">
              Contact
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col space-y-2 text-center md:text-left">
            <h3 className="font-semibold text-lg mb-2">Contact</h3>
            <a
              href={`mailto:${settings.footer?.email || ""}`}
              className="flex items-center gap-2 justify-center md:justify-start hover:text-yellow-300"
            >
              <Mail size={18} />{" "}
              {settings.footer?.email || "info@services.com"}
            </a>
            <a
              href={`tel:${settings.footer?.phone || ""}`}
              className="flex items-center gap-2 justify-center md:justify-start hover:text-yellow-300"
            >
              <Phone size={18} />{" "}
              {settings.footer?.phone || "+971 50 000 0000"}
            </a>
            <p className="text-sm">
              {settings.footer?.address || "Dubai, UAE"}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/30 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-center gap-4">
          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="#" className="hover:text-yellow-300">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-yellow-300">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-yellow-300">
              <Instagram size={20} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-200">
            © {new Date().getFullYear()} {settings.companyName}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
