const express = require('express');
const data = require('./data');
const projects = data.projects;

// instantiate express and store it in app
const app = express();
app.set("view engine", 'pug');

// import the routes from index.js
const mainRoutes = require('./routes');

// Serve static files with explicit content types to avoid a MIME error
app.use('/static', express.static('public', {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

// call the routes
app.use(mainRoutes);



// a 404 catch if no matching route is found above
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// an error handler to process either the 404 or other errors
app.use((err, req, res, next) => {
    err.status = err.status || 500;
    err.message = err.message || 'Internal Server Error';

    console.error(`Error Status: ${err.status}`);
    console.error(`Error Message: ${err.message}`);

    // Here we are returning the error message as JSON rather then render it on a page
    res.status(err.status);
    res.json({
        error: {
            status: err.status,
            message: err.message
        }
    });
});


// set the app to port 3050 and run it
app.listen(3050, () => {
    console.log('The application is running on localhost: 3050')
});