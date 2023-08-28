const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const data = require('./data');
const projects = data.projects;

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.set("view engine", 'pug');


const mainRoutes = require('./routes');
// Serve static files with explicit content types
app.use('/static', express.static('public', {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

app.use(mainRoutes);









app.use((req, res, next) => {
    console.log('middleware one');
    next();
})



// 404 handler for undefined routes
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Global error handler
app.use((err, req, res, next) => {
    // Ensure err.status and err.message properties exist
    err.status = err.status || 500; // Default to 500 if status is not set
    err.message = err.message || 'Internal Server Error'; // Default message

    // Log the error message and status
    console.error(`Error Status: ${err.status}`);
    console.error(`Error Message: ${err.message}`);

    // Respond with the appropriate error status and message
    res.status(err.status);
    res.json({
        error: {
            status: err.status,
            message: err.message
        }
    });
});


app.listen(3050, () => {
    console.log('The application is running on localhost: 3000')
});