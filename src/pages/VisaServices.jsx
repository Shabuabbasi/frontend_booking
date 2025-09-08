import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import VisaImg from "../assets/visa.jpg";

const VisaServices = () => {
  const { t, i18n } = useTranslation();

  // Language Switcher
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-6">
      {/* Language Switcher */}
     

      {/* Hero Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
          {t("visaTitle")}
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t("visaDesc")}
        </p>
      </motion.div>

      {/* Visa Image */}
      <motion.div
        className="flex justify-center mb-12"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src={VisaImg}
          alt="Visa Services"
          className="rounded-2xl shadow-lg max-w-lg w-full"
        />
      </motion.div>

      {/* Services Section */}
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { key: "tourist" },
          { key: "business" },
          { key: "residency" },
          { key: "family" },
          { key: "student" },
          { key: "work" },
        ].map((service, i) => (
          <motion.div
            key={i}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              {t(`services.${service.key}`)}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t(`services.${service.key}Desc`)}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          {t("ctaTitle")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
          {t("ctaDesc")}
        </p>
        <a
          href="/contact"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"
        >
          {t("contactBtn")}
        </a>
      </motion.div>
    </div>
  );
};

export default VisaServices;
