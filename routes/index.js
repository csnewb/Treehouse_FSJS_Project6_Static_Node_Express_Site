const express = require('express');
const router = express.Router();
const data = require('../data');
const projects = data.projects;


// "index" route - Renders the "Home" page
router.get('/', (req, res) => {
    res.render('index', { projects: projects }); // Assuming you have an "index" Pug template
});

// "about" route - Renders the "About" page
router.get('/about', (req, res) => {
    res.render('about'); // Assuming you have an "about" Pug template
});

// Dynamic "project" route - Renders a customized version of the Pug project template
router.get('/project/:id', (req, res) => {
    const projectId = parseInt(req.params.id);
    const project = data.projects.find(project => project.id === projectId);
    if (project) {
        res.render('project', { project }); // Assuming you have a "project" Pug template
    } else {
        res.status(404).send('Project not found');
    }
});









module.exports = router;