import validatejs from "validate.js";

const validation = {
  username: {
    presence: {
      message: '^Please enter an username'
    },
    email: {
      message: "^Hãy nhập một email đúng"
    }
  },
  email: {
    email: {
      message: "^Hãy nhập một email đúng"
    }
  },
  phone: {
    format: {
      pattern: "(\\+84|0)\\d{9,10}",
      flags: "g",
      message: "^Hãy nhập một số điện thoại đúng"
    }
  },
  tax: {
    format: {
      pattern: "^\\d+$",
      flags: "g",
      message: "^Hãy nhập một mã số thuế"
    }
  },
  string: {
    length: {
      minimum: 1,
      message: '^Không được bỏ trống'
    }
  },
  password: {
    presence: {
      message: '^Please enter a password'
    },
    length: {
      minimum: 1,
      message: '^Mật khẩu cần phải lớn hơn 1 kí tự'
    }
  }
};

export default function validate(fieldName, value) {

  let formValues = {};
  formValues[fieldName] = value;

  let formFields = {};
  formFields[fieldName] = validation[fieldName];

  const result = validatejs(formValues, formFields);

  if (result) {
    return result[fieldName][0];
  }
  return null
}