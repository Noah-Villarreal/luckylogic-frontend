export default function smartLogic(numbers, powerball) {
  const tags = [];

  if (!Array.isArray(numbers)) return [];

  const sum = numbers.reduce((a, b) => a + b, 0);

  if (sum < 100) tags.push('⚡ Low Total');
  if (sum > 150) tags.push('💥 High Total');
  if (new Set(numbers).size !== numbers.length) tags.push('♻️ Repeat Detected');
  if (numbers.every(n => n % 2 === 0)) tags.push('🧊 All Even');
  if (numbers.every(n => n % 2 !== 0)) tags.push('🔥 All Odd');
  if (powerball === 1 || powerball === 26) tags.push('🎯 Edge Powerball');
  if (numbers.includes(7)) tags.push('🍀 Lucky 7');
  if (numbers.includes(13)) tags.push('😈 Bold 13');
  if (Math.max(...numbers) - Math.min(...numbers) < 20) tags.push('📏 Tight Range');
  if (numbers[0] < 10 && numbers[4] > 60) tags.push('🎲 Spread Pick');

  return tags;
}
