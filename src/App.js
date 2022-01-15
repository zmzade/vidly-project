import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Movies from "./components/Movies";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import MovieForm from "./components/MovieForm";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/react-toastify.esm";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <NavBar />
      <main>
        <Switch>
          <Route path="/register">
            <RegisterForm />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/customers">
            <Customers />
          </Route>
          <Route path="/movies/:id">
            <MovieForm />
          </Route>
          <Route path="/rentals">
            <Rentals />
          </Route>
          <Route path="/Not-Found">
            <NotFound />
          </Route>
          <Route path="/movies">
            <Movies />
          </Route>
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/Not-Found" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
