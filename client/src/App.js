import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    response: "",
    counter: 0
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
    await this.getClick();
    return body;
  };

  clickHandler = async () => {
    await fetch("/api/click", {
      method: "post",
      body: JSON.stringify({ counter: this.state.counter + 1 }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    });
    this.getClick();
  };
  getClick = async () => {
    const clicks = await fetch("/api/click").then(res => res.json());
    this.setState({ counter: clicks });
  };
  resetHandler = () => fetch("/api/reset").then(this.getClick);

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">API Response: {this.state.response}</p>
        <h1>Counter</h1>
        <p>Sunburst.js</p>
        <p>You have clicked the button {this.state.counter} times.</p>
        <button onClick={this.clickHandler}>Click Me!</button>
        <button onClick={this.resetHandler}>Reset!</button>
      </div>
    );
  }
}

export default App;
