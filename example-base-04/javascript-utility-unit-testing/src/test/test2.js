const domains = [
    {
        name: "GreenApple WebWare, New Delhi, India",
        domainOfCompany: ["Service Oriented Company", "Start-up company"],
    },
    {
        name: "HCL Infosystems Ltd, Noida, India",
        domainOfCompany: ["Service-based"],
    },
    {
        name: "Novelvox Software India Pvt Ltd (previously known as Integration Services & Technologies India PVT LTD), Faridabad, India",
        domainOfCompany: [
            "Product-based",
            "Telecom Software Domain",
            // "Company was developing software solutions With Cisco API",
        ],
    },
    {
        name: "Concentrix Daksh Services India Private Limited, Gurgaon, India",
        domainOfCompany: ["Product-based", "Telecom Software Domain"],
    },
    {
        name: "Accenture, Mumbai, India",
        domainOfCompany: ["Service-based company"],
    },
    {
        name: "Dhani stocks Limited, (formerly Indiabulls security Ltd , Indiabulls ventures ltd), Gurgaon, India",
        domainOfCompany: [
            "Product based company",
            "Finance domain company",
            // "Main application is for Share market trading",
            // "Several helper projects for the main application",
        ],
    },
    {
        name: "Mynd Integrated Solutions Ltd, Gurgaon, India",
        domainOfCompany: ["Product based company", "MSME related company"],
    },
    {
        name: "RSystems International Pvt Ltd, Noida, India",
        domainOfCompany: ["Service domain"],
    },
    {
        name: "EVC Ventures, Gurgaon, India",
        domainOfCompany: ["Product-based", "Educational Software Domain"],
    },
    {
        name: "Zycus Infotech Pvt. Ltd., Bangalore, India",
        domainOfCompany: ["Product-based", "Procurement domain"],
    },
];

const seggregatedDomains = domains.reduce((acc, { domainOfCompany }) => {
    acc.push(...domainOfCompany);
    return acc;
}, []);

console.log(seggregatedDomains);

const uniqueDomains = [...new Set(seggregatedDomains)];

console.log(uniqueDomains);

const normalizedDomains = [
    ...new Set(
        uniqueDomains.map((domain) => {
            if (/service/i.test(domain)) return "Service-Based Company";
            if (/start.*up/i.test(domain)) return "Startup Company";
            if (/product/i.test(domain)) return "Product-Based Company";
            if (/telecom/i.test(domain)) return "Telecom Software Domain";
            if (/finance/i.test(domain)) return "Finance Domain";
            if (/msme/i.test(domain)) return "MSME Domain";
            if (/educational/i.test(domain)) return "Educational Software Domain";
            if (/procurement/i.test(domain)) return "Procurement Domain";
            return domain; // Default for unmatched items
        })
    ),
];

console.log(normalizedDomains);