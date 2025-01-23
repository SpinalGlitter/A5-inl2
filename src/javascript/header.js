document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const menuOverlay = document.querySelector('.menu-overlay');
  const overlayBlur = document.querySelector('.overlay-blur');
  const closeBtn = document.querySelector('.close-btn');

  if (hamburgerBtn && menuOverlay && overlayBlur && closeBtn) {
    hamburgerBtn.addEventListener('click', () => {
      menuOverlay.style.display = 'block';
      overlayBlur.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
      menuOverlay.style.display = 'none';
      overlayBlur.classList.remove('active');
    });

    overlayBlur.addEventListener('click', () => {
      menuOverlay.style.display = 'none';
      overlayBlur.classList.remove('active');
    });
  }
});
