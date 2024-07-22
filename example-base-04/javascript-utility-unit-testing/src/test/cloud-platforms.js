const DeploymentEnvironments = [
    "On Premise Platform",
    "AWS Amazon Web Services",
    "Microsoft Azure Cloud Enviroment",
    "GCP Google Cloud Platform",
    "IBM Cloud",
    "OCI Oracle Cloud Infrastructure",
    "Alibaba Cloud",
    "Heroku Salesforce Cloud",
    "DigitalOcean",
    "Linode Akamai",
    "VMware Cloud",
    "Tencent Cloud",
    "Rackspace",
    "OpenStack Private Cloud Platform",
    "SAP Cloud Platform",
    "Huawei Cloud",
    "Nutanix Xi Cloud Services",
    "Cloudflare Workers",
    "Red Hat OpenShift",
    "Vultr",
    "IBM Bluemix"
];

const getTemplate = (rawStrArr=[], title='TemplateTypes', accumulatorFn=(acc, key)=> acc+key) => {
    const transformed = rawStrArr
        .map((nd) => nd.replaceAll(" ", "_"))
        .reduce((acc, val) => {
            acc[val] = val.toLowerCase();
            return acc;
        }, {});
    let str = "";
    str = Object.keys(transformed).reduce((acc, key) => {
        acc =
            acc +
            "\n" +
            `[${title}.${key}]: {name:'${key.replaceAll("_", " ")}',about:'',},`;
        //   acc = acc + "\n" + `[CompanyDomains.${key}]: [],`;
        return acc;
    }, str);
    const template= `{\n ${str} \n}`;
    return {transformed, template};
};

const {transformed, template} = getTemplate(DeploymentEnvironments, "DeploymentEnvironments");
console.log(transformed,"\n", template);