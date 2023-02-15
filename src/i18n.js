import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translation_en from  "./locales/en/translation.json";
import translation_se from  "./locales/se/language.json";
import translation_it from  "./locales/it/language.json";

const resources = {
    en: {translation: translation_en},
    se: {translation: translation_se},
    it: {translation: translation_it}
};

const white_list = ['en', 'se', 'it'];
const default_lang = localStorage.getItem("lang") && white_list.includes(localStorage.getItem("lang")) ? localStorage.getItem("lang") : "se";
i18n
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        lng: default_lang
    });


export default i18n;