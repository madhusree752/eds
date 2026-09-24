export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = [...row.children];

    if (!cells.length) return;

    let question;
    let answer;

    // If DA.live created two cells
    if (cells.length >= 2 && cells[1].textContent.trim()) {
      question = cells[0];
      answer = cells[1];
    } else {
      // If question and answer are in one cell separated by |
      const content = cells[0].textContent.split('|');

      question = cells[0];
      answer = document.createElement('div');

      question.textContent = content[0].trim();
      answer.textContent = content.slice(1).join('|').trim();

      cells[0].parentElement.appendChild(answer);
    }

    question.classList.add('faq-question');
    answer.classList.add('faq-answer');

    answer.style.display = 'none';

    question.addEventListener('click', () => {
      const isOpen = answer.style.display === 'block';

      answer.style.display = isOpen ? 'none' : 'block';
      question.classList.toggle('open', !isOpen);
    });
  });
}