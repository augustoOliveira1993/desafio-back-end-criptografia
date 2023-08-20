const { v4: uuidv4 } = require('uuid');

const generatorUUID = () => {
    return uuidv4();
};

module.exports = {
    generatorUUID
};
