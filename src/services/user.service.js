import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { mailSend } from '../utils/helper';
import {publisher} from '../config/rabbitMq';
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};
export const login = async (body) => {
  const data = await User.findOne({ email: body.email });
  if (data == null) {
    throw new Error('User does not exist');
  } else {
    const result = await bcrypt.compare(body.password, data.password);
    if (result == true) {
      var token = jwt.sign(
        { firstname: data.firstname, id: data._id, email: data.email },
        process.env.SECRET_KEY
      );
      return token;
    } else {
      throw new Error('incorrect password');
    }
  }
};

//create new user
export const newUser = async (body) => {
  const data1 = await User.findOne({ email: body.email });
  if (data1 == null) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(body.password, salt);
    body.password = hashPassword;
    const data = await User.create(body);
    publisher(data);
    return data;
  } else {
    throw new Error('User already registered');
  }
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

export const forgotpassword = async (body) => {
  const searchdata = await User.findOne({ email: body.email });
  if (body.email == searchdata.email) {
    const token = jwt.sign(
      { id: searchdata._id, email: searchdata.email },
      process.env.NEWSECRETKEY
    );
    const sendingmail = await mailSend(searchdata.email, token);
    return sendingmail;
  } else {
    throw new Error('email does not matched');
  }
};

export const resetpassword = async (body) => {
  console.log("body is" ,body);
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(body.password, salt);
  //console.log(hashpassword);
  body.password = hashPassword;
  const data = await User.findOneAndUpdate(
    { email: body.email },
    { password: hashPassword }
  );
  console.log("data is " ,data);
  return data;
};
 
