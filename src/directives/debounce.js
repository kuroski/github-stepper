/* eslint-disable no-underscore-dangle */
const debounce = (fn, wait = 500) => {
  let timeout = null;

  const debounced = (...args) => {
    const later = () => {
      timeout = null;
      fn(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (!timeout) fn(...args);
  };

  debounced.cancel = () => {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
};

export default {
  bind(el, { value, arg }) {
    const fn = debounce(target => {
      value(target.value);
    }, arg);

    el.__debounce_listener__ = ({ key, target }) => {
      if (key !== "Enter") return fn(target);

      fn.cancel();
      return value(target.value);
    };

    el.addEventListener("keyup", el.__debounce_listener__);
  },
  unbind(el) {
    if (!el.__debounce_listener__) return;
    el.removeEventListener("keyup", el.__debounce_listener__);
  }
};
