// Türkçe içerik: İngilizce data.js'in kopyası alınır, yalnızca metinler değiştirilir
// (görsel yolları, bağlantılar ve sayılar data.js'ten gelir).
(() => {
  const T = JSON.parse(JSON.stringify(window.SITE));

  T.role = "RF ve mikrodalga sistemleri mühendis adayı";
  T.focus = "Anten ölçümü, test otomasyonu ve cihaz kontrolü";
  T.summary =
    "Yaşar Üniversitesi Elektrik-Elektronik Mühendisliği son sınıf öğrencisiyim. ASELSAN REHİS'te düzlemsel yakın alan anten tarayıcısının yazılımını ve hareket kontrolünü geliştirdim, gerçek zamanlı bir spektrum analizörünü Ethernet üzerinden otomatikleştirdim ve vektör ağ analizörleriyle RF bileşen karakterizasyonu yaptım. OPA Mühendislik'te güneş enerjisi santralleri tasarlıyorum ve şirketin canlı santral filosunu izleyen SolarOPA platformunu yazdım.";
  T.location = "İzmir, Türkiye";
  T.documents[0].label = "CV (İngilizce)";
  T.documents[1].label = "CV (Türkçe)";
  T.documents[2].label = "Portfolyo PDF";
  // Türkçe sayfada önce Türkçe CV
  T.documents = [T.documents[1], T.documents[0], T.documents[2]];
  T.documents[0].primary = true; T.documents[1].primary = false;

  const mk = [
    ["Anten tarama", "Düzlemsel yakın alan X-Y tarayıcı"],
    ["Spektrum otomasyonu", "Ethernet API kontrolü ve tepe arama"],
    ["Akustik link DSP", "MATLAB'da 18–22 kHz BFSK modem"],
    ["Güneş filosu telemetrisi", "5 marka tek canlı panelde"]
  ];
  T.markers.forEach((m, i) => { m.label = mk[i][0]; m.detail = mk[i][1]; });

  const facts = [
    "4.00 üzerinden not ortalaması, %100 başarı bursu",
    "REHİS Test Merkezleri Direktörlüğü, 2026",
    "güneş santrali SolarOPA ile canlı izleniyor",
    "savunma sanayii, kamu ve MathWorks sertifikası"
  ];
  T.facts.forEach((f, i) => { f.label = facts[i]; });

  const P = Object.fromEntries(T.projects.map((p) => [p.id, p]));

  Object.assign(P.solaropa, {
    subtitle: "Çok markalı güneş santrali filosu izleme platformu",
    period: "2025 – 2026",
    role: "Tek geliştirici, kullanımda",
    short: "Beş farklı invertör ve depolama markasıyla kurulmuş 14 santrallik ticari güneş filosu için alarmlar, yapay zekâ raporları ve güvenli uzaktan izleme içeren tek bir canlı panel.",
    summary: "OPA Mühendislik'in santralleri Victron, Fronius, Sungrow, SOLARMAN ve Sigenergy ekipmanlarıyla çalışıyor ve her markanın ayrı uygulaması vardı. SolarOPA hepsini tek bir ortak veri modelinde toplar; bunu canlı bir operasyon paneline, televizyon alarm ekranına, e-posta ve Telegram uyarılarına, tek sayfalık günlük yapay zekâ filo raporuna ve ofisin her yerden açabildiği salt okunur bir görünüme dönüştürür.",
    note: "Ekran görüntülerinde santral adları anonimleştirilmiştir, değerler demo veri setinden gelir."
  });
  P.solaropa.metrics.forEach((m, i) => { m.label = ["marka API'si tek modelde", "izleme döngüsü", "panel yenileme", "güvenlik testi başarılı"][i]; });
  P.solaropa.metrics[1].value = "1 dk"; P.solaropa.metrics[2].value = "10 sn";
  P.solaropa.bullets = [
    "<strong>Sağlayıcı katmanı.</strong> Victron VRM (REST), Fronius Solar.web (Query API ve otomatik yeniden giriş yapan portal oturumu), Sungrow iSolarCloud (token yenilemeli OAuth 2.0), SOLARMAN Business (dönen JWT yenilemeli çoklu hesap) ve Sigenergy OpenAPI; güneş, tüketim, şebeke ve batarya için işaret kuralları birleştirilmiş tek bir metrik modelinin arkasında.",
    "<strong>Canlı enerji akışı paneli.</strong> Her santral için izometrik bir akış kartı sunan Flask paneli; hareketli çizgiler her güç akışının gerçek yönünü ve büyüklüğünü gösterir. Filo toplamı görünümü, filo özgül verimi (kWh/kWp) dahil göstergeler ve saatlik üretim grafikleri.",
    "<strong>Alarm motoru.</strong> Cihaz arızaları, düşük batarya ve veri bağlantısı kopmaları tüm markalarda her dakika tespit edilir. Bağlantı kopmaları ekranda anında görünür, e-posta ise yalnızca 5 dakika sürerse gider; ardından kesinti süresini içeren bir 'bağlantı geri geldi' bildirimi gelir.",
    "<strong>TV alarm ekranı.</strong> Menüsüz tam ekran görünüm tüm santralleri ofis televizyonuna sığdırır. Yeni bir alarm 60 saniye boyunca sirenle yanıp söner, sonra ilgili santralin kartında yazılı kalır.",
    "<strong>Gemini yapay zekâ raporları.</strong> En fazla üç aksiyon maddesi içeren tek sayfalık günlük filo özeti, ayrıca haftalık ve aylık raporlar. Zamanlayıcı bir raporu ancak teslim edildikten sonra gönderildi sayar, hataları tekrar dener ve yeniden başlatmadan sonra telafi eder.",
    "<strong>Güvenli uzaktan erişim.</strong> Cloudflare Tunnel paneli hiçbir port açmadan HTTPS ile yayınlar. İzleyicinin tek kullanımlık bir davete ve yöneticinin açık onayına ihtiyacı vardır; salt okunur rol sunucuda uygulanır: ayarlar, entegrasyonlar ve gizli bilgiler 403 döner.",
    "<strong>Operasyon araçları.</strong> Bakım planlayıcı, cihaz başına canlı değerli donanım envanteri, mobil düzen, tek tıkla Windows kurulumu ve taşıma paketi, müşteri için seslendirmeli ürün tanıtım videosu."
  ];
  P.solaropa.stack = ["Python", "Flask", "SQLite", "REST ve OAuth 2.0", "Google Gemini", "Cloudflare Tunnel", "JavaScript", "SVG animasyon", "Playwright", "SMTP ve Telegram"];
  const solarCaps = [
    "Operasyon merkezi: her santral için 10 saniyede bir yenilenen enerji akışı kartı.",
    "Tek santral: çizgiler gücün gerçekte aktığı yönde hareket eder.",
    "Filo toplam akışı; sekmelerle istenen santrale odaklanılır.",
    "Gösterge satırı; alarm kartının üzerine gelince hangi santralde ne olduğu listelenir.",
    "TV ekranı: tüm santraller tek ekranda, menü yok.",
    "Yeni bir alarm televizyonu 60 saniye boyunca sirenle kaplar.",
    "Her markanın kendi alarmlarını SolarOPA tespitleriyle birleştiren 30 günlük olay kaydı.",
    "Her entegrasyonun canlı durumu ve kart başına bağlantı testi.",
    "Ayarlar: her düğme gerçekten çalışır; kaydedilen gizli bilgiler bir daha gösterilmez.",
    "Uzaktan erişim: tünel durumu, davet bağlantıları ve onay listesi.",
    "Onaylı izleyici salt okunurdur; sunucu tüm ayar isteklerini reddeder.",
    "Gemini ile yazılan tek sayfalık günlük filo raporu.",
    "Bakım ve servis planlayıcı.",
    "Cihaz başına canlı değerli donanım envanteri.",
    "Panelin, menünün ve TV görünümünün telefon düzeni.",
    "Mimari: beş veri kaynağı, tek motor, beş çıktı."
  ];
  P.solaropa.gallery.forEach((g, i) => { g.caption = solarCaps[i]; });

  Object.assign(P["cnc-scanner"], {
    title: "Düzlemsel yakın alan anten tarayıcı",
    subtitle: "Otomatik X-Y tarama sistemi ve kontrol arayüzü",
    org: "ASELSAN REHİS Test Merkezleri Direktörlüğü",
    period: "Yaz 2026",
    role: "Yazılım ve hareket kontrolü",
    short: "Ölçülen antenin önünde planlanan bir ızgara boyunca probu hareket ettiren, donanım güvenlik kilitleri ve C# kontrol arayüzü olan Kartezyen X-Y konumlandırıcı.",
    summary: "Düzlemsel yakın alan ölçümleri probun antenin önünde yüzlerce hassas ızgara noktasına konumlanmasını gerektirir. Kontrol tarafını ben geliştirdim: tarama ızgarasını planlayan, GRBL kontrolcüsüne G-code akıtan ve tarama sürerken kontrolü operatörde tutan bir Windows Forms uygulaması."
  });
  P["cnc-scanner"].metrics.forEach((m, i) => { m.label = ["baud GRBL seri bağlantısı", "NC limit anahtarı", "mutlak ve göreli hareket"][i]; });
  P["cnc-scanner"].bullets = [
    "<strong>Donanım ve hareket kontrolü.</strong> Bilgisayardan GRBL yazılımlı Arduino Uno ve CNC Shield V3'e asenkron seri port bağlantısı; X ve Y step motorlarının sürülmesi.",
    "<strong>G-code üretimi.</strong> Genişliği, yüksekliği ve adım boyları ayarlanabilen, antene ortalanmış tarama ızgarasından gerçek zamanlı G-code (G90, G91, G92, G1) üretimi.",
    "<strong>Güvenlik kilitleri.</strong> Dört normalde kapalı limit anahtarı motorları donanım seviyesinde durdurur ve GRBL'yi alarm moduna alır; kilit açma ve sıfırlama operatörün bilinçli işlemleridir.",
    "<strong>Donmayan arayüz.</strong> Taramalar BackgroundWorker iş parçacıklarında çalışır, arayüz hiç donmaz; taranan noktaların canlı bitmap görüntüsü ve her noktada ilerleme hızına göre ayarlanmış bekleme."
  ];
  P["cnc-scanner"].stack = ["C#", ".NET Windows Forms", "GRBL", "G-code", "Arduino", "Seri haberleşme (RS-232)", "Step motorlar"];
  ["Probu taşıyan X-Y tarayıcı şasisi.", "Eksenlerdeki dört limit anahtarının konumu.", "Arduino Uno, CNC Shield V3, step sürücüler ve limit anahtarı bağlantıları.", "Tarama ızgarası: ortalanmış orijin çevresinde genişlik, yükseklik ve adım boyları.", "Kontrol arayüzü: bağlantı, elle hareket, tarama planlama ve çalıştırma.", "Tarama planlama ve ilerleme görünümü."]
    .forEach((c, i) => { P["cnc-scanner"].gallery[i].caption = c; });

  Object.assign(P["spectrum-api"], {
    title: "Gerçek zamanlı spektrum analizörü kontrolü",
    subtitle: "Cihaz API entegrasyonu ve özel arayüz",
    org: "ASELSAN REHİS Test Merkezleri Direktörlüğü",
    period: "Yaz 2026",
    role: "Cihaz yazılımı",
    short: "Gerçek zamanlı spektrum analizörünü üreticinin yerel API'si ile Ethernet üzerinden süren ve gürültü tabanının üzerindeki taşıyıcı tepelerini otomatik bulan C# uygulaması.",
    summary: "Laboratuvarın analizörü üretici yazılımı yerine kendi araçlarıyla ayarlayıp işaretçi verilerini alabilmesi gerekiyordu. Üreticinin C/C++ API'si üzerine bağlantıyı yöneten, taramayı ayarlayan ve tepe araması yapan bir masaüstü uygulaması yazdım ve sonuçlarını üretici yazılımıyla karşılaştırarak doğruladım."
  });
  P["spectrum-api"].metrics.forEach((m, i) => { m.label = ["5000 portunda Ethernet kontrolü", "kalibre gürültü tabanı eşiği", "açıklığa göre RBW seçimi"][i]; });
  P["spectrum-api"].metrics[2].value = "Otomatik";
  P["spectrum-api"].bullets = [
    "<strong>Yerel API entegrasyonu.</strong> Üretici C/C++ API'si ile Ethernet üzerinden bağlantı yönetimi, IP doğrulama ve kalıcı cihaz oturumu.",
    "<strong>Tarama ayarları.</strong> Başlangıç/bitiş ya da merkez/açıklık girişi ve otomatik çözünürlük bant genişliği (RBW) ayarı.",
    "<strong>Tepe arama.</strong> Kalibre gürültü tabanının üzerindeki taşıyıcıların gerçek zamanlı tespiti; gerçek sinyaller ortam RF gürültüsünden ayrılır, frekans ve güçleriyle listelenir.",
    "<strong>Doğrulama.</strong> Sonuçlar savunma test ortamında üreticinin referans yazılımıyla işaretçi işaretçi karşılaştırıldı."
  ];
  P["spectrum-api"].stack = ["C#", ".NET", "Üretici C/C++ API'si", "Ethernet TCP/IP", "Sinyal işleme"];
  ["Tepe arama sonuçları: tespit edilen her taşıyıcının frekansı ve gücü.", "Analizöre Ethernet üzerinden bağlantı.", "Cihaza gönderilen tarama parametreleri.", "Üretici yazılımındaki referans iz; doğrulamada kullanıldı."]
    .forEach((c, i) => { P["spectrum-api"].gallery[i].caption = c; });

  Object.assign(P.ultrasonic, {
    title: "Ultrasonik biletleme sistemi",
    subtitle: "Duyulmayan akustik bağlantıyla çevrimdışı geçiş kontrolü",
    org: "Yaşar Üniversitesi",
    role: "Telekomünikasyon projesi",
    short: "Telefon hoparlörü erişim jetonunu 18–22 kHz'de turnike mikrofonuna gönderir; internet, NFC ya da QR okutma gerekmez.",
    summary: "QR tabanlı turnikeler yoğun saatlerde yavaşlar ve bağlantı olmadan çalışmaz. Bu proje sıradan telefon hoparlör ve mikrofonlarının taşıyabileceği bir yakın ultrason bağlantısı tasarlıyor ve jeton bitlerinden alıcıdaki bit hata oranına kadar uçtan uca MATLAB'da benzetimini yapıyor."
  });
  P.ultrasonic.metrics.forEach((m, i) => { m.label = ["duyulmayan bant", "modülasyon", "eşlik bitli jeton"][i]; });
  P.ultrasonic.metrics[2].value = "16 bit";
  P.ultrasonic.bullets = [
    "<strong>Jeton ve çerçeve.</strong> Kullanıcı ve istasyon kimlikleri 16 bitlik bir jetona paketlenir; senkronizasyon için Barker dizisiyle çerçevelenir ve eşlik biti eklenir.",
    "<strong>Modülasyon.</strong> 18–22 kHz bandında iki ton arasında ikili frekans kaydırmalı anahtarlama (BFSK); insan kulağı duymaz ama telefon donanımının sınırları içindedir.",
    "<strong>Kanal modeli.</strong> İki ışınlı çok yollu yayılım, renkli ortam gürültüsü, dönüştürücü bant sınırları ve hareket eden kullanıcıdan kaynaklanan Doppler kayması.",
    "<strong>Alıcı ve sonuçlar.</strong> Dördün karıştırma, zarf algılama, Barker korelasyonu ve eşlik denetimi; SNR'ye karşı bit hata oranıyla değerlendirildi."
  ];
  P.ultrasonic.stack = ["MATLAB", "Sayısal haberleşme", "BFSK", "DSP", "Kanal modelleme"];
  ["Kavram: telefon gönderir, turnike dinler.", "Modülasyon öncesi giriş bit dizisi.", "Alıcı aşamaları: gürültülü sinyal, süzülmüş zarflar, karar sinyali.", "Benzetimi yapılan bağlantının tamamı için SNR'ye karşı bit hata oranı."]
    .forEach((c, i) => { P.ultrasonic.gallery[i].caption = c; });

  T.experience[0] = Object.assign(T.experience[0], {
    role: "Stajyer mühendis, RF ve mikrodalga test",
    org: "ASELSAN REHİS Test Merkezleri Direktörlüğü",
    period: "Haz – Ağu 2026",
    bullets: [
      "Düzlemsel yakın alan anten test sisteminin X-Y tarama otomasyonunu ve C# arayüzünü geliştirdim.",
      "Gerçek zamanlı spektrum analizörü için otomatik RBW ve tepe aramalı bir Ethernet API uygulaması yazdım.",
      "Referans düzlemleri kablo uçlarına taşınmış VNA tam iki port kalibrasyonları yaptım, RF bileşenleri karakterize ettim, yükselteç kazancı ve P1dB sıkışmasını ölçtüm.",
      "Yakın alan yansımasız oda ölçümlerine ve radar soğurucu malzemelerin NRL arch testlerine katıldım."
    ]
  });
  T.experience[1] = Object.assign(T.experience[1], {
    role: "Stajyer mühendis, güneş enerjisi ve güç sistemleri",
    period: "Tem – Ağu 2025 ve Ağu – Eyl 2026",
    bullets: [
      "AutoCAD'de güneş enerjisi elektrik projeleri ve tek hat şemaları çizdim, PVsyst ve ETAP ile verim benzetimleri yaptım.",
      "Reaktif güç kompanzasyon panoları tasarladım, kondansatör gruplarını boyutlandırdım ve kontrol rölelerini ayarladım.",
      "Topraklama direnci ölçtüm, kaçak akım rölelerini doğruladım ve periyodik trafo merkezi denetimlerine katıldım.",
      "Yük hesapları, kablo kesiti seçimi ve elektrikli araç şarj istasyonu ile batarya depolama kurulumlarına destek verdim; şirketin santral filosu için SolarOPA'yı geliştirdim."
    ]
  });

  T.education[0] = Object.assign(T.education[0], {
    school: "Yaşar Üniversitesi",
    degree: "Elektrik-Elektronik Mühendisliği lisans",
    period: "2022 – devam ediyor",
    detail: "Not ortalaması 3.73 / 4.00, %100 başarı bursu. Dersler: Antenler ve Yayılım, Elektromanyetik Alan Teorisi, Mikrodalga ve RF Ölçümleri, Sayısal Haberleşme, İşaretler ve Sistemler."
  });
  T.education[1] = Object.assign(T.education[1], {
    school: "Cem Bakioğlu Anadolu Lisesi",
    degree: "Lise diploması",
    detail: "96.89 / 100 ile okul ikincisi olarak mezun oldum."
  });

  T.skills = [
    { group: "RF ve mikrodalga", items: ["Antenler ve yayılım", "VNA iki port kalibrasyonu", "S-parametreleri ve empedans uyumlama", "P1dB sıkışma testi", "Gerçek zamanlı spektrum analizi", "Yakın alan oda testleri", "NRL arch soğurucu testi"] },
    { group: "Test otomasyonu ve yazılım", items: ["C# ve .NET Windows Forms", "Python ve Flask", "Cihaz API'leri ve SCPI", "Seri ve Ethernet TCP/IP", "SQLite", "MATLAB"] },
    { group: "Hareket ve gömülü donanım", items: ["X-Y Kartezyen konumlandırıcılar", "Step motor sürücüleri", "GRBL ve G-code", "Limit anahtarı kilitleri", "Arduino ve STM32"] },
    { group: "Güç ve enerji", items: ["Güneş enerjisi santrali tasarımı", "PVsyst", "ETAP", "AutoCAD tek hat şemaları", "Reaktif güç kompanzasyonu", "Topraklama ve kaçak akım testleri"] },
    { group: "Benzetim ve araçlar", items: ["Simulink ve Simscape", "LTspice", "Proteus", "Git ve GitHub", "Visual Studio"] }
  ];

  T.certifications[0].issuer = "Savunma sanayii";
  ["ASELSAN 'a Yetenek' yaz stajı programı", "ASELSAN iş sağlığı ve güvenliği eğitimi, 12 saat", "ROKETSAN LEVEL UP AI: YOLO ile nesne tespiti ve takibi", "ROKETSAN LEVEL UP AI: yapay zekâ ajanları ve doküman asistanları", "TUSAŞ LIFT UP sanayi odaklı lisans bitirme projeleri konferansı", "Savunma Sanayii Akademi, Kariyer ve Yetkinlik Buluşmaları 3", "Savunma Sanayii Akademi, Kariyer ve Yetkinlik Buluşmaları 1"]
    .forEach((t, i) => { T.certifications[0].items[i].title = t; });
  ["Haz – Ağu 2026", "Haz 2026", "Ağu 2026", "Ağu 2026", "2024 – 2025", "Mar 2026", "Ara 2024"].forEach((t, i) => { T.certifications[0].items[i].date = t; });
  T.certifications[1].issuer = "Kamu ve araştırma";
  T.certifications[1].items[0].title = "Çip Tasarımı Uzmanlık Programı, Milli Teknoloji Hamlesi, 10 oturum";
  T.certifications[1].items[0].date = "Oca – Şub 2026";
  T.certifications[1].items[1].title = "TÜBİTAK 4006 bilim fuarı, öğrenci araştırma projesi";
  T.certifications[2].items[0].title = "Core Signal Processing Techniques in MATLAB, öğrenme yolu";
  T.certifications[2].items[1].title = "Core MATLAB Skills, öğrenme yolu";
  const trMonth = { Jan: "Oca", Feb: "Şub", Mar: "Mar", Apr: "Nis", May: "May", Jun: "Haz", Jul: "Tem", Aug: "Ağu", Sep: "Eyl", Oct: "Eki", Nov: "Kas", Dec: "Ara" };
  T.certifications[2].items.forEach((it) => { it.date = it.date.replace(/[A-Z][a-z]{2}/g, (m) => trMonth[m] || m); });

  T.languages = [
    { name: "Türkçe", level: "Ana dil" },
    { name: "İngilizce", level: "B2, profesyonel çalışma yeterliliği" }
  ];

  window.SITE_TR = T;
})();
