import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { graphql } from "react-apollo";
import gql from "graphql-tag";

// Example query from https://www.graph.cool/
const MOVIE_QUERY = gql`
  {
    Movie(id: "cixos5gtq0ogi0126tvekxo27") {
      id
      title
      actors {
        name
      }
    }
  }
`;

class App extends Component {
  state = {
    response: ""
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    const { data } = this.props;
    const { loading, Movie } = data;

    // Loading
    if (loading) return <div>loading...</div>;

    // Loaded
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">API Response: {this.state.response}</p>
        <p>
          <b>{Movie.title}</b> :{" "}
          {Movie.actors.map(({ name }) => name).join(", ")}
        </p>
      </div>
    );
  }
}

export default graphql(MOVIE_QUERY)(App);
