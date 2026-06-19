const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

function loadMenu() {
  const source = fs.readFileSync('app.js', 'utf8');
  const start = source.indexOf('const MENU = ');
  const end = source.indexOf('const SUGARS_FULL', start);

  assert.notEqual(start, -1, 'MENU declaration must exist');
  assert.notEqual(end, -1, 'MENU declaration must have a stable boundary');

  const declaration = source.slice(start, end);
  return Function(`${declaration}; return MENU;`)();
}

const expectedMenu = {
  原味茶: [
    ['輕香烏龍綠', 45], ['糯米香茶', 45], ['島韻紅茶', 40],
    ['炭培烏龍', 40], ['油切蕎麥茶', 40], ['手採高山青', 40],
  ],
  風味茶: [
    ['牡丹紅柚', 70], ['粉粿牡丹紅柚', 85], ['牡丹高山青', 60],
    ['牡丹蕎麥茶', 60], ['粉粿牡丹檸檬', 70], ['酸梅湯烏龍綠', 65],
    ['輕檸烏龍綠', 65], ['糯香檸檬茶', 65], ['粉粿桂花檸檬', 70],
    ['粉粿黑糖檸檬', 70], ['荔枝烏龍', 60], ['荔枝蘆薈', 65],
    ['檸檬紅茶', 60], ['檸檬高山青', 60], ['桂花蕎麥茶', 60],
  ],
  奶茶: [
    ['烏龍綠奶茶', 60], ['糯香奶茶', 60], ['粉粿黑糖奶茶', 70],
    ['黃金蕎麥奶茶', 55], ['逮丸奶茶', 75], ['極黑芝麻奶茶', 70],
    ['島韻紅奶茶', 55], ['烏龍奶茶', 55], ['高山青奶茶', 55], ['嫩仙草奶茶', 65],
  ],
  芝士奶蓋: [
    ['奶蓋烏龍綠', 75], ['奶蓋糯香茶', 75], ['奶蓋島韻紅', 70],
    ['奶蓋烏龍茶', 70], ['奶蓋蕎麥茶', 70], ['奶蓋高山青', 70],
  ],
  鮮奶茶: [
    ['烏龍綠鮮奶茶', 80], ['糯香鮮奶茶', 80], ['蕎麥鮮奶茶', 75],
    ['烏龍鮮奶茶', 75], ['島韻紅鮮奶茶', 75], ['極黑芝麻鮮奶茶', 85],
    ['粉粿黑糖鮮奶茶', 85], ['高山青鮮奶茶', 75],
  ],
  冬瓜茶: [
    ['冬瓜紅茶', 50], ['冬瓜青茶', 50], ['冬瓜檸檬', 55],
    ['冬瓜仙草蜜', 55], ['冬瓜蕎麥茶', 50], ['冬瓜烏龍茶', 50],
  ],
};

const hotDrinks = new Set([
  '輕香烏龍綠', '糯米香茶', '島韻紅茶', '油切蕎麥茶', '手採高山青',
  '牡丹蕎麥茶', '糯香檸檬茶', '檸檬紅茶', '檸檬高山青', '桂花蕎麥茶',
  '烏龍綠奶茶', '糯香奶茶', '黃金蕎麥奶茶', '逮丸奶茶', '極黑芝麻奶茶',
  '島韻紅奶茶', '烏龍奶茶', '高山青奶茶', '烏龍綠鮮奶茶', '糯香鮮奶茶',
  '蕎麥鮮奶茶', '烏龍鮮奶茶', '島韻紅鮮奶茶', '極黑芝麻鮮奶茶', '高山青鮮奶茶',
]);

test('menu matches the supplied June 2026 menu image', () => {
  const menu = loadMenu();
  const actualMenu = Object.fromEntries(menu.map(category => [
    category.category,
    category.items.map(item => [item.name, item.price]),
  ]));

  assert.deepEqual(actualMenu, expectedMenu);
});

test('hot drink availability matches the supplied menu image', () => {
  const items = loadMenu().flatMap(category => category.items);
  const actualHotDrinks = new Set(items.filter(item => item.canHot).map(item => item.name));

  assert.deepEqual(actualHotDrinks, hotDrinks);
});

test('red pomelo drinks use the supplied fixed-sugar restriction', () => {
  const items = loadMenu().flatMap(category => category.items);
  const redPomeloDrinks = items.filter(item => item.name.includes('牡丹紅柚'));

  assert.equal(redPomeloDrinks.length, 2);
  assert.ok(redPomeloDrinks.every(item => item.fixedSugar));
});
