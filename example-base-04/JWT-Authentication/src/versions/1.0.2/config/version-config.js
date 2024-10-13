const {
    ACCESS_TOKEN_SECRET_V1: ACCESS_TOKEN_SECRET,
    PORT_1_0_2: PORT,
    getPurposeByVersion
} = require("../../../common/config/config");

const SERVER_VERSION = "1.0.2";
const purpose=getPurposeByVersion(SERVER_VERSION);

module.exports = {
    ACCESS_TOKEN_SECRET,
    PORT,
    SERVER_VERSION,
    purpose
};
