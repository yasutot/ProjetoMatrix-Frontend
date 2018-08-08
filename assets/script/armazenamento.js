function Storage(key) {

  function set(value) {
    window.localStorage.setItem(key, stringify(value));
  }

  function get() {
    return parse(window.localStorage.getItem(key)) || [];
  }

  function stringify(value) {
    return JSON.stringify(value);
  }

  function parse(value) {
    return JSON.parse(value);
  }

  return {
    set,
    get,
    stringify,
    parse
  };
}