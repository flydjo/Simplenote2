const express = require('express');
const router = express.Router();
const notesController = require('../controllers/note');

router.get('/notes/', notesController.getNotes);
router.get('/notes/:id', notesController.getNote);
router.post('/create/', notesController.createNote);
router.delete('/delete/:id', notesController.deleteNote);
router.put('/edit/:id', notesController.editNote);

module.exports = router;