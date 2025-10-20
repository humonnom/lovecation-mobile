import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { LOCALES } from './constants';
import ko from './locales/ko.json';
import ja from './locales/ja.json';

const resources = {
  [LOCALES.KO]: {
    translation: ko,
  },
  [LOCALES.JA]: {
    translation: ja,
  },
};

// 디바이스 언어 가져오기
const deviceLanguage = Localization.getLocales()[0]?.languageCode || LOCALES.KO;

// 지원하는 언어인지 확인 (ko 또는 ja만 지원)
const supportedLanguage = deviceLanguage === LOCALES.JA ? LOCALES.JA : LOCALES.KO;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: supportedLanguage, // 디바이스 언어 자동 감지
    fallbackLng: LOCALES.KO,
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v3', // React Native에서 필요
  });

export default i18n;
