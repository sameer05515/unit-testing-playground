import { applyStyles, createButton, createDiv } from "../../../../../modules/common/ElementCreatorUtil";

const styles={
    button:{

    }
};


let count = 0;

const myContainerDiv = createDiv({}, '', {}, {});
const myButtonContainerDiv = createDiv({}, '', {}, {});
const myElementsContainerDiv = createDiv({}, '', {}, {});

const onMyClick = () => {
    count++;
    buttonAddEl.innerHTML = `Current count {${count}}`;
};

const buttonAddEl = createButton({}, `Current count {${count}}`, {}, { click: onMyClick });

myButtonContainerDiv.appendChild(buttonAddEl);

myContainerDiv.appendChild(myButtonContainerDiv);
myContainerDiv.appendChild(myElementsContainerDiv);

document.body.appendChild(myContainerDiv);

// Optionally add some initial content or functionality
const addInitialContent = () => {
    // Add some initial content to `myElementsContainerDiv` if needed
    const initialContent = createDiv({}, 'Initial content', {}, {});
    myElementsContainerDiv.appendChild(initialContent);
};

addInitialContent();
