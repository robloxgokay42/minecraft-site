document.addEventListener('DOMContentLoaded', () => {
  const onlineEl = document.getElementById('online');
  const ipAddress = 'rigosurvival.aternos.me:61460'; // IP adresinizi buraya tanımla
  const playBtn = document.querySelector('.play-btn');

  // Sabit oyuncu sayısı (Aternos API entegrasyonu daha sonra yapılabilir)
  onlineEl.textContent = '25'; // Videodaki Aphenix gibi dinamik bir değer.

  // IP Kopyalama Fonksiyonu
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(ipAddress).then(() => {
        alert(`Sunucu IP kopyalandı: ${ipAddress}`);
      }).catch(err => {
        console.error('IP kopyalanırken hata oluştu:', err);
        alert('IP kopyalanamadı. Lütfen manuel olarak kopyalayın: ' + ipAddress);
      });
    });
  }

  // SSS (FAQ) Accordion Fonksiyonu
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.closest('.faq-item');
      faqItem.classList.toggle('active');

      const answer = faqItem.querySelector('.faq-answer');
      if (faqItem.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = '0';
      }
    });
  });
});

// IP kopyalama fonksiyonunu global yapmak, butondaki onclick için
function copyIp() {
  const ipAddress = 'rigosurvival.aternos.me:61460';
  navigator.clipboard.writeText(ipAddress).then(() => {
    alert(`Sunucu IP kopyalandı: ${ipAddress}`);
  }).catch(err => {
    console.error('IP kopyalanırken hata oluştu:', err);
    alert('IP kopyalanamadı. Lütfen manuel olarak kopyalayın: ' + ipAddress);
  });
}
