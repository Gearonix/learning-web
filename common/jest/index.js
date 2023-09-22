const axios = require("axios");
const func = (a, b) => {
    return a + b;
};
const toBeNull = () => {
    return null;
};
const generateArr = () => {
    return [1, 2, 3, 4];
};
const makeRequest = () => {
    return axios.get('http://localhost:6868/cookie/auth')
};


module.exports = {
    func,
    toBeNull,
    generateArr,
    makeRequest
};
