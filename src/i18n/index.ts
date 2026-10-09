import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  // ============================================
  // 1. العربية
  // ============================================
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
      language: 'اللغة', search_placeholder: 'ابحث...',
      install: 'ثبّت', learn_optional: 'التعلم — اختياري',
    }
  },

  // ============================================
  // 2. English
  // ============================================
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
      language: 'Language', search_placeholder: 'Search...',
      install: 'Install', learn_optional: 'Learning — Optional',
    }
  },

  // ============================================
  // 3. Français
  // ============================================
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
      language: 'Langue', search_placeholder: 'Rechercher...',
      install: 'Installer', learn_optional: 'Apprentissage — Optionnel',
    }
  },

  // ============================================
  // 4. Türkçe
  // ============================================
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
      language: 'Dil', search_placeholder: 'Ara...',
      install: 'Yükle', learn_optional: 'Öğrenme — İsteğe Bağlı',
    }
  },

  // ============================================
  // 5. اردو
  // ============================================
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
      language: 'زبان', search_placeholder: 'تلاش...',
      install: 'انسٹال', learn_optional: 'سیکھنا — اختیاری',
    }
  },

  // ============================================
  // 6. Indonesia
  // ============================================
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
      language: 'Bahasa', search_placeholder: 'Cari...',
      install: 'Pasang', learn_optional: 'Belajar — Opsional',
    }
  },

  // ============================================
  // 7. বাংলা
  // ============================================
  bn: {
    translation: {
      app_name: 'মানারা',
      nav_home: 'হোম', nav_quran: 'কুরআন', nav_adhkar: 'আযকার',
      nav_duas: 'দুআ', nav_hadith: 'হাদিস', nav_prayer: 'নামাজ',
      nav_qibla: 'কিবলা', nav_mosques: 'মসজিদ', nav_tasbeeh: 'তাসবিহ',
      nav_names: 'আল্লাহর নাম', nav_hajj: 'হজ ও উমরাহ', nav_library: 'গ্রন্থাগার',
      nav_learn: 'শিখুন', nav_settings: 'সেটিংস',
      next_prayer: 'পরবর্তী নামাজ', remaining: 'বাকি',
      last_read: 'পড়া চালিয়ে যান', start_reading: 'পড়া শুরু করুন',
      morning_adhkar: 'সকালের আযকার', qibla_direction: 'কিবলার দিক',
      my_prayer: 'আমার নামাজ', names_count: '৯৯ নাম',
      theme_light: 'উজ্জ্বল', theme_dark: 'অন্ধকার',
      language: 'ভাষা', search_placeholder: 'খুঁজুন...',
      install: 'ইনস্টল', learn_optional: 'শেখা — ঐচ্ছিক',
    }
  },

  // ============================================
  // 8. فارسی
  // ============================================
  fa: {
    translation: {
      app_name: 'مناره',
      nav_home: 'خانه', nav_quran: 'قرآن', nav_adhkar: 'اذکار',
      nav_duas: 'دعاها', nav_hadith: 'حدیث', nav_prayer: 'نماز',
      nav_qibla: 'قبله', nav_mosques: 'مساجد', nav_tasbeeh: 'تسبیح',
      nav_names: 'اسماء الحسنی', nav_hajj: 'حج و عمره', nav_library: 'کتابخانه',
      nav_learn: 'آموزش', nav_settings: 'تنظیمات',
      next_prayer: 'نماز بعدی', remaining: 'باقی‌مانده',
      last_read: 'ادامه خواندن', start_reading: 'شروع خواندن',
      morning_adhkar: 'اذکار صبح', qibla_direction: 'جهت قبله',
      my_prayer: 'نماز من', names_count: '۹۹ نام',
      theme_light: 'روشن', theme_dark: 'تاریک',
      language: 'زبان', search_placeholder: 'جستجو...',
      install: 'نصب', learn_optional: 'آموزش — اختیاری',
    }
  },

  // ============================================
  // 9. Español
  // ============================================
  es: {
    translation: {
      app_name: 'Manara',
      nav_home: 'Inicio', nav_quran: 'Corán', nav_adhkar: 'Dhikr',
      nav_duas: 'Duas', nav_hadith: 'Hadiz', nav_prayer: 'Oración',
      nav_qibla: 'Qibla', nav_mosques: 'Mezquitas', nav_tasbeeh: 'Tasbih',
      nav_names: 'Nombres Divinos', nav_hajj: 'Hajj y Umrah', nav_library: 'Biblioteca',
      nav_learn: 'Aprender', nav_settings: 'Ajustes',
      next_prayer: 'Próxima Oración', remaining: 'Restante',
      last_read: 'Continuar Leyendo', start_reading: 'Empezar a Leer',
      morning_adhkar: 'Dhikr de la mañana', qibla_direction: 'Dirección de la Qibla',
      my_prayer: 'Mi Oración', names_count: '99 Nombres',
      theme_light: 'Claro', theme_dark: 'Oscuro',
      language: 'Idioma', search_placeholder: 'Buscar...',
      install: 'Instalar', learn_optional: 'Aprendizaje — Opcional',
    }
  },

  // ============================================
  // 10. Deutsch
  // ============================================
  de: {
    translation: {
      app_name: 'Manara',
      nav_home: 'Startseite', nav_quran: 'Koran', nav_adhkar: 'Dhikr',
      nav_duas: 'Bittgebete', nav_hadith: 'Hadith', nav_prayer: 'Gebet',
      nav_qibla: 'Qibla', nav_mosques: 'Moscheen', nav_tasbeeh: 'Tasbih',
      nav_names: 'Göttliche Namen', nav_hajj: 'Hajj & Umra', nav_library: 'Bibliothek',
      nav_learn: 'Lernen', nav_settings: 'Einstellungen',
      next_prayer: 'Nächstes Gebet', remaining: 'Verbleibend',
      last_read: 'Weiterlesen', start_reading: 'Lesen beginnen',
      morning_adhkar: 'Morgen-Dhikr', qibla_direction: 'Qibla-Richtung',
      my_prayer: 'Mein Gebet', names_count: '99 Namen',
      theme_light: 'Hell', theme_dark: 'Dunkel',
      language: 'Sprache', search_placeholder: 'Suchen...',
      install: 'Installieren', learn_optional: 'Lernen — Optional',
    }
  },

  // ============================================
  // 11. Русский
  // ============================================
  ru: {
    translation: {
      app_name: 'Манара',
      nav_home: 'Главная', nav_quran: 'Коран', nav_adhkar: 'Зикр',
      nav_duas: 'Дуа', nav_hadith: 'Хадис', nav_prayer: 'Намаз',
      nav_qibla: 'Кибла', nav_mosques: 'Мечети', nav_tasbeeh: 'Тасбих',
      nav_names: 'Имена Аллаха', nav_hajj: 'Хадж и Умра', nav_library: 'Библиотека',
      nav_learn: 'Обучение', nav_settings: 'Настройки',
      next_prayer: 'Следующий намаз', remaining: 'Осталось',
      last_read: 'Продолжить чтение', start_reading: 'Начать чтение',
      morning_adhkar: 'Утренний зикр', qibla_direction: 'Направление Киблы',
      my_prayer: 'Мой намаз', names_count: '99 имён',
      theme_light: 'Светлая', theme_dark: 'Тёмная',
      language: 'Язык', search_placeholder: 'Поиск...',
      install: 'Установить', learn_optional: 'Обучение — Опционально',
    }
  },

  // ============================================
  // 12. हिन्दी
  // ============================================
  hi: {
    translation: {
      app_name: 'मनारा',
      nav_home: 'होम', nav_quran: 'क़ुरआन', nav_adhkar: 'ज़िक्र',
      nav_duas: 'दुआएँ', nav_hadith: 'हदीस', nav_prayer: 'नमाज़',
      nav_qibla: 'क़िबला', nav_mosques: 'मस्जिदें', nav_tasbeeh: 'तस्बीह',
      nav_names: 'अल्लाह के नाम', nav_hajj: 'हज और उमरा', nav_library: 'पुस्तकालय',
      nav_learn: 'सीखें', nav_settings: 'सेटिंग्स',
      next_prayer: 'अगली नमाज़', remaining: 'बाक़ी',
      last_read: 'पढ़ना जारी रखें', start_reading: 'पढ़ना शुरू करें',
      morning_adhkar: 'सुबह का ज़िक्र', qibla_direction: 'क़िबला की दिशा',
      my_prayer: 'मेरी नमाज़', names_count: '99 नाम',
      theme_light: 'उजला', theme_dark: 'गहरा',
      language: 'भाषा', search_placeholder: 'खोजें...',
      install: 'इंस्टॉल', learn_optional: 'सीखना — वैकल्पिक',
    }
  },

  // ============================================
  // 13. Bahasa Melayu
  // ============================================
  ms: {
    translation: {
      app_name: 'Manara',
      nav_home: 'Utama', nav_quran: 'Al-Quran', nav_adhkar: 'Zikir',
      nav_duas: 'Doa', nav_hadith: 'Hadis', nav_prayer: 'Solat',
      nav_qibla: 'Kiblat', nav_mosques: 'Masjid', nav_tasbeeh: 'Tasbih',
      nav_names: 'Nama-nama Allah', nav_hajj: 'Haji & Umrah', nav_library: 'Perpustakaan',
      nav_learn: 'Belajar', nav_settings: 'Tetapan',
      next_prayer: 'Solat Seterusnya', remaining: 'Baki',
      last_read: 'Teruskan Membaca', start_reading: 'Mula Membaca',
      morning_adhkar: 'Zikir Pagi', qibla_direction: 'Arah Kiblat',
      my_prayer: 'Solat Saya', names_count: '99 Nama',
      theme_light: 'Cerah', theme_dark: 'Gelap',
      language: 'Bahasa', search_placeholder: 'Cari...',
      install: 'Pasang', learn_optional: 'Pembelajaran — Pilihan',
    }
  },

  // ============================================
  // 14. 中文
  // ============================================
  zh: {
    translation: {
      app_name: '玛纳拉',
      nav_home: '首页', nav_quran: '古兰经', nav_adhkar: '记念',
      nav_duas: '祈祷', nav_hadith: '圣训', nav_prayer: '礼拜',
      nav_qibla: '朝向', nav_mosques: '清真寺', nav_tasbeeh: '念珠',
      nav_names: '真主的尊名', nav_hajj: '朝觐与副朝', nav_library: '图书馆',
      nav_learn: '学习', nav_settings: '设置',
      next_prayer: '下次礼拜', remaining: '剩余',
      last_read: '继续阅读', start_reading: '开始阅读',
      morning_adhkar: '晨间记念', qibla_direction: '朝向方向',
      my_prayer: '我的礼拜', names_count: '99 个尊名',
      theme_light: '明亮', theme_dark: '暗色',
      language: '语言', search_placeholder: '搜索...',
      install: '安装', learn_optional: '学习 — 可选',
    }
  },

  // ============================================
  // 15. Kiswahili
  // ============================================
  sw: {
    translation: {
      app_name: 'Manara',
      nav_home: 'Nyumbani', nav_quran: 'Qurani', nav_adhkar: 'Dhikri',
      nav_duas: 'Dua', nav_hadith: 'Hadithi', nav_prayer: 'Swala',
      nav_qibla: 'Kibla', nav_mosques: 'Misikiti', nav_tasbeeh: 'Tasbihi',
      nav_names: 'Majina ya Mwenyezi Mungu', nav_hajj: 'Hija na Umrah', nav_library: 'Maktaba',
      nav_learn: 'Jifunze', nav_settings: 'Mipangilio',
      next_prayer: 'Swala Inayofuata', remaining: 'Iliyobaki',
      last_read: 'Endelea Kusoma', start_reading: 'Anza Kusoma',
      morning_adhkar: 'Dhikri za Asubuhi', qibla_direction: 'Mwelekeo wa Kibla',
      my_prayer: 'Swala Yangu', names_count: 'Majina 99',
      theme_light: 'Nuru', theme_dark: 'Giza',
      language: 'Lugha', search_placeholder: 'Tafuta...',
      install: 'Sakinisha', learn_optional: 'Kujifunza — Hiari',
    }
  },

  // ============================================
  // 16. Português
  // ============================================
  pt: {
    translation: {
      app_name: 'Manara',
      nav_home: 'Início', nav_quran: 'Alcorão', nav_adhkar: 'Dhikr',
      nav_duas: 'Duas', nav_hadith: 'Hadith', nav_prayer: 'Oração',
      nav_qibla: 'Qibla', nav_mosques: 'Mesquitas', nav_tasbeeh: 'Tasbih',
      nav_names: 'Nomes Divinos', nav_hajj: 'Hajj e Umrah', nav_library: 'Biblioteca',
      nav_learn: 'Aprender', nav_settings: 'Configurações',
      next_prayer: 'Próxima Oração', remaining: 'Restante',
      last_read: 'Continuar Lendo', start_reading: 'Começar a Ler',
      morning_adhkar: 'Dhikr da Manhã', qibla_direction: 'Direção da Qibla',
      my_prayer: 'Minha Oração', names_count: '99 Nomes',
      theme_light: 'Claro', theme_dark: 'Escuro',
      language: 'Idioma', search_placeholder: 'Pesquisar...',
      install: 'Instalar', learn_optional: 'Aprendizado — Opcional',
    }
  }
};

// ✅ اللغات اللي محتاجة RTL (من اليمين لليسار)
const RTL_LANGS = ['ar', 'ur', 'fa'];

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

// تحديث اتجاه الصفحة تلقائيًا
const updateDir = (lng: string) => {
  const baseLang = lng.split('-')[0]; // en-US → en
  const dir = RTL_LANGS.includes(baseLang) ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = baseLang;
};

updateDir(i18n.language);
i18n.on('languageChanged', updateDir);

export default i18n;