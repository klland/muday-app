// ============================================================
// Firebase 設定
// ============================================================
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyB1Z7I7LoZ6q4nUTTIKViXbSn3jyaTZ-rM",
  authDomain: "muday-app.firebaseapp.com",
  databaseURL: "https://muday-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "muday-app",
  storageBucket: "muday-app.firebasestorage.app",
  messagingSenderId: "247833012135",
  appId: "1:247833012135:web:99d46fe214086f287bf882"
};
firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.database();

// ============================================================
// 群組隔離：從 URL 讀取 ?group=xxx，預設 'default'
// ============================================================
const GROUP_ID = new URLSearchParams(window.location.search).get('group') || 'default';

// ============================================================
// LIFF ID
// ============================================================
const LIFF_ID = '2009621528-uT75vRTv';

// ===== 菜單資料 =====
// kcal: 大杯正常甜估算值  caffeine: 0=無 1=微量(<100mg) 2=中(101-200mg) 3=高(>200mg)
const MENU = [
  {
    series: '茶人系列', category: '原味茶', emoji_cat: '🌿', theme: 'green',
    items: [
      { id: 101, name: '輕香烏龍綠',  emoji: '🌿', price: 45, kcal: 175, caffeine: 2 },
      { id: 102, name: '糯米香茶',    emoji: '🍶', price: 45, kcal: 170, caffeine: 2 },
      { id: 103, name: '島韻紅茶',    emoji: '🍂', price: 40, kcal: 160, caffeine: 3 },
      { id: 104, name: '炭培烏龍',    emoji: '🫖', price: 40, kcal: 165, caffeine: 2 },
      { id: 105, name: '油切蕎麥茶',  emoji: '🌾', price: 40, kcal: 155, caffeine: 1, traceCaffeine: true, canCustomNoCaff: true, recommendNoSugar: true },
      { id: 106, name: '手採高山青',  emoji: '🏔️', price: 40, kcal: 168, caffeine: 2 },
    ]
  },
  {
    series: '講究系列', category: '風味茶', emoji_cat: '🌸', theme: 'pink',
    items: [
      { id: 201, name: '牡丹高山青',    emoji: '🌸🏔️', price: 60, kcal: 200, caffeine: 2, limitedSugar: true },
      { id: 202, name: '牡丹蕎麥茶',    emoji: '🌸🌾', price: 60, kcal: 195, caffeine: 0, limitedSugar: true, caffeineFree: true },
      { id: 203, name: '粉粿牡丹檸檬',  emoji: '🌸🍋', price: 70, kcal: 265, caffeine: 1, limitedSugar: true, traceCaffeine: true },
      { id: 204, name: '酸梅湯烏龍綠',  emoji: '🍑🌿', price: 65, kcal: 350, caffeine: 2, fixedSweetIce: true },
      { id: 205, name: '輕檸烏龍綠',    emoji: '🍋🌿', price: 65, kcal: 255, caffeine: 2 },
      { id: 206, name: '糯香檸檬茶',    emoji: '🍋🍶', price: 65, kcal: 260, caffeine: 2 },
      { id: 207, name: '粉粿桂花檸檬',  emoji: '🌼🍋', price: 70, kcal: 268, caffeine: 1, limitedSugar: true, traceCaffeine: true },
      { id: 208, name: '粉粿黑糖檸檬',  emoji: '🤎🍋', price: 70, kcal: 275, caffeine: 1, limitedSugar: true, traceCaffeine: true },
      { id: 209, name: '荔枝烏龍',      emoji: '🍒🫖', price: 60, kcal: 235, caffeine: 2 },
      { id: 210, name: '荔枝蘆薈',      emoji: '🍒', price: 65, kcal: 248, caffeine: 2, fixedSweetIce: true },
      { id: 211, name: '檸檬紅茶',      emoji: '🍋🍂', price: 60, kcal: 240, caffeine: 3 },
      { id: 212, name: '檸檬高山青',    emoji: '🍋🏔️', price: 60, kcal: 238, caffeine: 2 },
      { id: 213, name: '桂花蕎麥茶',    emoji: '🌼🌾', price: 60, kcal: 225, caffeine: 0, limitedSugar: true, caffeineFree: true },
    ]
  },
  {
    series: '香醇系列', category: '奶茶', emoji_cat: '🧋', theme: 'brown',
    items: [
      { id: 301, name: '烏龍綠奶茶',   emoji: '🌿', price: 60, kcal: 360, caffeine: 2 },
      { id: 302, name: '糯香奶茶',     emoji: '🍶', price: 60, kcal: 355, caffeine: 2 },
      { id: 303, name: '粉粿黑糖奶茶', emoji: '🤎', price: 70, kcal: 420, caffeine: 1, limitedSugar: true, traceCaffeine: true },
      { id: 304, name: '黃金蕎麥奶茶', emoji: '🌾', price: 55, kcal: 340, caffeine: 0, caffeineFree: true },
      { id: 305, name: '逮丸奶茶',     emoji: '🟤', price: 75, kcal: 490, caffeine: 2, includesGrass: true },
      { id: 306, name: '極黑芝麻奶茶', emoji: '⚫', price: 70, kcal: 430, caffeine: 2 },
      { id: 307, name: '島韻紅奶茶',   emoji: '🍂', price: 55, kcal: 340, caffeine: 3 },
      { id: 308, name: '烏龍奶茶',     emoji: '🫖', price: 55, kcal: 345, caffeine: 2 },
      { id: 309, name: '高山青奶茶',   emoji: '🏔️', price: 55, kcal: 345, caffeine: 2 },
      { id: 311, name: '嫩仙草奶茶',   emoji: '🌿', price: 65, kcal: 365, caffeine: 2 },
    ]
  },
  {
    series: '濃韻系列', category: '芝士奶蓋', emoji_cat: '🫙', theme: 'gold',
    items: [
      { id: 401, name: '奶蓋烏龍綠', emoji: '🌿', price: 75, kcal: 430, caffeine: 2 },
      { id: 402, name: '奶蓋糯香茶', emoji: '🍶', price: 75, kcal: 428, caffeine: 2 },
      { id: 403, name: '奶蓋島韻紅', emoji: '🍂', price: 70, kcal: 420, caffeine: 3 },
      { id: 404, name: '奶蓋烏龍茶', emoji: '🫖', price: 70, kcal: 422, caffeine: 2 },
      { id: 405, name: '奶蓋蕎麥茶', emoji: '🌾', price: 70, kcal: 415, caffeine: 1, traceCaffeine: true, canCustomNoCaff: true },
      { id: 406, name: '奶蓋高山青', emoji: '🏔️', price: 70, kcal: 422, caffeine: 2 },
    ]
  },
  {
    series: '自然系列', category: '鮮奶茶', emoji_cat: '🥛', theme: 'blue',
    items: [
      { id: 501, name: '烏龍綠鮮奶茶',   emoji: '🌿', price: 80, kcal: 445, caffeine: 2 },
      { id: 502, name: '糯香鮮奶茶',     emoji: '🍶', price: 80, kcal: 442, caffeine: 2 },
      { id: 503, name: '蕎麥鮮奶茶',     emoji: '🌾', price: 75, kcal: 435, caffeine: 0, caffeineFree: true },
      { id: 504, name: '烏龍鮮奶茶',     emoji: '🫖', price: 75, kcal: 438, caffeine: 2 },
      { id: 505, name: '島韻紅鮮奶茶',   emoji: '🍂', price: 75, kcal: 440, caffeine: 3 },
      { id: 506, name: '極黑芝麻鮮奶茶', emoji: '⚫', price: 85, kcal: 500, caffeine: 2 },
      { id: 508, name: '粉粿黑糖鮮奶茶', emoji: '🤎', price: 85, kcal: 510, caffeine: 1, limitedSugar: true, traceCaffeine: true },
      { id: 509, name: '高山青鮮奶茶',   emoji: '🏔️', price: 75, kcal: 440, caffeine: 2 },
    ]
  },
  {
    series: '堅持系列', category: '冬瓜茶', emoji_cat: '🍵', theme: 'teal',
    items: [
      { id: 601, name: '冬瓜紅茶',   emoji: '🍂', price: 50, kcal: 350, caffeine: 3 },
      { id: 602, name: '冬瓜青茶',   emoji: '🏔️', price: 50, kcal: 345, caffeine: 2 },
      { id: 603, name: '冬瓜檸檬',   emoji: '🍋', price: 55, kcal: 368, caffeine: 2 },
      { id: 604, name: '冬瓜仙草蜜', emoji: '🍯', price: 55, kcal: 380, caffeine: 2, fixedIce: true },
      { id: 605, name: '冬瓜蕎麥茶', emoji: '🌾', price: 50, kcal: 338, caffeine: 0, caffeineFree: true },
      { id: 606, name: '冬瓜烏龍茶', emoji: '🫖', price: 50, kcal: 348, caffeine: 2 },
    ]
  },
];

const SUGARS_FULL    = ['正常甜', '七分甜', '五分甜', '三分甜', '一分糖', '無糖'];
const SUGARS_LIMITED = ['正常甜', '半糖'];
const ICES           = ['正常冰', '少冰', '微冰', '去冰(小碎冰)', '完全去冰'];
const PEPPERCORN     = ['不麻', '微麻', '正常麻', '多麻'];
const TOPPINGS = [
  { label: '招牌粉粿',        price: 15, traceCaffeine: true },
  { label: '草仔粿',          price: 15 },
  { label: '雙粉(粉粿+粉圓)', price: 15, traceCaffeine: true },
  { label: '琥珀粉圓',        price: 10 },
  { label: '蘆薈',            price: 15 },
  { label: '嫩仙草',          price: 10 },
];

// ===== localStorage =====
const LS_FAVORITES = 'muday_favorites';
const LS_HISTORY   = 'muday_history';
const LS_CART      = 'muday_cart';

function getFavorites() {
  return new Set(JSON.parse(localStorage.getItem(LS_FAVORITES) || '[]'));
}
function saveFavorites(favSet) {
  localStorage.setItem(LS_FAVORITES, JSON.stringify([...favSet]));
}
function toggleFavorite(id) {
  const favs = getFavorites();
  if (favs.has(id)) favs.delete(id); else favs.add(id);
  saveFavorites(favs);
  return favs.has(id);
}

function saveCart() {
  localStorage.setItem(LS_CART, JSON.stringify(cart));
}

// 歷史訂單（Firebase 同步版）

// ===== Firebase =====
function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
async function submitToFirebase(name, items, total) {
  const key = db.ref(`orders/${GROUP_ID}/${getTodayKey()}`).push().key;
  await db.ref(`orders/${GROUP_ID}/${getTodayKey()}/${key}`).set({ name, items, total, timestamp: Date.now() });
}
function toArr(val) {
  if (!val) return [];
  return Array.isArray(val) ? val : Object.values(val);
}
async function loadTodayOrders() {
  const snap = await db.ref(`orders/${GROUP_ID}/${getTodayKey()}`).get();
  if (!snap.exists()) return [];
  const val = snap.val();
  // 保留 Firebase key，方便後續刪除
  return Object.entries(val).map(([fbKey, order]) => ({
    ...order,
    _fbKey: fbKey,
    items: toArr(order.items).map((item, idx) => ({
      ...item,
      _itemIdx: idx,
      opts:     toArr(item.opts),
      toppings: toArr(item.toppings),
    }))
  })).sort((a, b) => a.timestamp - b.timestamp);
}

// ===== Toast 通知 =====
function showToast(msg, type = 'success') {
  const c = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.textContent = msg;
  c.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 400);
  }, 2800);
}

// ===== State =====
let cart = JSON.parse(localStorage.getItem(LS_CART) || '[]');
let currentItem = null;
let selectedSugar = 0;
let selectedIce   = 0;
let selectedPeppercorn = 0;
let selectedToppings   = [];
let qty = 1;
let lineProfile = null;
let isInLiff    = false;

// ===== DOM =====
const categoryNav  = document.getElementById('categoryNav');
const menuSection  = document.getElementById('menuSection');
const cartBtn      = document.getElementById('cartBtn');
const cartBadge    = document.getElementById('cartBadge');
const cartPanel    = document.getElementById('cartPanel');
const closeCart    = document.getElementById('closeCart');
const overlay      = document.getElementById('overlay');
const cartBody     = document.getElementById('cartBody');
const cartFooter   = document.getElementById('cartFooter');
const cartTotalEl  = document.getElementById('cartTotal');
const checkoutBtn  = document.getElementById('checkoutBtn');
const customModal  = document.getElementById('customModal');
const closeModal   = document.getElementById('closeModal');
const successModal = document.getElementById('successModal');
const closeSuccess = document.getElementById('closeSuccess');
const nameInput    = document.getElementById('nameInput');
const nameRow      = document.getElementById('nameRow');
const historyBtn   = document.getElementById('historyBtn');
const groupBtn     = document.getElementById('groupBtn');
const historyModal = document.getElementById('historyModal');
const groupModal   = document.getElementById('groupModal');

// ===== 建立菜單 =====
function buildMenu(filterCat = null) {
  categoryNav.innerHTML = '';
  categoryNav.appendChild(createCatBtn('全部', null, filterCat === null));
  categoryNav.appendChild(createCatBtn('⭐ 最愛', 'favorites', filterCat === 'favorites'));
  MENU.forEach(cat => categoryNav.appendChild(createCatBtn(cat.category, cat.category, filterCat === cat.category)));

  menuSection.innerHTML = '';

  if (filterCat === 'favorites') {
    const favs = getFavorites();
    const favItems = MENU.flatMap(cat => cat.items).filter(item => favs.has(item.id));
    if (favItems.length === 0) {
      menuSection.innerHTML = '<p class="empty-hint">還沒有最愛，點飲料卡片右上角的 ★ 加入</p>';
      return;
    }
    const title = document.createElement('div');
    title.className = 'category-title';
    title.innerHTML = '<span class="cat-name">⭐ 我的最愛</span>';
    menuSection.appendChild(title);
    const grid = document.createElement('div');
    grid.className = 'menu-grid';
    favItems.forEach(item => grid.appendChild(createDrinkCard(item)));
    menuSection.appendChild(grid);
    return;
  }

  MENU.forEach(cat => {
    if (filterCat && cat.category !== filterCat) return;
    const title = document.createElement('div');
    title.className = 'category-title';
    title.innerHTML = `<span class="series-name">${cat.series}</span><span class="cat-name">${cat.emoji_cat} ${cat.category}</span>`;
    menuSection.appendChild(title);
    const grid = document.createElement('div');
    grid.className = 'menu-grid';
    cat.items.forEach(item => grid.appendChild(createDrinkCard(item)));
    menuSection.appendChild(grid);
  });
}

function createCatBtn(label, value, active) {
  const btn = document.createElement('button');
  btn.className = 'cat-btn' + (active ? ' active' : '');
  btn.textContent = label;
  btn.addEventListener('click', () => buildMenu(value));
  return btn;
}

function itemTags(item) {
  const t = [];
  if (item.includesGrass)   t.push({ text: '含草仔粿',      cls: 'tag-green'  });
  if (item.caffeineFree)    t.push({ text: '無咖啡因',      cls: 'tag-green'  });
  if (item.traceCaffeine)   t.push({ text: '微量咖啡因',    cls: 'tag-yellow' });
  if (item.canCustomNoCaff) t.push({ text: '可客製無咖啡因', cls: 'tag-blue'   });
  if (item.hotOnly)         t.push({ text: '僅限熱飲',      cls: 'tag-red'    });
  if (item.fixedSweetIce)   t.push({ text: '甜度冰量固定',  cls: 'tag-gray'   });
  if (item.limitedSugar)    t.push({ text: '正常/半糖',     cls: 'tag-gray'   });
  if (item.fixedIce)        t.push({ text: '冰量固定',      cls: 'tag-gray'   });
  if (item.recommendNoSugar)t.push({ text: '推薦無糖',      cls: 'tag-blue'   });
  return t;
}

const CAFFEINE_LABELS = ['無咖', '微咖', '中咖', '高咖'];
const CAFFEINE_COLORS = ['caff-none', 'caff-low', 'caff-mid', 'caff-high'];

function createDrinkCard(item) {
  const tags = itemTags(item);
  const isFav = getFavorites().has(item.id);
  const card = document.createElement('div');
  card.className = `drink-card theme-${item.theme || 'green'}`;
  const caffeineIdx = item.caffeine ?? 2;
  card.innerHTML = `
    <div class="drink-img">
      <span class="drink-emoji">${item.emoji}</span>
      <button class="fav-btn${isFav ? ' active' : ''}" data-id="${item.id}">★</button>
    </div>
    <div class="drink-info">
      <div class="drink-name">${item.name}</div>
      ${tags.length ? `<div class="drink-tags">${tags.map(t => `<span class="tag ${t.cls}">${t.text}</span>`).join('')}</div>` : ''}
      <div class="drink-meta">
        <span class="meta-kcal">🔥 ${item.kcal ?? '—'} kcal</span>
        <span class="meta-caff ${CAFFEINE_COLORS[caffeineIdx]}">☕ ${CAFFEINE_LABELS[caffeineIdx]}</span>
      </div>
      <div class="drink-footer">
        <span class="drink-price">$${item.price}</span>
        <span class="add-icon">＋</span>
      </div>
    </div>`;
  card.querySelector('.fav-btn').addEventListener('click', e => {
    e.stopPropagation();
    const isNowFav = toggleFavorite(item.id);
    e.currentTarget.classList.toggle('active', isNowFav);
  });
  card.addEventListener('click', () => openModal(item));
  return card;
}

// ===== Modal 客製化 =====
function openModal(item) {
  currentItem = item;
  selectedSugar = selectedIce = selectedPeppercorn = 0;
  selectedToppings = [];
  qty = 1;

  document.getElementById('modalTitle').textContent = item.name;
  document.getElementById('modalPrice').textContent = `$${item.price}`;
  document.getElementById('qtyDisplay').textContent = 1;
  document.getElementById('modalTags').innerHTML = itemTags(item).map(t => `<span class="tag ${t.cls}">${t.text}</span>`).join('');

  const fixedNote  = document.getElementById('fixedNote');
  const sugarGroup = document.getElementById('sugarGroup');
  const iceGroup   = document.getElementById('iceGroup');
  const ppGroup    = document.getElementById('peppercornGroup');

  // 草仔粿備注
  let grassNote = document.getElementById('grassNote');
  if (!grassNote) {
    grassNote = document.createElement('div');
    grassNote.id = 'grassNote';
    grassNote.className = 'fixed-note';
    grassNote.style.background = '#e8f5e9';
    grassNote.style.borderColor = '#a5d6a7';
    grassNote.style.color = '#2d8a5a';
    grassNote.textContent = '🌿 本品已含招牌草仔粿';
    fixedNote.parentNode.insertBefore(grassNote, fixedNote);
  }
  grassNote.style.display = item.includesGrass ? 'block' : 'none';

  if (item.fixedSweetIce) {
    fixedNote.style.display  = 'block';
    sugarGroup.style.display = 'none';
    iceGroup.style.display   = 'none';
  } else {
    fixedNote.style.display  = 'none';
    sugarGroup.style.display = 'block';
    renderChips('sugarOptions', item.limitedSugar ? SUGARS_LIMITED : SUGARS_FULL, 0, 'sugar');
    if (item.hotOnly || item.fixedIce) {
      iceGroup.style.display = 'none';
    } else {
      iceGroup.style.display = 'block';
      renderChips('iceOptions', ICES, 0, 'ice');
    }
  }

  ppGroup.style.display = item.hasPeppercorn ? 'block' : 'none';
  if (item.hasPeppercorn) renderChips('peppercornOptions', PEPPERCORN, 0, 'peppercorn');

  renderToppingChips();
  updateModalTotal();
  customModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCustomModal() {
  customModal.classList.remove('open');
  document.body.style.overflow = '';
}

function renderChips(containerId, options, selectedIdx, type) {
  const el = document.getElementById(containerId);
  el.innerHTML = '';
  options.forEach((opt, i) => {
    const chip = document.createElement('span');
    chip.className = 'opt-chip' + (i === selectedIdx ? ' selected' : '');
    chip.textContent = opt;
    chip.addEventListener('click', () => {
      if (type === 'sugar')           selectedSugar      = i;
      else if (type === 'ice')        selectedIce        = i;
      else if (type === 'peppercorn') selectedPeppercorn = i;
      renderChips(containerId, options, i, type);
      updateModalTotal();
    });
    el.appendChild(chip);
  });
}

function renderToppingChips() {
  const el = document.getElementById('toppingOptions');
  el.innerHTML = '';
  TOPPINGS.forEach((t, i) => {
    const chip = document.createElement('span');
    chip.className = 'opt-chip topping' + (selectedToppings.includes(i) ? ' selected' : '');
    chip.textContent = `${t.label}${t.traceCaffeine ? ' ☕' : ''} +$${t.price}`;
    chip.addEventListener('click', () => {
      selectedToppings = selectedToppings.includes(i)
        ? selectedToppings.filter(x => x !== i)
        : [...selectedToppings, i];
      renderToppingChips();
      updateModalTotal();
    });
    el.appendChild(chip);
  });
}

function calcItemPrice() {
  if (!currentItem) return 0;
  const toppingExtra = selectedToppings.reduce((s, i) => s + TOPPINGS[i].price, 0);
  return (currentItem.price + toppingExtra) * qty;
}

function updateModalTotal() {
  document.getElementById('modalTotalPrice').textContent = `$${calcItemPrice()}`;
}

document.getElementById('qtyMinus').addEventListener('click', () => {
  if (qty > 1) { qty--; document.getElementById('qtyDisplay').textContent = qty; updateModalTotal(); }
});
document.getElementById('qtyPlus').addEventListener('click', () => {
  qty++; document.getElementById('qtyDisplay').textContent = qty; updateModalTotal();
});
closeModal.addEventListener('click', closeCustomModal);
customModal.addEventListener('click', e => { if (e.target === customModal) closeCustomModal(); });

// ===== 加入購物車 =====
document.getElementById('addToCartBtn').addEventListener('click', () => {
  const item   = currentItem;
  const sugars = item.limitedSugar ? SUGARS_LIMITED : SUGARS_FULL;
  const opts   = [];

  if (item.fixedSweetIce) {
    opts.push('甜度/冰量固定');
  } else {
    opts.push(sugars[selectedSugar]);
    if (!item.hotOnly && !item.fixedIce) opts.push(ICES[selectedIce]);
    if (item.hotOnly) opts.push('熱飲');
    if (item.fixedIce) opts.push('冰量固定');
  }
  if (item.hasPeppercorn) opts.push(PEPPERCORN[selectedPeppercorn] + '麻');

  const toppingExtra = selectedToppings.reduce((s, i) => s + TOPPINGS[i].price, 0);

  cart.push({
    id: Date.now(),
    name: item.name,
    emoji: item.emoji,
    opts,
    toppings: selectedToppings.map(i => TOPPINGS[i].label),
    qty,
    unitPrice: item.price + toppingExtra,
    totalPrice: calcItemPrice(),
  });

  saveCart();
  updateCartBadge();
  closeCustomModal();
  cartBtn.style.transform = 'scale(1.18)';
  setTimeout(() => { cartBtn.style.transform = ''; }, 200);
});

// ===== 購物車 =====
cartBtn.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartPanel);
overlay.addEventListener('click', closeCartPanel);

function openCart() {
  renderCart();
  cartPanel.classList.add('open');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeCartPanel() {
  cartPanel.classList.remove('open');
  overlay.classList.remove('show');
  document.body.style.overflow = '';
}

function updateCartBadge() {
  const n = cart.reduce((s, i) => s + i.qty, 0);
  cartBadge.textContent = n;
  cartBadge.classList.remove('bounce');
  void cartBadge.offsetWidth; // reflow
  cartBadge.classList.add('bounce');
}

async function fetchHistory() {
  try {
    const snap = await db.ref(`history/${GROUP_ID}`).get();
    if (!snap.exists()) return [];
    return Object.values(snap.val())
      .map(entry => ({
        ...entry,
        items: toArr(entry.items).map(item => ({
          ...item,
          opts:     toArr(item.opts),
          toppings: toArr(item.toppings),
        }))
      }))
      .sort((a, b) => b.timestamp - a.timestamp);
  } catch(e) { return []; }
}

async function renderCart() {
  if (cart.length === 0) {
    const history = await fetchHistory();
    let html = '<p class="cart-empty">購物車是空的</p>';
    if (history.length > 0) {
      html += '<button class="reorder-btn" id="reorderBtn">🔄 重點上次訂單</button>';
    }
    cartBody.innerHTML = html;
    if (history.length > 0) {
      document.getElementById('reorderBtn').addEventListener('click', async () => {
        await reorderLast();
        await renderCart();
      });
    }
    cartFooter.style.display = 'none';
    return;
  }
  cartBody.innerHTML = '';
  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    const detail = [...item.opts, ...(item.toppings.length ? ['加：' + item.toppings.join('、')] : [])].join(' · ');
    div.innerHTML = `
      <span class="cart-item-emoji">${item.emoji}</span>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name} × ${item.qty}</div>
        <div class="cart-item-opts">${detail}</div>
      </div>
      <div class="cart-item-right">
        <span class="cart-item-price">$${item.totalPrice}</span>
        <button class="remove-btn" data-id="${item.id}">✕</button>
      </div>`;
    cartBody.appendChild(div);
  });
  cartBody.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      cart = cart.filter(i => i.id !== Number(btn.dataset.id));
      saveCart();
      updateCartBadge();
      renderCart();
    });
  });
  cartTotalEl.textContent = `$${cart.reduce((s, i) => s + i.totalPrice, 0)}`;
  cartFooter.style.display = 'block';
}

async function reorderLast() {
  const history = await fetchHistory();
  if (history.length === 0) return;
  cart = history[0].items.map(item => ({ ...item, id: Date.now() + Math.random() }));
  saveCart();
  updateCartBadge();
}

// ===== 產生訂單文字 =====
function buildOrderText(name) {
  const total = cart.reduce((s, i) => s + i.totalPrice, 0);
  const cups  = cart.reduce((s, i) => s + i.qty, 0);
  const lines = [
    `☀️ 一沐日｜${name} 的訂單`,
    `─────────────`,
  ];
  cart.forEach((item, idx) => {
    const detail = [...item.opts, ...(item.toppings.length ? ['加：' + item.toppings.join('、')] : [])].join('・');
    lines.push(`${idx + 1}. ${item.name} × ${item.qty}　$${item.totalPrice}`);
    lines.push(`   ${detail}`);
  });
  lines.push(`─────────────`);
  lines.push(`共 ${cups} 杯｜合計 $${total}`);
  return lines.join('\n');
}

// ===== 送出訂單 =====
checkoutBtn.addEventListener('click', async () => {
  if (cart.length === 0) return;

  const name = isInLiff && lineProfile
    ? lineProfile.displayName
    : (nameInput.value.trim() || '匿名');

  const total = cart.reduce((s, i) => s + i.totalPrice, 0);
  const cartSnapshot = [...cart];

  // 上傳到 Firebase 團購（歷史紀錄改在匯總送出時才存）
  try { await submitToFirebase(name, cartSnapshot, total); } catch(e) { console.warn('Firebase:', e); }

  document.getElementById('successName').textContent = `${name} 的訂單`;
  document.getElementById('successItems').innerHTML = cartSnapshot
    .map(i => `<div class="success-item"><span>${i.emoji} ${i.name} × ${i.qty}</span><span>$${i.totalPrice}</span></div>`)
    .join('');

  cart = [];
  saveCart();
  updateCartBadge();
  closeCartPanel();
  successModal.classList.add('open');
});


closeSuccess.addEventListener('click', () => successModal.classList.remove('open'));
successModal.addEventListener('click', e => { if (e.target === successModal) successModal.classList.remove('open'); });

// ===== 歷史訂單 =====
let historyCache = [];

function formatDate(ts) {
  const d = new Date(ts);
  return `${d.getMonth()+1}/${d.getDate()} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

historyBtn.addEventListener('click', async () => {
  historyModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  const body = document.getElementById('historyBody');
  body.innerHTML = `<div style="padding:16px;display:flex;flex-direction:column;gap:12px">
    ${[1,2,3].map(()=>`<div><div class="skeleton-line medium"></div><div class="skeleton-line short"></div></div>`).join('')}
  </div>`;

  try {
    const snap = await db.ref(`history/${GROUP_ID}`).get();
    if (!snap.exists()) {
      body.innerHTML = '<p class="empty-hint">還沒有歷史訂單</p>';
      return;
    }
    // 和 loadTodayOrders 一樣：把 Firebase object 全部轉回 array
    historyCache = Object.values(snap.val())
      .map(entry => ({
        ...entry,
        items: toArr(entry.items).map(item => ({
          ...item,
          opts:     toArr(item.opts),
          toppings: toArr(item.toppings),
        }))
      }))
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 50);

    body.innerHTML = '';
    historyCache.forEach((order, idx) => {
      const div = document.createElement('div');
      div.className = 'history-item';
      const itemsHtml = order.items.map(i => `
        <div class="history-drink">${i.emoji || ''} ${i.name} × ${i.qty}<span>$${i.totalPrice}</span></div>
        <div class="history-opts">${[...toArr(i.opts), ...(toArr(i.toppings).length ? ['加：'+toArr(i.toppings).join('、')] : [])].join(' · ')}</div>
      `).join('');
      div.innerHTML = `
        <div class="history-header">
          <span class="history-date">${order.name}・${formatDate(order.timestamp)}</span>
          <span class="history-total">合計 $${order.total}</span>
        </div>
        <div>${itemsHtml}</div>
        <button class="reorder-btn history-reorder" data-idx="${idx}">🔄 重點此筆訂單</button>
      `;
      body.appendChild(div);
    });

    body.querySelectorAll('.history-reorder').forEach(btn => {
      btn.addEventListener('click', () => {
        const order = historyCache[Number(btn.dataset.idx)];
        cart = order.items.map(item => ({ ...item, id: Date.now() + Math.random() }));
        saveCart();
        updateCartBadge();
        historyModal.classList.remove('open');
        document.body.style.overflow = '';
        openCart();
      });
    });
  } catch(e) {
    body.innerHTML = `<p style="text-align:center;color:#c0392b;padding:30px">載入失敗：${e.message}</p>`;
  }
});

document.getElementById('closeHistory').addEventListener('click', () => {
  historyModal.classList.remove('open');
  document.body.style.overflow = '';
});
historyModal.addEventListener('click', e => {
  if (e.target === historyModal) { historyModal.classList.remove('open'); document.body.style.overflow = ''; }
});

// ===== 今日團購 =====
let groupOrders = [];

groupBtn.addEventListener('click', async () => {
  groupModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  const body = document.getElementById('groupBody');
  body.innerHTML = `<div style="padding:16px;display:flex;flex-direction:column;gap:12px">
    ${[1,2,3].map(()=>`<div><div class="skeleton-line medium"></div><div class="skeleton-line short"></div></div>`).join('')}
  </div>`;
  try {
    groupOrders = await loadTodayOrders();
    renderGroupOrders();
  } catch(e) {
    body.innerHTML = `<p style="text-align:center;color:#c0392b;padding:30px">載入失敗：${e.message}</p>`;
  }
});

document.getElementById('closeGroup').addEventListener('click', () => {
  groupModal.classList.remove('open');
  document.body.style.overflow = '';
});
groupModal.addEventListener('click', e => {
  if (e.target === groupModal) { groupModal.classList.remove('open'); document.body.style.overflow = ''; }
});

function renderGroupOrders() {
  const body    = document.getElementById('groupBody');
  const sendBtn = document.getElementById('sendGroupBtn');

  // 過濾掉沒有品項的訂單
  const activeOrders = groupOrders.filter(o => o.items.length > 0);

  if (activeOrders.length === 0) {
    body.innerHTML = '<p class="empty-hint">今天還沒有人點餐</p>';
    sendBtn.style.display = 'none';
    return;
  }

  sendBtn.style.display = '';
  let totalCups = 0, totalPrice = 0;

  let html = '';
  activeOrders.forEach(order => {
    html += `<div class="group-person"><div class="group-person-name">【${order.name}】</div>`;
    order.items.forEach(item => {
      totalCups  += item.qty;
      totalPrice += item.totalPrice;
      const detail = [...item.opts, ...(item.toppings.length ? ['加：'+item.toppings.join('、')] : [])].join('・');
      html += `
        <div class="group-item">
          <div class="group-item-info">
            <div class="group-item-name">${item.emoji} ${item.name} × ${item.qty}</div>
            <div class="group-item-opts">${detail}</div>
          </div>
          <span class="group-item-price">$${item.totalPrice}</span>
          <button class="group-del-btn" data-fbkey="${order._fbKey}" data-idx="${item._itemIdx}">✕</button>
        </div>`;
    });
    html += `</div>`;
  });

  html += `<div class="group-summary">共 ${activeOrders.length} 人・${totalCups} 杯・合計 $${totalPrice}</div>`;
  body.innerHTML = html;

  // 刪除按鈕：真正從 Firebase 刪除
  body.querySelectorAll('.group-del-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const fbKey   = btn.dataset.fbkey;
      const itemIdx = Number(btn.dataset.idx);

      // 找到對應的 order 並移除該品項
      const order = groupOrders.find(o => o._fbKey === fbKey);
      if (!order) return;

      order.items = order.items.filter(i => i._itemIdx !== itemIdx);

      // 更新 Firebase
      try {
        if (order.items.length === 0) {
          // 整筆訂單刪除
          await db.ref(`orders/${GROUP_ID}/${getTodayKey()}/${fbKey}`).remove();
          groupOrders = groupOrders.filter(o => o._fbKey !== fbKey);
        } else {
          // 更新剩餘品項
          const cleanItems = order.items.map(({ _itemIdx, ...rest }) => rest);
          const newTotal   = order.items.reduce((s, i) => s + i.totalPrice, 0);
          await db.ref(`orders/${GROUP_ID}/${getTodayKey()}/${fbKey}`).update({ items: cleanItems, total: newTotal });
          order.total = newTotal;
        }
      } catch(e) {
        console.warn('刪除失敗:', e);
      }

      renderGroupOrders();
    });
  });
}

function buildGroupText() {
  const activeOrders = groupOrders.filter(o => o.items.length > 0);
  const d       = new Date();
  const dateStr = `${d.getMonth()+1}/${d.getDate()}`;
  const lines   = [`👥 一沐日｜${dateStr} 團購匯總`, `─────────────`];

  activeOrders.forEach(order => {
    lines.push(`【${order.name}】`);
    order.items.forEach((item, idx) => {
      const detail = [...item.opts, ...(item.toppings.length ? ['加：'+item.toppings.join('、')] : [])].join('・');
      lines.push(`${idx+1}. ${item.name} × ${item.qty}　$${item.totalPrice}`);
      if (detail) lines.push(`   ${detail}`);
    });
  });

  lines.push(`─────────────`);
  let totalCups = 0, totalPrice = 0;
  activeOrders.forEach(order => {
    order.items.forEach(item => {
      totalCups  += item.qty;
      totalPrice += item.totalPrice;
    });
  });
  lines.push(`共 ${totalCups} 杯・合計 $${totalPrice}`);
  return lines.join('\n');
}


document.getElementById('sendGroupBtn').addEventListener('click', async () => {
  const activeOrders = groupOrders.filter(o => o.items.length > 0);
  if (activeOrders.length === 0) return;
  const text = buildGroupText();

  // Firebase 操作
  const totalPrice = activeOrders.reduce((s, o) => s + o.total, 0);
  const allItems   = activeOrders.flatMap(o => o.items.map(({ _itemIdx, ...rest }) => rest));
  try {
    await db.ref(`history/${GROUP_ID}`).push({
      timestamp: Date.now(),
      name: '團購匯總',
      items: allItems,
      total: totalPrice,
      text: text,
      people: activeOrders.map(o => o.name),
    });
  } catch(e) { showToast('⚠️ 歷史儲存失敗：' + e.message, 'error'); }
  try { await db.ref(`orders/${GROUP_ID}/${getTodayKey()}`).remove(); } catch(e) {}

  groupOrders = [];
  groupModal.classList.remove('open');

  // 顯示複製 modal
  document.getElementById('copyText').value = text;
  document.getElementById('copyModal').classList.add('open');
});

// ===== 複製 Modal =====
document.getElementById('closeCopyModal').addEventListener('click', () => {
  document.getElementById('copyModal').classList.remove('open');
  document.body.style.overflow = '';
});

document.getElementById('doCopyBtn').addEventListener('click', async () => {
  const text = document.getElementById('copyText').value;
  try {
    await navigator.clipboard.writeText(text);
    showToast('✅ 已複製！請貼到 LINE 群組');
  } catch(e) {
    // fallback：選取 textarea 讓使用者手動複製
    const ta = document.getElementById('copyText');
    ta.select(); ta.setSelectionRange(0, text.length);
    showToast('請長按選取後複製', 'error');
  }
});

// ===== LINE LIFF 初始化 =====
async function initLiff() {
  try {
    await liff.init({ liffId: LIFF_ID });
    if (!liff.isLoggedIn()) { liff.login(); return; }
    isInLiff = liff.isInClient();
    lineProfile = await liff.getProfile();
    document.getElementById('lineUserName').textContent = lineProfile.displayName;
    nameRow.style.display = 'none';
  } catch (e) {
    console.warn('LIFF 初始化失敗，改為瀏覽器模式', e);
    nameRow.style.display = 'flex';
  }
}

// ===== 啟動 =====
buildMenu();
updateCartBadge();
initLiff();
