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
        //////{link: 'elementAdderUtility-examples/custom1.js'},
        // {link: 'elementAdderUtility-examples/custom2.js'},
        // {link: 'elementAdderUtility-examples/custom3.js'},
        { link: 'chart-usage/attendance-visualization-v3.js' },

        { link: 'elementAdderUtility-examples/custom0.1.js' },
        { link: 'elementAdderUtility-examples/custom4.js' },

        { link: 'use-case-to-learn-promise/use-case-01.js' },
        { link: 'use-case-to-learn-promise/use-case-02.js' },
        { link: 'use-case-to-learn-promise/use-case-03-batching-requests.js' },
        { link: 'use-case-to-learn-promise/use-case-04-sequential-processing.js' },

        { link: 'css-flex-learning/CSS-Flexbox-basics-01.js' },
        { link: 'css-flex-learning/CSS-Flexbox-basics-02.js' },
        { link: 'css-flex-learning/CSS-Flexbox-basics-03.js' },
        { link: 'css-flex-learning/CSS-Flexbox-basics-04.js' },

        { link: 'css-flex-learning/elements/button/buttons-style-0.1.js' },
        { link: 'css-flex-learning/elements/button/buttons-style-0.2.js' },
        { link: 'css-flex-learning/elements/button/buttons-style-0.3.js' },
        { link: 'css-flex-learning/elements/button/buttons-style-0.4.js' },
        { link: 'css-flex-learning/elements/button/button-attributes.js' },
        { link: 'css-flex-learning/elements/button/buttons-style-0.4.1.js' },
        { link: 'css-flex-learning/elements/button/buttons-style-0.4.2.js' },
        { link: 'css-flex-learning/elements/button/buttons-style-0.4.2.1.js' },

        { link: 'css-flex-learning/elements/select/select-style-0.1.js' },
        { link: 'css-flex-learning/elements/select/select-style-0.2.js' },
        { link: 'css-flex-learning/elements/select/select-style-0.3.js' },
        { link: 'css-flex-learning/elements/select/custom-dropdown-0.1.js' },

        { link: 'css-flex-learning/elements/input/input-style-0.1.js' },
        { link: 'css-flex-learning/elements/input/custom-dropdown-0.2.js' },

        { link: 'css-flex-learning/elements/label/label-style-0.1.js' },

        { link: 'css-flex-learning/elements/tooltip/tooltip-style-0.1.js' },

        { link: 'use-case-to-learn-promise/use-case-just-chain-promises.js' },
        { link: 'use-case-to-learn-promise/use-case-just-chain-promises-0.1.js' },
        { link: 'use-case-to-learn-promise/chaining-in-cleaner-way.js' },
        { link: 'use-case-to-learn-promise/chaining-in-cleaner-way-0.1.js' },

        { link: 'graphql-consume/gql-demo-0.1.js' },
        { link: 'graphql-consume/gql-demo-0.2.js' },

        { link: 'css-flex-learning/learning-0.1.js' },
        { link: 'css-flex-learning/learning-0.2.js' },

        { link: 'graphql-consume/gql-demo-0.3.js' },
        { link: 'graphql-consume/gql-demo-0.3.1.js' },
        {link: 'markdown-to-html/md-to-html-v1.0.js'}
    ];

    const SCRIPTS_OPTIONS = scriptNames.map((v) => ({
        value: !v.external || v.external !== true ? `/dist/custom/${v.link}` : v.link,
        label: v.link,
    }));

    return {
        SCRIPTS_OPTIONS,
    };
})();

export default globalConstants;
