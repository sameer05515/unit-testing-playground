const normalizedDomains = [
    "Service Based",
    "Startup",
    "Product Based",
    "Telecom Software Domain",
    "Finance Domain",
    "MSME Domain",
    "Educational Software Domain",
    "Procurement Domain",
];

const transformed = normalizedDomains
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
            `[CompanyDomains.${key}]: {name:'${key.replaceAll("_", " ")}',about:''},`;
        //   acc = acc + "\n" + `[CompanyDomains.${key}]: [],`;
        return acc;
    }, str);
    return `{\n ${str} \n}`;
};

console.log(getTemplate());
