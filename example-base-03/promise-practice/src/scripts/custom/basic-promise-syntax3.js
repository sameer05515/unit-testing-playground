

(function () {
  console.log('Initialization code runs');
  // Initialization code here
  // Create style element
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `
    .message-ball {
        font-size: 20px;
        line-height: 400px;
        text-align: center;
    }
    .circle {
        transition-property: width, height;
        transition-duration: 5s;
        position: fixed;
        transform: translateX(-50%) translateY(-50%);
        background-color: red;
        border-radius: 50%;
    }
`;

  // Append style element to the head
  document.head.appendChild(style);

  function check() {
    showCircle(250, 250, 200).then(div => {
      div.classList.add('message-ball');
      div.append("Hello, world!");
    });
  }

  function showCircle(cx, cy, radius) {
    let div = document.createElement('div');
    div.style.width = 0;
    div.style.height = 0;
    div.style.left = cx + 'px';
    div.style.top = cy + 'px';
    div.className = 'circle';
    document.body.append(div);

    return new Promise(resolve => {
      setTimeout(() => {
        div.style.width = radius * 2 + 'px';
        div.style.height = radius * 2 + 'px';

        div.addEventListener('transitionend', function handler() {
          div.removeEventListener('transitionend', handler);
          resolve(div);
        });
      }, 0);
    })
  }

  // Create button element
  const button = document.createElement('button');
  button.innerText = 'Click me';
  button.onclick = function () {
    check();
  };

  document.body.appendChild(button);
})();
