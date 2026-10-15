import subprocess, os, shutil
import pymupdf

edge_path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
if not os.path.exists(edge_path):
    edge_path = r'C:\Program Files\Microsoft\Edge\Application\msedge.exe'

# ==============================================================================
# OTOKOÇ OTOMOTİV İÇİN ADAPTE EDİLMİŞ 1 SAYFA ATS UYUMLU TÜRKÇE CV
# SAYFAYA ORANTILI, BÜYÜTÜLMÜŞ YAZI TİPLERİ VE SIFIR BOŞLUK
# ==============================================================================
cv_otokoc_html = """<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8">
<title>Efe Demirer - Özgeçmiş (Otokoç Otomotiv)</title>
<style>
  @page {
    size: A4 portrait;
    margin: 10mm 11mm 10mm 11mm;
  }
  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  body {
    font-family: Arial, "Helvetica Neue", Helvetica, "Segoe UI", sans-serif;
    color: #111827;
    margin: 0;
    padding: 0;
    font-size: 7.95pt;
    line-height: 1.28;
  }
  .header {
    text-align: center;
    margin-bottom: 5px;
    padding-bottom: 2px;
  }
  .name {
    font-size: 17.5pt;
    font-weight: 800;
    letter-spacing: 0.6px;
    color: #0f172a;
    margin: 0 0 2px;
    text-transform: uppercase;
  }
  .sub-title {
    font-size: 9.2pt;
    font-weight: 700;
    color: #0284c7;
    margin: 0 0 3px;
  }
  .contact-bar {
    font-size: 8pt;
    color: #334155;
  }
  .contact-bar a {
    color: #0284c7;
    text-decoration: none;
    font-weight: 600;
  }
  .section-title {
    font-size: 9pt;
    font-weight: 800;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1.3px solid #0f172a;
    padding-bottom: 1.5px;
    margin: 6px 0 3px;
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1px;
  }
  .entry-title {
    font-size: 8.5pt;
    font-weight: 700;
    color: #0f172a;
  }
  .entry-date {
    font-size: 8pt;
    font-weight: 700;
    color: #0f172a;
    white-space: nowrap;
  }
  .entry-sub {
    font-size: 7.95pt;
    color: #1e293b;
    font-style: italic;
    margin-bottom: 2px;
  }
  p {
    margin: 0 0 3px;
    text-align: justify;
  }
  ul {
    margin: 1.5px 0 3.5px 13px;
    padding: 0;
    list-style-type: disc;
  }
  li {
    margin-bottom: 1.4px;
    line-height: 1.28;
    text-align: justify;
  }
  .skills-list {
    margin: 1.5px 0 3px 13px;
    padding: 0;
    list-style-type: disc;
  }
  .skills-list li {
    margin-bottom: 1.4px;
    line-height: 1.28;
  }
  .skills-list strong {
    color: #0f172a;
  }
  .ref-grid {
    font-size: 7.6pt;
    line-height: 1.25;
  }
  .ref-item {
    margin-bottom: 1.6px;
  }
  .ref-item strong {
    color: #0f172a;
  }
</style>
</head>
<body>

<div class="header">
  <div class="name">Efe Demirer</div>
  <div class="sub-title">Elektrik-Elektronik Mühendisi Adayı · Elektrikli Araçlar, Test Otomasyonu &amp; Enerji Sistemleri</div>
  <div class="contact-bar">
    İzmir, Türkiye &nbsp;|&nbsp; +90 554 638 86 92 &nbsp;|&nbsp; <a href="mailto:efedemirer.tr@gmail.com">efedemirer.tr@gmail.com</a> &nbsp;|&nbsp; <a href="https://efedemirerr.github.io">efedemirerr.github.io</a> &nbsp;|&nbsp; <a href="https://linkedin.com/in/efe-demirer-aa7ba3252">LinkedIn</a> &nbsp;|&nbsp; <a href="https://github.com/efedemirerr">GitHub</a>
  </div>
</div>

<div class="section-title">Özet</div>
<p>
Yaşar Üniversitesi Elektrik-Elektronik Mühendisliği 4. sınıf öğrencisiyim (%100 Burslu, GNO: 3.73 / 4.00, Yüksek Onur). Elektrikli araç (EA) şarj altyapıları, test otomasyonu, donanım kontrol arayüzleri, C#/.NET ve Python tabanlı telemetri/veri izleme sistemleri ile güç elektroniği alanlarında saha ve Ar-Ge deneyimine sahibim. ASELSAN REHİS bünyesinde haberleşme protokolleri, API tabanlı cihaz kontrolü, donanımsal güvenlik kilitleri ve test otomasyonu yazılımları geliştirdim. OPA Mühendislik bünyesinde elektrikli araç şarj istasyonları projelendirme, AutoCAD ile elektrik dağıtım şemaları, kompanzasyon ve koruma sistemleri üzerine çalıştım. Otokoç Otomotiv'in mobilite, yeni nesil elektrikli araç teknolojileri, filo ve mühendislik operasyonlarına haftada 4 gün katılım sağlayarak uzun dönem stajyer olarak değer katmayı hedefliyorum.
</p>

<div class="section-title">Eğitim</div>
<div class="row">
  <div class="entry-title">Yaşar Üniversitesi – İzmir</div>
  <div class="entry-date">09/2022 – Devam Ediyor</div>
</div>
<div class="entry-sub" style="font-style: normal;">
  Lisans, Elektrik-Elektronik Mühendisliği &nbsp;|&nbsp; %100 ÖSYM Burslu &nbsp;|&nbsp; GNO: 3.73 / 4.00 (Yüksek Onur Öğrencisi)<br>
  <strong>İlgili Dersler:</strong> Elektrik Makineleri ve Güç Sistemleri, Sayısal Haberleşme, Mikrodenetleyiciler, Sinyaller ve Sistemler, Elektromanyetik Alan Teorisi
</div>

<div class="row" style="margin-top: 3px;">
  <div class="entry-title">Cem Bakioğlu Anadolu Lisesi – İzmir</div>
  <div class="entry-date">09/2018 – 06/2022</div>
</div>
<div class="entry-sub" style="font-style: normal;">Lise Eğitimi &nbsp;|&nbsp; Okul İkincisi (Salutatorian) &nbsp;|&nbsp; Mezuniyet Derecesi: 96.89 / 100</div>

<div class="section-title">İş ve Staj Deneyimi</div>

<div class="row">
  <div class="entry-title">OPA Mühendislik – İzmir</div>
  <div class="entry-date">07/2025 – 08/2025 &amp; 08/2026 – 09/2026</div>
</div>
<div class="entry-sub">Stajyer Mühendis (Elektrikli Araç Altyapıları, Projelendirme &amp; Güç Sistemleri)</div>
<ul>
  <li>Elektrikli araç (EA) şarj istasyonları için güç tüketim hesapları, kablo kesiti seçimi, altyapı projelendirme ve montaj süreçlerinde aktif görev aldım.</li>
  <li>AutoCAD kullanarak elektrik tesisat projeleri, güç dağıtım panoları ve tek hat şemaları hazırladım.</li>
  <li>Topraklama direnci ölçümü, kaçak akım rölesi (RCD) testleri, şalter bağlantıları ve elektriksel güvenlik kontrollerini gerçekleştirerek teknik uygunluk raporları düzenledim.</li>
  <li>Reaktif güç kompanzasyon panosu tasarımı, kondansatör kademe hesabı ve reaktif güç kontrol rölesi konfigürasyonu yaptım.</li>
  <li>PVsyst ve ETAP kullanarak GES üretim verim simülasyonları, gölgeleme analizleri gerçekleştirdim; trafo merkezlerinin periyodik denetim süreçlerine katıldım.</li>
</ul>

<div class="row">
  <div class="entry-title">ASELSAN REHİS Test Merkezleri Müdürlüğü – Ankara</div>
  <div class="entry-date">06/2026 – 08/2026</div>
</div>
<div class="entry-sub">Stajyer Mühendis (Test Otomasyonu, Donanım Kontrolü &amp; Yazılım)</div>
<ul>
  <li>Test sistemleri için Kartezyen X-Y hareket otomasyonu ve C# .NET Windows Forms tabanlı kullanıcı arayüzü (GUI) geliştirdim.</li>
  <li>Ethernet (TCP/IP) ve seri port protokolleri üzerinden API tabanlı cihaz kontrolü, telemetri veri akışı ve test otomasyonu yazılımları tasarladım.</li>
  <li>Gerçek zamanlı sinyal işleme kapsamında dinamik eşik değerli tepe noktası (Peak Search) tespit algoritması geliştirdim.</li>
  <li>Donanımsal güvenlik altyapısı için Limit Switch tabanlı güvenlik kilit mekanizmaları, step motor sürüşü ve CNC Shield üzerinde GRBL G-Code hareket kontrol entegrasyonu uyguladım.</li>
  <li>Yüksek frekanslı test cihazlarının kalibrasyonu, elektriksel bileşen karakterizasyonu ve test senaryosu planlaması yürüttüm.</li>
</ul>

<div class="section-title">Öne Çıkan Projeler</div>
<div class="row">
  <div class="entry-title">SolarOPA: Otonom Telemetri, IoT Veri İzleme &amp; Durum Raporlama Platformu</div>
  <div class="entry-date">2026</div>
</div>
<div class="entry-sub" style="font-style: normal;">
  REST API, Python, OAuth 2.0, SQLite &nbsp;|&nbsp; <em>Canlı Telemetri &amp; Otomasyon</em>
</div>
<ul>
  <li>OpenAPI üzerinden invertör ve güç verilerini anlık okuyan, SQLite zaman serisi veritabanında depolayan ve sahadaki anomalileri filtreleyen otonom telemetri motoru geliştirdim.</li>
  <li>Veri akışını dinamik performans oranlarına (PR) göre modelleyerek otomatik teknik durum ve arıza analiz raporları üreten sistemi devreye aldım.</li>
</ul>

<div class="section-title">Teknik Yetkinlikler</div>
<ul class="skills-list">
  <li><strong>Elektrikli Araçlar &amp; Güç Sistemleri:</strong> Elektrikli Araç (EA) Şarj İstasyonları Altyapısı, Güç Hesabı &amp; Kablo Kesiti Boyutlandırma, AutoCAD, PVsyst, ETAP, Tek Hat Şemaları, Dağıtım Panoları, Reaktif Güç Kompanzasyonu, Topraklama ve Kaçak Akım (RCD) Testleri</li>
  <li><strong>Yazılım &amp; Test Otomasyonu:</strong> C#, .NET, Windows Forms, GUI Geliştirme, Python, REST API, SQLite, SCPI, Seri Haberleşme (RS-232), Ethernet TCP/IP, MATLAB</li>
  <li><strong>Mekatronik &amp; Donanım Entegrasyonu:</strong> Kartezyen X-Y Hareket Sistemleri, Step Motor Sürücüleri, CNC Shield, GRBL Firmware, Limit Switch Güvenlik Kilitleri, Arduino, STM32</li>
  <li><strong>Veri Analitiği &amp; Modelleme:</strong> MATLAB &amp; Simulink, ROKETSAN LEVEL UP AI (YOLO Akıllı Nesne Tespiti), LTspice, Proteus</li>
</ul>

<div class="section-title">Sertifikalar ve Eğitimler</div>
<ul class="skills-list">
  <li><strong>Sanayi ve Teknoloji Bakanlığı &amp; Milli Teknoloji Akademisi:</strong> Çip Tasarımı Uzmanlık Sertifikası (Belge No: 35867118094667)</li>
  <li><strong>ASELSAN:</strong> 'a Yetenek' Mühendislik Staj Programı Başarı Belgesi (2026) &nbsp;|&nbsp; ASELSAN İSG ve Bilgi Güvenliği Sertifikası (2026)</li>
  <li><strong>ROKETSAN:</strong> LEVEL UP AI – YOLO ile Nesne Tespiti/Takibi &amp; Otonom AI Agent Geliştirme (2026) &nbsp;|&nbsp; <strong>TUSAŞ:</strong> LIFT UP Programı (2025)</li>
  <li><strong>Savunma Sanayii Başkanlığı (SSB):</strong> Milli Yetkinlik Hamlesi Zirvesi (2026) &nbsp;|&nbsp; <strong>TÜBİTAK:</strong> 4006 Bilim ve Toplum Programı Yürütücülüğü</li>
  <li><strong>MathWorks:</strong> Core Signal Processing, Simulink Fundamentals, Simscape Onramp, MATLAB Onramp (2025–2026)</li>
</ul>

<div class="section-title">Yabancı Diller &amp; Ek Bilgiler</div>
<ul class="skills-list">
  <li><strong>Yabancı Dil:</strong> İngilizce B2 (Upper-Intermediate, Yaşar Üniversitesi Yabancı Diller Yüksekokulu Sertifikalı), Türkçe (Anadil)</li>
  <li><strong>Kişisel &amp; Ulaşım:</strong> B Sınıfı Sürücü Belgesi (Aktif) &nbsp;|&nbsp; <strong>Staj Uygunluğu:</strong> Haftada 4 Gün Düzenli Katılım Sağlayabilir &nbsp;|&nbsp; Askerlik: Tecilli (31/12/2031)</li>
</ul>

<div class="section-title">Referanslar</div>
<div class="ref-grid">
  <div class="ref-item"><strong>Prof. Dr. Mustafa SEÇMEN</strong> – Yaşar Üniversitesi Mühendislik Fakültesi Dekanı &nbsp;|&nbsp; mustafa.secmen@yasar.edu.tr &nbsp;|&nbsp; +90 232 570 8232</div>
  <div class="ref-item"><strong>Dr. Ali Haluk NALBANTOĞLU</strong> – Yaşar Üniversitesi Öğretim Üyesi, Eski ASELSAN Elektronik Harp Direktörü &nbsp;|&nbsp; haluk.nalbantoglu@yasar.edu.tr &nbsp;|&nbsp; +90 533 236 1399</div>
  <div class="ref-item"><strong>Hüseyin Talha ÇULHA</strong> – RF Test Mühendisi / ASELSAN REHİS &nbsp;|&nbsp; htalhaculha@aselsan.com &nbsp;|&nbsp; +90 531 950 4360</div>
  <div class="ref-item"><strong>Murat YALÇINKAYA</strong> – Sistem Mühendisi / ASELSAN REHİS (EHSİM) &nbsp;|&nbsp; yalcnkayam@gmail.com &nbsp;|&nbsp; +90 538 847 9001</div>
  <div class="ref-item"><strong>Onur İŞÇİ</strong> – Kurucu &amp; Elektrik-Elektronik Mühendisi / OPA Mühendislik &nbsp;|&nbsp; onur@opamuhendislik.com &nbsp;|&nbsp; +90 530 040 2821</div>
</div>

</body>
</html>"""

def build_pdf():
    temp_html = 'temp_cv_tr.html'
    with open(temp_html, 'w', encoding='utf-8') as f:
        f.write(cv_otokoc_html)
    
    out_pdf = os.path.abspath('Efe_Demirer_CV_TR.pdf')
    cmd = [
        edge_path,
        '--headless',
        '--disable-gpu',
        '--no-pdf-header-footer',
        f'--print-to-pdf={out_pdf}',
        os.path.abspath(temp_html)
    ]
    print("Running Edge Headless PDF generation for balanced CV...")
    subprocess.run(cmd, check=True)
    
    if os.path.exists(temp_html):
        os.remove(temp_html)
        
    doc = pymupdf.open(out_pdf)
    num_pages = len(doc)
    print(f"Generated PDF Page Count: {num_pages}")
    
    if num_pages == 1:
        print("SUCCESS: Perfectly balanced on 1 page!")
    else:
        print(f"WARNING: Page count is {num_pages}!")
        
    if os.path.isdir('assets'):
        shutil.copyfile(out_pdf, os.path.join('assets', 'Efe_Demirer_CV_TR.pdf'))
        print("Copied to assets/Efe_Demirer_CV_TR.pdf")

if __name__ == '__main__':
    build_pdf()
