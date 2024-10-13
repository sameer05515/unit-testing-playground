require("dotenv").config();

const OVERALL_TARGET_IN_NEXT_MAJOR_RELEASE_V_1_1_0 = `
    Overall Target to achieve in next major release (v1.1.0):
    - Uniform response structure for success, failure, exceptions, and validation errors.
    - Utilize the following files to achieve this target:
        - 'src/common/server-responses/StandardResponse.js'
        - 'src/common/middlewares/routerResponseHandler.js'
`;

const OVERALL_TARGET_NEXT_MAJOR_RELEASE =
    OVERALL_TARGET_IN_NEXT_MAJOR_RELEASE_V_1_1_0;

const versionDetails = [
    {
        version: "1.0.0",
        purpose: `
    #########################
    ${OVERALL_TARGET_NEXT_MAJOR_RELEASE}
    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

    === SERVER VERSION: 1.0.0 =================

    This is the initial version of the server.

    Achievements in this version:
    1. Single-file server setup with:
        - One protected resource ('/posts')
        - One public resource ('/login')

    ##############################
        `,
    },
    {
        version: "1.0.1",
        purpose: `
    #########################
    ${OVERALL_TARGET_NEXT_MAJOR_RELEASE}
    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

    === SERVER VERSION: 1.0.1 =================

    ABOUT
        - Enhancement of version 1.0.0

    Target:
        - [Completed] Segregated 'src/versions/1.0.0/server.v1.0.0.js' into meaningful files.
        - [Planned] Code review and fix current issues in next version 1.0.2.

    ##############################
        `,
    },
    {
        version: "1.0.2",
        purpose: `
    #########################
    ${OVERALL_TARGET_NEXT_MAJOR_RELEASE}
    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

    === SERVER VERSION: 1.0.2 =================

    ABOUT
        - Enhancement of version 1.0.1

    Target:      
        - [Planned]: [Konwledge-Gain] : 
          - How to save a value, in a *.rest file, so that it could be re-used in multiple places
            - for example, token response coming from server   
          - Also it would be nice if we can send multiple requests, synchronously     
        
        - [Planned]: [Issues] Code review and fix current issues in this version 1.0.2. 
            - [Planned] - send error response for invalid user-name

    ##############################
        `,
    },
];

/**
 * Retrieves the purpose and details for a specific server version.
 * @param {string} version - The server version to look up.
 * @returns {string} - The purpose statement for the specified version, or a default message for unknown versions.
 */
const getPurposeByVersion = (version) => {
    const versionInfo = versionDetails.find((vObj) => vObj.version === version);

    return (
        versionInfo?.purpose ||
        `
        #########################
        ${OVERALL_TARGET_NEXT_MAJOR_RELEASE}
        $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

        === SERVER VERSION: unknown =================

        The server version '${version}' is not known to the configuration. 
        Please contact the admin team to populate data for this version.

        ##############################
    `
    );
};

module.exports = {
    PORT_1_0_0: process.env.PORT_1_0_0 || 3000,
    PORT_1_0_1: process.env.PORT_1_0_1 || 3001,
    PORT_1_0_2: process.env.PORT_1_0_2 || 3067,
    ACCESS_TOKEN_SECRET:
        process.env.ACCESS_TOKEN_SECRET || "matru-ki-bijli-ka-hindola",
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "chutiyon-ki-toli",
    ACCESS_TOKEN_SECRET_V1:
        process.env.ACCESS_TOKEN_SECRET || "matru-ki-bijli-ka-hindola",
    REFRESH_TOKEN_SECRET_V1:
        process.env.REFRESH_TOKEN_SECRET || "chutiyon-ki-toli",
    OVERALL_TARGET_IN_NEXT_MAJOR_RELEASE: OVERALL_TARGET_NEXT_MAJOR_RELEASE,
    getPurposeByVersion: getPurposeByVersion,
};
