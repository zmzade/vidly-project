import React from "react";
import Input from "./common/Input";
import Joi from "joi-browser";

export default function RegisterForm() {
  const [data, setData] = React.useState({
    username: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = React.useState({});

  const schema = {
    username: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .label("Usename"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
      return errors;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (errors) {
      setErrors({ ...errors, errors });
      return;
    }

    // call the server
    console.log("Submitted");
  };

  const validateProperty = (input) => {
    const obj = { [input.name]: input.value };
    const newSchema = { [input.name]: schema[input.name] };
    const result = Joi.validate(obj, newSchema);
    return result.error ? result.error.details[0].message : null;
  };

  const handleChange = ({ target: input }) => {
    const errorMessage = validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    setErrors({ ...errors, errors });
    setData({ ...data, [input.name]: input.value });
  };

  return (
    <div className="form-box">
      <form className="form" onSubmit={handleSubmit}>
        <Input
          label="Username"
          name="username"
          value={data.username}
          error={errors.username}
          onChange={handleChange}
        />
        <Input
          label="Password"
          name="password"
          value={data.password}
          error={errors.password}
          type="password"
          onChange={handleChange}
        />
        <Input
          label="Name"
          name="name"
          value={data.name}
          error={errors.name}
          onChange={handleChange}
        />
        <button disabled={validate()} className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}
