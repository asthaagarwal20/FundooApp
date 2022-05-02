import express from 'express';
import * as notecontroller from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { noteValidator } from '../validators/user.validator';
const router = express.Router();

router.post('', userAuth, notecontroller.addNewNote);
router.get('', userAuth, notecontroller.getAllNote);
router.get('/:noteid', userAuth, notecontroller.getNote);
router.put('/:noteid', userAuth, notecontroller.updateNote);
router.delete('/:noteid', userAuth, notecontroller.deleteNote);
export default router;
