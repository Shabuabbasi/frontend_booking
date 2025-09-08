import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../localesen.json";
import ar from "../localesar.json";
import ru from "../localesru.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
    ru: { translation: ru }
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
