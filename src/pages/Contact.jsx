import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { API_URL } from "../config";

const Contact = () => {
  const { t } = useTranslation();

  // ✅ Track form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // ✅ Settings with safe defaults
  const [settings, setSettings] = useState({
    footer: {
      phone: "+971 50 000 0000",
      email: "info@services.com",
      address: "Dubai, UAE",
    },
  });

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit form");

      const data = await res.json();
      console.log("✅ Submitted:", data);
      alert(t("successMsg"));
      setFormData({ name: "", email: "", message: "" }); // clear form
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  // ✅ Fetch settings
  useEffect(() => {
    fetch(`${API_URL}/api/settings`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSettings((prev) => ({
            ...prev,
            ...data.settings,
            footer: {
              ...prev.footer,
              ...data.settings.footer,
            },
          }));
        }
      })
      .catch((err) => console.error("❌ Error fetching settings:", err));
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
      >
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-6"
        >
          {t("contactTitle")}
        </motion.h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          {t("contactSubtitle")}
        </p>

        {/* ✅ Contact Form */}
        <form onSubmit={handleSubmit} className="grid gap-6">
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              {t("fullName")}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("placeholderName")}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              {t("email")}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("placeholderEmail")}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              {t("message")}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder={t("placeholderMessage")}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </motion.div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 mt-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition"
          >
            {t("sendMessage")}
          </motion.button>
        </form>

        {/* ✅ Extra Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-gray-600 dark:text-gray-400"
        >
          <p>📞 {settings.footer.phone}</p>
          <p>📧 {settings.footer.email}</p>
          <p>📍 {settings.footer.address}</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
