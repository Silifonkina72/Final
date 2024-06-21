export const Cost = ({ item }): JSX.Element => {
  const result = [];

  for (let i = 0; i < item.length; i += 2) {
    if (i + 1 < item.length) {
      const sum = item[i].value + item[i + 1].value;
      result.push(sum);
    } else {
      console.log('лишний элемент');
    }
  }
};
