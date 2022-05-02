import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import * as NoteService from '../services/note.service';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addNewNote = async (req, res, next) => {
  try {
    const data = await NoteService.addNote(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'New Note added successfully'
    });
  } catch (error) {
    next(error);
  }
};
export const getAllNote = async (req, res, next) => {
  try {
    const data = await NoteService.getAllNote(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};
export const getNote = async (req, res, next) => {
  try {
    const data = await NoteService.getNote(req.params.noteid);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const data = await NoteService.updateNote(req.params.noteid,req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const data = await NoteService.deleteNote(req.params.noteid);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};