import elementAdderUtility from "../../utils/element-add/elementAdderUtility-v0.1.js"; 

const config = [
    {
        elementType: 'div',
        style: { padding: '10px', border: '1px solid black' },
        innerText: 'Parent Div',
        children: [
            {
                elementType: 'p',
                style: { color: 'red' },
                innerText: 'Child Paragraph 1'
            },
            {
                elementType: 'div',
                style: { margin: '5px', backgroundColor: 'lightgray' },
                innerText: 'Child Div 1',
                children: [
                    {
                        elementType: 'span',
                        style: { color: 'blue' },
                        innerText: 'Grandchild Span'
                    }
                ]
            }
        ]
    }
];

elementAdderUtility.addElementsFromArray(config)
    .then(elements => {
        console.log('All elements created successfully:', elements);
    })
    .catch(error => {
        console.error('Error creating elements:', error);
    });
