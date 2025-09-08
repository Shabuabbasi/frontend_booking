import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { API_URL } from "../config"; // Adjust the path as necessary

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(null);

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login"; // redirect to login
};


  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    document.dir = lang === "ar" || lang === "ur" ? "rtl" : "ltr";
  };

  useEffect(() => {
    fetch(`${API_URL}/api/settings`)
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
    <nav className="bg-blue-500 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo & Company Name */}
        <a
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse rounded-full"
        >
          <img
            src={settings.logoUrl || "http://localhost:5000/uploads/logo.png"}
            className="h-8"
            alt="Logo"
          />
          <span className="self-center text-white text-2xl font-semibold whitespace-nowrap dark:text-white">
            {settings.companyName || "Company"}
          </span>
        </a>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Language Buttons (desktop) */}
        <div className="hidden md:flex items-center md:order-2 space-x-2 rtl:space-x-reverse">
          <button
            onClick={() => changeLang("en")}
            className="px-3 py-1 border rounded text-white hover:text-gray-400"
          >
            EN
          </button>
          <button
            onClick={() => changeLang("ar")}
            className="px-3 py-1 border rounded text-white hover:text-gray-400"
          >
            AR
          </button>
          <button
            onClick={() => changeLang("ru")}
            className="px-3 py-1 border rounded text-white hover:text-gray-400"
          >
            RU
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col font-medium p-4 mt-4 border border-gray-100 rounded-lg bg-blue-600 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="/home" className="block py-2 px-3 text-white">
                {t("home")}
              </a>
            </li>
            <li>
              <a href="/BusinessFormation" className="block py-2 px-3 text-white">
                {t("businessFormation")}
              </a>
            </li>
            <li>
              <a href="/Visa" className="block py-2 px-3 text-white">
                {t("visaServices")}
              </a>
            </li>
            <li>
              <a href="/ProServices" className="block py-2 px-3 text-white">
                {t("proServices")}
              </a>
            </li>
            <li>
              <a href="/contact" className="block py-2 px-3 text-white">
                {t("contact")}
              </a>
            </li>

  {/* 🚀 Logout button */}
  <li>
    <button
      onClick={handleLogout}
      className="block py-2 px-3 bg-blue-500 rounded-md text-white hover:bg-blue-600 transition"
    >
      {t("logout") || "Logout"}
    </button>
  </li>



          </ul>

          {/* Language Buttons (mobile) */}
         <div className="flex flex-col md:hidden gap-2 mt-4 px-4">
  <button
    onClick={() => changeLang("en")}
    className="px-3 py-1 border rounded text-white hover:text-gray-400"
  >
    EN
  </button>
  <button
    onClick={() => changeLang("ar")}
    className="px-3 py-1 border rounded text-white hover:text-gray-400"
  >
    AR
  </button>
  <button
    onClick={() => changeLang("ru")}
    className="px-3 py-1 border rounded text-white hover:text-gray-400"
  >
    RU
  </button>

  {/* 🚀 Mobile Logout */}
  <button
    onClick={handleLogout}
    className="px-3 py-2 bg-blue-400 rounded-md text-white hover:bg-blue-600 transition"
  >
    {t("logout") || "Logout"}
  </button>
</div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
