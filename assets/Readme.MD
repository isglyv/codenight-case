# 🎮 Turkcell Game+ Quest League - Frontend Dashboard

Bu depo, **Codenight: Turkcell Game+ Case**'i kapsamında geliştirilen **Quest League** projesinin Frontend (Kullanıcı Arayüzü) ayağını içermektedir. 

Proje, Game+ kullanıcılarının oyun içi aktivitelerinden elde ettikleri metrikleri, tamamladıkları görevleri (quest), kazandıkları rozetleri ve genel liderlik tablosunu (leaderboard) görselleştiren web tabanlı bir dashboard'dur.

## 🎯 Proje Amacı ve Kapsamı
Backend sisteminin (veya simülasyonunun) ürettiği kullanıcı metriklerini ve görev motoru (quest engine) çıktılarını anlaşılır, modern ve oyuncu temasına (Game+) uygun bir arayüzle sunmak hedeflenmiştir. 

Case gereksinimleri doğrultusunda ekranda şu modüller yer almaktadır:
- **Leaderboard:** Kullanıcıların toplam puanlarına (total_points) göre sıralandığı ilk 10 listesi.
- **Kullanıcı İstatistikleri:** Bugünün ve son 7 günün aktivite metrikleri (login, play_minutes, pvp_wins vb.) ve giriş serisi (streak).
- **Görev Yönetimi:** Tetiklenen (triggered), seçilen (selected - tek ödül kuralı) ve bastırılan (suppressed) görevlerin listesi.
- **Rozetler ve Bildirimler:** Belirli puan eşiklerinde (Örn: Bronz, Gümüş, Altın) kazanılan rozetler ve mock bildirim geçmişi.

## 🚀 Teknolojiler ve Mimari
Yüksek performans, hızlı derleme ve dışa bağımlılığı en aza indirmek amacıyla herhangi bir ağır framework (React, Vue vb.) **kullanılmamıştır.**

* **HTML5:** Semantik ve erişilebilir (accessibility) etiket yapısı.
* **CSS3:** Native CSS değişkenleri (Custom Properties) ile tema yönetimi, Flexbox/Grid ile modern ve responsive tasarım.
* **Vanilla JavaScript (ES6+):** Modüler yapı (`api.js` ve `main.js`), asenkron veri çekimi (`async/await`, `Fetch API`) ve dinamik DOM manipülasyonu.

## 📁 Proje Klasör Yapısı
```text
📦 frontend
 ┣ 📂 assets
 ┃ ┣ 📂 css
 ┃ ┃ ┗ 📜 styles.css       # Global stiller, renk paleti ve layout
 ┃ ┃ ┣ 📜 api.js           # Backend iletişimi ve Mock Data yönetimi
 ┃ ┃ ┗ 📜 main.js          # DOM olayları, render fonksiyonları
 ┣ 📜 index.html           # Ana Dashboard (Leaderboard)
 ┣ 📜 users.html           # Kullanıcı Detay Ekranı (Metrikler, Görevler, Rozetler)
 ┗ 📜 README.md            # Proje Dokümantasyonu
🛠️ Kurulum ve Çalıştırma
Proje tamamen istemci tarafında (client-side) çalıştığı için ekstra bir paket yöneticisine (npm, yarn) veya derleyiciye ihtiyaç duymaz.

Repoyu bilgisayarınıza klonlayın:

Bash
git clone -b frontend [https://github.com/isglyv/codenight-case.git](https://github.com/isglyv/codenight-case.git)
Klasöre gidin:

Bash
cd codenight-case
Herhangi bir yerel sunucu (VS Code Live Server eklentisi, Python HTTP server vb.) ile index.html dosyasını çalıştırın veya dosyayı doğrudan modern bir web tarayıcısında açın.