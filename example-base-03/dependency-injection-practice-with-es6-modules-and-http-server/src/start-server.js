const { exec } = require('child_process');

const server = exec('npx http-server src -p 6060');

server.stdout.on('data', data => {
    console.log(data);
});

server.stderr.on('data', data => {
    console.error(`Error: ${data}`);
});

server.on('close', code => {
    console.log(`Server process exited with code ${code}`);
});
