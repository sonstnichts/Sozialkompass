import i18n from "i18next"; 
import {initReactI18next} from 'react-i18next';
import questionData from "./questionData.js"; 
import questionDataUKR from "./questionDataUKR.js"; 


i18n.use(initReactI18next).init({
    lng: "de",
    fallbackLng: "de"
,
resources: {
    de: questionData,
    uk: questionDataUKR,
},
interpolation: {
    escapeValue: false 
}

});

export default i18n; 