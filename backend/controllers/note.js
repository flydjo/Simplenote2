const Note = require('../models/Note');

exports.getNotes = (req,res,next) => {
    Note.find()
        .then(notes => res.status(201).json(notes))
        .catch(error => res.status(400).json({error}));
};

exports.getNote = (req, res, next) => {
    Note.findOne({ id: req.params.id })
        .then(note => res.status(201).json(note))
        .catch(error => res.status(404).json({error}));
};

exports.createNote = (req, res, next) => {
    const note = new Note({
        ...req.body
    });

    note.save()
        .then(() => res.status(201).json('nouvelle note créer'))
        .catch(error => res.status(400).json({error: error}));
};

exports.deleteNote = (req, res, next) => {
    Note.deleteOne({id: req.params.id})
        .then(() => res.status(201).json({message: "Note bien supprimer"}))
        .catch(error => res.status(400).json({error: error}));        
};

exports.editNote = (req, res, next) => {
    Note.updateOne({id: req.params.id}, {...req.body, id: req.params.id})
        .then(() => res.status(201).json({message: "La modification à bien été éffectuée"}))
        .catch(error => res.status(400).json({error: error}));
};