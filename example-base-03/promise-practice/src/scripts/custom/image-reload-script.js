

(function () {
    console.log('Initialization code runs');
    // Initialization code here
    // constants

    const EMOTION_IMAGE_URLS = [
        { text: 'airplane', value: 'https://farm6.staticflickr.com/5590/14821526429_5c6ea60405_z_d.jpg' },
        { text: 'cat', value: 'https://i.imgur.com/CzXTtJV.jpg' },
        { text: 'dog', value: 'https://i.imgur.com/OB0y6MR.jpg' },
        { text: 'bicycle', value: ' https://farm3.staticflickr.com/2378/2178054924_423324aac8.jpg' },
        { text: 'bird', value: 'https://farm4.staticflickr.com/3075/3168662394_7d7103de7d_z_d.jpg' },
        { text: 'boat', value: 'https://farm1.staticflickr.com/49/157534104_95ca4e0ae6.jpg ' },
        { text: 'bus', value: 'https://farm4.staticflickr.com/3319/3211138044_9232086442.jpg' },
        { text: 'two chairs', value: 'https://farm4.staticflickr.com/3049/2327691528_f060ee2d1f.jpg' },
        { text: 'cow', value: 'https://farm3.staticflickr.com/2042/2203964933_f1b80a18ba.jpg' },


        { text: 'cheetah', value: 'https://farm2.staticflickr.com/1533/26541536141_41abe98db3_z_d.jpg' },
        { text: 'bird', value: 'https://farm4.staticflickr.com/3075/3168662394_7d7103de7d_z_d.jpg' },
        { text: 'whale', value: 'https://farm9.staticflickr.com/8505/8441256181_4e98d8bff5_z_d.jpg' },
        { text: 'bridge', value: 'https://i.imgur.com/OnwEDW3.jpg' },
        { text: 'lighthouse', value: 'https://farm3.staticflickr.com/2220/1572613671_7311098b76_z_d.jpg' },
        { text: 'airplane', value: 'https://farm6.staticflickr.com/5590/14821526429_5c6ea60405_z_d.jpg' },
        { text: 'sailboat', value: 'https://farm7.staticflickr.com/6089/6115759179_86316c08ff_z_d.jpg' },
        { text: 'cello', value: 'https://farm2.staticflickr.com/1090/4595137268_0e3f2b9aa7_z_d.jpg' },
        { text: 'piano', value: 'https://farm4.staticflickr.com/3224/3081748027_0ee3d59fea_z_d.jpg' },
        { text: 'apple', value: 'https://farm8.staticflickr.com/7377/9359257263_81b080a039_z_d.jpg' },
        { text: 'flower', value: 'https://farm9.staticflickr.com/8295/8007075227_dc958c1fe6_z_d.jpg' },
        { text: 'mushroom', value: 'https://farm2.staticflickr.com/1449/24800673529_64272a66ec_z_d.jpg' },
        { text: 'coffee', value: 'https://farm4.staticflickr.com/3752/9684880330_9b4698f7cb_z_d.jpg' },
        { text: 'wine', value: 'https://farm4.staticflickr.com/3827/11349066413_99c32dee4a_z_d.jpg' },
    ];



    // Create main div element
    const playgroundDiv = document.createElement('div');
    playgroundDiv.id = 'playground-div';



    // Create image element
    const image = document.createElement('img');
    image.id = 'image';
    // image.src = 'favicon144.png';
    // image.src= 'https://picsum.photos/200';
    image.src = EMOTION_IMAGE_URLS[0].value;
    image.alt = EMOTION_IMAGE_URLS[0].text;
    image.width = 200;

    // Create button element
    const button = document.createElement('button');
    button.innerText = 'Reload';
    button.onclick = function () {
        reload();
    };

    let selectedIndex = 0;
    // Define the reload function
    function reload() {
        // image.src = 'favicon144.png';
        // image.src= 'https://picsum.photos/200';
        const nextIndex = ((++selectedIndex + EMOTION_IMAGE_URLS.length) % EMOTION_IMAGE_URLS.length);
        image.src = EMOTION_IMAGE_URLS[nextIndex].value;
        image.alt = EMOTION_IMAGE_URLS[nextIndex].text;
    }

    // Create div to contain the button
    const buttonDiv = document.createElement('div');
    buttonDiv.appendChild(button);

    // Append image and button div to the main div
    playgroundDiv.appendChild(image);
    playgroundDiv.appendChild(buttonDiv);

    // Append the main div to the body
    document.body.appendChild(playgroundDiv);
})();




