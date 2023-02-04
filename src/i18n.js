import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translation_en from  "./locales/en/translation.json";
//import translation_se from  "./locales/se/translation.json";
import translation_se from  "./locales/se/language.json";
const resources = {
    en: {translation: translation_en},
    se: {translation: translation_se}
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        lng: "se"
    });


export default i18n;