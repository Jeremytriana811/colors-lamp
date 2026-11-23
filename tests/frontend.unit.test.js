const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Runs the real browser code with fake DOM/XHR objects (no network or database).
const appSource = fs.readFileSync(path.join(__dirname, '../public/js/code.js'), 'utf8');

test('addColor sends the entered color and current user ID to the PHP API', () => {
  const sent = [];
  const elements = {
    colorText: { value: 'Blue' },
    colorAddResult: { innerHTML: '' },
  };
  class FakeXHR {
    open(method, url) { this.method = method; this.url = url; }
    setRequestHeader(name, value) { this.header = [name, value]; }
    send(body) { sent.push({ method: this.method, url: this.url, body }); }
  }
  const context = vm.createContext({
    document: { getElementById: id => elements[id] },
    XMLHttpRequest: FakeXHR,
    window: { location: { href: '' } },
  });
  vm.runInContext(appSource, context);
  vm.runInContext('userId = 7; addColor();', context);

  expect(sent).toHaveLength(1);
  expect(sent[0].method).toBe('POST');
  expect(sent[0].url).toBe('/LAMPAPI/AddColor.php');
  expect(JSON.parse(sent[0].body)).toEqual({ color: 'Blue', userId: 7 });
});

test('searchColor includes the search text and current user ID', () => {
  const sent = [];
  const elements = {
    searchText: { value: 'blu' },
    colorSearchResult: { innerHTML: '' },
  };
  class FakeXHR {
    open(method, url) { this.method = method; this.url = url; }
    setRequestHeader() {}
    send(body) { sent.push({ method: this.method, url: this.url, body }); }
  }
  const context = vm.createContext({
    document: { getElementById: id => elements[id] },
    XMLHttpRequest: FakeXHR,
    window: { location: { href: '' } },
  });
  vm.runInContext(appSource, context);
  vm.runInContext('userId = 7; searchColor();', context);
  expect(sent).toHaveLength(1);
  expect(sent[0].url).toBe('/LAMPAPI/SearchColors.php');
  expect(JSON.parse(sent[0].body)).toEqual({ search: 'blu', userId: 7 });
});
