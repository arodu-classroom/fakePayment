const validCards = [
    {
        cardType: 'Visa',
        cardNumber: '4111111111111111',
    },
    {
        cardType: 'Mastercard',
        cardNumber: '5555555555554444',
    },
    {
        cardType: 'American Express',
        cardNumber: '378282246310005',
    },
    {
        cardType: 'Discover',
        cardNumber: '6011111111111117',
    },
    {
        cardType: 'JCB',
        cardNumber: '3530111333300000',
    },
    {
        cardType: 'Diners Club',
        cardNumber: '30569309025904',
    }
]

const getList = () => {
    return validCards;
}

const getCard = (cardNumber) => {
    return validCards.find(card => card.cardNumber === cardNumber) ?? null;
}

const cardExists = (cardNumber) => {
    return validCards.some(card => card.cardNumber === cardNumber);
}

module.exports = {
    getList,
    getCard,
    cardExists,
};