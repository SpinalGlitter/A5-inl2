export async function buildInfoSection() {
  const infoElement = document.querySelector('.info') || document.querySelector('.information');
  if (!infoElement) {
    return;
  }

  addEventListeners();
}

function addEventListeners() {
  const openBtns = document.querySelectorAll('.modal-open');
  const questions = document.querySelectorAll('.modal-question');

  openBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => toggleAnswer(btn, index));
  });

  questions.forEach((question, index) => {
    question.addEventListener('click', () => toggleAnswer(openBtns[index], index));
  });
}

function toggleAnswer(btn, index) {
  btn.classList.toggle('open-button-clicked');
  const answer = document.querySelectorAll('.modal-answer')[index];
  const isOpen = btn.classList.contains('open-button-clicked');

  btn.src = isOpen ? infoData.buttons[1].closeButton : infoData.buttons[0].openButton;
  btn.alt = isOpen ? infoData.buttons[1].alt : infoData.buttons[0].alt;
  answer.style.display = isOpen ? '' : 'none';
}
