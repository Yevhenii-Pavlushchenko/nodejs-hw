import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';
import {
  createNoteSchema,
  getAllNotesSchema,
  noteIdSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use('/notes', authenticate, getAllNotes);
router.post('/notes', authenticate, createNote);

// роутер на весь список нотаток
router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);

// роутер на 1 нотатку по айдишке
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);

//  Роутер создания новой нотатки
router.post('/notes', celebrate(createNoteSchema), createNote);

//! Роутер удаления нотатки
router.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);

//? Роутер обновления нотатки
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

export default router;
