// Declaration
class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}

// Expression; the class is anonymous but assigned to a variable
const RectangleAnonymous = class {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
};

// Expression; the class has its own name
const RectangleFromAnotherName = class Rectangle2 {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
};


export {Rectangle, RectangleAnonymous, RectangleFromAnotherName};