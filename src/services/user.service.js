import User from '../models/user.model';
import bcrypt from 'bcrypt';
//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};
export const login = async (body) => {
  const data = await User.findOne({ email: body.email });
  if (data==null) {
    throw new Error("User does not exist");
  }
  else {
    const result = await bcrypt.compare(body.password, data.password);
    console.log("the result is here",result);
    if (result == true) {
      return data;
    }
    else {
      throw new Error("incorrect password");
    }
    // result == true
  }
};

//create new user
export const newUser = async (body) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(body.password, salt);
  body.password = hashPassword;
  const data = await User.create(body);
  return data;
};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};