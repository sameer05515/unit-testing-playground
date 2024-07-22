const colors = [
    "Red",
    "Green",
    "Blue",
    "Yellow",
    "Orange",
    "Purple",
    "Pink",
    "Brown",
    "Cyan",
    "Magenta",
];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

export {getRandomColor};