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
  T.documents[2].href = "assets/Efe_Demirer_Portfolyo.pdf";
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
    subtitle: "EFEscan: arıza emniyetli limitlerle tek tıkla otomatik X-Y tarama",
    org: "ASELSAN REHİS Test Merkezleri Direktörlüğü",
    period: "Yaz 2026",
    role: "Donanım güvenliği, hareket kontrolü ve arayüz",
    short: "Elle tek tek komutla sürülen X-Y anten test düzeneğini tek tıkla çalışan otomatik bir tarayıcıya dönüştürdüm: C# arayüzü ızgarayı planlayıp GRBL'ye G-code gönderir, dört arıza emniyetli limit anahtarı donanımı korur.",
    summary: "Test Merkezi'ndeki düzlemsel tarama düzeneği terminalden tek tek elle hareket komutlarıyla sürülüyordu; çok noktalı bir tarama saatlerce operatör dikkati istiyor ve hataya çok açıktı. Önce eksen sonunu aşmaya karşı donanım koruması ekledim, ardından taramanın tamamını tek işlemle yürüten ve alanla çözünürlüğün kod değiştirmeden ayarlanabildiği EFEscan adlı Windows Forms uygulamasını yazdım."
  });
  P["cnc-scanner"].metrics.forEach((m, i) => { m.label = ["tam tarama için gereken operatör işlemi", "40 mm adımlı 280 × 280 mm taramadaki nokta", "arıza emniyetli NC limit anahtarı", "baud GRBL seri bağlantısı"][i]; });
  P["cnc-scanner"].bullets = [
    "<strong>Önce güvenlik.</strong> Risk incelemesinde arabaların ray sonunda durmasını sağlayan hiçbir mekanizma olmadığını gördüm; tam torkla ray sonunu aşmak rayı bükebilir, kaplini sıyırabilir ya da prob tutucuyu kırabilirdi. ±X ve ±Y uçlarına dört limit anahtarı seçip lehimledim, monte ettim ve GRBL donanım limitlerini etkinleştirdim.",
    "<strong>Arıza emniyetli bağlantı.</strong> Anahtarlar normalde kapalı (NC) bağlandı; kopan bir kablo limit temasıyla aynı görünür ve gerçek bir çarpışmaya kadar gizli kalmak yerine anında ALARM verir. Hareket ancak bilinçli iki adımlı kilit açmayla devam eder: yazılımsal sıfırlama (0x18), ardından $X.",
    "<strong>Donanım ve protokol.</strong> GRBL v1.1 yüklü Arduino Uno, CNC Shield V3, iki bipolar step motor ve 15 V besleme; USB seri hat 115200 baud (8N1), metin tabanlı G-code (G90, G91, G1, G92) ve GRBL'nin “ok” onayları.",
    "<strong>Merkez odaklı ızgara.</strong> Operatör probu anten merkezine getirip orijin yapar (G92 X0 Y0). Noktalar bu merkez etrafında simetrik üretilir; toplam nokta sayısı, (W/ΔX + 1) × (H/ΔY + 1), süre tahmini için taramadan önce gösterilir.",
    "<strong>Yılan (boustrophedon) rota.</strong> Geri dönüş hareketini önlemek için X yönü her satırda değişir. Her nokta tek bir G90 G1 hareketidir ve sıradaki komut ancak GRBL “ok” dedikten sonra gönderilir.",
    "<strong>Kontrol operatörde.</strong> Canlı ilerleme sayacı, son tamamlanan noktadan duraklatıp devam etme, referansı kaybetmeden orijine dönme ve port bağlanıp GRBL kilidi açılmadan, girişler eksen sınırlarına göre doğrulanmadan ve orijin ayarlanmadan açılmayan BAŞLAT düğmesi. Tarama arka plan iş parçacığında çalışır, arayüz donmaz."
  ];
  P["cnc-scanner"].stack = ["C#", ".NET Windows Forms", "GRBL v1.1", "G-code", "Arduino Uno", "CNC Shield V3", "Seri haberleşme (USB, 8N1)", "Step motorlar"];
  ["X-Y şasi: Y arabası ana gövdede, X arabası çapraz kolda, prob tutucu aşağı bakıyor.", "X ve Y eksen uçlarındaki dört normalde kapalı limit anahtarı.", "15 V besleme, CNC Shield V3'lü Arduino Uno, step motor ve limit anahtarı bağlantıları.", "Merkez odaklı yılan rota: orijin anten merkezinde, yön her satırda değişiyor.", "EFEscan: bağlantı, elle hareket ve tarama bölümleri; kilit açma ($X) ve sıfırlama ($H).", "40 mm adımla 280 × 280 mm: taramadan önce 64 nokta hesaplandı."]
    .forEach((c, i) => { P["cnc-scanner"].gallery[i].caption = c; });

  Object.assign(P["spectrum-api"], {
    title: "Gerçek zamanlı spektrum analizörü kontrolü",
    subtitle: "Harogic NXN-400'ün Ethernet ile kontrolü ve otomatik tepe arama",
    org: "ASELSAN REHİS Test Merkezleri Direktörlüğü",
    period: "Yaz 2026",
    role: "Cihaz yazılımı",
    short: "Harogic NXN-400 gerçek zamanlı spektrum analizörünü HtraApi kütüphanesiyle Ethernet üzerinden ayarlayan ve gürültü tabanının üzerindeki her taşıyıcıyı listeleyen, cihazın kendi işaretçileriyle doğrulanmış C# uygulaması.",
    summary: "Analizördeki sinyalleri okumak, üretici yazılımında işaretçileri elle yerleştirmek demekti. Cihaza Ethernet üzerinden bağlanan, doğrulanmış tarama ayarlarını tek çağrıda gönderen ve dönen iz üzerinde tepe araması yapan bir masaüstü aracı yazdım; ardından 300 MHz – 4 GHz ölçümünde cihazın kendi işaretçileriyle karşılaştırdım. Laboratuvar aynı tepe aramasını daha sonra RF soğurucu arch testlerinde kullandı."
  });
  P["spectrum-api"].metrics.forEach((m, i) => { m.label = ["300 MHz – 4 GHz arasında bulunan taşıyıcı", "laboratuvar arka planından belirlenen gürültü eşiği", "doğrulanmış taramayı göndermek için", "IPv4 üzerinden Ethernet kontrolü"][i]; });
  P["spectrum-api"].metrics[2].value = "1 çağrı";
  P["spectrum-api"].bullets = [
    "<strong>Bağlantı.</strong> Operatör analizörün IP adresini girer; uygulama adresi doğrular, HtraApi açılış profilini port 5000 ve IPv4 olarak ayarlar, Device_Open ile oturum açar ve cihaz modelini gösterir. Bağlantı başarısız olursa API hata kodu ve kontrol edilecekler gösterilir.",
    "<strong>Bağlantı sorununun çözümü.</strong> İlk bağlantı hiçbir hata vermeden başarısız oldu. Bilgisayar ağ kartına cihazla aynı alt ağda sabit IP vererek, ping testleri ve API belgeleriyle sorunu açılış profilindeki yanlış porta kadar izledim.",
    "<strong>Parametre yönetimi.</strong> Başlangıç, bitiş, merkez ve açıklık, otomatik ya da elle RBW ve gürültü tabanı denetlenir (başlangıç bitişten küçük, gürültü tabanı dBm cinsinden negatif) ve cihaza tek çağrıda gönderilir.",
    "<strong>Tepe arama.</strong> Bir iz noktası yalnızca gürültü tabanının üzerinde ve yerel maksimum ise raporlanır; geniş bir sinyalin omuzları ayrı tepe sayılmasın diye en az kutu aralığı şartı vardır.",
    "<strong>Donmayan arayüz.</strong> Ağ aktarımları async/await ile yapılır; uzun tarama verisi indirilirken arayüz kullanılabilir kalır.",
    "<strong>Doğrulama ve kullanım.</strong> Tepe frekansları cihazın kendi işaretçileriyle çözünürlük bant genişliği içinde örtüştü, ortam gürültüsünden sahte tepe çıkmadı. Arch testlerinde araç baskın yansıyan bileşeni elle işaretçi koymaya gerek kalmadan otomatik buldu."
  ];
  P["spectrum-api"].stack = ["C#", ".NET Windows Forms", "HtraApi (üretici C/C++ API'si)", "Ethernet TCP/IP", "async/await", "Tepe tespiti"];
  ["300 MHz – 4 GHz tepe araması: 12 taşıyıcı listelendi, en güçlüsü 1876,855 MHz'de.", "Ethernet bağlantısı kuruldu: kayıt oturumu ve cihaz modelini doğruluyor (seri numarası gizlendi).", "Tarama parametreleri doğrulanıp cihaza tek çağrıda gönderiliyor.", "Aynı bant için analizörün kendi işaretçileri; arayüzü doğrulamakta kullanıldı."]
    .forEach((c, i) => { P["spectrum-api"].gallery[i].caption = c; });

  Object.assign(P.ultrasonic, {
    title: "Ultrasonik biletleme sistemi",
    subtitle: "Duyulmayan akustik bağlantıyla çevrimdışı geçiş kontrolü",
    org: "Yaşar Üniversitesi, EEE 3524 Telekomünikasyon",
    period: "Bahar 2026",
    role: "Bireysel dönem projesi",
    short: "Telefon hoparlörü 16 bitlik erişim jetonunu 18–22 kHz'de turnike mikrofonuna gönderir; internet, NFC ya da QR okutma gerekmez. MATLAB'da uçtan uca benzetimi yapılan bağlantı −16 dB SNR'ye kadar bit hatasını %1'in altında tutuyor.",
    summary: "İzmir'deki metro, İZBAN ve vapur turnikeleri gibi yoğun noktalarda QR kodlu geçişler, kod güneşte okunmadığında ya da bağlantı koptuğunda yavaşlıyor; NFC de her telefonda yok. Bu proje her telefonda zaten bulunan hoparlör ve mikrofonla çalışan, yazılım tanımlı bir akustik modem tasarlıyor ve onu MATLAB'da gerçek bir istasyonun koşullarına karşı sınıyor: hoparlör frekans düşümü, tren gürültüsü, yankılar ve yürüyen kullanıcı."
  });
  P.ultrasonic.metrics.forEach((m, i) => { m.label = ["BER'in %1 altında kaldığı en düşük SNR", "−16 dB'de BER, nokta başına 3.200 bit", "dayanılan yürüme hızı Doppler etkisi", "çerçeve başına, 25 bit/sn'de 1,52 sn"][i]; });
  P.ultrasonic.metrics[1].value = "%0,75"; P.ultrasonic.metrics[2].value = "1,5 m/sn"; P.ultrasonic.metrics[3].value = "38 bit";
  P.ultrasonic.bullets = [
    "<strong>Jeton.</strong> 10 bitlik kullanıcı kimliği (1.024 kullanıcı) ve 6 bitlik istasyon kimliği (64 turnike) sabit 16 bitlik bir yüke paketlenir; bu ASCII ya da 32 bitlik tamsayıların gerektireceğinin dörtte biridir ve her alan sabit konumdadır.",
    "<strong>Çerçeve.</strong> Mikrofonun oturması için 8 bitlik 10101010 ön eki, 13 bitlik Barker senkron kelimesi, 16 bitlik yük ve çift eşlik biti: toplam 38 bit.",
    "<strong>Modülasyon.</strong> 0 için 18,5 kHz, 1 için 19,5 kHz BFSK; 48 kHz örneklemede 40 ms'lik semboller, yaklaşık 25 bit/sn. 1 kHz'lik aralık tonları dik tutar ve yürüyen bir kullanıcının yaklaşık 85 Hz'lik Doppler kaymasından çok daha geniştir; 40 ms, yankıların bir sonraki bitten önce sönmesine izin verir.",
    "<strong>İstasyon kanalı.</strong> Hoparlör ve mikrofon düşümü için 6. derece Butterworth 18–22 kHz bant geçiren süzgeç, AWGN ile birlikte 10–20 kHz renkli tren gürültüsü, iki ışınlı yankı (β = 0,4, 5 ms) ve spline ara değerlemeyle zaman ölçekleme olarak uygulanan Doppler.",
    "<strong>Alıcı.</strong> İki tonda eş evreli olmayan I/Q karıştırma, kare almadan önce uyumlu süzgeç olarak bir bit uzunluğunda hareketli ortalama, mark eksi space zarf kararı, zamanlama için Barker çapraz korelasyonu, sembol ortasından örnekleme, eşlik denetimi ve jetonun çözülmesi.",
    "<strong>Sonuçlar.</strong> −20 ile +20 dB arasında nokta başına 200 paketlik Monte Carlo taraması: +20 dB'de hiç hata yok, 0 dB'de %0,25, −10 dB'de %0,28 ve gürültünün sinyalden 40 kat güçlü olduğu −16 dB'de %0,75. Bağlantı −20 dB'de çöküyor (%17).",
    "<strong>Belirlenen sonraki adımlar.</strong> Eşlik biti yerine Reed-Solomon ya da Hamming kodları, sürekli fazlı FSK, tekrar saldırılarına karşı zaman tabanlı tek kullanımlık jetonlar ve aynı turnikede birden çok kullanıcı için TDMA."
  ];
  P.ultrasonic.stack = ["MATLAB", "BFSK", "Eş evreli olmayan I/Q demodülasyon", "Barker senkronizasyonu", "Kanal modelleme", "Monte Carlo BER"];
  ["Kavram: telefon gönderir, turnike dinler.", "Jeton üretimi: kullanıcı ve istasyon kimlikleri 16 bite paketleniyor.", "40 ms'de 1 → 0 geçişi olan giriş bit dizisi.", "19,5 kHz'den 18,5 kHz'e atlayan BFSK sinyalinin spektrogramı.", "Temiz gönderilen sinyal ve bant sınırı, gürültü, yankı ve Doppler sonrası aynı sinyal.", "10 dB SNR'de alıcı: gürültülü giriş, ton zarfları ve karar sinyali.", "Barker çapraz korelasyon tepesi zamanlamayı belirler; bitler sembol ortalarından örneklenir.", "SNR'ye karşı BER; kesikli çizgi %1'lik çalışma sınırı."]
    .forEach((c, i) => { P.ultrasonic.gallery[i].caption = c; });
  P.ultrasonic.links[0].label = "Projenin tam raporu (PDF, 27 sayfa, İngilizce)";
  P.ultrasonic.note = "Kavram görselleri raporda belirtildiği gibi Gemini ile üretildi; tüm grafikler MATLAB benzetim çıktısıdır.";

  T.experience[0] = Object.assign(T.experience[0], {
    role: "Stajyer mühendis, RF ve mikrodalga test",
    org: "ASELSAN REHİS Test Merkezleri Direktörlüğü",
    period: "Haz – Ağu 2026",
    bullets: [
      "Düzlemsel yakın alan anten tarayıcısına arıza emniyetli limit anahtarları ekledim ve taramanın tamamını tek işlemle yürüten C# arayüzü EFEscan'i yazdım.",
      "Harogic NXN-400 spektrum analizörü için otomatik tepe aramalı, cihaz işaretçileriyle doğrulanmış bir Ethernet kontrol uygulaması yazdım.",
      "Referans düzlemleri kablo uçlarına taşınmış VNA tam iki port kalibrasyonları yaptım, RF bileşenleri karakterize ettim, yükselteç kazancı ve P1dB sıkışmasını ölçtüm.",
      "Yakın alan yansımasız oda ölçümlerine ve radar soğurucu malzemelerin NRL arch testlerine katıldım.",
      "STM32'nin bir SP3T RF anahtarını anten elemanları arasında sırayla değiştirip VNA taraması yaptırdığı faz dizili anten ölçüm düzeneğinin kurulumunu ve testini yaptım."
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
