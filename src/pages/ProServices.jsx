import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";


const ProServices = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    fullName: "",
    serviceType: "",
    email: "",
    phone: "",
    date: "",
    status: "New",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form Data Submitted:", formData);
  //   alert(t("successMsg")); // ✅ translated success message
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:5000/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error("Failed to submit form");

    const data = await res.json();
    console.log("✅ Submitted:", data);
    alert(t("successMsg")); // show translated success message
  } catch (err) {
    console.error("❌ Error:", err);
    alert("Something went wrong. Try again.");
  }
};


  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-lg w-full"
      >
        {/* Title */}
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-white"
        >
          {t("proForm.title")}
        </motion.h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mt-2 mb-6">
          {t("proForm.subtitle")}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <label className="block text-gray-700 dark:text-gray-300">
              {t("proForm.fullName")}
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder={t("proForm.placeholderName")}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </motion.div>

          {/* Service Type */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <label className="block text-gray-700 dark:text-gray-300">
              {t("proForm.serviceType")}
            </label>
            <input
              type="text"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              placeholder={t("proForm.placeholderService")}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <label className="block text-gray-700 dark:text-gray-300">
              {t("proForm.email")}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("proForm.placeholderEmail")}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <label className="block text-gray-700 dark:text-gray-300">
              {t("proForm.phone")}
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t("proForm.placeholderPhone")}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </motion.div>

          {/* Date */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <label className="block text-gray-700 dark:text-gray-300">
              {t("proForm.date")}
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </motion.div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 mt-6 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition"
          >
            {t("proForm.submit")}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default ProServices;
