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
  console.log('id is ' + _id);
  const data = await Note.findByIdAndUpdate(_id, body, { new: true });
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