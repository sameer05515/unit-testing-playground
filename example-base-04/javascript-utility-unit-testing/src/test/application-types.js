const applnTypes = [
    "Desktop Application",
    "Web Application",
    "Mobile Application",
    "ETL Tool",
    "Reporting Tool",
];

const transformed = applnTypes
    .map((nd) => nd.replaceAll(" ", "_"))
    .reduce((acc, val) => {
        acc[val] = val.toLowerCase();
        return acc;
    }, {});

console.log(transformed);

const getTemplate = () => {
    let str = "";
    str = Object.keys(transformed).reduce((acc, key) => {
        acc =
            acc +
            "\n" +
            `[ApplicationTypes.${key}]: {name:'${key.replaceAll("_", " ")}',about:'',},`;
        //   acc = acc + "\n" + `[CompanyDomains.${key}]: [],`;
        return acc;
    }, str);
    return `{\n ${str} \n}`;
};

console.log(getTemplate());