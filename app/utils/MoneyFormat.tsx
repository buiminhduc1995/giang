function MoneyFormat(money: number | string) {
  if (money !== 0 && !money) {
    return 'Chưa có giá';
  } else if (typeof money === 'number') {
    return money
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
      .concat(' ₫');
  } else if (typeof money === 'string') {
    return money.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.').concat(' ₫');
  }
}
export default MoneyFormat;
