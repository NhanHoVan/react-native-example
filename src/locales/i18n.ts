import { I18n } from "i18n-js";
import { NativeModules, Platform } from "react-native";
import { saveItemStore } from "../utils/store";
import en from './en';
import vi from './vi';

const i18n = new I18n()
const fallback = 'en'

const translationGetters = {
    en: en,
    vi: vi,
}

const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;

const languageTag = deviceLanguage.length > 0 ? deviceLanguage.substring(0,2) : fallback
type ObjectKey = keyof typeof translationGetters;
i18n.translations = { [languageTag]: translationGetters[languageTag as ObjectKey] }
i18n.locale = languageTag

saveItemStore("lang", languageTag)

export default i18n;
