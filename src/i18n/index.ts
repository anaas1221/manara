import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  ar: {
    translation: {
      app_name: 'المنارة',
      nav_home: 'الرئيسية', nav_quran: 'القرآن', nav_adhkar: 'الأذكار',
      nav_duas: 'الأدعية', nav_hadith: 'الأحاديث', nav_prayer: 'الصلاة',
      nav_qibla: 'القبلة', nav_mosques: 'المساجد', nav_tasbeeh: 'السبحة',
      nav_names: 'أسماء الله', nav_hajj: 'الحج والعمرة', nav_library: 'المكتبة',
      nav_learn: 'التعلم', nav_settings: 'الإعدادات',
      next_prayer: 'الصلاة القادمة', remaining: 'متبقي',
      last_read: 'تابع القراءة', start_reading: 'ابدأ القراءة',
      morning_adhkar: 'أذكار الصباح', qibla_direction: 'اتجاه القبلة',
      my_prayer: 'صلاتي', names_count: '99 اسمًا',
      theme_light: 'فاتح', theme_dark: 'داكن',
      language: 'اللغة',
      search_placeholder: 'ابحث...',
    }
  },
  en: {
    translation: {
      app_name: 'Manara',
      nav_home: 'Home', nav_quran: 'Quran', nav_adhkar: 'Adhkar',
      nav_duas: 'Duas', nav_hadith: 'Hadith', nav_prayer: 'Prayer',
      nav_qibla: 'Qibla', nav_mosques: 'Mosques', nav_tasbeeh: 'Tasbeeh',
      nav_names: 'Divine Names', nav_hajj: 'Hajj & Umrah', nav_library: 'Library',
      nav_learn: 'Learn', nav_settings: 'Settings',
      next_prayer: 'Next Prayer', remaining: 'Remaining',
      last_read: 'Continue Reading', start_reading: 'Start Reading',
      morning_adhkar: 'Morning Adhkar', qibla_direction: 'Qibla Direction',
      my_prayer: 'My Prayer', names_count: '99 Names',
      theme_light: 'Light', theme_dark: 'Dark',
      language: 'Language',
      search_placeholder: 'Search...',
    }
  },
  fr: {
    translation: {
      app_name: 'Manara',
      nav_home: 'Accueil', nav_quran: 'Coran', nav_adhkar: 'Invocations',
      nav_duas: 'Douas', nav_hadith: 'Hadith', nav_prayer: 'Prière',
      nav_qibla: 'Qibla', nav_mosques: 'Mosquées', nav_tasbeeh: 'Chapelet',
      nav_names: 'Noms Divins', nav_hajj: 'Hajj & Omra', nav_library: 'Bibliothèque',
      nav_learn: 'Apprendre', nav_settings: 'Paramètres',
      next_prayer: 'Prochaine Prière', remaining: 'Restant',
      last_read: 'Continuer', start_reading: 'Commencer',
      morning_adhkar: 'Invocations du matin', qibla_direction: 'Direction Qibla',
      my_prayer: 'Ma Prière', names_count: '99 Noms',
      theme_light: 'Clair', theme_dark: 'Sombre',
      language: 'Langue',
      search_placeholder: 'Rechercher...',
    }
  },
  tr: {
    translation: {
      app_name: 'Manara',
      nav_home: 'Ana Sayfa', nav_quran: 'Kur\'an', nav_adhkar: 'Zikirler',
      nav_duas: 'Dualar', nav_hadith: 'Hadis', nav_prayer: 'Namaz',
      nav_qibla: 'Kıble', nav_mosques: 'Camiler', nav_tasbeeh: 'Tesbih',
      nav_names: 'Esma-ül Hüsna', nav_hajj: 'Hac & Umre', nav_library: 'Kütüphane',
      nav_learn: 'Öğren', nav_settings: 'Ayarlar',
      next_prayer: 'Sonraki Namaz', remaining: 'Kalan',
      last_read: 'Okumaya Devam', start_reading: 'Okumaya Başla',
      morning_adhkar: 'Sabah Zikirleri', qibla_direction: 'Kıble Yönü',
      my_prayer: 'Namazım', names_count: '99 İsim',
      theme_light: 'Açık', theme_dark: 'Koyu',
      language: 'Dil',
      search_placeholder: 'Ara...',
    }
  },
  ur: {
    translation: {
      app_name: 'منارہ',
      nav_home: 'ہوم', nav_quran: 'قرآن', nav_adhkar: 'اذکار',
      nav_duas: 'دعائیں', nav_hadith: 'حدیث', nav_prayer: 'نماز',
      nav_qibla: 'قبلہ', nav_mosques: 'مساجد', nav_tasbeeh: 'تسبیح',
      nav_names: 'اسماء الحسنی', nav_hajj: 'حج و عمرہ', nav_library: 'کتب خانہ',
      nav_learn: 'سیکھیں', nav_settings: 'ترتیبات',
      next_prayer: 'اگلی نماز', remaining: 'باقی',
      last_read: 'پڑھنا جاری رکھیں', start_reading: 'پڑھنا شروع کریں',
      morning_adhkar: 'صبح کے اذکار', qibla_direction: 'قبلہ کی سمت',
      my_prayer: 'میری نماز', names_count: '99 نام',
      theme_light: 'روشن', theme_dark: 'گہرا',
      language: 'زبان',
      search_placeholder: 'تلاش...',
    }
  },
  id: {
    translation: {
      app_name: 'Manara',
      nav_home: 'Beranda', nav_quran: 'Al-Qur\'an', nav_adhkar: 'Dzikir',
      nav_duas: 'Doa', nav_hadith: 'Hadis', nav_prayer: 'Shalat',
      nav_qibla: 'Kiblat', nav_mosques: 'Masjid', nav_tasbeeh: 'Tasbih',
      nav_names: 'Asmaul Husna', nav_hajj: 'Haji & Umrah', nav_library: 'Perpustakaan',
      nav_learn: 'Belajar', nav_settings: 'Pengaturan',
      next_prayer: 'Shalat Berikutnya', remaining: 'Tersisa',
      last_read: 'Lanjutkan Membaca', start_reading: 'Mulai Membaca',
      morning_adhkar: 'Dzikir Pagi', qibla_direction: 'Arah Kiblat',
      my_prayer: 'Shalat Saya', names_count: '99 Nama',
      theme_light: 'Terang', theme_dark: 'Gelap',
      language: 'Bahasa',
      search_placeholder: 'Cari...',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'manara:lang',
    }
  });

// تحديد اتجاه الصفحة
const rtlLangs = ['ar', 'ur'];
const updateDir = (lng: string) => {
  const dir = rtlLangs.includes(lng) ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
};
updateDir(i18n.language);
i18n.on('languageChanged', updateDir);

export default i18n;