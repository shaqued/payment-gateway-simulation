const dict = {};

export const log = (identifier, reason) => {
  if (!dict[identifier]) {
    dict[identifier] = {};
  }
  dict[identifier][reason] = ++dict[identifier][reason] || 1;
};

export const get = identifier => dict[identifier] || {};