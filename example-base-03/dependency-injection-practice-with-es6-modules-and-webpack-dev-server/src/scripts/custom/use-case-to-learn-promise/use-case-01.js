import { createConsoleAndRegisterMyId } from "../../../js/lib/utils.js";
import LOGGER from "../../../js/utils/log/loggerUtility.js";


const fetchUsers = () => {
    return new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
};

const fetchPosts = () => {
    return new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
};

const combineUserDataAndPosts = (users, posts) => {
    return users.map(user => {
        const userPosts = posts.filter(post => post.userId === user.id);
        return {
            ...user,
            posts: userPosts
        };
    });
};

const fetchAndCombineData = () => {
    Promise.all([fetchUsers(), fetchPosts()])
        .then(([users, posts]) => {
            const combinedData = combineUserDataAndPosts(users, posts);
            LOGGER.info('Combined Data:', JSON.stringify(combinedData, null, 1));
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
