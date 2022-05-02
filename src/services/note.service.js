import Note from '../models/note.model';
export const addNote = async (body) => {
  const data = await Note.create(body);
  return data;
};
export const getAllNote = async () => {
  const data = await Note.find();
  if (data == null) {
    throw new Error('no notes for the user');
  } else return data;
};
export const getNote = async (id) => {
  console.log('retriving particualr note: ', id);
  const data = await Note.findById(id);
  if (data == null) {
    throw new Error('note by this id do not exist');
  }
  return data;
};
export const updateNote = async (_id, body) => {
  console.log("id is "+ _id);
  const data = await Note.findByIdAndUpdate( _id,body,{new:true});
  console.log("data is"+data);
  return data;
};

export const deleteNote = async (_id) => {
  await Note.findByIdAndDelete(_id);
  return '';
};
