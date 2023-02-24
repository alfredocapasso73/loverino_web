import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translation_en from  "./locales/en/language.json";
import translation_se from  "./locales/se/language.json";
import translation_it from  "./locales/it/language.json";

const resources = {
    en: {translation: translation_en},
    se: {translation: translation_se},
    it: {translation: translation_it}
};

let browserLanguage = '';
if(localStorage.getItem("lang")){
    browserLanguage = localStorage.getItem("lang");
}
else{
    if (/^en\b/.test(navigator.language)) {
        browserLanguage = 'en';
    }
    else if (/^it\b/.test(navigator.language)) {
        browserLanguage = 'it';
    }
    else{
        browserLanguage = 'se';
    }
}


const white_list = ['en', 'se', 'it'];
const default_lang = white_list.includes(browserLanguage) ? browserLanguage : 'se';

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