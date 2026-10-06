export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  pdfUrl: string;
  readUrl: string;
  isPublicDomain: boolean;
  source: string;
}

export interface BookCategory {
  slug: string;
  title: string;
  icon: string;
  description: string;
}

export const BOOK_CATEGORIES: BookCategory[] = [
  { slug: 'quran',      title: 'علوم القرآن والتفسير', icon: 'bi-book',           description: 'التفسير وعلوم القرآن' },
  { slug: 'hadith',     title: 'علوم الحديث',          icon: 'bi-journal-text',  description: 'شروح الحديث ومصطلحه' },
  { slug: 'seerah',     title: 'السيرة النبوية',       icon: 'bi-person-badge',  description: 'سيرة النبي ﷺ' },
  { slug: 'stories',    title: 'قصص الأنبياء',         icon: 'bi-people',        description: 'قصص الأنبياء والمرسلين' },
  { slug: 'fiqh',       title: 'الفقه الإسلامي',       icon: 'bi-hammer',        description: 'كتب الفقه وأصوله' },
  { slug: 'aqeedah',    title: 'العقيدة',              icon: 'bi-shield-check',  description: 'العقيدة والتوحيد' },
  { slug: 'akhlaq',     title: 'الأخلاق والرقائق',     icon: 'bi-heart',         description: 'تزكية النفس والأخلاق' },
  { slug: 'history',    title: 'التاريخ الإسلامي',     icon: 'bi-clock-history', description: 'تاريخ الأمة الإسلامية' },
  { slug: 'kids',       title: 'كتب الأطفال',          icon: 'bi-balloon',       description: 'كتب مبسطة للأطفال' }
];

export const BOOKS: Book[] = [
  // ============ تفسير وعلوم القرآن ============
  {
    id: 'tafsir-ibn-kathir', title: 'تفسير القرآن العظيم',
    author: 'ابن كثير', category: 'quran',
    description: 'من أشهر كتب التفسير بالمأثور، يجمع بين الرواية والدراية.',
    pdfUrl: 'https://ia801604.us.archive.org/24/items/tafseer-ibn-katheer-ar/tafseer-ibn-katheer-ar.pdf',
    readUrl: 'https://archive.org/details/tafseer-ibn-katheer-ar',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'tafsir-saadi', title: 'تيسير الكريم الرحمن في تفسير كلام المنان',
    author: 'عبد الرحمن بن ناصر السعدي', category: 'quran',
    description: 'تفسير ميسّر سهل العبارة، مناسب للمبتدئين والمتقدمين.',
    pdfUrl: 'https://ia801501.us.archive.org/5/items/tafseer-alsadi/tafseer-alsadi.pdf',
    readUrl: 'https://archive.org/details/tafseer-alsadi',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'tafsir-tabari', title: 'جامع البيان عن تأويل آي القرآن',
    author: 'ابن جرير الطبري', category: 'quran',
    description: 'إمام التفاسير بالمأثور — مرجع أساسي لعلماء التفسير.',
    pdfUrl: 'https://archive.org/download/tafseer-tabari/tafseer-tabari.pdf',
    readUrl: 'https://archive.org/details/tafseer-tabari',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'tafsir-qurtubi', title: 'الجامع لأحكام القرآن',
    author: 'القرطبي', category: 'quran',
    description: 'من أعظم كتب التفسير الفقهي وأحكام القرآن.',
    pdfUrl: 'https://archive.org/download/tafseer-qurtubi/tafseer-qurtubi.pdf',
    readUrl: 'https://archive.org/details/tafseer-qurtubi',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'tafsir-baghawi', title: 'معالم التنزيل',
    author: 'البغوي', category: 'quran',
    description: 'من أوثق كتب التفسير بالمأثور.',
    pdfUrl: 'https://archive.org/download/tafseer-baghawi/tafseer-baghawi.pdf',
    readUrl: 'https://archive.org/details/tafseer-baghawi',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'ulum-quran-zarkashi', title: 'البرهان في علوم القرآن',
    author: 'الزركشي', category: 'quran',
    description: 'من أهم كتب علوم القرآن على الإطلاق.',
    pdfUrl: 'https://archive.org/download/alburhan-fi-ulum-alquran/alburhan-fi-ulum-alquran.pdf',
    readUrl: 'https://archive.org/details/alburhan-fi-ulum-alquran',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'ulum-quran-suyuti', title: 'الإتقان في علوم القرآن',
    author: 'السيوطي', category: 'quran',
    description: 'موسوعة شاملة في علوم القرآن.',
    pdfUrl: 'https://archive.org/download/alitqan-fi-ulum-alquran/alitqan-fi-ulum-alquran.pdf',
    readUrl: 'https://archive.org/details/alitqan-fi-ulum-alquran',
    isPublicDomain: true, source: 'archive.org'
  },

  // ============ الحديث ============
  {
    id: 'hadith-bukhari', title: 'صحيح البخاري',
    author: 'الإمام البخاري', category: 'hadith',
    description: 'أصح كتاب بعد كتاب الله تعالى.',
    pdfUrl: 'https://archive.org/download/SahihAlBukhariArabic/SahihAlBukhariArabic.pdf',
    readUrl: 'https://archive.org/details/SahihAlBukhariArabic',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'hadith-muslim', title: 'صحيح مسلم',
    author: 'الإمام مسلم', category: 'hadith',
    description: 'ثاني أصح كتب الحديث النبوي.',
    pdfUrl: 'https://archive.org/download/SahihMuslimArabic/SahihMuslimArabic.pdf',
    readUrl: 'https://archive.org/details/SahihMuslimArabic',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'hadith-abu-dawud', title: 'سنن أبي داود',
    author: 'أبو داود', category: 'hadith',
    description: 'من كتب السنن الأربعة — يركز على أحاديث الأحكام.',
    pdfUrl: 'https://archive.org/download/sunan-abu-dawood/sunan-abu-dawood.pdf',
    readUrl: 'https://archive.org/details/sunan-abu-dawood',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'hadith-tirmidhi', title: 'سنن الترمذي',
    author: 'الترمذي', category: 'hadith',
    description: 'من كتب السنن الأربعة — يذكر درجة الحديث بعد كل حديث.',
    pdfUrl: 'https://archive.org/download/sunan-tirmidhi/sunan-tirmidhi.pdf',
    readUrl: 'https://archive.org/details/sunan-tirmidhi',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'hadith-nasai', title: 'سنن النسائي',
    author: 'النسائي', category: 'hadith',
    description: 'من أقل كتب السنن أحاديث ضعيفة.',
    pdfUrl: 'https://archive.org/download/sunan-nasai/sunan-nasai.pdf',
    readUrl: 'https://archive.org/details/sunan-nasai',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'hadith-ibn-majah', title: 'سنن ابن ماجه',
    author: 'ابن ماجه', category: 'hadith',
    description: 'سادس الكتب الستة.',
    pdfUrl: 'https://archive.org/download/sunan-ibn-majah/sunan-ibn-majah.pdf',
    readUrl: 'https://archive.org/details/sunan-ibn-majah',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'hadith-muwatta', title: 'موطأ الإمام مالك',
    author: 'الإمام مالك', category: 'hadith',
    description: 'من أوائل كتب الحديث — أساس المذهب المالكي.',
    pdfUrl: 'https://archive.org/download/muwatta-malik/muwatta-malik.pdf',
    readUrl: 'https://archive.org/details/muwatta-malik',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'hadith-riyad', title: 'رياض الصالحين',
    author: 'الإمام النووي', category: 'hadith',
    description: 'منتخب من الأحاديث النبوية في الأخلاق والآداب.',
    pdfUrl: 'https://archive.org/download/riyad-assaliheen/riyad-assaliheen.pdf',
    readUrl: 'https://archive.org/details/riyad-assaliheen',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'hadith-arbaeen', title: 'الأربعون النووية',
    author: 'الإمام النووي', category: 'hadith',
    description: '42 حديثًا جامعة لأصول الدين.',
    pdfUrl: 'https://archive.org/download/arbaeen-nawawi/arbaeen-nawawi.pdf',
    readUrl: 'https://archive.org/details/arbaeen-nawawi',
    isPublicDomain: true, source: 'archive.org'
  },

  // ============ السيرة النبوية ============
  {
    id: 'seerah-ibn-hisham', title: 'السيرة النبوية',
    author: 'ابن هشام', category: 'seerah',
    description: 'من أوثق وأقدم كتب السيرة النبوية.',
    pdfUrl: 'https://archive.org/download/seerah-ibn-hisham/seerah-ibn-hisham.pdf',
    readUrl: 'https://archive.org/details/seerah-ibn-hisham',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'seerah-ibn-kathir', title: 'السيرة النبوية',
    author: 'ابن كثير', category: 'seerah',
    description: 'سيرة شاملة بمصادرها وأسانيدها.',
    pdfUrl: 'https://archive.org/download/seerah-ibn-katheer/seerah-ibn-katheer.pdf',
    readUrl: 'https://archive.org/details/seerah-ibn-katheer',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'seerah-raheeq', title: 'الرحيق المختوم',
    author: 'صفي الرحمن المباركفوري', category: 'seerah',
    description: 'حاز على جائزة رابطة العالم الإسلامي — من أفضل كتب السيرة المعاصرة.',
    pdfUrl: 'https://archive.org/download/alraheeq-almakhtoom/alraheeq-almakhtoom.pdf',
    readUrl: 'https://archive.org/details/alraheeq-almakhtoom',
    isPublicDomain: true, source: 'archive.org'
  },

  // ============ قصص الأنبياء ============
  {
    id: 'stories-ibn-kathir', title: 'قصص الأنبياء',
    author: 'ابن كثير', category: 'stories',
    description: 'قصص الأنبياء من آدم إلى محمد ﷺ بالتفصيل.',
    pdfUrl: 'https://archive.org/download/qisas-alanbiya-ibn-katheer/qisas-alanbiya-ibn-katheer.pdf',
    readUrl: 'https://archive.org/details/qisas-alanbiya-ibn-katheer',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'stories-thalabi', title: 'عرائس المجالس في قصص الأنبياء',
    author: 'الثعلبي', category: 'stories',
    description: 'من أوثق كتب قصص الأنبياء القديمة.',
    pdfUrl: 'https://archive.org/download/arais-almajalis/arais-almajalis.pdf',
    readUrl: 'https://archive.org/details/arais-almajalis',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'stories-nadwi', title: 'قصص النبيين للأطفال',
    author: 'أبو الحسن الندوي', category: 'stories',
    description: 'قصص الأنبياء بأسلوب مبسط للأطفال.',
    pdfUrl: 'https://archive.org/download/qisas-nabiyin/qisas-nabiyin.pdf',
    readUrl: 'https://archive.org/details/qisas-nabiyin',
    isPublicDomain: true, source: 'archive.org'
  },

  // ============ الفقه ============
  {
    id: 'fiqh-sunnah', title: 'فقه السنة',
    author: 'سيد سابق', category: 'fiqh',
    description: 'من أشهر كتب الفقه المعاصرة — عرض مبسط بالأدلة.',
    pdfUrl: 'https://archive.org/download/fiqh-alsunnah/fiqh-alsunnah.pdf',
    readUrl: 'https://archive.org/details/fiqh-alsunnah',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'fiqh-bidayat', title: 'بداية المجتهد ونهاية المقتصد',
    author: 'ابن رشد', category: 'fiqh',
    description: 'من أعظم كتب الفقه المقارن.',
    pdfUrl: 'https://archive.org/download/bidayat-almujtahid/bidayat-almujtahid.pdf',
    readUrl: 'https://archive.org/details/bidayat-almujtahid',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'fiqh-mughni', title: 'المغني',
    author: 'ابن قدامة', category: 'fiqh',
    description: 'موسوعة فقهية شاملة على مذهب الحنابلة.',
    pdfUrl: 'https://archive.org/download/almughni/almughni.pdf',
    readUrl: 'https://archive.org/details/almughni',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'fiqh-usul', title: 'الرسالة في أصول الفقه',
    author: 'الإمام الشافعي', category: 'fiqh',
    description: 'أول كتاب في أصول الفقه.',
    pdfUrl: 'https://archive.org/download/alrisala-fi-usul-alfiqh/alrisala-fi-usul-alfiqh.pdf',
    readUrl: 'https://archive.org/details/alrisala-fi-usul-alfiqh',
    isPublicDomain: true, source: 'archive.org'
  },

  // ============ العقيدة ============
  {
    id: 'aqeedah-wasitiyyah', title: 'العقيدة الواسطية',
    author: 'ابن تيمية', category: 'aqeedah',
    description: 'رسالة جامعة في العقيدة.',
    pdfUrl: 'https://archive.org/download/alaqeedah-alwasitiyyah/alaqeedah-alwasitiyyah.pdf',
    readUrl: 'https://archive.org/details/alaqeedah-alwasitiyyah',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'aqeedah-tahawiyyah', title: 'العقيدة الطحاوية',
    author: 'أبو جعفر الطحاوي', category: 'aqeedah',
    description: 'بيان اعتقاد أهل السنة والجماعة.',
    pdfUrl: 'https://archive.org/download/alaqeedah-altahawiyyah/alaqeedah-altahawiyyah.pdf',
    readUrl: 'https://archive.org/details/alaqeedah-altahawiyyah',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'aqeedah-sharh-usul', title: 'شرح كتاب التوحيد',
    author: 'محمد بن عبد الوهاب', category: 'aqeedah',
    description: 'شرح كتاب التوحيد الذي هو حق الله على العبيد.',
    pdfUrl: 'https://archive.org/download/shath-kitab-altawheed/shath-kitab-altawheed.pdf',
    readUrl: 'https://archive.org/details/shath-kitab-altawheed',
    isPublicDomain: true, source: 'archive.org'
  },

  // ============ الأخلاق والرقائق ============
  {
    id: 'akhlaq-ihyaa', title: 'إحياء علوم الدين',
    author: 'أبو حامد الغزالي', category: 'akhlaq',
    description: 'من أعظم كتب التزكية والرقائق.',
    pdfUrl: 'https://archive.org/download/ihyaa-ulum-aldin/ihyaa-ulum-aldin.pdf',
    readUrl: 'https://archive.org/details/ihyaa-ulum-aldin',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'akhlaq-madarij', title: 'مدارج السالكين',
    author: 'ابن القيم', category: 'akhlaq',
    description: 'شرح منازل السائرين — من أجمل كتب التزكية.',
    pdfUrl: 'https://archive.org/download/madarij-alsalikeen/madarij-alsalikeen.pdf',
    readUrl: 'https://archive.org/details/madarij-alsalikeen',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'akhlaq-fawaid', title: 'الفوائد',
    author: 'ابن القيم', category: 'akhlaq',
    description: 'فوائد إيمانية وتربوية عظيمة.',
    pdfUrl: 'https://archive.org/download/alfawaid-ibn-alqayyim/alfawaid-ibn-alqayyim.pdf',
    readUrl: 'https://archive.org/details/alfawaid-ibn-alqayyim',
    isPublicDomain: true, source: 'archive.org'
  },

  // ============ التاريخ ============
  {
    id: 'history-tabari', title: 'تاريخ الرسل والملوك',
    author: 'ابن جرير الطبري', category: 'history',
    description: 'من أهم كتب التاريخ الإسلامي.',
    pdfUrl: 'https://archive.org/download/tareekh-altabari/tareekh-altabari.pdf',
    readUrl: 'https://archive.org/details/tareekh-altabari',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'history-ibn-kathir', title: 'البداية والنهاية',
    author: 'ابن كثير', category: 'history',
    description: 'تاريخ شامل من بدء الخلق إلى نهاية الزمان.',
    pdfUrl: 'https://archive.org/download/albidaya-walnihaya/albidaya-walnihaya.pdf',
    readUrl: 'https://archive.org/details/albidaya-walnihaya',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'history-ibn-khaldun', title: 'المقدمة',
    author: 'ابن خلدون', category: 'history',
    description: 'مقدمة ابن خلدون — أساس علم الاجتماع.',
    pdfUrl: 'https://archive.org/download/muqaddimah-ibn-khaldun/muqaddimah-ibn-khaldun.pdf',
    readUrl: 'https://archive.org/details/muqaddimah-ibn-khaldun',
    isPublicDomain: true, source: 'archive.org'
  },

  // ============ الأطفال ============
  {
    id: 'kids-seerah', title: 'السيرة النبوية للأطفال',
    author: 'مجموعة من المؤلفين', category: 'kids',
    description: 'سيرة النبي ﷺ بأسلوب مبسط للناشئة.',
    pdfUrl: 'https://archive.org/download/seerah-kids/seerah-kids.pdf',
    readUrl: 'https://archive.org/details/seerah-kids',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'kids-quran-stories', title: 'قصص القرآن للأطفال',
    author: 'مجموعة من المؤلفين', category: 'kids',
    description: 'قصص من القرآن الكريم بأسلوب مبسط.',
    pdfUrl: 'https://archive.org/download/quran-stories-kids/quran-stories-kids.pdf',
    readUrl: 'https://archive.org/details/quran-stories-kids',
    isPublicDomain: true, source: 'archive.org'
  },
  {
    id: 'kids-prophets', title: 'حكايات الأنبياء للأطفال',
    author: 'مجموعة من المؤلفين', category: 'kids',
    description: 'قصص الأنبياء بلغة الأطفال.',
    pdfUrl: 'https://archive.org/download/prophets-kids/prophets-kids.pdf',
    readUrl: 'https://archive.org/details/prophets-kids',
    isPublicDomain: true, source: 'archive.org'
  }
];