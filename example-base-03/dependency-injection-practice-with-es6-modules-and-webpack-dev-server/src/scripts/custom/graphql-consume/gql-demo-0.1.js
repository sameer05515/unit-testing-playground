const fetchGraphQL = async (query, variables = {}) => {
    const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables,
        }),
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

// Example usage:
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



const myContainerEl = document.createElement('div');
const myHeaderContainerEl = document.createElement('div');
const myResumeContainerEl = document.createElement('div');
const fetchBtnEl = document.createElement('button');
fetchBtnEl.innerText='Fetch Data';
const showHidePreBtnEl = document.createElement('button');
showHidePreBtnEl.innerText='Show';
const myPreEl = document.createElement("pre");

myHeaderContainerEl.appendChild(fetchBtnEl);
myHeaderContainerEl.appendChild(showHidePreBtnEl);
myHeaderContainerEl.appendChild(myPreEl);
myContainerEl.appendChild(myHeaderContainerEl);
myContainerEl.appendChild(myResumeContainerEl);
document.body.appendChild(myContainerEl);


let showPre = false;

const fetchData = () => {
    fetchGraphQL(query, variables)
        .then(data => {
            console.log('GraphQL data:', data);
            
            myPreEl.innerHTML = JSON.stringify(data, null, 2);
            myPreEl.style.display='none';
            showHidePreBtnEl.innerText='Show';
            renderResume(data);
            // showHidePreBtnEl.innerText='Show';
        })
        .catch(error => {
            console.error('GraphQL error:', error);
        });
};

fetchBtnEl.addEventListener('click', fetchData);

showHidePreBtnEl.addEventListener('click', () => {
    if (showPre) {
        myPreEl.style.display = 'block';
        showHidePreBtnEl.innerText='Hide';
    } else {
        myPreEl.style.display = 'none';
        showHidePreBtnEl.innerText='Show';
    }
    showPre=!showPre;
});


const personalDetails = {
    "name": "Premendra Kumar",
    "dateOfBirth": "31 May 1986",
    "emails": [
        "premendra.bce05515@gmail.com",
        "premendra.bce05515@outlook.com"
    ],
    "contactNumbers": [
        "+91 80106 45624",
        "+91 87500 84750"
    ]
};

function createPersonalDetailsCard(details, parentElement) {
    // Create the main card container
    const card = document.createElement('div');
    card.style.border = '1px solid #ccc';
    card.style.borderRadius = '8px';
    card.style.padding = '16px';
    card.style.margin = '16px';
    card.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    card.style.maxWidth = '300px';
    card.style.backgroundColor = '#f9f9f9';

    // Create the name element
    const name = document.createElement('h2');
    name.innerText = details.name;
    card.appendChild(name);

    // Create the date of birth element
    const dob = document.createElement('p');
    dob.innerText = `Date of Birth: ${details.dateOfBirth}`;
    card.appendChild(dob);

    // Create the emails section
    const emailSection = document.createElement('div');
    const emailHeader = document.createElement('h3');
    emailHeader.innerText = 'Emails:';
    emailSection.appendChild(emailHeader);

    const emailList = document.createElement('ul');
    details.emails.forEach(email => {
        const emailItem = document.createElement('li');
        emailItem.innerText = email;
        emailList.appendChild(emailItem);
    });
    emailSection.appendChild(emailList);
    card.appendChild(emailSection);

    // Create the contact numbers section
    const contactSection = document.createElement('div');
    const contactHeader = document.createElement('h3');
    contactHeader.innerText = 'Contact Numbers:';
    contactSection.appendChild(contactHeader);

    const contactList = document.createElement('ul');
    details.contactNumbers.forEach(contact => {
        const contactItem = document.createElement('li');
        contactItem.innerText = contact;
        contactList.appendChild(contactItem);
    });
    contactSection.appendChild(contactList);
    card.appendChild(contactSection);

    // Append the card to the body or any specific container
    parentElement.appendChild(card);
}


const expertises = [
    {
        "stream": "java and related apis",
        "duration": "15 years"
    },
    {
        "stream": "ReactJS",
        "duration": "5 years"
    },
    {
        "stream": "AWS and related services",
        "duration": "5 years"
    }
];

function createExpertiseCard(expertises, parentElement) {
    // Create the main card container
    const card = document.createElement('div');
    card.style.border = '1px solid #ccc';
    card.style.borderRadius = '8px';
    card.style.padding = '16px';
    card.style.margin = '16px';
    card.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    card.style.maxWidth = '300px';
    card.style.backgroundColor = '#f9f9f9';

    // Create the header for the expertise card
    const header = document.createElement('h2');
    header.innerText = 'Expertises';
    card.appendChild(header);

    // Create the list for expertises
    const expertiseList = document.createElement('ul');

    expertises.forEach(expertise => {
        const listItem = document.createElement('li');
        
        const stream = document.createElement('p');
        stream.innerHTML = `<strong>Stream:</strong> ${expertise.stream}`;
        
        const duration = document.createElement('p');
        duration.innerHTML = `<strong>Duration:</strong> ${expertise.duration}`;

        listItem.appendChild(stream);
        listItem.appendChild(duration);
        
        expertiseList.appendChild(listItem);
    });

    card.appendChild(expertiseList);

    // Append the card to the body or any specific container
    parentElement.appendChild(card);
}






const renderResume=(resumeData)=>{
    myResumeContainerEl.innerHTML='';
    // Call the function with the personalDetails data
createPersonalDetailsCard(resumeData.getResume.processedDetails.metadata.personalDetails, myResumeContainerEl );
// Call the function with the expertises data
createExpertiseCard(resumeData.getResume.processedDetails.metadata.expertises, myResumeContainerEl );
}


