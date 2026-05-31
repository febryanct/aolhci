const categories = [
  'All Menu', 'Breads', 'Donuts', 'Chiffon & Roll Cakes',
  'Traditional Snacks', 'Cakes', 'Lapis', 'Puddings', 'Pastry & Danish', 'Cookies'
];

const products = [
  { id: 1, name: 'Sourdough Bread', price: 38000, category: 'Breads', desc: 'Classic tangy sourdough with crispy crust.', badge: false },
  { id: 2, name: 'Butter Croissant', price: 25000, oldPrice: 30000, category: 'Pastry & Danish', desc: 'Flaky layers of buttery perfection.', badge: true },
  { id: 3, name: 'Chocolate Cake', price: 65000, oldPrice: 75000, category: 'Cakes', desc: 'Rich dark chocolate layer cake.', badge: false },
  { id: 4, name: 'Glazed Donut', price: 18000, oldPrice: 22000, category: 'Donuts', desc: 'Soft donut with sweet vanilla glaze.', badge: true },
  { id: 5, name: 'Lapis Legit', price: 120000, category: 'Lapis', desc: 'Traditional layered spiced cake.', badge: false },
  { id: 6, name: 'Pandan Chiffon', price: 48000, oldPrice: 55000, category: 'Chiffon & Roll Cakes', desc: 'Light and airy pandan-flavored sponge.', badge: true },
  { id: 7, name: 'Klepon', price: 15000, category: 'Traditional Snacks', desc: 'Sticky rice balls with palm sugar filling.', badge: false },
  { id: 8, name: 'Choco Pudding', price: 22000, oldPrice: 28000, category: 'Puddings', desc: 'Creamy chocolate silky pudding.', badge: false },
  { id: 9, name: 'Butter Cookies', price: 35000, category: 'Cookies', desc: 'Crispy melt-in-mouth butter cookies.', badge: false },
  { id: 10, name: 'Danish Pastry', price: 28000, oldPrice: 33000, category: 'Pastry & Danish', desc: 'Flaky pastry with fruit jam topping.', badge: true },
  { id: 11, name: 'Roti Tawar', price: 20000, category: 'Breads', desc: 'Soft white sandwich bread, sliced fresh.', badge: false },
  { id: 12, name: 'Strawberry Roll', price: 42000, category: 'Chiffon & Roll Cakes', desc: 'Sponge cake rolled with strawberry cream.', badge: true },
  { id: 13, name: 'Serabi', price: 12000, category: 'Traditional Snacks', desc: 'Indonesian pancake with coconut milk.', badge: false },
  { id: 14, name: 'Red Velvet', price: 70000, category: 'Cakes', desc: 'Velvety red cake with cream cheese frosting.', badge: true },
  { id: 15, name: 'Caramel Donut', price: 20000, category: 'Donuts', desc: 'Golden donut topped with caramel drizzle.', badge: false },
  { id: 16, name: 'Caramel Pudding', price: 24000, category: 'Puddings', desc: 'Smooth flan-style caramel pudding.', badge: false },
  { id: 17, name: 'Speculoos Cookie', price: 38000, category: 'Cookies', desc: 'Spiced Belgian-style thin crisp cookies.', badge: false },
  { id: 18, name: 'Lapis Surabaya', price: 95000, category: 'Lapis', desc: 'Tri-layer cake with jam and butter sponge.', badge: false },
];

const discountProducts = products.filter(p => p.oldPrice).slice(0, 6);
const recommendProducts = products.filter(p => p.badge).slice(0, 6);

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(pageId)) {
      link.classList.add('active');
    }
  });

  document.getElementById('main-nav').classList.remove('open');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMenu() {
  document.getElementById('main-nav').classList.toggle('open');
}

function buildProductCard(product, showBadge) {
  const card = document.createElement('div');
  card.className = 'product-card';

  let badgeHTML = '';
  if (showBadge && product.badge) {
    badgeHTML = '<span class="badge">⭐ Top Pick</span>';
  }

  let priceHTML = '';
  if (product.oldPrice) {
    priceHTML = `<span class="prod-old-price">Rp ${product.oldPrice.toLocaleString('id-ID')}</span>
                 <span class="prod-price">Rp ${product.price.toLocaleString('id-ID')}</span>`;
  } else {
    priceHTML = `<span class="prod-price">Rp ${product.price.toLocaleString('id-ID')}</span>`;
  }

  card.innerHTML = `
    <div class="prod-img"></div>
    ${badgeHTML}
    <div class="prod-name">${product.name}</div>
    ${priceHTML}
    <div class="prod-desc">${product.desc}</div>
  `;
  return card;
}


function renderHomeGrids() {
  const discGrid = document.getElementById('discount-grid');
  const recGrid = document.getElementById('recommendation-grid');

  discountProducts.forEach(p => discGrid.appendChild(buildProductCard(p, false)));
  recommendProducts.forEach(p => recGrid.appendChild(buildProductCard(p, true)));
}


let currentCategory = 'All Menu';

function renderCategories() {
  const container = document.getElementById('category-links');
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'cat-btn' + (cat === 'All Menu' ? ' active' : '');
    btn.textContent = cat;
    btn.onclick = () => filterMenu(cat, btn);
    container.appendChild(btn);
  });
}

function filterMenu(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderMenuGrid();
}

function renderMenuGrid() {
  const grid = document.getElementById('menu-grid');
  grid.innerHTML = '';
  const filtered = currentCategory === 'All Menu'
    ? products
    : products.filter(p => p.category === currentCategory);
  filtered.forEach(p => grid.appendChild(buildProductCard(p, false)));
}

let carouselIndex = 0;

function moveCarousel(dir) {
  const track = document.getElementById('carousel-track');
  const cards = track.querySelectorAll('.promo-card');
  const visibleCount = window.innerWidth <= 768 ? 1 : 3;
  const maxIndex = cards.length - visibleCount;

  carouselIndex = Math.max(0, Math.min(carouselIndex + dir, maxIndex));
  const cardWidth = cards[0].offsetWidth + 16; // gap = 16
  track.style.transform = `translateX(-${carouselIndex * cardWidth}px)`;
}


function clearErrors() {
  ['err-name', 'err-email', 'err-password', 'err-dob', 'err-gender'].forEach(id => {
    document.getElementById(id).textContent = '';
  });
}

function togglePassword() {
  const pw = document.getElementById('password');
  pw.type = pw.type === 'password' ? 'text' : 'password';
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();

      const name = document.getElementById('full-name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const dob = document.getElementById('dob').value;
      const gender = document.getElementById('gender').value;

      let valid = true;

      // Validation 1: Name not empty
      if (name.length === 0) {
        document.getElementById('err-name').textContent = 'Full name is required.';
        valid = false;
      } else if (name.length < 3) {
        document.getElementById('err-name').textContent = 'Name must be at least 3 characters.';
        valid = false;
      }

      // Validation 2: Email format (no regex)
      if (email.length === 0) {
        document.getElementById('err-email').textContent = 'Email is required.';
        valid = false;
      } else if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        document.getElementById('err-email').textContent = 'Please enter a valid email address.';
        valid = false;
      }

      // Validation 3: Password length
      if (password.length === 0) {
        document.getElementById('err-password').textContent = 'Password is required.';
        valid = false;
      } else if (password.length < 8) {
        document.getElementById('err-password').textContent = 'Password must be at least 8 characters.';
        valid = false;
      }

      // Validation 4: Date of birth not empty and must be in the past
      if (dob.length === 0) {
        document.getElementById('err-dob').textContent = 'Date of birth is required.';
        valid = false;
      } else {
        const dobDate = new Date(dob);
        const today = new Date();
        if (dobDate >= today) {
          document.getElementById('err-dob').textContent = 'Date of birth must be in the past.';
          valid = false;
        }
      }

      // Validation 5: Gender selected
      if (gender.length === 0) {
        document.getElementById('err-gender').textContent = 'Please select a gender.';
        valid = false;
      }

      if (valid) {
        form.classList.add('hidden');
        document.getElementById('form-success').classList.remove('hidden');
      }
    });
  }

  renderHomeGrids();
  renderCategories();
  renderMenuGrid();
});


function submitCity() {
  const cityInput = document.getElementById('city-request');
  const errEl = document.getElementById('err-city');
  const okEl = document.getElementById('ok-city');

  errEl.textContent = '';
  okEl.textContent = '';

  const val = cityInput.value.trim();
  if (val.length === 0) {
    errEl.textContent = 'Please enter a city name.';
    return;
  }
  okEl.textContent = 'Thank you! We will consider your city request.';
  cityInput.value = '';
}

function submitReport() {
  const reportInput = document.getElementById('report-text');
  const errEl = document.getElementById('err-report');
  const okEl = document.getElementById('ok-report');

  errEl.textContent = '';
  okEl.textContent = '';

  const val = reportInput.value.trim();
  if (val.length === 0) {
    errEl.textContent = 'Please write something before submitting.';
    return;
  }
  if (val.length < 10) {
    errEl.textContent = 'Report must be at least 10 characters.';
    return;
  }
  okEl.textContent = 'Report received. Thank you for your feedback!';
  reportInput.value = '';
}
