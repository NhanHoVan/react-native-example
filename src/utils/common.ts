import i18n from "../locales/i18n";
import { langType, messageType } from "../types";

export const initLang: langType[] = [
    {lang: 'vi', label: i18n.t('text.vie'), source: require('../public/Images/languages/lang_vi.png')},
    {lang: 'en', label: i18n.t('text.eng'), source: require('../public/Images/languages/lang_en.png')},
]

export const initMessage: messageType = {
    message: '',
    type: ''
}
