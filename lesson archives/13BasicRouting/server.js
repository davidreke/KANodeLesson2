// 1. create about.html and 404.html in views
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)

    res.setHeader('Content-type', 'text-html')

    // 2 create a path variable and use a swith statemnt to edit that path based off of req.url
    let path = './views/'
    switch (req.url) {
        case '/':
            path += 'index.html';
            break;
        case '/about':
            path += 'about.html';
            break;
        default:
            path += '404.html'
            break;
    }
    // 3. replace './view/index.html' with the path variable
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {

            res.end(data);
        }
    }
    )
});


server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000')
});

