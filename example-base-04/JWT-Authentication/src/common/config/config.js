require("dotenv").config();

const purpose=`
Overall Target to achieve in next major release version v1.1.0
- aaa
- bbb    
    `;

module.exports = {
    PORT_1_0_0: process.env.PORT_1_0_0 || 3000,
    PORT_1_0_1: process.env.PORT_1_0_1 || 3001,
    ACCESS_TOKEN_SECRET:
        process.env.ACCESS_TOKEN_SECRET || "matru-ki-bijli-ka-hindola",
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "chutiyon-ki-toli",
    ACCESS_TOKEN_SECRET_V1:
        process.env.ACCESS_TOKEN_SECRET || "matru-ki-bijli-ka-hindola",
    REFRESH_TOKEN_SECRET_V1: process.env.REFRESH_TOKEN_SECRET || "chutiyon-ki-toli",
    OVERALL_TARGET_IN_NEXT_MAJOR_RELEASE:purpose
};
