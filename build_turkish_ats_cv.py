import subprocess, os, shutil
import pymupdf

edge_path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
if not os.path.exists(edge_path):
    edge_path = r'C:\Program Files\Microsoft\Edge\Application\msedge.exe'

# ==============================================================================
# EXACT ORIGINAL CONTENT - ATS COMPLIANT 1-PAGE TURKISH CV FOR EFE DEMİRER
# ==============================================================================
cv_tr_html = """<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8">
<title>Efe Demirer - Özgeçmiş</title>
<style>
  @page {
    size: A4 portrait;
    margin: 6mm 10mm 6mm 10mm;
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
    font-size: 7.1pt;
    line-height: 1.23;
  }
  .header {
    text-align: center;
    margin-bottom: 3px;
    padding-bottom: 2px;
  }
  .name {
    font-size: 15pt;
    font-weight: 800;
    letter-spacing: 0.5px;
    color: #0f172a;
    margin: 0 0 1px;
    text-transform: uppercase;
  }
  .sub-title {
    font-size: 8.3pt;
    font-weight: 700;
    color: #0369a1;
    margin: 0 0 2px;
  }
  .contact-bar {
    font-size: 7.2pt;
    color: #334155;
  }
  .contact-bar a {
    color: inherit;
    text-decoration: none;
  }
  .section-title {
    font-size: 8.1pt;
    font-weight: 800;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    border-bottom: 1px solid #1e293b;
    padding-bottom: 1px;
    margin: 3.5px 0 2px;
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.5px;
  }
  .entry-title {
    font-size: 7.6pt;
    font-weight: 700;
    color: #0f172a;
  }
  .entry-date {
    font-size: 7.2pt;
    font-weight: 700;
    color: #0f172a;
    white-space: nowrap;
  }
  .entry-sub {
    font-size: 7.1pt;
    color: #334155;
    font-style: italic;
    margin-bottom: 1px;
  }
  p {
    margin: 0 0 2px;
    text-align: justify;
  }
  ul {
    margin: 1px 0 2.5px 11px;
    padding: 0;
    list-style-type: disc;
  }
  li {
    margin-bottom: 0.8px;
    line-height: 1.22;
    text-align: justify;
  }
  .skills-list {
    margin: 1px 0 2px 11px;
    padding: 0;
    list-style-type: disc;
  }
  .skills-list li {
    margin-bottom: 0.8px;
    line-height: 1.22;
  }
  .skills-list strong {
    color: #0f172a;
  }
  .ref-grid {
    font-size: 6.85pt;
    line-height: 1.18;
  }
  .ref-item {
    margin-bottom: 1px;
  }
  .ref-item strong {
    color: #0f172a;
  }
</style>
</head>
<body>

<div class="header">
  <div class="name">EFE DEMİRER</div>
  <div class="sub-title">Elektrik-Elektronik Mühendisliği Öğrencisi</div>
  <div class="contact-bar">
    İzmir, Bornova &nbsp;|&nbsp; 0554 638 86 92 &nbsp;|&nbsp; efedemirer.tr@gmail.com
  </div>
</div>

<div class="section-title">Özet</div>
<p>
Yaşar Üniversitesi Elektrik-Elektronik Mühendisliği 4. sınıf öğrencisiyim. RF ve anten testleri, test otomasyonu, C#/.NET tabanlı uygulama geliştirme, cihaz kontrolü ve elektrik/enerji sistemleri alanlarında saha ve laboratuvar deneyimine sahibim. ASELSAN REHİS Test Merkezleri Müdürlüğü'nde anten test sistemleri, Kartezyen X-Y tarama, VNA, spektrum analizörü, RF bileşen karakterizasyonu, API entegrasyonu ve test otomasyonu çalışmalarında görev aldım. OPA Mühendislik'te ise güneş enerjisi sistemleri, AutoCAD ile elektrik projelendirme, PVsyst, ETAP ve güç sistemleri uygulamaları üzerine çalıştım.
</p>

<div class="section-title">Eğitim</div>
<div class="row">
  <div class="entry-title">Yaşar Üniversitesi - İzmir</div>
  <div class="entry-date">09/2022 - Devam ediyor</div>
</div>
<div class="entry-sub" style="font-style: normal;">
  Lisans, Elektrik-Elektronik Mühendisliği &nbsp;|&nbsp; %100 Burslu &nbsp;|&nbsp; GNO: 3.73/4.00
</div>

<div class="row" style="margin-top: 2px;">
  <div class="entry-title">Cem Bakioğlu Anadolu Lisesi - İzmir</div>
  <div class="entry-date">09/2018 - 06/2022</div>
</div>
<div class="entry-sub" style="font-style: normal;">
  Lise Eğitimi &nbsp;|&nbsp; Diploma Notu: 96.89/100
</div>

<div class="section-title">İş Deneyimi</div>

<div class="row">
  <div class="entry-title">ASELSAN REHİS Test Merkezleri Müdürlüğü</div>
  <div class="entry-date">06/2026 - 08/2026</div>
</div>
<div class="entry-sub">Stajyer Mühendis</div>
<ul>
  <li>Anten test sistemleri için Kartezyen X-Y tarama otomasyonu ve C#/.NET tabanlı grafik kullanıcı arayüzü geliştirilmesine katkı sağladım.</li>
  <li>API tabanlı cihaz kontrolü, Ethernet entegrasyonu ve test sistemi otomasyonu üzerinde çalıştım.</li>
  <li>Sinyal ölçümlerinde kullanılmak üzere sinyal tepe noktası tespit algoritması tasarladım.</li>
  <li>Vektör Ağ Analizörü (VNA) kalibrasyonu, ölçüm referans düzleminin kablo uçlarına kaydırılması, RF bileşen karakterizasyonu ve amfi ölçümleri gerçekleştirdim.</li>
  <li>P1dB sıkıştırma testleri ile amfilerin sıkıştırma karakteristiklerinin ölçüm süreçlerinde görev aldım.</li>
  <li>Yakın Alan test odası ölçümleri gerçekleştirdim ve RF soğurucu malzemelerin performansını Arch Testi ile analiz ettim.</li>
  <li>Spektrum analizörü veri sayfası incelemeleri ve ortam/saha sinyal dinlemeleri gerçekleştirdim.</li>
  <li>RF test senaryolarının planlanması ve test süreçlerinin uygulanmasına destek verdim.</li>
  <li>Test sistemlerinde Limit Switch tabanlı donanımsal güvenlik altyapısı, motor sürüş sistemi ve G-Code entegrasyonu üzerinde çalıştım.</li>
</ul>

<div class="row">
  <div class="entry-title">OPA Mühendislik</div>
  <div class="entry-date">07/2025 - 08/2025 &amp; 08/2026 - 09/2026</div>
</div>
<div class="entry-sub">Stajyer Mühendis</div>
<ul>
  <li>Topraklama direnci kontrolü ve kaçak akım testlerinin yapılması ve bu testlerin raporlanması süreçlerinde görev aldım.</li>
  <li>Güneş enerjisi ve akıllı şebeke/depolama altyapılarının saha kurulumu, pano montajı ve elektrik projelendirme çalışmalarında görev aldım.</li>
  <li>AutoCAD kullanarak GES elektrik projeleri ve tek hat şemaları hazırladım.</li>
  <li>PVsyst ile GES sistem simülasyonları, verim analizleri ve enerji üretim performansı hesaplamaları gerçekleştirdim.</li>
  <li>Kompanzasyon panosu tasarımı, kondansatör hesabı ve reaktif güç rölesi konfigürasyonu çalışmalarında görev aldım.</li>
  <li>Elektrikli araç şarj istasyonları için güç hesabı, kablo kesiti seçimi ve montaj çalışmalarına katıldım.</li>
  <li>GES panolarında şalter ve kaçak akım rölesi (RCD) bağlantıları ile pano montaj uygulamalarında görev aldım.</li>
  <li>Yüksek gerilim tesis işletme sorumluluğu kapsamında trafo merkezlerinin periyodik kontrol süreçlerine katıldım.</li>
</ul>

<div class="section-title">Teknik Yetkinlikler</div>
<ul class="skills-list">
  <li><strong>Programlama ve Uygulama Geliştirme:</strong> C#, .NET, Windows Forms, Grafik Kullanıcı Arayüzü, Arduino IDE</li>
  <li><strong>Test Otomasyonu ve Cihaz Kontrolü:</strong> Test Otomasyonu, Cihaz Kontrolü, API Entegrasyonu, SCPI</li>
  <li><strong>RF ve Anten Testleri:</strong> Vektör Ağ Analizörü (VNA), Spektrum Analizörü, RF Bileşen Karakterizasyonu, Yakın Alan Ölçümleri</li>
  <li><strong>RF Ölçüm ve Karakterizasyon:</strong> Amfi Ölçümleri, P1dB Sıkıştırma Testleri, RF Soğurucu Testleri</li>
  <li><strong>Tarama ve Hareket Sistemleri:</strong> Kartezyen X-Y Tarama, Motor Sürüş Sistemleri, G-Code Entegrasyonu, Limit Switch</li>
  <li><strong>Elektrik ve Enerji Sistemleri:</strong> AutoCAD, PVsyst, ETAP, Güneş Enerjisi Sistemleri, Güç Sistemleri Analizi, Reaktif Güç Kompanzasyonu, Kompanzasyon Panosu Tasarımı, Kondansatör Hesabı</li>
  <li><strong>Simülasyon ve Modelleme:</strong> MATLAB &amp; Simulink, LTspice, Proteus</li>
</ul>

<div class="section-title">Yabancı Dil ve Diğer Yetkinlikler</div>
<ul class="skills-list">
  <li><strong>Yabancı Dil:</strong> İngilizce B2 (Upper-Intermediate), Yaşar University School of Foreign Languages sertifikalı</li>
  <li><strong>Profesyonel Yetkinlikler:</strong> Takım Çalışması, Teknik Raporlama, İletişim, Problem Çözme</li>
</ul>

<div class="section-title">Ek Bilgiler</div>
<ul class="skills-list">
  <li><strong>Kişisel Bilgiler:</strong> Ehliyet: B Sınıfı &nbsp;|&nbsp; Askerlik: Tecilli - 31/12/2031</li>
  <li><strong>İlgi Alanları:</strong> Elektronik Tamirat (DIY), Futbol, Kampçılık, Yüzme, Seyahat, Tarımsal Üretim</li>
</ul>

<div class="section-title">Referanslar</div>
<div class="ref-grid">
  <div class="ref-item"><strong>Prof. Dr. Mustafa SEÇMEN</strong> - Müh. Fak. Dekanı / Yaşar Üni. &nbsp;|&nbsp; mustafa.secmen@yasar.edu.tr &nbsp;|&nbsp; 0232-570-8232</div>
  <div class="ref-item"><strong>Dr. Ali Haluk NALBANTOĞLU</strong> - Müh. Fak. Öğr. Üyesi / Yaşar Üni., ASELSAN (İlk) Elektronik Harp Direktörü &nbsp;|&nbsp; haluk.nalbantoglu@yasar.edu.tr &nbsp;|&nbsp; 0533 236 13 99</div>
  <div class="ref-item"><strong>Hüseyin Talha ÇULHA</strong> - RF Test Müh. / Aselsan REHIS &nbsp;|&nbsp; htalhaculha@aselsan.com &nbsp;|&nbsp; 0531 950 43 60</div>
  <div class="ref-item"><strong>Murat YALÇINKAYA</strong> - Sistem Müh. / Aselsan REHIS via EHSİM &nbsp;|&nbsp; yalcnkayam@gmail.com &nbsp;|&nbsp; 0538 847 90 01</div>
  <div class="ref-item"><strong>Onur İŞÇİ</strong> - Elektrik Elektronik Müh. / Kurucu - OPA Mühendislik &nbsp;|&nbsp; onur@opamuhendislik.com &nbsp;|&nbsp; 0530 040 28 21</div>
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
    print("Running Edge Headless PDF generation for exact original content...")
    subprocess.run(cmd, check=True)
    
    if os.path.exists(temp_html):
        os.remove(temp_html)
        
    doc = pymupdf.open(out_pdf)
    num_pages = len(doc)
    print(f"Generated PDF Page Count: {num_pages}")
    
    if num_pages == 1:
        print("SUCCESS: Exactly 1 page!")
    else:
        print(f"WARNING: Page count is {num_pages}!")
        
    if os.path.isdir('assets'):
        shutil.copyfile(out_pdf, os.path.join('assets', 'Efe_Demirer_CV_TR.pdf'))
        print("Copied to assets/Efe_Demirer_CV_TR.pdf")

if __name__ == '__main__':
    build_pdf()
