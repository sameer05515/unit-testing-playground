// globalConstants.js
const globalConstants = (() => {
    const scriptNames = [
        { link: "non-existing-script.js", external: false },
        { link: "basic-promise-syntax1.js", external: false },
        { link: 'basic-promise-syntax4.js', external: false},
        // ... other script names
        { link: "fetch-api-learning/get-all-employees-v3-with-console-and-utility.js" },
        {link:'basic-promise-syntax4-v2.js', external:false},
        {link:'basic-promise-syntax4-v3.js', external:false},
        {link:'initialConsoleComponentCreatorUtility.test.js', external:false},
        {link:'d3-practice.js', external:false},
    ];

    const SCRIPTS_OPTIONS = scriptNames.map((v) => ({
        value: !v.external ? `../../dist/custom/${v.link}` : v.link,
        label: v.link,
    }));

    return {
        SCRIPTS_OPTIONS,
    };
})();

module.exports = globalConstants;