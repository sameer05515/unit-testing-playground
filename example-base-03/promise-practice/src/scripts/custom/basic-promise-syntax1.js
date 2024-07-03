(function () {
    console.log('Initialization code runs');

    function myDisplayer(some) {
        document.getElementById("demo").innerHTML = some;
    }

    let myPromise = new Promise(function (myResolve, myReject) {
        let x = 0;
        // The producing code (this may take some time)
        if (x == 0) {
            myResolve("OK");
        } else {
            myReject("Error");
        }
    });

    myPromise.then(
        function (value) {
            myDisplayer(value);
        },
        function (error) {
            myDisplayer(error);
        }
    );

    function check() {
        const num = document.getElementById("num").value;
        myDisplayer(`Going to check validity for : ${num}`);
        let myPromiseObject = new Promise(function (myResolve, myReject) {
            let x = parseInt(num);

            // The producing code (this may take some time)

            setTimeout(() => {
                if (x == 0) {
                    myResolve("OK");
                } else {
                    myReject("Error");
                }
            }, 5000);

            // if (x == 0) {
            //   myResolve("OK");
            // } else {
            //   myReject("Error");
            // }
        });

        myPromiseObject.then(
            function (value) {
                myDisplayer(value);
            },
            function (error) {
                myDisplayer(error);
            }
        );
    }


    // Creating controles

    // Create input element
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'num';
    input.placeholder = 'Enter a number';

    // Create button element
    const button = document.createElement('button');
    button.innerText = 'Click me';
    button.onclick = function () {
        check();
    };

    // Create div element
    const div = document.createElement('div');
    div.id = 'demo';

    // Append elements to the body
    // document.body.appendChild(input);
    // document.body.appendChild(button);
    document.body.appendChild(div);
})();
