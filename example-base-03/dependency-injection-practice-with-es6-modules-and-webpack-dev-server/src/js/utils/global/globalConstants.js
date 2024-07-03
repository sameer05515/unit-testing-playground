const globalConstants = (() => {
    const scriptNames = [
        { link: "non-existing-script.js", external: false },
        // { link: "basic-promise-syntax1.js", external: false },
        // { link: "basic-promise-syntax2.js", external: false },
        // { link: "basic-promise-syntax3.js", external: false },
        // { link: "basic-promise-syntax4.js", external: false },
        // { link: "image-reload-script.js", external: false },
        // { link: "add-and-remove-elements-on-click.js", external: false },
        // { link: "add-and-remove-scripts-on-click.js", external: false },
        // { link: "utility-functions-consumer.js", external: false },
        // { link: "add-and-remove-elements-on-click-with-utility.js", external: false },
        // { link: "reuse-promise-for-set-of-given-values-with-promise-allSettled-1.js", external: false },
        // { link: "reuse-promise-for-set-of-given-values-with-promise-allSettled-2.js", external: false },
        // { link: "reuse-promise-for-set-of-given-values-with-runSequentially-with-async-await.js", external: false },
        // { link: "reuse-promise-for-set-of-given-values-with-runSequentially-promiseChain.js", external: false },
        // { link: "promiseChain-example-1.js", external: false },
        // { link: "spans-with-inline-styles-to-show-error-warning-info-and-success-messages-1.js", external: false },
        // { link: "spans-with-inline-styles-to-show-error-warning-info-and-success-messages-2.js", external: false },
        // { link: "spans-with-inline-styles-to-show-error-warning-info-and-success-messages-3.js", external: false },
        // { link: "spans-with-inline-styles-to-show-error-warning-info-and-success-messages-4.js", external: false },
        // { link: "create-a-div-for-given-xml-string.js" },
        // { link: "convert-a-given-xml-string-into-a-json-object.js" },
        // { link: "promise-dot-all-use-case.js" },
        // { link: "promiseChain-example-2.js" },
        // { link: "object-to-a-new-array.js" },
        {link: 'elementAdderUtility-examples/custom1.js'},
        {link: 'elementAdderUtility-examples/custom2.js'},
        {link: 'elementAdderUtility-examples/custom3.js'},
        {link: 'elementAdderUtility-examples/custom4.js'},
        {link: 'chart-usage/attendance-visualization-v3.js'},
        {link: 'elementAdderUtility-examples/custom0.1.js'},
    ];

    const SCRIPTS_OPTIONS = scriptNames.map((v) => ({
        value: !v.external || v.external !== true ? `js/custom/${v.link}` : v.link,
        label: v.link,
    }));

    return {
        SCRIPTS_OPTIONS,
    };
})();

export default globalConstants;
