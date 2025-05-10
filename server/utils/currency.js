// В реальном приложении лучше брать курс из API или БД
const UAH_TO_USD = 0.027;

function uahToUsdCents(amountUAH) {
  return Math.round(amountUAH * UAH_TO_USD * 100);
}

module.exports = { uahToUsdCents };
