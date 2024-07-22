const architecturalStyles=[
    'Layered Architecture', 
    'Client Server Architecture',
    'Microservices Architecture',
    'Event Driven Architecture',
    'SOA Service Oriented Architecture',
    'Monolithic Architecture',
    'Event Sourcing Architecture',
    'Serverless Architecture',
    'Component Based Architecture',
    'Peer To Peer Architecture',
    'Hexagonal Architecture',
    'CQRS Command Query Responsibility Segregation',
    'Pipe and Filter Architecture',
    'Distributed Architecture'
]

const transformed = architecturalStyles
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
            `[ArchitecturalStyles.${key}]: {name:'${key.replaceAll("_", " ")}',about:'', useCases:[], examples:[]},`;
        //   acc = acc + "\n" + `[CompanyDomains.${key}]: [],`;
        return acc;
    }, str);
    return `{\n ${str} \n}`;
};

console.log(getTemplate());