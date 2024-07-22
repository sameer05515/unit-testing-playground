const data = {
    OSCART: "oscart",
    CIPRUS: "ciprus",
    iAgent_4_0: "iagent-4.0",
    Survey: "survey",
    KnowledgeBase: "knowledge-base",
    QAA: "qaa",
    Webdots: "webdots",
    Econvey: "econvey",
    Zetta: "zetta",
    ResolveJiffy: "resolve-jiffy",
    UnI: "uni",
    Gain_Manager: "gain-manager",
    GIP: "gip",
    ZVR4: "zvr4",
    ShubhWeb: "shubhweb",
    Notis_API: "notis api",
    Jasper_Reports: "jasper-reports",
    KRA: "kra",
    SFTP: "sftp",
    TReDS: "treds",
    Ephesoft_Transact: "ephesoft-transact",
    IITD_Admin: "iitd-admin",
    ESG_Lythouse: "esg-lythouse",
};

//   const output=Object.keys(data).map(d=>({
//     [`[Projects.${d}]`]:{
//         name:'',
//         company:''
//       }
//   }));

//   console.log(JSON.stringify(output, null, 2));
// console.log(output);

// Generate the Record<string, ProjectBasicDetails>
const ProjectBasicDetailsMap = Object.keys(data).reduce(
    (acc, key) => {
        acc[`[Projects.${key}]`] = {
            name: "",
            company: "",
        };
        return acc;
    },
    {}
);

console.clear();
console.log(ProjectBasicDetailsMap);