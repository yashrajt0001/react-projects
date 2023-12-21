const express = require("express");
const router = express.Router();
const Note = require('../model/Note')
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require("express-validator");
const user = require("../model/User");

//Route 1: fetch all notes

router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id })
    res.json(notes);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

//Route 2: create a note

router.post("/createnote", fetchuser, [
  body('title', 'please enter title').isLength({ min: 1 })
], async (req, res) => {

  // validation error
  const error = validationResult(req)
  if (!error.isEmpty())
  {
    return res.status(400).json({errors: error.array()})  
  }

  try {
    // const {title, description, tag} = req.body
    const note = new Note({
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag,
      user: req.user.id
    })

    res.json(await note.save())
  }
  catch (error) {
    console.error(error.message)
    res.status(500).send('server error')
  }
});

//Route 3: upadte an existing note

router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description } = req.body
  let newNote = { title, description }

  let note = await Note.findById(req.params.id)
  console.log(note)
  if (!note) {
    return res.status(400).send('note does not exist')
  }

  if (note.user.toString() !== req.user.id)
  {
    return res.status(401).send('Authorisation error')  
  }

  note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote }, { new: true })
  res.json(note);
  
})

// Route 4: Deleting a note

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
    if (!note) {
      return res.status(400).send('note not found')
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send('authorisation error')
    }

    res.json(await Note.findByIdAndDelete(req.params.id))
  }
  catch (error) {
    console.error(error.message)
    res.status(500).send('internal server error')
  }
  })

module.exports = router;
