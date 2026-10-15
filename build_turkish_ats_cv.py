import subprocess, os, shutil
import pymupdf

edge_path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
if not os.path.exists(edge_path):
    edge_path = r'C:\Program Files\Microsoft\Edge\Application\msedge.exe'

# ==============================================================================
# 1-PAGE TURKISH ATS-COMPLIANT CV FOR EFE DEMİRER
# ==============================================================================
cv_tr_html = """<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8">
<title>Efe Demirer - Özgeçmiş (CV)</title>
<style>
  @page {
    size: A4 portrait;
    margin: 7.5mm 11mm 7.5mm 11mm;
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
    font-size: 7.45pt;
    line-height: 1.27;
  }
  .header {
    text-align: center;
    margin-bottom: 4px;
    padding-bottom: 3px;
  }
  .name {
    font-size: 15.5pt;
    font-weight: 800;
    letter-spacing: 0.5px;
    color: #0f172a;
    margin: 0 0 1.5px;
    text-transform: uppercase;
  }
  .sub-title {
    font-size: 8.5pt;
    font-weight: 700;
    color: #0369a1;
    margin: 0 0 2.5px;
  }
  .contact-bar {
    font-size: 7.5pt;
    color: #334155;
  }
  .contact-bar a {
    color: #0369a1;
    text-decoration: none;
    font-weight: 600;
  }
  .section-title {
    font-size: 8.3pt;
    font-weight: 800;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    border-bottom: 1.2px solid #0f172a;
    padding-bottom: 1px;
    margin: 4.5px 0 2.5px;
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.5px;
  }
  .entry-title {
    font-size: 7.9pt;
    font-weight: 700;
    color: #0f172a;
  }
  .entry-date {
    font-size: 7.5pt;
    font-weight: 700;
    color: #0f172a;
    white-space: nowrap;
  }
  .entry-sub {
    font-size: 7.45pt;
    color: #1e293b;
    font-style: italic;
    margin-bottom: 1px;
  }
  p {
    margin: 0 0 2px;
    text-align: justify;
  }
  ul {
    margin: 1px 0 3px 11px;
    padding: 0;
    list-style-type: disc;
  }
  li {
    margin-bottom: 1px;
    line-height: 1.25;
    text-align: justify;
  }
  .skills-list {
    margin: 1px 0 2px 11px;
    padding: 0;
    list-style-type: disc;
  }
  .skills-list li {
    margin-bottom: 1.2px;
    line-height: 1.25;
  }
  .skills-list strong {
    color: #0f172a;
  }
  .ref-grid {
    font-size: 7.15pt;
    line-height: 1.21;
  }
  .ref-item {
    margin-bottom: 1.2px;
  }
  .ref-item strong {
    color: #0f172a;
  }
</style>
</head>
<body>

<div class="header">
  <div class="name">Efe Demirer</div>
  <div class="sub-title">Elektrik-Elektronik Mühendisi Adayı · RF &amp; Mikrodalga Sistemleri, Test Otomasyonu</div>
  <div class="contact-bar">
    İzmir, Türkiye &nbsp;|&nbsp; +90 554 638 86 92 &nbsp;|&nbsp; <a href="mailto:efedemirer.tr@gmail.com">efedemirer.tr@gmail.com</a> &nbsp;|&nbsp; <a href="https://linkedin.com/in/efe-demirer-aa7ba3252">linkedin.com/in/efe-demirer-aa7ba3252</a> &nbsp;|&nbsp; <a href="https://github.com/efedemirerr">github.com/efedemirerr</a>
  </div>
</div>

<div class="section-title">Özet</div>
<p>
Yaşar Üniversitesi Elektrik-Elektronik Mühendisliği 4. sınıf öğrencisiyim. RF ve mikrodalga sistemleri, anten ışıma örüntüsü testleri ve yüksek frekanslı test cihazlarının otomasyonu alanlarında savunma sanayii ve laboratuvar deneyimine sahibim. ASELSAN REHİS Test Merkezleri Müdürlüğü bünyesinde yankısız odada düzlemsel yakın alan (Near-Field) anten taraması, VNA tam 2-port kalibrasyonu, RF güç yükselteci karakterizasyonu ve gerçek zamanlı spektrum analizi çalışmalarında görev aldım. C# .NET GUI geliştirme, Ethernet/SCPI cihaz kontrolü ve G-Code Kartezyen hareket sistemleri entegrasyonunda yetkinim.
</p>

<div class="section-title">Eğitim</div>
<div class="row">
  <div class="entry-title">Yaşar Üniversitesi – İzmir</div>
  <div class="entry-date">09/2022 – Devam Ediyor</div>
</div>
<div class="entry-sub" style="font-style: normal;">
  Lisans, Elektrik-Elektronik Mühendisliği &nbsp;|&nbsp; %100 ÖSYM Burslu &nbsp;|&nbsp; GNO: 3.73 / 4.00 (Yüksek Onur Öğrencisi)<br>
  <strong>Öne Çıkan Dersler:</strong> Antenler ve Dalga Yayılımı (EEE 4340), Elektromanyetik Alan Teorisi, Mikrodalga ve RF Ölçümleri, Sayısal Haberleşme, Sinyaller ve Sistemler
</div>

<div class="row" style="margin-top: 2.5px;">
  <div class="entry-title">Cem Bakioğlu Anadolu Lisesi – İzmir</div>
  <div class="entry-date">09/2018 – 06/2022</div>
</div>
<div class="entry-sub" style="font-style: normal;">Lise Eğitimi &nbsp;|&nbsp; Okul İkincisi (Salutatorian) &nbsp;|&nbsp; Mezuniyet Derecesi: 96.89 / 100</div>

<div class="section-title">İş ve Staj Deneyimi</div>

<div class="row">
  <div class="entry-title">ASELSAN REHİS Test Merkezleri Müdürlüğü – Ankara</div>
  <div class="entry-date">06/2026 – 08/2026</div>
</div>
<div class="entry-sub">Stajyer Mühendis (RF &amp; Mikrodalga Sistemleri / Test Otomasyonu)</div>
<ul>
  <li>Yankısız oda anten test sistemleri için Kartezyen X-Y tarama otomasyonu ve C# .NET Windows Forms tabanlı grafik kullanıcı arayüzü (GUI) geliştirdim.</li>
  <li>Vektör Ağ Analizörü (VNA) tam 2-port kalibrasyonu, ölçüm referans düzleminin kablo uçlarına kaydırılması ve RF bileşen/yükselteç karakterizasyonu yürüttüm.</li>
  <li>Yükselteçlerin doyum ve doğrusal olmayan davranışlarını ölçmek üzere P1dB sıkıştırma (compression) testleri gerçekleştirdim.</li>
  <li>Düzlemsel Yakın Alan (Near-Field) test odası ölçümleri gerçekleştirdim ve radar soğurucu malzemelerin (RAM) performansını NRL Arch Test yöntemiyle analiz ettim.</li>
  <li>Gerçek Zamanlı Spektrum Analizörü için Ethernet (TCP/IP) üzerinden API tabanlı bağımsız kontrol uygulaması, dinamik eşik değerli tepe noktası (Peak Search) tespit algoritması ve otomatik RBW seçimi geliştirdim.</li>
  <li>SCPI komutları, API entegrasyonu ve Ethernet protokolleri üzerinden ölçüm cihazlarının uzaktan kontrolü ve test otomasyonunu sağladım.</li>
  <li>Donanımsal güvenlik altyapısı için Limit Switch tabanlı güvenlik kilit mekanizmaları, step motor sürüşü ve CNC Shield üzerinde GRBL G-Code hareket kontrol entegrasyonu uyguladım.</li>
  <li>RF test senaryolarının planlanması, ölçüm veri sayfalarının analizi ve laboratuvar/saha sinyal izleme test süreçlerine destek verdim.</li>
</ul>

<div class="row">
  <div class="entry-title">OPA Mühendislik – İzmir</div>
  <div class="entry-date">07/2025 – 08/2025 &amp; 08/2026 – 09/2026</div>
</div>
<div class="entry-sub">Stajyer Mühendis (Elektrik &amp; Enerji Sistemleri)</div>
<ul>
  <li>Güneş enerjisi santralleri (GES) için AutoCAD ile elektrik projeleri ve tek hat şemaları hazırladım; saha kurulumu ve pano montaj süreçlerinde görev aldım.</li>
  <li>PVsyst ve ETAP kullanarak GES üretim verim simülasyonları, gölgeleme analizleri ve güç sistemleri modellemeleri gerçekleştirdim.</li>
  <li>Reaktif güç kompanzasyon panosu tasarımı, kondansatör kademe hesabı ve reaktif güç kontrol rölesi konfigürasyonu yaptım.</li>
  <li>Elektrikli araç (EA) şarj istasyonları için güç tüketim hesapları, kablo kesiti seçimi ve altyapı montaj çalışmalarına katıldım.</li>
  <li>Topraklama direnci ölçümü, kaçak akım rölesi (RCD) testleri ve Yüksek Gerilim (YG) Tesis İşletme Sorumluluğu kapsamındaki trafo denetimlerini gerçekleştirdim ve teknik raporladım.</li>
</ul>

<div class="section-title">Teknik Yetkinlikler</div>
<ul class="skills-list">
  <li><strong>RF &amp; Mikrodalga Mühendisliği:</strong> Vektör Ağ Analizörü (VNA), Gerçek Zamanlı Spektrum Analizörü, VNA 2-Port Kalibrasyonu, P1dB Sıkıştırma Testi, RF Bileşen Karakterizasyonu, Düzlemsel Yakın Alan Testleri, NRL Arch Testi, S-Parametreleri &amp; Empedans Uyumlama, Antenler ve Dalga Yayılımı</li>
  <li><strong>Test Otomasyonu ve Yazılım:</strong> C#, .NET, Windows Forms, GUI Geliştirme, Python, SCPI, API Entegrasyonu, Seri Haberleşme (RS-232), Ethernet TCP/IP, MATLAB, G-Code</li>
  <li><strong>Hareket Kontrol ve Donanım:</strong> Kartezyen X-Y Tarama Sistemleri, Step Motor Sürücüleri, CNC Shield V3, GRBL Firmware, Limit Switch Güvenlik Kilitleri, Arduino, STM32</li>
  <li><strong>Simülasyon ve Modelleme:</strong> MATLAB &amp; Simulink, LTspice, Proteus, RF Yükselteç Devre Simülasyonu</li>
  <li><strong>Elektrik ve Güç Sistemleri:</strong> AutoCAD, PVsyst, ETAP, Güneş Enerjisi Sistemleri (GES), Tek Hat Şemaları, Reaktif Güç Kompanzasyonu, YG Trafo Denetimi</li>
</ul>

<div class="section-title">Sertifikalar ve Eğitimler</div>
<ul class="skills-list">
  <li><strong>Sanayi ve Teknoloji Bakanlığı &amp; Milli Teknoloji Akademisi:</strong> Çip Tasarımı Uzmanlık Sertifikası (Belge No: 35867118094667)</li>
  <li><strong>ASELSAN:</strong> 'a Yetenek' Mühendislik Staj Programı Başarı Belgesi (2026) &nbsp;|&nbsp; ASELSAN İSG ve Bilgi Güvenliği Eğitimi (2026)</li>
  <li><strong>ROKETSAN:</strong> LEVEL UP AI – YOLO ile Nesne Tespiti/Takibi &amp; Otonom AI Agent Geliştirme (2026) &nbsp;|&nbsp; <strong>TUSAŞ:</strong> LIFT UP Programı (2025)</li>
  <li><strong>Savunma Sanayii Başkanlığı (SSB):</strong> Milli Yetkinlik Hamlesi Zirvesi (2026) &nbsp;|&nbsp; <strong>TÜBİTAK:</strong> 4006 Bilim ve Toplum Programı Proje Yürütücülüğü</li>
  <li><strong>MathWorks:</strong> Core Signal Processing, Simulink Fundamentals, Simscape Onramp, Signal Processing / Simulink / MATLAB Onramp (2025–2026)</li>
</ul>

<div class="section-title">Yabancı Diller ve Kişisel Bilgiler</div>
<ul class="skills-list">
  <li><strong>Yabancı Dil:</strong> İngilizce B2 (Upper-Intermediate, Yaşar Üniversitesi Yabancı Diller Yüksekokulu Sertifikalı), Türkçe (Anadil)</li>
  <li><strong>Kişisel Bilgiler:</strong> Sürücü Belgesi: B Sınıfı &nbsp;|&nbsp; Askerlik Durumu: Tecilli (31/12/2031) &nbsp;|&nbsp; Profesyonel Yetkinlikler: Teknik Raporlama, Çözüm Odaklılık, Takım Çalışması</li>
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
        f.write(cv_tr_html)
    
    out_pdf = os.path.abspath('Efe_Demirer_CV_TR.pdf')
    cmd = [
        edge_path,
        '--headless',
        '--disable-gpu',
        '--no-pdf-header-footer',
        f'--print-to-pdf={out_pdf}',
        os.path.abspath(temp_html)
    ]
    print("Running Edge Headless PDF generation...")
    subprocess.run(cmd, check=True)
    
    if os.path.exists(temp_html):
        os.remove(temp_html)
        
    doc = pymupdf.open(out_pdf)
    num_pages = len(doc)
    print(f"Generated PDF Page Count: {num_pages}")
    
    # Check text stream order
    first_page_text = doc[0].get_text()
    print("--- First 500 characters of text stream ---")
    print(first_page_text[:500])
    
    if num_pages == 1:
        print("PERFECT: Document fits on exactly 1 page!")
    else:
        print(f"WARNING: Document has {num_pages} pages, needs fine tuning to fit on 1 page.")
        
    # Copy to assets if folder exists
    if os.path.isdir('assets'):
        shutil.copyfile(out_pdf, os.path.join('assets', 'Efe_Demirer_CV_TR.pdf'))
        print("Copied to assets/Efe_Demirer_CV_TR.pdf")

if __name__ == '__main__':
    build_pdf()
