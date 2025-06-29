document.addEventListener('DOMContentLoaded', () => {
  const onlineEl = document.getElementById('online');

  // Aternos API veya başka API karmaşık olabilir, bu yüzden önce sabit sayı koyuyoruz.
  // İstersen daha sonra Minecraft server query kütüphaneleri veya API bağları ile geliştiririz.
  onlineEl.textContent = '25';
});
