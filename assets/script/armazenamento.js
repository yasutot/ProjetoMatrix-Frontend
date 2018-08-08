function Storage(key) {

  function save(value) {
    window.localStorage.setItem(key, stringify(value));
  }

  function grab() {
    return parse(window.localStorage.getItem(key)) || [];
  }

  function stringify(value) {
    return JSON.stringify(value);
  }

  function parse(value) {
    return JSON.parse(value);
  }

  return {
    save,
    grab,
    stringify,
    parse
  };
}