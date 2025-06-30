document.addEventListener('DOMContentLoaded', () => {
    const onlineEl = document.getElementById('online');
    const ipAddress = 'rigosurvival.aternos.me:61460'; // Sunucu IP adresiniz
    const playBtn = document.querySelector('.play-btn');
    const faqQuestions = document.querySelectorAll('.faq-question');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mainMenu = document.getElementById('mainMenu');

    // --- Oyuncu Sayısı Güncelleme (Geçici Simülasyon) ---
    // Aternos API doğrudan tarayıcıdan güvenli ve dinamik şekilde çekilemez.
    // Bu kısım, gerçek bir API entegrasyonu olmadan bir simülasyon sunar.
    let currentOnline = 25; // Başlangıç değeri
    onlineEl.textContent = currentOnline;

    // Her 5 saniyede bir rastgele artan/azalan oyuncu sayısı simülasyonu
    setInterval(() => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 ile +2 arasında değişim
        currentOnline = Math.max(10, Math.min(60, currentOnline + change)); // Minimum 10, maksimum 60
        onlineEl.textContent = currentOnline;
    }, 5000); // Her 5 saniyede bir güncelle

    // --- IP Kopyalama Fonksiyonu ---
    if (playBtn) {
        playBtn.addEventListener('click', copyIp);
    }

    // --- SSS (FAQ) Accordion Fonksiyonu ---
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');

            // Eğer farklı bir SSS zaten açıksa onu kapat
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });

            // Tıklanan SSS'yi aç/kapat
            faqItem.classList.toggle('active');
            const answer = faqItem.querySelector('.faq-answer');
            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });

    // --- Hamburger Menü Fonksiyonu ---
    hamburgerMenu.addEventListener('click', () => {
        mainMenu.classList.toggle('active');
        hamburgerMenu.classList.toggle('open'); // Hamburger ikonunu animasyon için aç
    });

    // Menü dışına tıklayınca menüyü kapat
    document.addEventListener('click', (event) => {
        if (!mainMenu.contains(event.target) && !hamburgerMenu.contains(event.target)) {
            mainMenu.classList.remove('active');
            hamburgerMenu.classList.remove('open');
        }
    });

    // Menü linklerine tıklayınca menüyü kapat (Mobil)
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) { // Sadece mobil görünümde
                mainMenu.classList.remove('active');
                hamburgerMenu.classList.remove('open');
            }
        });
    });

    // --- Scroll Animasyonları (Gelecekteki Geliştirmeler İçin Yer Tutucu) ---
    // Intersection Observer API kullanarak elementler ekrana girdiğinde animasyonları tetikleyebiliriz.
    const sections = document.querySelectorAll('.content-section');
    const observerOptions = {
        root: null,
        threshold: 0.2 // %20'si göründüğünde tetikle
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible'); // Ekranda değilse kaldırabiliriz
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

}); // DOMContentLoaded sonu

// IP kopyalama fonksiyonu (global olarak tanımlandı)
function copyIp() {
    const ipAddress = 'rigosurvival.aternos.me:61460';
    navigator.clipboard.writeText(ipAddress).then(() => {
        // Daha güzel bir bildirim için basit bir alert yerine div ekleyebiliriz
        const notification = document.createElement('div');
        notification.textContent = `IP Kopyalandı: ${ipAddress}`;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #39ff14; /* Yeşil neon */
            color: #000a12;
            padding: 12px 25px;
            border-radius: 8px;
            box-shadow: 0 0 15px rgba(57, 255, 20, 0.7);
            font-weight: bold;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(-50%) translateY(-10px)';
        }, 50);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(10px)';
            notification.addEventListener('transitionend', () => notification.remove());
        }, 3000); // 3 saniye sonra kaybol
    }).catch(err => {
        console.error('IP kopyalanırken hata oluştu:', err);
        alert('IP kopyalanamadı. Lütfen manuel olarak kopyalayın: ' + ipAddress);
    });
}

// Hamburger menü ikonu animasyonu için CSS sınıfı
// Bu, JS tarafından toggle edilecek
// style.css'e de ilgili kurallar eklendi
// .hamburger.open .bar:nth-child(1) { transform: translateY(8px) rotate(45deg); }
// .hamburger.open .bar:nth-child(2) { opacity: 0; }
// .hamburger.open .bar:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
