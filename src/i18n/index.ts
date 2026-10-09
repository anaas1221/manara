import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ar: {
    translation: {
      app_name: 'منارة',
      app_tagline: 'رفيق رحلتك في التعلم والاقتراب من الله',

      // ─── Nav ───
      nav_home: 'الرئيسية', nav_quran: 'القرآن', nav_adhkar: 'الأذكار',
      nav_duas: 'الأدعية', nav_hadith: 'الأحاديث', nav_prayer: 'الصلاة',
      nav_qibla: 'القبلة', nav_mosques: 'المساجد', nav_tasbeeh: 'السبحة',
      nav_names: 'أسماء الله', nav_hajj: 'الحج والعمرة', nav_library: 'المكتبة',
      nav_learn: 'تعلّم', nav_my_journey: 'رحلتي', nav_settings: 'الإعدادات',
      nav_more: 'المزيد', nav_all_sections: 'جميع الأقسام',
      nav_learning_optional: 'التعلم — اختياري',

      // ─── Common ───
      install: 'ثبّت', install_app: 'تثبيت منارة كتطبيق', install_hint: 'على الشاشة الرئيسية',
      install_done: 'التطبيق مثبّت على جهازك', install_step: 'خطوة',
      install_ios_share: 'اضغط زر المشاركة أسفل شاشة Safari',
      install_ios_add: 'اختر "إضافة إلى الشاشة الرئيسية"',
      install_ios_confirm: 'اضغط "إضافة" في الأعلى',
      install_and_open_menu: 'افتح قائمة المتصفح',
      install_and_choose: 'اختر "تثبيت التطبيق" أو "إضافة إلى الشاشة الرئيسية"',
      install_and_confirm: 'اضغط "تثبيت" للتأكيد',
      install_tip: 'بمجرد التثبيت، سيعمل موقع منارة كتطبيق مستقل — مع دعم كامل للعمل بدون إنترنت.',
      got_it: 'فهمت', search: 'ابحث', clear: 'مسح', back: 'رجوع', close: 'إغلاق',
      save: 'حفظ', cancel: 'إلغاء', delete: 'حذف', share: 'مشاركة', copy: 'نسخ',
      copied: 'تم النسخ', loading: 'جاري التحميل…', retry: 'إعادة المحاولة',
      view_all: 'عرض الكل', all: 'الكل',
      not_found: '404', not_found_message: 'الصفحة اللي بتدور عليها مش موجودة.',
      back_home: 'العودة للرئيسية',
      language: 'اللغة', theme_light: 'فاتح', theme_dark: 'داكن',
      optional: 'اختياري', of: 'من', step: 'خطوة',

      // ─── Home ───
      next_prayer: 'الصلاة القادمة', remaining: 'متبقي',
      last_read: 'آخر قراءة', start_reading: 'ابدأ القراءة',
      tasbeeh_today: 'السبحة', morning_adhkar: 'أذكار الصباح',
      start_session: 'ابدأ الجلسة', qibla_direction: 'اتجاه القبلة',
      my_prayer: 'صلاتي', follow_prayers: 'تابع صلواتك',
      names_count: '99 اسمًا', want_to_learn: 'تريد أن تتعلّم من الصفر؟',
      free_paths: 'مسارات تعليمية مجانية — اختيارية تمامًا',
      surah_word: 'سورة', ayah_word: 'آية',
      home_quick_quran: 'القرآن الكريم',
      home_learn_desc: 'مسارات تعليمية مجانية — اختيارية تمامًا',
      home_start_session: 'ابدأ الجلسة',
      home_qibla_direction: 'اتجاه القبلة',
      home_names_count: '99 اسمًا',
      home_want_to_learn: 'تريد أن تتعلّم من الصفر؟',
      home_track_prayers: 'تابع صلواتك',

      // ─── Prayer ───
      prayer_fajr: 'الفجر', prayer_sunrise: 'الشروق',
      prayer_dhuhr: 'الظهر', prayer_asr: 'العصر',
      prayer_maghrib: 'المغرب', prayer_isha: 'العشاء',

      // ─── Adhkar ───
      adhkar_title: 'الأذكار', adhkar_subtitle: 'اختر الفئة لبدء جلسة الأذكار',
      daily_wird: 'ورد اليوم', read: 'اقرأ', start: 'ابدأ', dhikr_count: 'ذكر',
      adhkar_target: 'حدد هدفك', adhkar_target_hint: 'اختر من أي ذكر تبدأ، وإلى أي ذكر تنتهي.',
      adhkar_from: 'من الذكر رقم', adhkar_to: 'إلى الذكر رقم',
      adhkar_all: 'الكل', adhkar_half: 'النصف', adhkar_five: '5 أذكار',
      adhkar_selected_target: 'الهدف المحدد', adhkar_start_session: 'ابدأ الجلسة',
      adhkar_cancel_session: 'إلغاء الجلسة',
      adhkar_cancel_confirm: 'هل تريد إلغاء الجلسة؟ سيتم فقدان تقدمك.',
      adhkar_back_to_list: 'العودة لقائمة الأذكار', adhkar_done: 'تم',
      adhkar_prev: 'السابق', adhkar_next: 'التالي', adhkar_finish: 'إنهاء الجلسة',
      adhkar_session_done: 'تمت الجلسة',
      adhkar_completed_all: 'أتممت {count} من الأذكار — تقبّل الله منك.',
      adhkar_new_session: 'جلسة جديدة',
      adhkar_tap_hint: 'اضغط على الزر الأخضر لعدّ الذكر — سيُحفظ تقدمك اليومي تلقائيًا.',
      adhkar_goal_of: 'من', adhkar_goal_dhikr: 'ذكر',
      adhkar_tap_to_read: 'اضغط للقراءة',
      adhkar_completed_today: 'ما شاء الله — أتممت وردك اليوم',
      adhkar_dhikr_of: 'الذكر {n} من {total}',
      adhkar_target_of: 'الهدف: {n}',
      adhkar_session_of: 'تمت جلسة {title}',
      adhkar_five_word: '5 أذكار',
      adhkar_half_word: 'النصف',

      // ─── Duas ───
      duas_title: 'الأدعية', duas_subtitle: 'أدعية مأثورة من الكتاب والسنة',
      duas_search: 'ابحث في الأدعية…', dua_count: 'دعاء',
      duas_back: 'العودة لقائمة الأدعية', duas_no_results: 'لا توجد نتائج',

      // ─── Hadith ───
      hadith_title: 'الأحاديث النبوية',
      hadith_subtitle: 'أحاديث من الصحيحين والسنن — بمصادرها وتخريجها',
      hadith_search: 'ابحث في نص الحديث، الراوي، أو المصدر…',
      hadith_narrator: 'الراوي', hadith_source: 'المصدر',
      hadith_book: 'الكتاب', hadith_number: 'رقم',
      no_results: 'لا توجد نتائج',

      // ─── Quran ───
      quran_title: 'القرآن الكريم', quran_offline: 'تحميل القرآن للاستخدام Offline',
      quran_offline_hint: 'حمّل كل السور مرة واحدة — بعدها الموقع يشتغل من غير إنترنت',
      quran_surahs_saved: '{count} / 114 سورة محفوظة',
      quran_download_all: 'تحميل كل السور',
      quran_downloaded: 'محمّل بالكامل', quran_full_pdf: 'المصحف الكامل — PDF',
      quran_continue: 'تابع القراءة', quran_favorites: 'المفضلة',
      quran_surahs_saved_count: '{count} سورة محفوظة',
      quran_search_placeholder: 'ابحث باسم السورة، رقمها، أو أي كلمة…',
      quran_search_ayahs: 'الآيات', quran_search_surahs: 'السور',
      quran_loading_surah: 'جاري التحميل…',
      quran_error_load: 'تعذر تحميل السورة. تأكد من اتصالك بالإنترنت.',
      quran_bookmark_hint: 'اضغط لحفظ موضعك · آية {ayah}',
      quran_position_saved: 'تم حفظ موضع القراءة · سورة {surah} — آية {ayah}',
      quran_delete_offline: 'هل تريد حذف كل السور المحفوظة للاستخدام Offline؟',
      quran_prev: 'السابقة', quran_next: 'التالية',
      quran_pdf_preparing: 'جاري تجهيز PDF…',
      quran_pdf_error: 'تعذر إنشاء PDF. حاول مرة أخرى.',
      quran_ayah_label: 'آية', quran_downloading: 'جاري التحميل…', quran_of: 'من',
      quran_copy_ayah_hint: 'اضغط لحفظ موضعك · آية {ayah}',
      quran_share_text: 'اقرأ من منارة',
      quran_retry: 'إعادة المحاولة',
      quran_position_yours: 'موضعك',
      quran_no_surah_match: 'لا توجد سور مطابقة',
      quran_no_ayah_contains: 'لا توجد آيات تحتوي على "{query}"',
      quran_copied_link: 'تم نسخ الرابط',
      quran_surah_type_meccan: 'مكية',
      quran_surah_type_medinan: 'مدنية',
      quran_ayahs_count: '{count} آية',
      quran_share_ayah_title: 'سورة {surah}',
      quran_pdf_filename: 'منارة - سورة {surah}',
      quran_txt_filename: 'منارة - سورة {surah}',
      quran_search_placeholder_alt: 'ابحث باسم السورة، رقمها، أو أي كلمة...',
      quran_download_all_short: 'تحميل كل السور',
      quran_download_full: 'محمّل بالكامل ✓',
      quran_delete: 'حذف',
      quran_back: 'رجوع',
      quran_close: 'إغلاق',
      quran_bookmark: 'حفظ',
      quran_pdf: 'PDF',
      quran_txt: 'TXT',
      quran_copy: 'نسخ',
      quran_share: 'مشاركة',
      quran_searching: 'جاري البحث...',

      // ─── Prayer Page ───
      prayer_title: 'صلاتي — اليوم',
      prayer_prayed: 'صليت', prayer_jamaah: 'جماعة', prayer_mosque: 'في المسجد',
      prayer_save: 'حفظ تسجيلات اليوم', prayer_saved: 'تم الحفظ بنجاح',

      // ─── Qibla ───
      qibla_title: 'اتجاه القبلة', qibla_from_north: '{deg}° من الشمال',
      qibla_active: 'البوصلة نشطة — وجّه جهازك للأعلى ولف حول نفسك.',
      qibla_need_permission: 'اضغط زر التفعيل للسماح بالبوصلة.',
      qibla_no_compass: 'جهازك لا يدعم البوصلة — استخدم الرقم.',
      qibla_default: 'اتجاه القبلة من الشمال الحقيقي.',
      qibla_enable: 'تفعيل البوصلة', qibla_device_heading: 'اتجاه جهازك: {deg}°',
      qibla_facing: 'أنت الآن متجه للقبلة ✓',
      qibla_location_error: 'تعذر الوصول لموقعك. اسمح بالوصول للموقع.',
      qibla_location_unsupported: 'خدمة الموقع غير مدعومة.',
      qibla_getting_location: 'جاري تحديد موقعك…',
      compass_n: 'ش', compass_s: 'ج', compass_e: 'ق', compass_w: 'غ',

      // ─── Mosques ───
      mosques_title: 'المساجد القريبة',
      mosques_subtitle: 'استعرض موقعك، وابحث عن المساجد حولك',
      mosques_search_google: 'ابحث في Google Maps',
      mosques_open_osm: 'افتح OpenStreetMap',
      mosques_your_location: 'إحداثياتك', mosques_refresh: 'تحديث الموقع',
      mosques_how: 'كيف أجد المساجد القريبة؟',
      mosques_how_hint: 'اضغط "ابحث في Google Maps" — سيفتح تطبيق/موقع Google Maps مباشرة ويبحث عن المساجد حول موقعك.',
      mosques_loading: 'جاري تحديد موقعك…', mosques_retry: 'إعادة المحاولة',
      mosques_location_error: 'تعذر الحصول على موقعك. تأكد من السماح بالوصول للموقع.',
      mosques_location_unsupported: 'خدمة الموقع غير مدعومة في متصفحك.',
      mosques_find_google: 'ابحث عن المساجد في Google Maps',
      mosques_coordinates: 'إحداثياتك',
      mosques_update: 'تحديث الموقع',
      mosques_location_hint: 'كيف أجد المساجد القريبة؟',
      mosques_location_hint_desc: 'اضغط "ابحث في Google Maps" — سيفتح تطبيق/موقع Google Maps مباشرة ويبحث عن المساجد حول موقعك.',

      // ─── Tasbeeh ───
      tasbeeh_title: 'السبحة', tasbeeh_target: 'الهدف: {target}', tasbeeh_today_count: 'اليوم',
      tasbeeh_reset: 'تصفير', tasbeeh_style: 'شكل السبحة ({count} نمط):',
      tasbeeh_custom: 'مخصص', tasbeeh_custom_placeholder: 'اكتب ذكرك هنا…',
      tasbeeh_sound: 'الصوت',
      tasbeeh_custom_cancel: 'إلغاء', tasbeeh_custom_save: 'حفظ',

      // ─── Names ───
      names_title: 'أسماء الله الحسنى',
      names_subtitle: '99 اسمًا — اضغط على أي اسم لعرض معناه.',
      names_number: 'الاسم رقم {n}', names_close: 'إغلاق',

      // ─── Hajj ───
      hajj_title: 'الحج والعمرة',
      hajj_subtitle: 'دليل شامل خطوة بخطوة — ماذا تفعل وماذا تقول',
      hajj_disclaimer: 'هذا الدليل للاسترشاد العام. للفتاوى والتفاصيل الفقهية، يُنصح بسؤال أهل العلم أو الرجوع لكتب المناسك الموثوقة.',
      hajj_steps_count: '{count} خطوة', hajj_sections_count: '{count} قسم',
      hajj_back_to: 'العودة لـ', hajj_back: 'العودة',
      hajj_what_to_do: 'ماذا أفعل؟', hajj_what_to_say: 'ماذا أقول؟',
      hajj_tips: 'تلميحات', hajj_source_label: 'المصدر:',
      hajj_step_count: '{count} خطوة', hajj_section_count: '{count} قسم',

      // ─── Learn ───
      learn_title: 'تعلّم', learn_subtitle: 'ابدأ رحلتك من الصفر — خطوة بخطوة',
      learn_your_progress: 'تقدمك', learn_lesson_of: '{done} من {total} درس',
      learn_start_path: 'ابدأ المسار', learn_continue_path: 'تابع المسار',
      learn_completed_label: 'مكتمل', learn_lesson_completed: 'درس',
      learn_minutes: 'دقائق', learn_lesson_word: 'درس',
      learn_lesson_count: '{count} درس',
      learn_path_completed_count: '{done} مكتمل',

      // ─── LessonView ───
      lesson_back_to_paths: 'العودة للمسارات', lesson_home: 'الرئيسية',
      lesson_minutes: '{n} دقيقة', lesson_of: 'الدرس {n} من {total}',
      lesson_what_to_say: 'ماذا أقول؟', lesson_source: 'المصدر:',
      lesson_related: 'روابط ذات صلة', lesson_complete: 'إكمال الدرس',
      lesson_completed: 'تم إكمال الدرس',
      lesson_completed_toast: 'أحسنت! تم إكمال الدرس ✓',
      lesson_incomplete_toast: 'تم إلغاء إكمال الدرس',
      lesson_prev: 'الدرس السابق', lesson_next: 'الدرس التالي',
      lesson_journey_complete: 'اكتملت الرحلة!',
      lesson_not_found_title: 'الدرس غير موجود',
      lesson_not_found: 'الدرس غير موجود',
      lesson_back_to_learn: 'العودة للتعلم',
      lesson_minute_short: '{n} د',

      // ─── MyJourney ───
      journey_title: 'رحلتك مع منارة', journey_complete_title: 'ما شاء الله!',
      journey_complete_subtitle: 'أكملت كل الدروس — تقبّل الله منك',
      journey_subtitle: 'تابع خطوة بخطوة، فالقليل الدائم خير من الكثير المنقطع',
      journey_progress: 'تقدمك', journey_lessons_completed: 'درس مكتمل',
      journey_lessons_remaining: 'درس متبقي', journey_lessons_total: 'إجمالي الدروس',
      journey_next_step: 'خطوتك التالية', journey_start_now: 'ابدأ الدرس الآن',
      journey_all_done: 'أكملت كل الدروس 🎉',
      journey_all_done_hint: 'ما شاء الله! الآن يمكنك:',
      journey_all_done_bullet1: '• مراجعة الدروس التي تريدها',
      journey_all_done_bullet2: '• العودة للمحتوى للاستزادة',
      journey_all_done_bullet3: '• البدء في تطبيق ما تعلمته',
      journey_view_all_paths: 'عرض كل المسارات',
      journey_paths: 'المسارات', journey_reset: 'إعادة تعيين كل التقدم',
      journey_reset_confirm: 'سيتم حذف كل تقدمك في الدروس. متابعة؟',
      journey_back_home: 'العودة للرئيسية', journey_paths_label: 'المسارات',
      journey_lessons_count_short: '{done}/{total}',
      journey_minutes_short: '{n} د',

      // ─── Settings ───
      settings_title: 'الإعدادات', settings_install: 'تثبيت التطبيق',
      settings_install_hint: 'ثبّت منارة كتطبيق على جهازك للوصول السريع + العمل بدون إنترنت.',
      settings_theme: 'المظهر', settings_theme_light: 'فاتح', settings_theme_dark: 'داكن',
      settings_location: 'الموقع',
      settings_location_hint: 'يُستخدم لحساب مواقيت الصلاة والقبلة والمساجد القريبة.',
      settings_location_remove: 'حذف الموقع المحفوظ',
      settings_danger: 'منطقة الخطر', settings_delete_all: 'حذف جميع بياناتي',
      settings_delete_confirm: 'سيتم حذف جميع بياناتك المخزنة على هذا الجهاز. لا يمكن التراجع. متابعة؟',
      settings_deleted: 'تم حذف جميع البيانات',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar',                  // ← عربي دائمًا
    fallbackLng: 'ar',
    supportedLngs: ['ar'],
    interpolation: { escapeValue: false },
  });

// اضبط الاتجاه دائمًا RTL
document.documentElement.dir = 'rtl';
document.documentElement.lang = 'ar';

export default i18n;