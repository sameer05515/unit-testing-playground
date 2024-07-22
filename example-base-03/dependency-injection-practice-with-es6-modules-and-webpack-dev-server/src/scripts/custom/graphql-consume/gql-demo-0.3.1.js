import { createDiv } from "../../../modules/common/ElementCreatorUtil";
import { idUtility } from "../../../js/utils/global/globalHelperUtility";

// GraphQL Fetch Function
const fetchGraphQL = async (query, variables = {}) => {
    try {
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
    } catch (error) {
        console.error("GraphQL error:", error);
        throw error;
    }
};

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

// Helper utility
const getNewId = () => idUtility.generateId({ length: 20, prefix: "" });

const wrapInStrongEl = (text) => `<strong>${text}</strong>`;
const wrapInItalicEl = (text) => `<i>${text}</i>`;
const wrapInStrongAndSetFontSizeEl = (text, fontSize=20) => `<strong style="font-size: ${fontSize}px;">${text}</strong>`;


const createStyledAnchor = (href, text) => {
    const anchor = document.createElement('a');
    anchor.href = href;
    anchor.innerText = text;

    const styles = {
        textDecoration: 'none',
        color: 'black',
        cursor: 'pointer',
    };

    Object.assign(anchor.style, styles);

    return anchor;
}

const createBulletedDiv = (title, items) => {
    const div = createDiv({ id: getNewId() }, '', { marginTop: '10px' });
    const innerDiv = createDiv({ id: getNewId() });

    innerDiv.style.cssText = `
        list-style-type: disc;
        padding-left: 20px;
    `;

    div.innerHTML = wrapInStrongEl(title);
    innerDiv.innerHTML = items.map(item => `<div>${item}</div>`).join('');
    div.appendChild(innerDiv);

    return div;
};

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
        marginTop: "10px",
        borderRadius: "8px",
        gap: "250px",
    });

    const nameAndLastDesignationDivEl = createDiv(
        { id: getNewId() },
        "name and last designation",
        {
            flex: "1",
            padding: "10px",
            borderRadius: "8px",
        }
    );

    nameAndLastDesignationDivEl.innerHTML = `
        <h2>${employeeName}</h2>
        <p>${lastDesignation.toUpperCase()}</p>        
    `;

    const phoneEmailAndTotalExperienceDiv = createDiv(
        { id: getNewId() },
        "phone, email, total experience",
        {
            flex: "1",
            padding: "10px",
            borderRadius: "8px",
        }
    );

    phoneEmailAndTotalExperienceDiv.innerHTML = `
    <p>${wrapInStrongEl("Phone:")} ${wrapInItalicEl(
        employeeContactNumbers.map(contact => `<span>${contact}</span>`).join(", ")
    )}</p>

    <p>${wrapInStrongEl("Email:")} ${wrapInItalicEl(
        employeeEmails.map(contact => `<span>${contact}</span>`).join(", ")
    )}</p>

    <p>${wrapInStrongEl("Total Experience:")} ${wrapInItalicEl(totalExperience)}</p>

    <p>${wrapInStrongEl("Location:")} Faridabad, INDIA</p>
    `;

    generalInfo.appendChild(nameAndLastDesignationDivEl);
    generalInfo.appendChild(phoneEmailAndTotalExperienceDiv);

    return generalInfo;
};

const getKeySkillsDiv = (employeeKeySkills) => {
    const outerDiv = createDiv({ id: getNewId() });
    outerDiv.innerHTML = `
    <div>${wrapInStrongEl('Key skills:')} 
        <ul style="margin: 0; padding-left: 20px;">
            ${employeeKeySkills?.map(
        ({ stream, duration }) =>
            `<li>${wrapInStrongEl(stream)} for ${duration}</li>`)
            .join('')
        }
        </ul>
    </div>
    `;
    return outerDiv;
    // const items = employeeKeySkills.map(
    //     ({ stream, duration }) => `${wrapInStrongEl(stream)} for ${duration}`
    // );

    // return createBulletedDiv('Key skills', items);
};

const getCertificationsDiv = (employeeCertifications) => {
    const outerDiv = createDiv({ id: getNewId() }, '', {paddingTop:'10px'});
    outerDiv.innerHTML = `
    <div>${wrapInStrongEl('Certifications:')} 
        <ul style="margin: 0; padding-left: 20px;">
            ${employeeCertifications?.map(({ name, provider, url }) =>
            `<li>
                <a style="text-decoration: none; color: black; cursor: pointer;" href="${url}">
                    ${wrapInStrongEl(name)} by ${wrapInItalicEl(provider)}
                </a>
            </li>`)
            .join('')
        }
        </ul>
    </div>
    `;
    return outerDiv;
    // const items = employeeCertifications.map(
    //     ({ name, provider, url }) =>
    //         `<a style="text-decoration: none; color: black; cursor: pointer;" href="${url}">
    //             ${wrapInStrongEl(name)} by ${wrapInItalicEl(provider)}
    //         </a>`
    // );

    // return createBulletedDiv('Certifications:', items);
};

const getLanguagesDiv = (employeeLanguages) => {

    const outerDiv = createDiv({ id: getNewId() }, '', {paddingTop:'10px'});
    outerDiv.innerHTML = `
    <div>${wrapInStrongEl('Languages:')} 
        <ul style="margin: 0; padding-left: 20px;">
            ${employeeLanguages?.map((language) =>
            `<li>
                ${language}
            </li>`)
            .join('')
        }
        </ul>
    </div>
    `;
    return outerDiv;
    // const items = employeeLanguages.map(
    //     (language) => `${language}`
    // );

    // return createBulletedDiv('Languages:', items);
};

const getHobbiesDiv = (employeeHobbies) => {
    const outerDiv = createDiv({ id: getNewId() }, '', {paddingTop:'10px'});
    outerDiv.innerHTML = `
    <div>${wrapInStrongEl('Hobbies:')} 
        <ul style="margin: 0; padding-left: 20px;">
            ${employeeHobbies?.map((hobby) =>
            `<li>
                ${hobby}
            </li>`)
            .join('')
        }
        </ul>
    </div>
    `;
    return outerDiv;

    // const items = employeeHobbies.map(
    //     (hobby) => `${hobby}`
    // );

    // return createBulletedDiv('Hobbies:', items);
};

const getProfileSummaryDiv = (employeeProfileSummary) => {
    const outerDiv = createDiv({ id: getNewId() }, '', {paddingTop:'10px'});
    outerDiv.innerHTML = `
    <div>${wrapInStrongAndSetFontSizeEl('Profile Summary:')} 
        <ul style="margin: 0; padding-left: 20px;">
            ${employeeProfileSummary?.map((summaryPoint) =>
            `<li>
                ${summaryPoint}
            </li>`)
            .join('')
        }
        </ul>
    </div>
    `;
    return outerDiv;
    // const items = employeeProfileSummary.map(
    //     (summaryPoint) => `- ${summaryPoint}`
    // );

    // return createBulletedDiv('Profile Summary:', items);
}

const getWorkExperienceDiv = (employeeWorkExperiences) => {

    const outerDiv = createDiv({ id: getNewId() }, '', {paddingTop:'20px'});
    outerDiv.innerHTML = `
    <div>${wrapInStrongAndSetFontSizeEl('Work Experience:')} 
        <ul style="margin: 0; padding-left: 20px; list-style: none;">
            ${employeeWorkExperiences
                .filter(player => !Boolean(player.processedDetails?.metadata?.shouldHide))
                .sort((a, b) => b.processedDetails?.metadata?.order - a.processedDetails?.metadata?.order)
                .map(
                    ({ name, processedDetails: { metadata: {
                        overAllTenure, lastDesignation, domainOfCompany, lastCTC, projects, highlights, techStack
                    } } }) =>
            `<li>
               <div class="cornered-div" style="margin-bottom: 5px; margin-top: 10px">
                    <div>${wrapInItalicEl(wrapInStrongEl(lastDesignation.toUpperCase()))} - ${overAllTenure}</div>
                    <div>${wrapInItalicEl(name)}</div> 
                    <!--
                    <div>${wrapInStrongEl('Domain:')} - ${domainOfCompany?.join(', ')}</div>
                    <div>${wrapInStrongEl('Last CTC:')} - INR. ${lastCTC}</div>
                    -->
                    <div>${wrapInStrongEl('Projects:')} - ${projects?.join(', ')}</div>
                    <div>${wrapInStrongEl('Tech Stack used by myself:')} 
                        <ul style="margin: 0; padding-left: 20px;">
                            ${techStack?.map(h => `<li>${h}</li>`).join('')}
                        </ul>
                    </div>
                    <div>${wrapInStrongEl('Roles and Responsibilities:')} 
                        <ul style="margin: 0; padding-left: 20px;">
                            ${highlights?.map(h => `<li>${h}</li>`).join('')}
                        </ul>
                    </div>     
                </div>
            </li>`)
            .join('')
        }
        </ul>
    </div>
    `;
    return outerDiv;

    // const items = employeeWorkExperiences
    //     .filter(player => !Boolean(player.processedDetails?.metadata?.shouldHide))
    //     .sort((a, b) => b.processedDetails?.metadata?.order - a.processedDetails?.metadata?.order)
    //     .map(
    //         ({ name, processedDetails: { metadata: {
    //             overAllTenure, lastDesignation, domainOfCompany, lastCTC, projects, highlights, techStack
    //         } } }) =>
    //             `<div class="cornered-div" style="margin-bottom: 5px; margin-top: 10px">
    //                 <div>${wrapInItalicEl(wrapInStrongEl(lastDesignation.toUpperCase()))} - ${overAllTenure}</div>
    //                 <div>${wrapInItalicEl(name)}</div> 
    //                 <!--
    //                 <div>${wrapInStrongEl('Domain:')} - ${domainOfCompany?.join(', ')}</div>
    //                 <div>${wrapInStrongEl('Last CTC:')} - INR. ${lastCTC}</div>
    //                 -->
    //                 <div>${wrapInStrongEl('Projects:')} - ${projects?.join(', ')}</div>
    //                 <div>${wrapInStrongEl('Tech Stack used by myself:')} 
    //                     <ul style="margin: 0; padding-left: 20px;">
    //                         ${techStack?.map(h => `<li>${h}</li>`).join('')}
    //                     </ul>
    //                 </div>
    //                 <div>${wrapInStrongEl('Roles and Responsibilities:')} 
    //                     <ul style="margin: 0; padding-left: 20px;">
    //                         ${highlights?.map(h => `<li>${h}</li>`).join('')}
    //                     </ul>
    //                 </div>     
    //             </div>`
    //     );

    // return createBulletedDiv('Work Experience:', items);
}

const getEducationDiv = (employeeEducations) => {
    const outerDiv = createDiv({ id: getNewId() }, '', {paddingTop:'10px'});
    outerDiv.innerHTML = `
    <div>${wrapInStrongEl('Education:')} 
        <ul style="margin: 0; padding-left: 20px;">
            ${employeeEducations?.map(({ name, processedDetails: { metadata: {
                session, institution, university, grade
            } } }) =>
            `<li style="margin-bottom: 5px; margin-top: 10px">
                <div>${wrapInStrongEl(name)}</div>
                <div>${wrapInStrongEl('Institution:')} - ${institution}</div>
                <div>${wrapInStrongEl('Session:')} - ${session}</div>
                <div>${wrapInStrongEl('University:')} - ${university}</div>
                <div>${wrapInStrongEl('Grade:')} - ${grade}</div> 
            </li>`)
            .join('')
        }
        </ul>
    </div>
    `;
    return outerDiv;
    // const items = employeeEducations.map(
        // ({ name, processedDetails: { metadata: {
        //     session, institution, university, grade
        // } } }) => `
    //    <div style="margin-bottom: 5px; margin-top: 10px">
            // <div>${wrapInStrongEl(name)}</div>
            // <div>${wrapInStrongEl('Institution:')} - ${institution}</div>
            // <div>${wrapInStrongEl('Session:')} - ${session}</div>
            // <div>${wrapInStrongEl('University:')} - ${university}</div>
            // <div>${wrapInStrongEl('Grade:')} - ${grade}</div>            
    //    </div>`
    // );

    // return createBulletedDiv('Education:', items);
}

const getMainInfoDiv = (resumedata) => {
    const {
        expertises: employeeKeySkills,
        certifications: employeeCertifications,
        languagesKnown: employeeLanguages,
        hobbies: employeeHobbies,
        summarizedIntroduction: employeeProfileSummary
    } = resumedata.getResume.processedDetails.metadata;

    const { companies: employeeWorkExperiences, educations: employeeEducations } = resumedata.getResume;

    const mainInfoDiv = createDiv({ id: getNewId() }, "", {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px",
        borderRadius: "8px",
        gap: "50px",
    });

    const keySkillsCertificationsLanguagesAndHobbiesDivEl = createDiv(
        { id: getNewId() },
        "",
        {
            flex: "1",
            padding: "10px",
            borderRadius: "8px",
        }
    );

    keySkillsCertificationsLanguagesAndHobbiesDivEl.appendChild(getKeySkillsDiv(employeeKeySkills));
    keySkillsCertificationsLanguagesAndHobbiesDivEl.appendChild(getCertificationsDiv(employeeCertifications));
    keySkillsCertificationsLanguagesAndHobbiesDivEl.appendChild(getLanguagesDiv(employeeLanguages));
    keySkillsCertificationsLanguagesAndHobbiesDivEl.appendChild(getHobbiesDiv(employeeHobbies));
    keySkillsCertificationsLanguagesAndHobbiesDivEl.appendChild(getEducationDiv(employeeEducations));

    const profileSummaryWorkExperienceDivEl = createDiv(
        { id: getNewId() },
        "",
        {
            flex: "5",
            padding: "10px",
            borderRadius: "8px",
        }
    );

    profileSummaryWorkExperienceDivEl.appendChild(getProfileSummaryDiv(employeeProfileSummary));
    profileSummaryWorkExperienceDivEl.appendChild(getWorkExperienceDiv(employeeWorkExperiences));

    mainInfoDiv.appendChild(keySkillsCertificationsLanguagesAndHobbiesDivEl);
    mainInfoDiv.appendChild(profileSummaryWorkExperienceDivEl);

    return mainInfoDiv;
};

const renderResume = (resumeData) => {
    const style = document.createElement('style');
    style.textContent = `
        /* Set default font size and font family */
        body {
            font-size: 16px; /* Default font size */
            font-family: Arial, sans-serif; /* Default font family */
        }

        .bulleted-list {
            list-style-type: disc;
            padding-left: 20px;
        }

        .bulleted-list > div {
            position: relative;
            padding-top: 10px;
            margin-left: 10px;
        }

        .bulleted-list > div::before {
            content: "•";
            position: absolute;
            left: -10px;
        }

        .cornered-div {
            position: relative;
            padding: 20px;
            border: 1px solid #fff;
            
        }

        .cornered-div::before {
            content: '';
            position: absolute;
            top: 10;
            left: 0;
            width: 5px;
            height: 40px;
            background-color: blue;
        }
    `;
    document.head.appendChild(style);

    const container = createDiv({ id: getNewId() }, "", {
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        margin: "10px",
        borderRadius: "8px",
    });

    container.appendChild(getGeneralInfoDiv(resumeData));
    container.appendChild(getMainInfoDiv(resumeData));
    document.body.appendChild(container);
};

const fetchData = async () => {
    try {
        const data = await fetchGraphQL(query, variables);
        console.log("GraphQL data:", data);
        renderResume(data);
    } catch (error) {
        console.error("GraphQL error:", error);
    }
};

fetchData();
