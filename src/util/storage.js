export const storage = localStorage;

export const getItem = (key, defaultValue) => {
  const value = storage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
};

export const setItem = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
};

export const removeItem = key => {
  storage.removeItem(key);
};
