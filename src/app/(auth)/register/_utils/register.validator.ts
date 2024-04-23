import { JoiInstance } from '@global/validator';

const pattern = {
  password: (value: string, helpers: any) => {
    if (value.length < 8) {
      return helpers.message('Password must be at least 8 characters');
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
      return helpers.message('Password must contain at least 1 letter and 1 number');
    }
    return value;
  },
  email: (value: string, helpers: any) => {
    if (!value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      return helpers.message('Please provide a valid email');
    }
    return value;
  },
};

export const RegisterSchema = JoiInstance.object({
  userName: JoiInstance.string().min(4).required(),
  // .messages({ 'string.min': 'Username must have at least one character', 'string.requi' }),
  passWord: JoiInstance.string().min(6).required(),
  fullName: JoiInstance.string().min(5).required(),
  email: JoiInstance.string().min(1).required(),
  phone: JoiInstance.string().min(10).required(),
  address: JoiInstance.string().min(1).required()

});