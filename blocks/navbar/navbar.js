export default function decorate(block) {
  block.innerHTML = `
    <nav class="navbar">

      <div class="navbar-links">
        <a href="/" data-page="home">Home</a>
        <a href="/about" data-page="about">About</a>
        <a href="/services" data-page="services">Services</a>
        <a href="/aem" data-page="aem">AEM</a>
        <a href="/contact" data-page="contact">Contact</a>
      </div>

      <div class="navbar-search">
        <input
          type="search"
          class="navbar-search-input"
          placeholder="Search..."
          aria-label="Search"
        >
        <div class="navbar-results"></div>
      </div>

    </nav>
  `;

  const links = block.querySelectorAll('[data-page]');
  const input = block.querySelector('.navbar-search-input');
  const results = block.querySelector('.navbar-results');

  const items = [
    { title: 'Home', page: 'home', url: '/' },
    { title: 'About', page: 'about', url: '/about' },
    { title: 'Services', page: 'services', url: '/services' },
    { title: 'AEM', page: 'aem', url: '/aem' },
    { title: 'AEM Edge Delivery Services', page: 'aem', url: '/aem' },
    { title: 'React', page: 'react', url: '/react' },
    { title: 'JavaScript', page: 'javascript', url: '/javascript' },
    { title: 'Contact', page: 'contact', url: '/contact' },
  ];

  const messages = {
    about: 'Welcome to About',
    services: 'Welcome to Services',
    aem: 'Welcome to AEM',
    contact: 'Welcome to Contact',
    react: 'Welcome to React',
    javascript: 'Welcome to JavaScript',
  };

  function showPage(page, url) {
    window.history.pushState({}, '', url);

    const main = document.querySelector('main');

    if (!main) return;

    if (messages[page]) {
      main.innerHTML = `
        <div class="demo-page">
          <h1>${messages[page]}</h1>
        </div>
      `;
    }

    results.innerHTML = '';
    input.value = '';
  }

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const page = link.dataset.page;

      if (page !== 'home') {
        event.preventDefault();

        showPage(page, link.getAttribute('href'));
      }
    });
  });

  input.addEventListener('input', () => {
    const searchText = input.value.trim().toLowerCase();

    results.innerHTML = '';

    if (!searchText) {
      return;
    }

    const matches = items.filter((item) =>
      item.title.toLowerCase().includes(searchText)
    );

    if (matches.length === 0) {
      const noResult = document.createElement('div');
      noResult.className = 'navbar-no-result';
      noResult.textContent = 'No results found.';
      results.appendChild(noResult);
      return;
    }

    matches.forEach((item) => {
      const result = document.createElement('a');

      result.href = item.url;
      result.textContent = item.title;
      result.className = 'navbar-result';

      result.addEventListener('click', (event) => {
        event.preventDefault();

        showPage(item.page, item.url);
      });

      results.appendChild(result);
    });
  });
}