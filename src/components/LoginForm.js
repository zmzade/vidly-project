import React from "react";
import Joi from "joi-browser";
import Input from "./common/Input";

export default function LoginForm() {
  const [data, setData] = React.useState({ username: "", password: "" });
  const [errors, setErrors] = React.useState({});

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const validate = () => {
    const options = { abortEarly: false };
    //result=> {error}, object destructuring
    const { error } = Joi.validate(data, schema, options);
    //(!result.error) &(result.error.message)
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
      return errors;
    }

    // const errors = {};
    // if (data.username.trim() === "")
    //   errors.username = "Username is required.";
    // if (data.password.trim() === "")
    //   errors.password = "Password is required.";
    // return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (errors) {
      setErrors({ ...errors, errors: errors || {} });
      return;
    }

    // call the server
    console.log("Submitted");
  };
  const validateproperty = (input) => {
    const obj = { [input.name]: input.value };
    const newSchema = { [input.name]: schema[input.name] };
    const result = Joi.validate(obj, newSchema);
    return result.error ? result.error.details[0].message : null;

    // if (input.name === "username") {
    //   if (input.value.trim() === "") return "Username is required";
    // }
    // if (input.name === "password") {
    //   if (input.value.trim() === "") return "Password is required";
    // }
  };
  const handleChange = ({ target: input }) => {
    const errorMessage = validateproperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    setErrors({ ...errors, errors });
    setData({ ...data, [input.name]: input.value });
  };

  return (
    <div className="form-box">
      <form className="form" onSubmit={handleSubmit}>
        <Input
          name="username"
          label="Username"
          value={data.username}
          onChange={handleChange}
          error={errors.username}
        />
        <Input
          name="password"
          label="Password"
          value={data.password}
          onChange={handleChange}
          error={errors.password}
          type="password"
        />
        <button disabled={validate()} className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
