export default function decorate(block) {
  const rows = [...block.children];
  const title = rows[0]?.querySelector('div');
  const message = rows[1]?.querySelector('div');
  const button = rows[2]?.querySelector('div');

  if (title) {
    title.classList.add('announcement-title');
  }

  if (message) {
    message.classList.add('announcement-message');
  }

  if (button) {
    button.classList.add('announcement-button');
  }
}