const currencies = [
    'USD',
    'EUR',
    'VES',
];

const getList = () => {
    return currencies;
}

const currencyExists = (currency) => {
    return currencies.some(c => c === currency);
}

module.exports = {
    getList,
    currencyExists,
};