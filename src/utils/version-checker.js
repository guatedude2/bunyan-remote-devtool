export default (current, min, max) => {
  const reduce = (result, val, index) => (
    result + (val * Math.pow(1000, 2 - index))
  );

  const currentVal = current.split('.', 3).reduce(reduce, 0);
  const minVal = min.split('.', 3).reduce(reduce, 0);
  const maxVal = max.split('.', 3).reduce(reduce, 0);
  return !isNaN(currentVal) && currentVal >= minVal && currentVal <= maxVal;
};