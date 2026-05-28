import createError from 'http-errors';

import { Note } from '../models/note.js';

// Запрос на все нотатки
export const getAllNotes = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, tag, search } = req.query;

    const skip = (page - 1) * perPage;

    const userId = req.user._id;

    const notesQuery = Note.find({ userId });

    if (tag) {
      notesQuery.where('tag').equals(tag);
    }
    if (search) {
      notesQuery.where({
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
        ],
      });
    }

    const [totalItems, notes] = await Promise.all([
      notesQuery.clone().countDocuments(),
      notesQuery.skip(skip).limit(perPage),
    ]);

    const totalPages = Math.ceil(totalItems / perPage);

    res.status(200).json({ page, perPage, totalPages, totalItems, notes });
  } catch (error) {
    next(error);
  }
};

// Запрос на одну нотатку по адйшке
export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const userId = req.user._id;

    const note = await Note.findOne({ _id: noteId, userId });

    if (!note) {
      throw createError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

//  Создание новой нотатки
export const createNote = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const newNote = await Note.create({ ...req.body, userId });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

//! Удаление нотатки
export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const userId = req.user._id;

    const deletedNote = await Note.findOneAndDelete({ _id: noteId, userId });

    if (!deletedNote) {
      throw createError(404, 'Note not found');
    }

    res.status(200).json(deletedNote);
  } catch (error) {
    next(error);
  }
};

//? Обновление нотатки
export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const userId = req.user._id;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, userId },
      req.body,
      {
        returnDocument: 'after',
      },
    );

    if (!updatedNote) {
      throw createError(404, 'Note not found');
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};
