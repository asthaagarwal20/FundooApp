import Note from '../models/note.model';
import {client} from '../config/radis';

export const addNote = async (body) => {
  const data = await Note.create(body);
  return data;
};
export const getAllNote = async (userid) => {
  const data = await Note.find(userid);
  await client.set('getnotes',JSON.stringify(data));
  return data;
};
export const getNote = async (id) => {
  console.log('retriving particualr note: ', id);
  const data = await Note.findById(id);
  if (data == null) {
    throw new Error('note by this id do not exist');
  }
  return data;
};
export const updateNote = async (id, body) => {
  console.log('id is ' + id);
  const data = await Note.findByIdAndUpdate(
    {
      _id: id,
      userid: body.userid
    },
    body,
    {
      new: true
    }
  );
  console.log('data is' + data);
  return data;
};

export const deleteNote = async (_id) => {
  await Note.findByIdAndDelete(_id);
  return '';
};

export const archieveNote = async (id) => {
  const temp = await Note.findById(id);
  if (temp == null) {
    throw new Error('Note does not exist');
  }
  temp.isArchieve = true;
  const data = await Note.findByIdAndUpdate(
    {
      _id: id
    },
    temp,
    {
      new: true
    }
  );
  return data;
};

export const trashNote = async (id) => {
  const temp = await Note.findById(id);
  if (temp == null) {
    throw new Error('Note does not exist');
  }
  temp.isDeleted = true;
  const data = await Note.findByIdAndUpdate(
    {
      _id: id
    },
    temp,
    {
      new: true
    }
  );
  return data;
};
