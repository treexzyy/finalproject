document.addEventListener('DOMContentLoaded', () => {
  // 1. МОБИЛЬНОЕ БУРГЕР-МЕНЮ (открытие, анимация и закрытие при клике)
  const burgerBtn = document.getElementById('burgerBtn');
  const mainNav = document.getElementById('mainNav');

  if (burgerBtn && mainNav) {
    burgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      burgerBtn.classList.toggle('active');
      mainNav.classList.toggle('open');
    });

    // Закрытие при клике на любую ссылку в меню
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        burgerBtn.classList.remove('active');
        mainNav.classList.remove('open');
      });
    });

    // Закрытие при клике вне области меню
    document.addEventListener('click', (e) => {
      if (mainNav.classList.contains('open') && !mainNav.contains(e.target) && !burgerBtn.contains(e.target)) {
        burgerBtn.classList.remove('active');
        mainNav.classList.remove('open');
      }
    });
  }

  // 2. КАЛЬКУЛЯТОР СТОИМОСТИ НА СТРАНИЦЕ ТАРИФОВ (pricing.html)
  const calcForm = document.getElementById('calcForm');
  if (calcForm) {
    const hoursRange = document.getElementById('hoursRange');
    const hoursValue = document.getElementById('hoursValue');
    const totalPriceEl = document.getElementById('totalPrice');

    function calculatePrice() {
      const selectedZone = document.querySelector('input[name="zone"]:checked');
      const baseRate = selectedZone ? Number(selectedZone.value) : 100;
      const hours = Number(hoursRange.value);
      hoursValue.textContent = hours;

      let addons = 0;
      document.querySelectorAll('input[name="addon"]:checked').forEach((checkbox) => {
        addons += Number(checkbox.value);
      });

      const total = baseRate * hours + addons;
      totalPriceEl.textContent = `${total} грн`;
    }

    calcForm.addEventListener('input', calculatePrice);
    calculatePrice();
  }

  // 3. ТАЙМЕР ОБРАТНОГО ОТСЧЁТА ДО ТУРНИРОВ (tournaments.html)
  const countdownElements = document.querySelectorAll('.countdown-badge');
  if (countdownElements.length > 0) {
    function updateCountdowns() {
      const now = new Date().getTime();

      countdownElements.forEach((el) => {
        const targetDate = new Date(el.dataset.date).getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
          el.textContent = 'Турнир уже идёт!';
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        el.textContent = `Старт через: ${days}д ${hours}ч ${minutes}м ${seconds}с`;
      });
    }

    updateCountdowns();
    setInterval(updateCountdowns, 1000);
  }

  // 4. МОДАЛЬНОЕ ОКНО ДЛЯ ФОТООТЧЁТА (tournaments.html)
  const photoModal = document.getElementById('photoModal');
  const modalImg = document.getElementById('modalImg');
  const closeModal = document.getElementById('closeModal');
  const reportPhotos = document.querySelectorAll('.report-photo img');

  if (photoModal && modalImg && reportPhotos.length > 0) {
    reportPhotos.forEach((img) => {
      img.addEventListener('click', () => {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        photoModal.classList.add('open');
      });
    });

    closeModal.addEventListener('click', () => {
      photoModal.classList.remove('open');
    });

    photoModal.addEventListener('click', (e) => {
      if (e.target === photoModal) {
        photoModal.classList.remove('open');
      }
    });

    // Закрытие по клавише Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && photoModal.classList.contains('open')) {
        photoModal.classList.remove('open');
      }
    });
  }

  // 5. ФОРМА РЕГИСТРАЦИИ И ПОЛЗУНОК УРОВНЯ (register.html)
  const regForm = document.getElementById('regForm');
  if (regForm) {
    const skillRange = document.getElementById('skillRange');
    const skillValue = document.getElementById('skillValue');
    const formStatus = document.getElementById('formStatus');

    if (skillRange && skillValue) {
      skillRange.addEventListener('input', () => {
        skillValue.textContent = `${skillRange.value} / 10`;
      });
    }

    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const login = document.getElementById('login').value.trim();
      const discipline = document.getElementById('discipline').value;

      formStatus.style.display = 'block';
      formStatus.textContent = `Заявка принята! Игрок/капитан «${login}» зарегистрирован в дисциплине ${discipline}.`;
      regForm.reset();
      if (skillValue) skillValue.textContent = '5 / 10';
    });

    regForm.addEventListener('reset', () => {
      formStatus.style.display = 'none';
      if (skillValue) skillValue.textContent = '5 / 10';
    });
  }
});