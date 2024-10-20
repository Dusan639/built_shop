export const convertPrice = (priceInUSD) => {
    const conversionRate = 110;
    return priceInUSD * conversionRate;
};
