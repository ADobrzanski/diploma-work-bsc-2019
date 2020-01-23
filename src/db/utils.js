// copied from Ramda.js
const pick = names => obj => {
  const result = {};
  let idx = 0;
  while (idx < names.length) {
    if (names[idx] in obj) {
      result[names[idx]] = obj[names[idx]];
    }
    idx += 1;
  }
  return result;
};

const reject = (condition, obj) => {
  const result = {}
  Object.keys(obj)
    .filter(key => !condition(key, obj[key]))
    .forEach(key => result[key] = obj[key])
  return result;
}

module.exports = {
  pick,
  reject,
}