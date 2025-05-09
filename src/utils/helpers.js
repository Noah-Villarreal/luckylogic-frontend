export const formatDate = (iso) => {
  return new Date(iso).toLocaleDateString('en-US');
};

export const generateUniqueNumbers = (max, count) => {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(numbers).sort((a, b) => a - b);
};
