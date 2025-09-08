import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Briefcase, Globe, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Briefcase size={40} />,
      title: t("businessFormation"),
      desc: t("businessFormationDesc", "Start your company hassle-free with our expert guidance."),
    },
    {
      icon: <Globe size={40} />,
      title: t("visaServices"),
      desc: t("visaServicesDesc", "Fast and reliable visa processing tailored to your needs."),
    },
    {
      icon: <Shield size={40} />,
      title: t("proServices"),
      desc: t("proServicesDesc", "Stay connected with us via PRO Services effortlessly."),
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white px-6">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl font-extrabold"
        >
          {t("welcomeTitle")}{" "}
          <span className="text-yellow-300">{t("getStarted")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-4 max-w-xl text-lg sm:text-xl text-gray-100"
        >
          {t("welcomeMessage")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/contact"
            className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-300 transition"
          >
            {t("getStarted")}
          </Link>
          <Link
            to="/Visa"
            className="bg-white/20 border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition"
          >
            {t("learnMore", "Learn More")}
          </Link>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10">
            {t("ourServices", "Our Services")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg hover:scale-105 transition"
              >
                <div className="text-blue-600 mb-4 flex justify-center">
                  {s.icon}
                </div>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 bg-blue-600 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold mb-6"
        >
          {t("ctaTitle")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="max-w-2xl mx-auto mb-6 text-gray-200"
        >
          {t("ctaDesc")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          viewport={{ once: true }}
        >
          <Link
            to="/contact"
            className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-300 transition mr-4"
          >
            {t("contactBtn")}
          </Link>
             <Link
            to="/vedio"
            className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-300 transition"
          >
            {t("vedioCall")}
          </Link>
        </motion.div>
      </section>

      {/* VAT & Tax Section */}
      <section className="bg-gray-100 py-12 px-6 text-center">
        <h2 className="text-2xl font-bold mb-4">
          {t("vatTitle", "VAT & Corporate Tax Registration")}
        </h2>
        <p className="max-w-2xl mx-auto text-gray-700 mb-6">
          {t(
            "vatDesc",
            "Ensure your business complies with the latest UAE tax regulations. We offer seamless VAT and corporate tax registration services so you can focus on growing your business."
          )}
        </p>
        <Link
          to="/contact"
          className="inline-block bg-blue-600 text-white py-3 px-8 rounded-xl shadow-lg hover:bg-blue-700 transition"
        >
          {t("getAssistance", "Get Assistance →")}
        </Link>
      </section>
    </div>
  );
};

export default Home;
