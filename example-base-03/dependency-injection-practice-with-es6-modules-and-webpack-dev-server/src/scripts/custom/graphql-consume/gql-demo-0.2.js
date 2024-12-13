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
            ? responseBody.errors.map(error => error.message).join(", ")
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

// UI Elements Creation
const createUIElements = () => {
    const container = document.createElement('div');
    const headerContainer = document.createElement('div');
    const resumeContainer = document.createElement('div');
    const fetchBtn = document.createElement('button');
    const togglePreBtn = document.createElement('button');
    const preEl = document.createElement('pre');

    fetchBtn.innerText = 'Fetch Data';
    togglePreBtn.innerText = 'Show';

    headerContainer.append(fetchBtn, togglePreBtn, preEl);
    container.append(headerContainer, resumeContainer);
    document.body.append(container);

    return { fetchBtn, togglePreBtn, preEl, resumeContainer };
};

const { fetchBtn, togglePreBtn, preEl, resumeContainer } = createUIElements();

let showPre = false;

// Fetch Data Function
const fetchData = async () => {
    try {
        const data = await fetchGraphQL(query, variables);
        console.log('GraphQL data:', data);
        preEl.innerHTML = JSON.stringify(data, null, 2);
        preEl.style.display = 'none';
        togglePreBtn.innerText = 'Show';
        renderResume(data);
    } catch (error) {
        console.error('GraphQL error:', error);
    }
};

fetchBtn.addEventListener('click', fetchData);

togglePreBtn.addEventListener('click', () => {
    showPre = !showPre;
    preEl.style.display = showPre ? 'block' : 'none';
    togglePreBtn.innerText = showPre ? 'Hide' : 'Show';
});

// Create Personal Details Card
const createPersonalDetailsCard = (details, parentElement) => {
    const card = document.createElement('div');
    card.style.cssText = `
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 16px;
        margin: 16px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        max-width: 300px;
        background-color: #f9f9f9;
    `;

    card.innerHTML = `
        <h2>${details.name}</h2>
        <p>Date of Birth: ${details.dateOfBirth}</p>
        <div>
            <h3>Emails:</h3>
            <ul>${details.emails.map(email => `<li>${email}</li>`).join('')}</ul>
        </div>
        <div>
            <h3>Contact Numbers:</h3>
            <ul>${details.contactNumbers.map(contact => `<li>${contact}</li>`).join('')}</ul>
        </div>
    `;

    parentElement.appendChild(card);
};

// Create Expertise Card
const createExpertiseCard = (expertises, parentElement) => {
    const card = document.createElement('div');
    card.style.cssText = `
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 16px;
        margin: 16px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        max-width: 300px;
        background-color: #f9f9f9;
    `;

    card.innerHTML = `
        <h2>Expertises</h2>
        <ul>${expertises.map(exp => `
            <li>
                <p><strong>Stream:</strong> ${exp.stream}</p>
                <p><strong>Duration:</strong> ${exp.duration}</p>
            </li>
        `).join('')}</ul>
    `;

    parentElement.appendChild(card);
};

// Render Resume Function
const renderResume = (resumeData) => {
    resumeContainer.innerHTML = '';
    createPersonalDetailsCard(resumeData.getResume.processedDetails.metadata.personalDetails, resumeContainer);
    createExpertiseCard(resumeData.getResume.processedDetails.metadata.expertises, resumeContainer);
};
