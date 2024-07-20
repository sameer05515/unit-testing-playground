import { createConsoleAndRegisterMyId } from "../../../js/lib/utils.js";
import LOGGER from "../../../js/utils/log/loggerUtility.js";

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

const fetchAndCombineData = () => {
    fetchUsers()
        .then(users => {
            const userAddressPromises = users.map(user => fetchUserAddress(user.id));
            const postsPromise = fetchPostsForLast5Days();

            return Promise.all([Promise.all(userAddressPromises), postsPromise])
                .then(([addresses, posts]) => {
                    const combinedData = users.map((user, index) => ({
                        ...user,
                        address: addresses[index],
                    }));
                    return { combinedData, posts };
                });
        })
        .then(({ combinedData, posts }) => {
            LOGGER.info('Combined Data with Addresses:', JSON.stringify(combinedData));
            LOGGER.info('Posts from last 5 days:', JSON.stringify(posts));
        })
        .catch(error => {
            LOGGER.error('Error:', error);
        });
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
