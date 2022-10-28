/**
 * Validate email if it is of acceptable format
 * @param email
 * @returns {boolean}
 */
export const isEmailValid = email => {
    const regex =
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(email);
};

/**
 * Validate the value if it only contains words, periods and underscore
 * @param value
 * @returns {boolean}
 */
export const onlyPeriodsUnderscore = value => {
    const regex = /^[a-zA-Z._]+$/;
    return regex.test(value);
};
