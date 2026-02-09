export type Language = 'en' | 'ar';

export const translations = {
  en: {
    // Start Menu
    startGame: 'Start Game',
    settings: 'Settings',
    developerInfo: 'Developer Info',
    coffeeEmpire: 'Coffee Empire',
    tycoon: 'Tycoon',
    proEdition: 'Pro Edition',
    
    // Game Dashboard
    beans: 'Beans',
    beansPerSecond: 'per second',
    click: 'Click!',
    shop: 'Shop',
    upgrades: 'Upgrades',
    income: 'Income',
    wealthChart: 'Wealth Growth',
    
    // Upgrades
    barista: 'Barista',
    baristaDesc: 'Skilled coffee artisan',
    coffeeMachine: 'Coffee Machine',
    coffeeMachineDesc: 'Automatic brewing power',
    roaster: 'Roaster',
    roasterDesc: 'Premium bean roasting',
    cafe: 'Café Branch',
    cafeDesc: 'Expand your empire',
    factory: 'Coffee Factory',
    factoryDesc: 'Industrial production',
    
    // Stats
    level: 'Level',
    cost: 'Cost',
    produces: 'Produces',
    perSecond: '/sec',
    owned: 'Owned',
    buy: 'Buy',
    
    // Settings
    language: 'Language',
    english: 'English',
    arabic: 'العربية',
    soundFx: 'Sound Effects',
    registerEmail: 'Register with Email',
    emailPlaceholder: 'Enter your email',
    signUp: 'Sign Up',
    close: 'Close',
    
    // Developer
    developer: 'Developer',
    bio: 'Passionate game developer creating immersive experiences.',
    contactDeveloper: 'Contact Developer',
    madeWith: 'Made with ☕ and ❤️',
    
    // Misc
    mute: 'Mute',
    unmute: 'Unmute',
    back: 'Back',
    total: 'Total',
  },
  ar: {
    // Start Menu
    startGame: 'ابدأ اللعبة',
    settings: 'الإعدادات',
    developerInfo: 'معلومات المطور',
    coffeeEmpire: 'إمبراطورية',
    tycoon: 'القهوة',
    proEdition: 'النسخة الاحترافية',
    
    // Game Dashboard
    beans: 'حبوب',
    beansPerSecond: 'في الثانية',
    click: 'اضغط!',
    shop: 'المتجر',
    upgrades: 'الترقيات',
    income: 'الدخل',
    wealthChart: 'نمو الثروة',
    
    // Upgrades
    barista: 'باريستا',
    baristaDesc: 'فنان قهوة ماهر',
    coffeeMachine: 'آلة القهوة',
    coffeeMachineDesc: 'قوة التخمير التلقائي',
    roaster: 'محمصة',
    roasterDesc: 'تحميص فاخر للحبوب',
    cafe: 'فرع مقهى',
    cafeDesc: 'وسّع إمبراطوريتك',
    factory: 'مصنع قهوة',
    factoryDesc: 'إنتاج صناعي',
    
    // Stats
    level: 'المستوى',
    cost: 'التكلفة',
    produces: 'ينتج',
    perSecond: '/ثانية',
    owned: 'مملوك',
    buy: 'شراء',
    
    // Settings
    language: 'اللغة',
    english: 'English',
    arabic: 'العربية',
    soundFx: 'المؤثرات الصوتية',
    registerEmail: 'التسجيل بالبريد الإلكتروني',
    emailPlaceholder: 'أدخل بريدك الإلكتروني',
    signUp: 'تسجيل',
    close: 'إغلاق',
    
    // Developer
    developer: 'المطور',
    bio: 'مطور ألعاب شغوف بإنشاء تجارب غامرة.',
    contactDeveloper: 'تواصل مع المطور',
    madeWith: 'صنع بـ ☕ و ❤️',
    
    // Misc
    mute: 'كتم',
    unmute: 'تشغيل الصوت',
    back: 'رجوع',
    total: 'الإجمالي',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
