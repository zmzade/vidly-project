import React from "react";
import { useParams, useHistory, withRouter } from "react-router-dom";
import Input from "./common/Input";
import Select from "./common/Select";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import Joi from "joi-browser";

const MovieForm = () => {
  const [data, setData] = React.useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  });
  const [genres, setGenres] = React.useState([]);
  const [errors, setErrors] = React.useState({});
  const { id } = useParams();
  const history = useHistory();

  const schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  };

  React.useEffect(() => {
    setGenres(getGenres());
    const movieId = id;
    if (movieId === "new") return;
    const movie = getMovie(movieId);

    if (!movie) history.replace("/Not-Found");
    setData({ data: mapToViewModel(movie) });
  }, [id, history]);

  const mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  const validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(data, schema, options);
    if (!result.error) return null;
    for (let item of result.error.details) {
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
    saveMovie(data);
    history.push("/movies");
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
          label="Title"
          name="title"
          value={data.title || ""}
          onChange={handleChange}
          error={errors.title}
        />
        <br />
        <Select
          label="Genre"
          name="genreId"
          value={data.genreId || ""}
          options={genres}
          onChange={handleChange}
          error={errors.genreId}
        />
        <br />
        <Input
          label="Number in Stock"
          name="numberInStock"
          value={data.numberInStock || ""}
          type="number"
          onChange={handleChange}
          error={errors.numberInStock}
        />
        <br />
        <Input
          label="Rate"
          name="dailyRentalRate"
          value={data.dailyRentalRate || ""}
          onChange={handleChange}
          error={errors.dailyRentalRate}
        />
        <button disabled={validate()} className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};
export default withRouter(MovieForm);
