const express = require('express');
const router = express.Router();
const data = require('../data');
const projects = data.projects;


// the home or index route
router.get('/', (req, res) => {
    res.render('index', { projects: projects }); // Assuming you have an "index" Pug template
});

// a GET route for rendering our about page
router.get('/about', (req, res) => {
    res.render('about');
});

// a GET route for rendering the individual project which is referenced by its ID
router.get('/project/:id', (req, res) => {
    const projectId = parseInt(req.params.id);
    const project = data.projects.find(project => project.id === projectId);
    if (project) {
        res.render('project', { project });
    } else {
        res.status(404).send('Project not found');
    }
});


// export the routes for use
module.exports = router;