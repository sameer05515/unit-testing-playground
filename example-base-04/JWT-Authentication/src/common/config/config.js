require("dotenv").config();

const OVERALL_TARGET_IN_NEXT_MAJOR_RELEASE_V_1_1_0 = `
        Overall Target to achieve in next major release version v1.1.0
        - Uniform response in case of success, failure, exception, validation exception
          - make use of below files to acheive this target
            - 'src/common/server-responses/StandardResponse.js' , and 
            - 'src/common/middlewares/routerResponseHandler.js' 
    `;

const version_arr = [
    {
        version: "1.0.0",
        purpose: `
        #########################
        ${OVERALL_TARGET_IN_NEXT_MAJOR_RELEASE_V_1_1_0}
        $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

        === SERVER VERSION: 1.0.0 =================

        This is initial version of server.       

        Things acheived in this version:
        1. a single file server, having 
            - one protected resource '/posts'
            - one public resource '/login'
        ##############################
        `,
    },
    {
        version: "1.0.1",
        purpose: `
        #########################
        ${OVERALL_TARGET_IN_NEXT_MAJOR_RELEASE_V_1_1_0}
        $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

        === SERVER VERSION: 1.0.1 =================

        ABOUT
          - Enhancement for version 1.0.0

        Target
            - [Completed]- Seggregated 'src/versions/1.0.0/server.v1.0.0.js' into meaningful files
            - [Planned]- review current code and fix 

        ##############################
        `,
    },
];

const getPurposeByVersion = (version) => {
    const purpose =
        version_arr.find((vObj) => vObj.version === version)?.purpose ||
        `
        #########################
        ${OVERALL_TARGET_IN_NEXT_MAJOR_RELEASE_V_1_1_0}
        $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

        === SERVER VERSION: unknown =================
        This server version '${version}' not known to configuraraion. 
        Please contact admin team to populate data for this version.

        ##############################
    `;

    return purpose;
};

module.exports = {
    PORT_1_0_0: process.env.PORT_1_0_0 || 3000,
    PORT_1_0_1: process.env.PORT_1_0_1 || 3001,
    ACCESS_TOKEN_SECRET:
        process.env.ACCESS_TOKEN_SECRET || "matru-ki-bijli-ka-hindola",
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "chutiyon-ki-toli",
    ACCESS_TOKEN_SECRET_V1:
        process.env.ACCESS_TOKEN_SECRET || "matru-ki-bijli-ka-hindola",
    REFRESH_TOKEN_SECRET_V1:
        process.env.REFRESH_TOKEN_SECRET || "chutiyon-ki-toli",
    OVERALL_TARGET_IN_NEXT_MAJOR_RELEASE:
        OVERALL_TARGET_IN_NEXT_MAJOR_RELEASE_V_1_1_0,
    getPurposeByVersion: getPurposeByVersion,
};
