import { createDiv } from "../../../modules/common/ElementCreatorUtil";
import { idUtility } from "../../../js/utils/global/globalHelperUtility";

// GraphQL Fetch Function
const fetchGraphQL = async (query, variables = {}) => {
    const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
    });

    const responseBody = await response.json();

    if (!response.ok || responseBody.errors) {
        const errorMessage = responseBody.errors
            ? responseBody.errors.map((error) => error.message).join(", ")
            : response.statusText;
        throw new Error(`GraphQL error: ${errorMessage}`);
    }

    return responseBody.data;
};

// Example usage
const query = `
    query GetResume($uniqueId: String!) {
        getResume(uniqueId: $uniqueId) {
            uniqueId
            introduction
            processedDetails {
                metadata
                textType
            }
            companies {
                name
                processedDetails {
                    metadata
                    textType
                }
                projects {
                    name
                    processedDetails {
                        metadata
                        textType
                    }
                    uniqueId
                }
                uniqueId
            }
            educations {
                uniqueId
                name
                processedDetails {
                    metadata
                    textType
                }
            }
        }
    }
`;

const variables = { uniqueId: "0f20819b-c89e-4bdc-8613-5a9a99445533" };

/// helper utility
const getNewId = () => idUtility.generateId({ length: 20, prefix: "" });

const wrapInStrongEl = (text) => `<strong>${text}</strong>`;
const wrapInItalicEl = (text) => `<i>${text}</i>`;

const createStyledAnchor=(href, text)=> {
    const anchor = document.createElement('a');
    anchor.href = href;
    anchor.innerText = text;
    
    // Applying styles using JSON format
    const styles = {
        'text-decoration': 'none',
        'color': 'black',
        'cursor': 'pointer'
    };

    for (let style in styles) {
        anchor.style[style] = styles[style];
    }

    return anchor;
}

// "General Info Div"
const getGeneralInfoDiv = (resumedata) => {
    const {
        personalDetails: {
            name: employeeName,
            contactNumbers: employeeContactNumbers,
            emails: employeeEmails,
        },
        lastDesignation,
        totalExperience,
    } = resumedata.getResume.processedDetails.metadata;

    const generalInfo = createDiv({ id: getNewId() }, "", {
        display: "flex",
        justifyContent: "space-between",
        //padding: '10px',
        border: "1px solid #ccc",
        marginTop: "10px",
        borderRadius: "8px",
        gap: "250px", // Add gap between divs
    });

    // Create the first child div with text "div1"
    const nameAndLastDesignationDivEl = createDiv(
        { id: getNewId() },
        "name and last designation",
        {
            flex: "1",
            padding: "10px",
            // border: '1px solid #ccc',
            borderRadius: "8px",
        }
    );

    nameAndLastDesignationDivEl.innerHTML = `
        <h2>${employeeName}</h2>
        <p>${lastDesignation.toUpperCase()}</p>        
    `;

    // Create the second child div with text "div2"
    const phoneEmailAndTotalExperienceDiv = createDiv(
        { id: getNewId() },
        "phone, email, total experience",
        {
            flex: "1",
            padding: "10px",
            // border: '1px solid #ccc',
            borderRadius: "8px",
        }
    );

    phoneEmailAndTotalExperienceDiv.innerHTML = `
    <p>${wrapInStrongEl("Phone:")} ${wrapInItalicEl(
        employeeContactNumbers
            .map((contact) => `<span>${contact}</span>`)
            .join(", ")
    )}</p>

    <p>${wrapInStrongEl("Email:")} ${wrapInItalicEl(
        employeeEmails.map((contact) => `<span>${contact}</span>`).join(", ")
    )}</p>

    <p>${wrapInStrongEl("Total Experience:")} ${wrapInItalicEl(
        totalExperience
    )}</p>
    `;

    // Append the child divs to the generalInfo div
    generalInfo.appendChild(nameAndLastDesignationDivEl);
    generalInfo.appendChild(phoneEmailAndTotalExperienceDiv);

    return generalInfo;
};




// =================== "Main Info Div" =====================

// const getKeySkillsDiv=(employeeKeySkills)=>{
//     const employeeKeySkillsDiv= createDiv({id: getNewId()}, '', {}, {});

//     const innerDiv= createDiv({id: getNewId()});
//     innerDiv.style.cssText=`
//     .bulleted-list {
//         list-style-type: disc;
//         padding-left: 20px; /* Adjust based on your bullet position preference */
//     }

//     .bulleted-list > div {
//         position: relative;
//         margin-left: 20px; /* Adjust based on your bullet position preference */
//     }

//     .bulleted-list > div::before {
//         content: "•"; /* Bullet character */
//         position: absolute;
//         left: -20px; /* Adjust based on your bullet position preference */
//     }
//     `

//     employeeKeySkillsDiv.innerHTML=`
//     ${wrapInStrongEl('Key skills')}    
//     `;
    
//     innerDiv.innerHTML=`
//     <div class="bulleted-list">
//         ${employeeKeySkills.map(
//             ({stream, duration}) => `<div>${wrapInStrongEl(stream)} for ${duration}</div>`
//         ).join('')}
//     </div>
//     `

//     employeeKeySkillsDiv.appendChild(innerDiv);

//     return employeeKeySkillsDiv;
// }

const getKeySkillsDiv = (employeeKeySkills) => {
    const employeeKeySkillsDiv = createDiv({ id: getNewId() }, '', {}, {});

    const innerDiv = createDiv({ id: getNewId() });

    // Inline CSS should only include style rules, not CSS selectors
    innerDiv.style.cssText = `
        list-style-type: disc;
        padding-left: 20px; /* Adjust based on your bullet position preference */
    `;   

    employeeKeySkillsDiv.innerHTML = `
    ${wrapInStrongEl('Key skills')}
    `;

    innerDiv.innerHTML = `
    <div class="bulleted-list">
        ${employeeKeySkills.map(
            ({ stream, duration }) => `<div>${wrapInStrongEl(stream)} for ${duration}</div>`
        ).join('')}
    </div>
    `;

    employeeKeySkillsDiv.appendChild(innerDiv);

    return employeeKeySkillsDiv;
};

const getCertificationsDiv= (employeeCertifications)=>{
    const employeeCertificationsDiv = createDiv({ id: getNewId() }, '', {marginTop:'10px'}, {});

    const innerDiv = createDiv({ id: getNewId() });
    // Inline CSS should only include style rules, not CSS selectors
    innerDiv.style.cssText = `
        list-style-type: disc;
        padding-left: 20px; /* Adjust based on your bullet position preference */
    `;

    employeeCertificationsDiv.innerHTML = `
    ${wrapInStrongEl('Certifications:')}
    `;

    innerDiv.innerHTML = `
    <div class="bulleted-list">
        ${employeeCertifications.map(
            ({ name, provider, url }) => 
            `<div>
                <a style="text-decoration: none; color: black; cursor: pointer;" href="${url}">
                    ${wrapInStrongEl(name)} by ${wrapInItalicEl(provider)}
                </a>            
            </div>`
        ).join('')}
    </div>
    `;

    employeeCertificationsDiv.appendChild(innerDiv);
    return employeeCertificationsDiv;
}

const getLanguagesDiv= (employeeLanguages)=>{
    const employeeLanguagesDiv = createDiv({ id: getNewId() }, '', {marginTop:'10px'}, {});

    const innerDiv = createDiv({ id: getNewId() });
    // Inline CSS should only include style rules, not CSS selectors
    innerDiv.style.cssText = `
        list-style-type: disc;
        padding-left: 20px; /* Adjust based on your bullet position preference */
    `;
    employeeLanguagesDiv.innerHTML = `
    ${wrapInStrongEl('Languages:')}
    `;

    innerDiv.innerHTML = `
    <div class="bulleted-list">
        ${employeeLanguages.map(
            (language) => 
            `<div>
                ${language}                            
            </div>`
        ).join('')}
    </div>
    `;

    employeeLanguagesDiv.appendChild(innerDiv);

    return employeeLanguagesDiv;
};

const getHobbiesDiv=(employeeHobbies)=>{
    const employeeHobbiesDiv = createDiv({ id: getNewId() }, '', {marginTop:'10px'}, {});

    const innerDiv = createDiv({ id: getNewId() });
    // Inline CSS should only include style rules, not CSS selectors
    innerDiv.style.cssText = `
        list-style-type: disc;
        padding-left: 20px; /* Adjust based on your bullet position preference */
    `;
    employeeHobbiesDiv.innerHTML = `
    ${wrapInStrongEl('Hobbies:')}
    `;

    innerDiv.innerHTML = `
    <div class="bulleted-list">
        ${employeeHobbies.map(
            (hobby) => 
            `<div>
                ${hobby}                            
            </div>`
        ).join('')}
    </div>
    `;

    employeeHobbiesDiv.appendChild(innerDiv);

    return employeeHobbiesDiv;
}


const getMainInfoDiv = (resumedata) => {
    const {        
        expertises: employeeKeySkills,
        certifications: employeeCertifications,
        languagesKnown: employeeLanguages,
        hobbies: employeeHobbies,
    } = resumedata.getResume.processedDetails.metadata;

    const mainInfoDiv = createDiv({ id: getNewId() }, "", {
        display: "flex",
        justifyContent: "space-between",
        //padding: '10px',
        border: "1px solid #ccc",
        marginTop: "10px",
        borderRadius: "8px",
        gap: "50px", // Add gap between divs
    });

    // Create the first child div with text "div1"
    const keySkillsCertificationsLanguagesAndHobbiesDivEl = createDiv(
        { id: getNewId() },
        "Key Skills, Certifications, Languages and Hobbies, vertically",
        {
            flex: "1",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
        }
    );

    keySkillsCertificationsLanguagesAndHobbiesDivEl.appendChild(getKeySkillsDiv(employeeKeySkills));
    keySkillsCertificationsLanguagesAndHobbiesDivEl.appendChild(getCertificationsDiv(employeeCertifications));
    keySkillsCertificationsLanguagesAndHobbiesDivEl.appendChild(getLanguagesDiv(employeeLanguages));
    keySkillsCertificationsLanguagesAndHobbiesDivEl.appendChild(getHobbiesDiv(employeeHobbies));


    // Create the second child div with text "div2"
    const profileSummayWorkExperienceEducationAndProjectsDivEl = createDiv(
        { id: getNewId() },
        "Profile Summay, Work Experience, Education, Projects",
        {
            flex: "3",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
        }
    );

    // Append the child divs to the generalInfo div
    mainInfoDiv.appendChild(keySkillsCertificationsLanguagesAndHobbiesDivEl);
    mainInfoDiv.appendChild(profileSummayWorkExperienceEducationAndProjectsDivEl);

    return mainInfoDiv;
};

// - create main container div
// - create 2 divs, horizontally. one conaintaining name and last designation. other conataining phone, email, total experience.
// - create 2 divs horizontally.
// -- 1st div contains divs for Key Skills, Certifications, Languages and Hobbies, vertically
// -- 2nd div contains divs for Profile Summay, Work Experience, Education, Projects
const renderResume = (resumeData) => {
    // Adding styles via a class instead of inline styles
    const style = document.createElement('style');
    style.textContent = `
        .bulleted-list {
            list-style-type: disc;
            padding-left: 20px; /* Adjust based on your bullet position preference */
        }

        .bulleted-list > div {
            position: relative;
            padding-top: 10px;
            margin-left: 10px; /* Adjust based on your bullet position preference */
        }

        .bulleted-list > div::before {
            content: "•"; /* Bullet character */
            position: absolute;
            left: -10px; /* Adjust based on your bullet position preference */
        }
    `;
    document.head.appendChild(style);
    const container = createDiv({ id: getNewId() }, "Container Div", {
        border: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        margin: "10px",
        borderRadius: "8px",
    });

    container.appendChild(
        // getGeneralInfoDiv(resumeData.getResume.processedDetails.metadata);
        getGeneralInfoDiv(resumeData)
    );
    container.appendChild(getMainInfoDiv(resumeData));
    document.body.appendChild(container);
};

// Fetch Data Function
const fetchData = async () => {
    try {
        const data = await fetchGraphQL(query, variables);
        console.log("GraphQL data:", data);
        // preEl.innerHTML = JSON.stringify(data, null, 2);
        // preEl.style.display = 'none';
        // togglePreBtn.innerText = 'Show';
        renderResume(data);
    } catch (error) {
        console.error("GraphQL error:", error);
    }
};

fetchData();
