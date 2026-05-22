import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesControllers.js';

const router = Router();

// роутер на весь список нотаток
router.get('/notes', getAllNotes);

// роутер на 1 нотатку по айдишке
router.get('/notes/:noteId', getNoteById);

//  Роутер создания новой нотатки
router.post('/notes', createNote);

//! Роутер удаления нотатки
router.delete('/notes/:noteId', deleteNote);

//? Роутер обновления нотатки
router.patch('/notes/:noteId', updateNote);

export default router;
