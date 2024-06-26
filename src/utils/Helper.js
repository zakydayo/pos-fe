export default class Helper {
  static convertToURL(text) {
    const converted = text.toLowerCase().replace(/ /g, '-');
    if (converted === 'pesanan') return '/';
    return `/${converted}`;
  };

  static calculateTotalPrice(qty = 1, price = 0) {
    return qty * price;
  };

  static formatMoney(amount, decimalCount = 0, decimal = ',', thousands = '.') {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 0 : decimalCount;

      const negativeSign = amount < 0 ? '-' : '';

      let i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString();

      let j = i.length > 3 ? i.length % 3 : 0;

      return (
        negativeSign +
        (j ? i.substr(0, j) + thousands : '') +
        i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
        (decimalCount
          ? decimal +
            Math.abs(amount - i)
              .toFixed(decimalCount)
              .slice(2)
          : '')
      );
    } catch (e) {
      console.log(e);
    }
  };
};