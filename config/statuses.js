const statuses = [
    {
        name: 'approved',
        description: 'Successful purchase',
        error: false,
    },
    {
        name: 'insufficient_funds',
        description: 'Insufficient funds',
        error: true,
    },
    {
        name: 'invalid_card_number',
        description: 'Invalid card number',
        error: true,
    },
];

const getList = () => {
    return statuses;
}

const getStatus = (statusName) => {
    return statuses[statusName] ?? null;
}

const statusExists = (statusName) => {
    return statuses.some(status => status.name === statusName);
}

module.exports = {
    getList,
    getStatus,
    statusExists,
};