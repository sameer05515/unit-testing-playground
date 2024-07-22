import { createConsoleAndRegisterMyId } from "../../../js/lib/utils.js";
import LOGGER from "../../../js/utils/log/loggerUtility.js";

let combinedData=[];

const fetchUsers = () => {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json());
};

const fetchUserAddress = (userId) => {
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(user => user.address);
};

const fetchPostsForLast5Days = () => {
    return fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            const fiveDaysAgo = new Date();
            fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
            return posts.filter(post => new Date(post.date) >= fiveDaysAgo);
        });
};

const fetchAddressesSequentially = (users) => {
    return users.reduce((promiseChain, user) => {
        return promiseChain.then(results => {
            return fetchUserAddress(user.id).then(address => [...results, address]);
        });
    }, Promise.resolve([]));
};

const fetchAndCombineData = () => {
    fetchUsers()
        .then(users => {
            const postsPromise = fetchPostsForLast5Days();
            return fetchAddressesSequentially(users)
                .then(addresses => ({ users, addresses, postsPromise }));
        })
        .then(({ users, addresses, postsPromise }) => {
            return postsPromise.then(posts => {
                const combinedData = users.map((user, index) => ({
                    ...user,
                    address: addresses[index],
                }));
                return { combinedData, posts };
            });
        })
        .then(({ combinedData, posts }) => {
            LOGGER.info('Combined Data with Addresses:', combinedData);
            LOGGER.info('Posts from last 5 days:', posts);

            renderCards(combinedData);
        })
        .catch(error => {
            LOGGER.error('Error:', error);
        });
};


const styles = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        width: '300px',
    },
    cardHeader: {
        marginTop: '0',
    },
    cardParagraph: {
        margin: '4px 0',
    },
    nestedField: {
        marginLeft: '20px',
    }
};

const applyStyles = (element, styles) => {
    for (const property in styles) {
        element.style[property] = styles[property];
    }
};

const renderCards = (data) => {
    const container = document.createElement('div');
    container.id='container';
    const myContainerDiv= document.getElementById('premendra-kumar');
    container.innerHTML = ''; // Clear any existing content

    data.forEach(item => {
        const card = document.createElement('div');
        applyStyles(card, styles.card);

        // Create a header for the card
        const header = document.createElement('h2');
        header.textContent = `User: ${item.name}`;
        applyStyles(header, styles.cardHeader);
        card.appendChild(header);

        // Create a paragraph for each field
        for (const key in item) {
            const value = item[key];
            if (typeof value === 'object') {
                card.appendChild(renderNestedFields(key, value));
            } else {
                const paragraph = document.createElement('p');
                paragraph.innerHTML = `<strong>${key}:</strong> ${value}`;
                applyStyles(paragraph, styles.cardParagraph);
                card.appendChild(paragraph);
            }
        }

        container.appendChild(card);
        myContainerDiv.appendChild(container);
    });
};

const renderNestedFields = (key, obj) => {
    const fragment = document.createDocumentFragment();
    const title = document.createElement('p');
    title.innerHTML = `<strong>${key}:</strong>`;
    applyStyles(title, styles.cardParagraph);
    fragment.appendChild(title);

    for (const nestedKey in obj) {
        const nestedValue = obj[nestedKey];
        const nestedParagraph = document.createElement('p');
        nestedParagraph.innerHTML = `&nbsp;&nbsp;<strong>${nestedKey}:</strong> ${nestedValue}`;
        applyStyles(nestedParagraph, { ...styles.cardParagraph, ...styles.nestedField });
        fragment.appendChild(nestedParagraph);
    }

    return fragment;
};
// fetchAndCombineData();

//============== Creating console ===============

const myContainerDiv = document.createElement("div");
myContainerDiv.id = "premendra-kumar";
myContainerDiv.style.padding = "10px";

createConsoleAndRegisterMyId(
    (successResponse) => {
        console.clear();
        const createdElementDiv = document.getElementById(
            successResponse.consoleDivId
        );
        createdElementDiv.style.width = "95%";
        LOGGER.info("[Success]: ", JSON.stringify(successResponse));
        //reshuffle();
    },
    (errorMessage) => {
        LOGGER.error("[Fail]: ", errorMessage);
    },
    (LOGGERR) => {
        LOGGER.reset();
        LOGGER.info(
            "Console cleared.===================================================="
        );
        myContainerDiv.replaceChildren();
        // const arr = createChildren([2, 2], "premendra-kumar");
        //LOGGER.info("createChildren: ", JSON.stringify(arr, null, 2));
        // createHTMLElementsFromArray(arr);
        fetchAndCombineData();
    }
);
document.body.appendChild(myContainerDiv);