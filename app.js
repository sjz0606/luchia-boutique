/* LUCHIA concept site: fitting room, reviews, booking card. No backend: the booking goes to Instagram Direct as text. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const IG = (c) => `https://www.instagram.com/luchia_uz/p/${c}/`;
  const PHONE = '+998 99 249 92 92';

  /* ---------- the range, from the account's own captions ---------- */
  const LOOKS = [
    { id: 'shimmer', code: 'DbnOur0g8S4', stain: 'gold', occ: ['wed', 'eve'], sizes: null, video: 'shimmer.mp4', imgs: ['shimmer'],
      ru: { n: 'Платье с мерцанием', l: 'Получили на повторе: благородное мерцание и безупречная посадка, для свадьбы, помолвки и торжественного вечера.', c: 'уточните в Direct' },
      uz: { n: 'Yaltiroq ko‘ylak', l: 'Yana keldi: nafis yaltiroq va mukammal o‘tirish, to‘y, unashtiruv va tantanali kech uchun.', c: 'Direct orqali so‘rang' } },
    { id: 'lace', code: 'DfCBJvUgG84', stain: 'black', occ: ['eve', 'wed'], sizes: [36, 38, 40, 42], imgs: ['lace-black', 'lace-black-2', 'lace-black-3', 'lace-black-4'],
      ru: { n: 'Чёрное кружево', l: 'Кружево, благородное сияние и безупречный силуэт, платье вне времени.', c: 'чёрный, бежевый' },
      uz: { n: 'Qora to‘r', l: 'To‘r mato, nafis jilo va mukammal siluet: vaqtdan tashqari ko‘ylak.', c: 'qora, bej' } },
    { id: 'sapphire', code: 'DfEWUbBgCWs', stain: 'sapphire', occ: ['eve', 'wed'], sizes: [36, 38, 40, 42], imgs: ['sapphire-cape', 'sapphire-cape-2', 'sapphire-cape-3'],
      ru: { n: 'Сапфир с кейпом', l: 'Глубокий сапфировый оттенок, вышивка и воздушный кейп за плечами.', c: 'синий, бордовый, голубой, ментоловый' },
      uz: { n: 'Keypli safir', l: 'Chuqur safir rang, kashta va yelkadan tushuvchi havodor keyp.', c: 'ko‘k, bordo, havorang, yalpiz' } },
    { id: 'bordo-chiffon', code: 'DfKkc-gAO2I', stain: 'bordo', occ: ['eve', 'wed'], sizes: null, imgs: ['bordeaux-chiffon'],
      ru: { n: 'Бордо, шифоновые рукава', l: 'Винный оттенок, вышивка с мерцанием и струящаяся юбка.', c: 'бордовый' },
      uz: { n: 'Bordo, shifon yenglar', l: 'Vino rangi, yaltiroq kashta va oqib tushuvchi yubka.', c: 'bordo' } },
    { id: 'bordo-flow', code: 'DfUzCYNgU6k', stain: 'wine', occ: ['eve'], sizes: null, video: 'bordeaux-flow.mp4', imgs: ['bordeaux-flow'],
      ru: { n: 'Бордо, струящаяся юбка', l: 'Платье для праздничных вечеров, которое не нуждается в лишних словах.', c: 'бордовый' },
      uz: { n: 'Bordo, oquvchi yubka', l: 'Bayram kechalari uchun ortiqcha so‘z kerak bo‘lmagan ko‘ylak.', c: 'bordo' } },
    { id: 'red', code: 'Dfcn1QlggWI', stain: 'red', occ: ['eve'], sizes: null, video: 'red-dress.mp4', imgs: ['red-dress'],
      ru: { n: 'Красное, воздушная юбка', l: 'Насыщенный красный и юбка, которая раскрывается в каждом движении.', c: 'красный' },
      uz: { n: 'Qizil, havodor yubka', l: 'To‘q qizil rang va har harakatda ochiladigan yubka.', c: 'qizil' } },
    { id: 'navy', code: 'DfQ-WhexLLB', stain: 'navy', occ: ['eve'], sizes: null, video: 'navy-chiffon.mp4', imgs: ['navy-chiffon'],
      ru: { n: 'Цвет ночного неба', l: 'Шифоновые рукава, вышивка с деликатным сиянием, лёгкая юбка.', c: 'тёмно-синий' },
      uz: { n: 'Tungi osmon rangi', l: 'Shifon yenglar, nozik jilo bilan kashta, yengil yubka.', c: 'to‘q ko‘k' } },
    { id: 'powder', code: 'DfMllP3ACMX', stain: 'powder', occ: ['wed', 'sarpa'], sizes: [36, 38, 40, 42], imgs: ['powder-rose'],
      ru: { n: 'Marry Me, пудровое кружево', l: 'Объёмные 3D-цветы на нежном кружеве и утончённый силуэт.', c: 'сухая роза, чёрный' },
      uz: { n: 'Marry Me, upa rang to‘r', l: 'Nozik to‘r ustida bo‘rtma 3D gullar va nafis siluet.', c: 'quruq atirgul, qora' } },
    { id: 'sarpa', code: 'Dd4VOzvAHv2', stain: 'milk', occ: ['sarpa'], sizes: null, video: 'sarpa-embroidery.mp4', imgs: ['sarpa-embroidery'],
      ru: { n: 'Молочный жакет с вышивкой', l: 'Контраст чёрного и молочного и пышная юбка, для сарпы и сватовства.', c: 'молочный с чёрным' },
      uz: { n: 'Kashtali sutrang jaket', l: 'Qora va sutrang uyg‘unligi, hajmli yubka: sarpo va sovchilik uchun.', c: 'sutrang va qora' } },
    { id: 'choc', code: 'DfUBTXSAgGo', stain: 'choc', occ: ['sarpa', 'day'], sizes: null, video: 'chocolate-basque.mp4', imgs: ['chocolate-basque'],
      ru: { n: 'Шоколадный жакет с баской', l: 'Мелкий цветочный принт, кружевные манжеты и длинная юбка.', c: 'шоколадный' },
      uz: { n: 'Shokolad rang baskali jaket', l: 'Mayda gulli naqsh, to‘r manjetlar va uzun yubka.', c: 'shokolad' } },
    { id: 'lavender', code: 'DfHWJTvAIvw', stain: 'lavender', occ: ['sarpa', 'day'], sizes: [36, 38, 40, 42], imgs: ['lavender-suit', 'lavender-suit-2', 'lavender-suit-3'],
      ru: { n: 'Двойка GIZIA, лаванда', l: 'Двубортный жакет с золотистыми пуговицами и юбка макси в мелкую складку.', c: 'лавандово-голубой' },
      uz: { n: 'GIZIA ikkiligi, lavanda', l: 'Tilla tugmali ikki qatorli jaket va mayda burmali maksi yubka.', c: 'lavanda-havorang' } },
    { id: 'cashmere', code: 'DfR0IP5AGaH', stain: 'choc', occ: ['day'], sizes: [36, 38, 40, 42, 44], fabric: true, imgs: ['cashmere-suit', 'cashmere-suit-2', 'cashmere-suit-3'],
      ru: { n: 'Костюм из кашемира', l: 'Кашемир и шерсть с тонкой люрексовой нитью: уют и элегантность.', c: 'коричневый, натурально-бежевый', f: 'кашемир и шерсть' },
      uz: { n: 'Kashmir kostyum', l: 'Kashmir va jun, nozik lyureks ip bilan: qulay va nafis.', c: 'jigarrang, tabiiy bej', f: 'kashmir va jun' } },
    { id: 'three', code: 'DfM2C6QA5a6', stain: 'camel', occ: ['day'], sizes: [36, 38, 40, 42], fabric: true, imgs: ['cashmere-three'],
      ru: { n: 'Троечка из кашемира', l: 'Роскошная троечка на каждый день.', c: 'шоколад, бежево-золотой', f: 'кашемир и шерсть' },
      uz: { n: 'Kashmir uchligi', l: 'Har kun uchun hashamatli uchlik.', c: 'shokolad, bej-tilla', f: 'kashmir va jun' } },
    { id: 'denim', code: 'DfU3J5_AntA', stain: 'denim', occ: ['day'], sizes: [36, 38, 40, 42], imgs: ['denim-mohair'],
      ru: { n: 'Джинсы и кофточка из махера', l: 'Джинсы премиум-сегмента и мохер, легко собрать образ на каждый день.', c: 'деним, бордо' },
      uz: { n: 'Jinsi va moher kofta', l: 'Premium jinsi va moher: har kunlik obrazni oson yig‘asiz.', c: 'denim, bordo' } },
  ];

  const REELS = [
    { v: 'review-pastel.mp4', p: 'review-pastel.jpg', code: 'DfRe89BgR_6', ru: ['Обзор новинок', 'Размеры 36, 38, 40; розовый, голубой, серый'], uz: ['Yangi kelganlar', '36, 38, 40 o‘lcham; pushti, havorang, kulrang'] },
    { v: 'chocolate-basque.mp4', p: 'chocolate-basque.jpg', code: 'DfUBTXSAgGo', ru: ['Романтика в шоколаде', 'Жакет с баской и длинная юбка'], uz: ['Shokolad romantikasi', 'Baskali jaket va uzun yubka'] },
    { v: 'red-dress.mp4', p: 'red-dress.jpg', code: 'Dfcn1QlggWI', ru: ['Красное платье', 'Воздушная юбка в движении'], uz: ['Qizil ko‘ylak', 'Harakatdagi havodor yubka'] },
    { v: 'review-pastel-2.mp4', p: 'review-pastel-2.jpg', code: 'DfR2VFTg8QQ', ru: ['Обзор новинок', 'Детали и фактуры крупно'], uz: ['Yangi kelganlar', 'Detallar va mato yaqindan'] },
    { v: 'sarpa-embroidery.mp4', p: 'sarpa-embroidery.jpg', code: 'Dd4VOzvAHv2', ru: ['Коллекция для сарпы', 'Чёрное и молочное, вышивка'], uz: ['Sarpo kolleksiyasi', 'Qora va sutrang, kashta'] },
    { v: 'bordeaux-flow.mp4', p: 'bordeaux-flow.jpg', code: 'DfUzCYNgU6k', ru: ['Бордо', 'Струящаяся юбка'], uz: ['Bordo', 'Oquvchi yubka'] },
    { v: 'navy-chiffon.mp4', p: 'navy-chiffon.jpg', code: 'DfQ-WhexLLB', ru: ['Глубокий синий', 'Шифоновые рукава и вышивка'], uz: ['To‘q ko‘k', 'Shifon yenglar va kashta'] },
  ];

  /* ---------- copy ---------- */
  const T = {
    ru: {
      skip: 'К содержимому', searchPill: 'Найти образ: бордо, кашемир, 42', navFitting: 'Примерочная', navReviews: 'Обзоры', navVisit: 'Бутик',
      heroH: 'Платья для дней, которые запомнят', heroLead: 'Бутик на Глинке, 29А: вечерние, свадебные и на каждый день, размеры от 36 до 44.',
      heroCta: 'Записаться на примерку', heroTg: 'Весь ассортимент в Telegram', heroCaption: 'Получили на повторе: платье с мерцанием, для свадьбы и помолвки', pause: 'Пауза', play: 'Смотреть',
      fitH: 'Выберите повод, потом цвет', occLegend: 'Повод', occAll: 'Все', occWed: 'Свадьба и никах', occSarpa: 'Сарпа и сватовство', occEve: 'Вечер', occDay: 'Каждый день',
      sizes: 'Размеры', colors: 'Расцветки', fabric: 'Состав', save: 'Отложить на примерку', saved: 'Отложено', openIg: 'Пост в Instagram',
      lookOf: (i, n) => `Образ ${i} из ${n}`, sizesAsk: 'уточните в Direct', fitYes: (s) => `Есть ваш ${s}`, fitNo: (s) => `Размера ${s} в посте нет, уточните в Direct`, fitAsk: (s) => `Про ${s} спросите в Direct`,
      stH: 'Больше десяти лет мы одеваем к самым важным дням.',
      stP1: 'LUCHIA и Nargiza boutique: один бутик на Глинке, 29А. Всё, что вы видите в Instagram, есть в наличии: приходите, примеряйте у зеркала в золотой арке и уходите уже в своём.',
      stP2: 'Новинки показываем в рубрике «обзор»: ткань, посадка и детали крупно, со всеми размерами и расцветками.',
      rvH: 'Обзоры новинок, как в бутике', rvLead: 'Наведите или нажмите, чтобы смотреть. Звук выключен.', watch: 'Смотреть', reelsLabel: 'Видеообзоры',
      szH: 'Ваш размер от 36 до 44', szLead: 'Отметьте свой, и примерочная покажет, что вам подойдёт.', szBig: 'Есть и линия Big sizes: напишите в Direct, подберём по меркам.',
      szCaption: 'Таблица соответствия размеров', szCol1: 'Размер на бирке', szCol2: 'Российский', szCol3: 'Буквенный', szCol4: 'В примерочной', mySize: 'Мой размер', anySize: 'Любой',
      sizeCount: (n) => `${n} ${plural(n, 'образ', 'образа', 'образов')}`,
      ssH: 'Свадебный сезон в золотых арках', ssLead: 'Платья для свадьбы, никаха, сарпы и праздничного вечера, в благородных оттенках.', ssCap: 'Marry Me Collection: пудровое кружево с объёмными 3D-цветами.',
      vsH: 'Примерка на Глинке, доставка за океан', vsR1: 'Адрес', vsR1a: 'Ташкент, ул. Глинка, 29А. Ориентир: Глинка ГАИ.', vsMap: 'Открыть карту', vsR2: 'Часы', vsR3: 'Доставка', vsR3a: 'По всему Узбекистану и в США. В другие страны спросите в Direct.', vsR4: 'Заказ', tgChannel: 'Telegram-канал',
      bkH: 'Запишитесь, а образы подготовим', bkLead: 'Отложенные образы, день и время уйдут в Direct одним сообщением.', bkName: 'Как к вам обращаться', bkDay: 'День', bkTime: 'Время',
      bkSaved: 'Отложено', bkNone: 'Пока ничего. Отметьте образы в примерочной.', bkSend: 'Отправить в Direct', bkCall: 'Или позвонить', remove: 'Убрать',
      bkNeedName: 'Напишите, как к вам обращаться, чтобы бутик знал, кого ждать.', bkNeedSlot: 'Выберите день и время примерки.',
      bkDone: 'Сообщение скопировано. Откроется Direct @luchia_uz: вставьте его и отправьте.', bkDoneNoClip: 'Откроется Direct @luchia_uz. Скопируйте текст ниже и отправьте.',
      msg: (name, day, time, items) => `Здравствуйте! Меня зовут ${name}. Хочу прийти на примерку ${day} в ${time}.${items.length ? '\nОтложила: ' + items.join('; ') + '.' : ''}`,
      ftLine: 'Ждём вас на примерку.', hoursLine: 'с 10:00 до 21:00', barEmpty: 'Примерка на Глинке, 29А.', ftCredit: 'Фото и видео: @luchia_uz. Концепт сайта, не официальный сайт бутика.',
      searchLabel: 'Найти образ', close: 'Закрыть', noRes: 'Ничего не нашлось. Попробуйте цвет или размер.',
      openNow: (h) => `Сейчас открыто, до ${h}`, closedNow: (h) => `Сейчас закрыто, откроемся в ${h}`, bar: (n) => `Отложено ${n} ${plural(n, 'образ', 'образа', 'образов')}`,
      today: 'Сегодня', tomorrow: 'Завтра', wd: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'], months: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    },
    uz: {
      skip: 'Asosiy qismga', searchPill: 'Obraz qidirish: bordo, kashmir, 42', navFitting: 'Kiyib ko‘rish', navReviews: 'Sharhlar', navVisit: 'Butik',
      heroH: 'Esda qoladigan kunlar uchun ko‘ylaklar', heroLead: 'Glinka, 29A dagi butik: kechki, to‘y va har kunlik, 36 dan 44 gacha o‘lchamlar.',
      heroCta: 'Kiyib ko‘rishga yozilish', heroTg: 'Butun assortiment Telegramda', heroCaption: 'Yana keldi: yaltiroq ko‘ylak, to‘y va unashtiruv uchun', pause: 'Pauza', play: 'Ko‘rish',
      fitH: 'Avval sababni, keyin rangni tanlang', occLegend: 'Sabab', occAll: 'Hammasi', occWed: 'To‘y va nikoh', occSarpa: 'Sarpo va sovchilik', occEve: 'Kechki', occDay: 'Har kuni',
      sizes: 'O‘lchamlar', colors: 'Ranglar', fabric: 'Tarkibi', save: 'Kiyib ko‘rishga qo‘shish', saved: 'Qo‘shildi', openIg: 'Instagramdagi post',
      lookOf: (i, n) => `${n} tadan ${i}-obraz`, sizesAsk: 'Direct orqali so‘rang', fitYes: (s) => `${s} o‘lchamingiz bor`, fitNo: (s) => `Postda ${s} o‘lcham yo‘q, Direct orqali so‘rang`, fitAsk: (s) => `${s} o‘lcham haqida Direct orqali so‘rang`,
      stH: 'O‘n yildan ortiq eng muhim kunlaringizga kiyintirib kelamiz.',
      stP1: 'LUCHIA va Nargiza boutique: Glinka, 29A dagi bitta butik. Instagramda ko‘rganingizning hammasi mavjud: keling, tilla ravoqli oyna oldida kiyib ko‘ring va o‘zingiznikida chiqib keting.',
      stP2: 'Yangi kelganlarni «obzor» ruknida ko‘rsatamiz: mato, o‘tirishi va detallar yaqindan, barcha o‘lcham va ranglari bilan.',
      rvH: 'Yangi kelganlar sharhi, xuddi butikdagidek', rvLead: 'Ko‘rish uchun ustiga olib boring yoki bosing. Ovoz o‘chiq.', watch: 'Ko‘rish', reelsLabel: 'Video sharhlar',
      szH: 'O‘lchamingiz 36 dan 44 gacha', szLead: 'O‘lchamingizni belgilang, kiyib ko‘rish bo‘limi sizga mosini ko‘rsatadi.', szBig: 'Big sizes liniyasi ham bor: Direct ga yozing, o‘lchovlaringiz bo‘yicha tanlaymiz.',
      szCaption: 'O‘lchamlar jadvali', szCol1: 'Yorliqdagi o‘lcham', szCol2: 'Rossiya', szCol3: 'Harfli', szCol4: 'Kiyib ko‘rishda', mySize: 'Mening o‘lchamim', anySize: 'Har qanday',
      sizeCount: (n) => `${n} ta obraz`,
      ssH: 'Tilla ravoqlarda to‘y mavsumi', ssLead: 'To‘y, nikoh, sarpo va bayram kechasi uchun olijanob ranglardagi ko‘ylaklar.', ssCap: 'Marry Me Collection: bo‘rtma 3D gullar bilan upa rang to‘r.',
      vsH: 'Glinkada kiyib ko‘rish, okean ortiga yetkazish', vsR1: 'Manzil', vsR1a: 'Toshkent, Glinka ko‘chasi, 29A. Mo‘ljal: Glinka GAI.', vsMap: 'Xaritada ochish', vsR2: 'Ish vaqti', vsR3: 'Yetkazib berish', vsR3a: 'Butun O‘zbekiston bo‘ylab va AQSHga. Boshqa davlatlar uchun Direct orqali so‘rang.', vsR4: 'Buyurtma', tgChannel: 'Telegram kanal',
      bkH: 'Yoziling, obrazlarni tayyorlab qo‘yamiz', bkLead: 'Tanlangan obrazlar, kun va vaqt Direct ga bitta xabar bo‘lib ketadi.', bkName: 'Ismingiz', bkDay: 'Kun', bkTime: 'Vaqt',
      bkSaved: 'Tanlangan', bkNone: 'Hozircha hech narsa. Kiyib ko‘rish bo‘limida obrazlarni belgilang.', bkSend: 'Direct ga yuborish', bkCall: 'Yoki qo‘ng‘iroq qiling', remove: 'Olib tashlash',
      bkNeedName: 'Ismingizni yozing, butik kimni kutayotganini bilsin.', bkNeedSlot: 'Kiyib ko‘rish kuni va vaqtini tanlang.',
      bkDone: 'Xabar nusxalandi. @luchia_uz Direct ochiladi: joylang va yuboring.', bkDoneNoClip: '@luchia_uz Direct ochiladi. Quyidagi matnni nusxalab yuboring.',
      msg: (name, day, time, items) => `Assalomu alaykum! Ismim ${name}. ${day} soat ${time} da kiyib ko‘rishga kelmoqchiman.${items.length ? '\nTanladim: ' + items.join('; ') + '.' : ''}`,
      ftLine: 'Kiyib ko‘rishga kutamiz.', hoursLine: '10:00 dan 21:00 gacha', barEmpty: 'Glinka, 29A da kiyib ko‘rish.', ftCredit: 'Surat va videolar: @luchia_uz. Sayt konsepti, butikning rasmiy sayti emas.',
      searchLabel: 'Obraz qidirish', close: 'Yopish', noRes: 'Hech narsa topilmadi. Rang yoki o‘lchamni yozib ko‘ring.',
      openNow: (h) => `Hozir ochiq, ${h} gacha`, closedNow: (h) => `Hozir yopiq, ${h} da ochiladi`, bar: (n) => `${n} ta obraz tanlangan`,
      today: 'Bugun', tomorrow: 'Ertaga', wd: ['yak', 'du', 'se', 'chor', 'pay', 'ju', 'sha'], months: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'],
    },
  };

  Object.assign(T.ru, {
    navLook: 'Lookbook', navBook: 'Примерка', searchShort: 'Поиск', heroKicker: 'Бутик женской одежды, Ташкент',
    heroH1: 'Искусство', heroH2: 'быть замеченной', heroLead: 'Вечерние, свадебные и на каждый день. Размеры от 36 до 44 и Big sizes.',
    scroll: 'Листайте', mq1: 'Новая коллекция', mq2: 'Сарпа и сватовство', mq3: 'Доставка в США',
    lbH: 'Lookbook сезона', lbLead: 'Восемь образов из бутика, снятых в наших золотых арках.', lb1: 'Чёрное кружево', lb2: 'Сапфир с кейпом', lb3: 'Бордо, шифон', lb4: 'Двойка GIZIA', lb6: 'Кашемир и шерсть', lb7: 'Шоколад и кружево', lb8: 'Красное', lbEnd: 'Примерить в примерочной',
    ssCap2: 'Слева: жакет с вышивкой для сарпы. Справа: чёрное кружево.', cardSub: 'Приглашение на примерку', cursorView: 'Смотреть',
  });
  Object.assign(T.uz, {
    navLook: 'Lookbook', navBook: 'Kiyib ko‘rish', searchShort: 'Qidiruv', heroKicker: 'Ayollar kiyimi butigi, Toshkent',
    heroH1: 'E’tiborda', heroH2: 'bo‘lish san’ati', heroLead: 'Kechki, to‘y va har kunlik. 36 dan 44 gacha o‘lchamlar va Big sizes.',
    scroll: 'Pastga', mq1: 'Yangi kolleksiya', mq2: 'Sarpo va sovchilik', mq3: 'AQShga yetkazish',
    lbH: 'Mavsum lookbooki', lbLead: 'Butikdan sakkiz obraz, tilla ravoqlarimizda suratga olingan.', lb1: 'Qora to‘r', lb2: 'Keypli safir', lb3: 'Bordo, shifon', lb4: 'GIZIA ikkiligi', lb6: 'Kashmir va jun', lb7: 'Shokolad va to‘r', lb8: 'Qizil', lbEnd: 'Kiyib ko‘rish bo‘limiga',
    ssCap2: 'Chapda: sarpo uchun kashtali jaket. O‘ngda: qora to‘r.', cardSub: 'Kiyib ko‘rishga taklifnoma', cursorView: 'Ko‘rish',
  });
  function plural(n, one, few, many) { const a = n % 10, b = n % 100; if (a === 1 && b !== 11) return one; if (a >= 2 && a <= 4 && (b < 10 || b >= 20)) return few; return many; }

  /* ---------- state ---------- */
  const store = { get(k, d) { try { return JSON.parse(localStorage.getItem('luchia.' + k)) ?? d; } catch { return d; } }, set(k, v) { try { localStorage.setItem('luchia.' + k, JSON.stringify(v)); } catch {} } };
  let lang = store.get('lang', (navigator.language || '').startsWith('uz') ? 'uz' : 'ru');
  let saved = new Set(store.get('saved', []));
  let current = 1; let occ = 'all'; let mySize = ''; let imgIdx = 0;
  const t = (k) => T[lang][k];
  const L = (look) => look[lang];

  /* ---------- Tashkent hours ---------- */
  function tashkentNow() { const d = new Date(); return new Date(d.getTime() + (d.getTimezoneOffset() + 300) * 60000); }
  function hoursText() { const n = tashkentNow(); const m = n.getHours() * 60 + n.getMinutes(); return m >= 600 && m < 1260 ? t('openNow')('21:00') : t('closedNow')('10:00'); }
  function paintHours() { const s = hoursText(); $$('[data-hours]').forEach((e) => (e.textContent = s)); $$('[data-hours-short], [data-hours-bar]').forEach((e) => (e.textContent = s)); }

  /* ---------- i18n ---------- */
  function applyLang() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach((el) => { const v = T[lang][el.dataset.i18n]; if (typeof v === 'string') el.textContent = v; });
    $$('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    $('[data-q]').placeholder = lang === 'ru' ? 'бордо, кашемир, 42' : 'bordo, kashmir, 42';
    $('[data-rail]').setAttribute('aria-label', t('reelsLabel'));
    paintHours(); buildStrips(); showLook(current, false); buildRail(); paintSizes(); buildSlots(); paintSaved();
    document.dispatchEvent(new CustomEvent('luchia:lang', { detail: lang }));
  }
  $$('[data-lang]').forEach((b) => b.addEventListener('click', () => { lang = b.dataset.lang; store.set('lang', lang); applyLang(); }));

  /* ---------- strips ---------- */
  const stripsEl = $('[data-strips]');
  function matches(look) { const okOcc = occ === 'all' || look.occ.includes(occ); const okSize = !mySize || !look.sizes || look.sizes.includes(+mySize); return okOcc && okSize; }
  function buildStrips() {
    stripsEl.innerHTML = '';
    LOOKS.forEach((look, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'strip'; b.role = 'tab'; b.id = 'strip-' + look.id;
      b.style.setProperty('--s', `var(--st-${look.stain})`); b.style.setProperty('--i', i);
      b.setAttribute('aria-selected', String(i === current)); b.tabIndex = i === current ? 0 : -1;
      b.setAttribute('aria-label', L(look).n);
      b.innerHTML = `<span>${L(look).n}</span>`;
      b.classList.toggle('is-dim', !matches(look));
      b.addEventListener('click', () => showLook(i, true));
      stripsEl.appendChild(b);
    });
  }
  stripsEl.addEventListener('keydown', (e) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    let i = current; const n = LOOKS.length;
    if (e.key === 'ArrowRight') i = (i + 1) % n; else if (e.key === 'ArrowLeft') i = (i - 1 + n) % n; else if (e.key === 'Home') i = 0; else i = n - 1;
    showLook(i, true); stripsEl.children[i].focus();
  });

  function mediaFor(look) { const m = look.imgs.map((s) => ({ type: 'img', src: `media/${s}.jpg` })); if (look.video) m.unshift({ type: 'video', src: `media/${look.video}`, poster: look.imgs[0] ? `media/${look.imgs[0]}.jpg` : '' }); return m; }
  function paintMain(look) {
    const items = mediaFor(look); const it = items[imgIdx] || items[0]; const fig = $('.look__main');
    fig.innerHTML = it.type === 'video'
      ? `<video src="${it.src}#t=0.1" ${it.poster ? `poster="${it.poster}"` : ''} muted loop playsinline ${reduce ? 'controls' : 'autoplay'} preload="metadata" aria-label="${L(look).n}"></video>`
      : `<img src="${it.src}" alt="${L(look).n}" width="1050" height="1400">`;
    const th = $('[data-look-thumbs]'); th.innerHTML = '';
    if (items.length > 1) items.forEach((m, k) => {
      const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-current', String(k === imgIdx));
      b.setAttribute('aria-label', `${L(look).n}, ${k + 1}`);
      b.innerHTML = m.type === 'video' ? (m.poster ? `<img src="${m.poster}" alt="" loading="lazy">` : `<video src="${m.src}#t=0.1" muted preload="metadata"></video>`) : `<img src="${m.src}" alt="" loading="lazy">`;
      b.addEventListener('click', () => { imgIdx = k; paintMain(look); });
      th.appendChild(b);
    });
  }
  function showLook(i, user) {
    if (user && i !== current) imgIdx = 0;
    current = i; const look = LOOKS[i]; const c = L(look);
    $$('.strip', stripsEl).forEach((s, k) => { s.setAttribute('aria-selected', String(k === i)); s.tabIndex = k === i ? 0 : -1; });
    $('[data-look-count]').textContent = t('lookOf')(i + 1, LOOKS.length);
    $('[data-look-name]').textContent = c.n;
    $('[data-look-line]').textContent = c.l;
    $('[data-look-sizes]').textContent = look.sizes ? look.sizes.join(', ') : t('sizesAsk');
    $('[data-look-colors]').textContent = c.c;
    const fr = $('[data-look-fabric-row]'); fr.hidden = !c.f; $('[data-look-fabric]').textContent = c.f || '';
    $('[data-look-ig]').href = IG(look.code);
    const fit = $('[data-look-fit]');
    fit.textContent = !mySize ? '' : !look.sizes ? t('fitAsk')(mySize) : look.sizes.includes(+mySize) ? t('fitYes')(mySize) : t('fitNo')(mySize);
    const sb = $('[data-save]'); const on = saved.has(look.id); sb.setAttribute('aria-pressed', String(on)); sb.textContent = on ? t('saved') : t('save');
    $('.look').setAttribute('aria-labelledby', 'strip-' + look.id);
    paintMain(look);
  }
  $('[data-save]').addEventListener('click', () => { const id = LOOKS[current].id; saved.has(id) ? saved.delete(id) : saved.add(id); store.set('saved', [...saved]); showLook(current, false); paintSaved(); });

  $$('input[name="occ"]').forEach((r) => r.addEventListener('change', () => {
    occ = r.value; $$('.strip', stripsEl).forEach((s, k) => s.classList.toggle('is-dim', !matches(LOOKS[k])));
    if (!matches(LOOKS[current])) { const k = LOOKS.findIndex(matches); if (k >= 0) showLook(k, true); }
  }));

  /* ---------- sizes ---------- */
  function paintSizes() {
    $$('[data-size-rows] tr').forEach((tr) => {
      const s = +tr.dataset.size; const n = LOOKS.filter((l) => l.sizes && l.sizes.includes(s)).length;
      tr.querySelector('[data-size-count]').textContent = t('sizeCount')(n);
      tr.classList.toggle('is-mine', String(s) === mySize);
    });
  }
  $$('input[name="mysize"]').forEach((r) => r.addEventListener('change', () => {
    mySize = r.value; store.set('size', mySize); paintSizes();
    $$('.strip', stripsEl).forEach((s, k) => s.classList.toggle('is-dim', !matches(LOOKS[k]))); showLook(current, false);
  }));
  mySize = store.get('size', ''); const ms = document.getElementById('ms-' + (mySize || '0')); if (ms) ms.checked = true;

  /* ---------- reviews rail ---------- */
  function buildRail() {
    const rail = $('[data-rail]'); rail.innerHTML = '';
    REELS.forEach((r) => {
      const li = document.createElement('li'); const [h, p] = r[lang];
      li.innerHTML = `<button class="reel" type="button" aria-pressed="false" aria-label="${t('watch')}: ${h}"><video src="media/${r.v}#t=0.1" ${r.p ? `poster="media/${r.p}"` : ''} muted loop playsinline preload="${r.p ? 'none' : 'metadata'}"></video><span class="reel__state">${t('watch')}</span></button><h3>${h}</h3><p>${p}</p>`;
      const btn = li.querySelector('.reel'); const v = li.querySelector('video');
      const play = () => { $$('.reel[aria-pressed="true"]').forEach((o) => { if (o !== btn) { o.querySelector('video').pause(); o.setAttribute('aria-pressed', 'false'); } }); v.play().catch(() => {}); btn.setAttribute('aria-pressed', 'true'); };
      const stop = () => { v.pause(); btn.setAttribute('aria-pressed', 'false'); };
      btn.addEventListener('click', () => (btn.getAttribute('aria-pressed') === 'true' ? stop() : play()));
      if (matchMedia('(hover: hover)').matches && !reduce) { btn.addEventListener('mouseenter', play); btn.addEventListener('mouseleave', stop); }
      rail.appendChild(li);
    });
  }

  /* ---------- hero video, in-view videos ---------- */
  const hv = $('.hero__video'); const tog = $('[data-vid-toggle]');
  if (reduce) { hv.removeAttribute('autoplay'); hv.pause(); }
  const paintTog = () => { const p = hv.paused; tog.setAttribute('aria-label', p ? t('play') : t('pause')); tog.innerHTML = p ? '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 2l10 6-10 6z" fill="currentColor"/></svg>' : '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 3h3v10H4zM9 3h3v10H9z" fill="currentColor"/></svg>'; };
  tog.addEventListener('click', () => { hv.paused ? hv.play() : hv.pause(); });
  hv.addEventListener('play', paintTog); hv.addEventListener('pause', paintTog); paintTog();
  const io = new IntersectionObserver((es) => es.forEach((e) => { const v = e.target; if (e.isIntersecting) { if (!reduce && !v.dataset.userPaused) v.play().catch(() => {}); } else v.pause(); }), { threshold: 0.35 });
  $$('[data-inview-play]').forEach((v) => io.observe(v));

  /* ---------- sticky bar ---------- */
  const bar = $('[data-bar]'); bar.hidden = false;
  const heroIo = new IntersectionObserver(([e]) => bar.classList.toggle('is-on', !e.isIntersecting && !bookVisible), { threshold: 0.05 });
  let bookVisible = false;
  const bookIo = new IntersectionObserver(([e]) => { bookVisible = e.isIntersecting; if (bookVisible) bar.classList.remove('is-on'); }, { threshold: 0.1 });
  heroIo.observe($('.hero')); bookIo.observe($('#book'));
  bar.setAttribute('inert', ''); new MutationObserver(() => bar.classList.contains('is-on') ? bar.removeAttribute('inert') : bar.setAttribute('inert', '')).observe(bar, { attributes: true, attributeFilter: ['class'] });

  /* ---------- booking card ---------- */
  let pickDay = null, pickTime = null;
  function dayLabel(d, k) { return k === 0 ? t('today') : k === 1 ? t('tomorrow') : `${t('wd')[d.getDay()]}`; }
  function buildSlots() {
    const days = $('[data-days]'); days.innerHTML = '';
    const now = tashkentNow();
    for (let k = 0; k < 7; k++) {
      const d = new Date(now); d.setDate(now.getDate() + k);
      const b = document.createElement('button'); b.type = 'button'; b.className = 'chip';
      const lbl = `${d.getDate()} ${t('months')[d.getMonth()]}`;
      b.innerHTML = `${d.getDate()}<small>${dayLabel(d, k)}</small>`; b.dataset.k = k; b.dataset.label = `${k < 2 ? dayLabel(d, k).toLowerCase() + ', ' : ''}${lbl}`;
      b.setAttribute('aria-pressed', String(pickDay === k)); b.setAttribute('aria-label', `${dayLabel(d, k)}, ${lbl}`);
      if (k === 0 && now.getHours() >= 20) b.disabled = true;
      b.addEventListener('click', () => { pickDay = k; pickTime = null; buildSlots(); });
      days.appendChild(b);
    }
    const times = $('[data-times]'); times.innerHTML = '';
    for (let h = 10; h <= 20; h++) {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; const s = `${h}:00`; b.textContent = s;
      b.setAttribute('aria-pressed', String(pickTime === s));
      if (pickDay === 0 && h <= now.getHours()) b.disabled = true;
      if (pickDay === null) b.disabled = true;
      b.addEventListener('click', () => { pickTime = s; buildSlots(); });
      times.appendChild(b);
    }
  }
  function paintSaved() {
    const ul = $('[data-saved-list]'); ul.innerHTML = '';
    const list = LOOKS.filter((l) => saved.has(l.id));
    if (!list.length) { ul.innerHTML = `<li class="muted">${t('bkNone')}</li>`; }
    list.forEach((l) => { const li = document.createElement('li'); li.innerHTML = `<span>${L(l).n}</span><button type="button" class="link">${t('remove')}</button>`; li.querySelector('button').addEventListener('click', () => { saved.delete(l.id); store.set('saved', [...saved]); paintSaved(); showLook(current, false); }); ul.appendChild(li); });
    $('[data-bar-count]').textContent = list.length ? t('bar')(list.length) : t('barEmpty');
  }
  $('[data-book]').addEventListener('submit', async (e) => {
    e.preventDefault();
    const help = $('#bk-help'); const name = $('#bk-name');
    const okName = name.value.trim().length > 1; name.toggleAttribute('aria-invalid', !okName);
    if (!okName) { name.setAttribute('aria-describedby', 'bk-help'); help.textContent = t('bkNeedName'); name.focus(); return; }
    if (pickDay === null || !pickTime) { help.textContent = t('bkNeedSlot'); $('[data-days] .chip:not(:disabled)')?.focus(); return; }
    const dayBtn = $(`[data-days] [data-k="${pickDay}"]`);
    const items = LOOKS.filter((l) => saved.has(l.id)).map((l) => `${L(l).n} (${IG(l.code)})`);
    const text = t('msg')(name.value.trim(), dayBtn.dataset.label, pickTime, items);
    let copied = false; try { await navigator.clipboard.writeText(text); copied = true; } catch {}
    help.textContent = copied ? t('bkDone') : t('bkDoneNoClip') + '\n' + text;
    window.open('https://ig.me/m/luchia_uz', '_blank', 'noopener');
  });

  /* ---------- search ---------- */
  const dlg = $('[data-search]'); const q = $('[data-q]'); const res = $('[data-res]');
  function norm(s) { return s.toLowerCase().replace(/ё/g, 'е'); }
  function runSearch() {
    const words = norm(q.value).split(/[\s,]+/).filter(Boolean); res.innerHTML = '';
    const found = LOOKS.map((l, i) => ({ l, i })).filter(({ l }) => {
      const hay = norm([l.ru.n, l.ru.l, l.ru.c, l.ru.f || '', l.uz.n, l.uz.l, l.uz.c, l.uz.f || '', (l.sizes || []).join(' '), l.occ.join(' ')].join(' '));
      return words.every((w) => hay.includes(w));
    });
    if (!found.length) { res.innerHTML = `<li class="muted">${t('noRes')}</li>`; return; }
    found.forEach(({ l, i }) => {
      const li = document.createElement('li'); const img = l.imgs[0] ? `media/${l.imgs[0]}.jpg` : 'media/lace-black.jpg';
      li.innerHTML = `<button type="button"><img src="${img}" alt="" loading="lazy"><span>${L(l).n}<small>${l.sizes ? l.sizes.join(', ') : t('sizesAsk')}; ${L(l).c}</small></span></button>`;
      li.querySelector('button').addEventListener('click', () => { dlg.close(); showLook(i, true); document.getElementById('fitting').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); });
      res.appendChild(li);
    });
  }
  function openSearch() { if (!dlg.open) { dlg.showModal(); q.value = ''; runSearch(); q.focus(); } }
  $('[data-open-search]').addEventListener('click', openSearch);
  q.addEventListener('input', runSearch);
  addEventListener('keydown', (e) => { if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); openSearch(); } });
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });

  /* ---------- the air: a slow warm field behind the hero ---------- */
  function air() {
    const cv = $('.air-canvas'); if (!cv || reduce) return;
    const gl = cv.getContext('webgl', { antialias: false, alpha: false, preserveDrawingBuffer: false }); if (!gl) return;
    const vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    const fs = `precision mediump float;uniform vec2 r;uniform float t;uniform vec2 m;
      float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
      float fb(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p*=2.02;a*=.5;}return v;}
      void main(){vec2 uv=gl_FragCoord.xy/r;vec2 p=uv*vec2(r.x/r.y,1.)*1.6;p.y-=t*.018;
        vec2 q=vec2(fb(p+t*.01),fb(p+vec2(5.2,1.3)));float f=fb(p+2.2*q);
        float d=length(uv-m);f-=.12*exp(-d*d*18.);
        vec3 paper=vec3(.937,.914,.882),cream=vec3(.972,.95,.91),amber=vec3(.93,.86,.76);
        vec3 c=mix(paper,cream,smoothstep(.35,.75,f));c=mix(c,amber,smoothstep(.62,.95,f)*.55);
        gl_FragColor=vec4(c,1.);}`;
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const ur = gl.getUniformLocation(pr, 'r'), ut = gl.getUniformLocation(pr, 't'), um = gl.getUniformLocation(pr, 'm');
    let mx = 0.5, my = 0.5, tx = 0.5, ty = 0.5;
    addEventListener('pointermove', (e) => { tx = e.clientX / innerWidth; ty = 1 - e.clientY / innerHeight; }, { passive: true });
    const size = () => { cv.width = Math.round(innerWidth / 2); cv.height = Math.round(innerHeight / 2); gl.viewport(0, 0, cv.width, cv.height); };
    size(); addEventListener('resize', size);
    let on = true; new IntersectionObserver(([e]) => { on = e.isIntersecting; if (on) requestAnimationFrame(loop); }).observe($('.hero'));
    document.addEventListener('visibilitychange', () => { if (!document.hidden && on) requestAnimationFrame(loop); });
    const t0 = performance.now();
    function loop(now) { if (!on || document.hidden) return; mx += (tx - mx) * 0.04; my += (ty - my) * 0.04; gl.uniform2f(ur, cv.width, cv.height); gl.uniform1f(ut, (now - t0) / 1000); gl.uniform2f(um, mx, my); gl.drawArrays(gl.TRIANGLES, 0, 3); requestAnimationFrame(loop); }
    requestAnimationFrame(loop);
  }

  /* ---------- go ---------- */
  applyLang();
  if (!reduce) { stripsEl.classList.add('is-unfurling'); }
  air();
  setInterval(paintHours, 60000);
})();
