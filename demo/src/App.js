import React from "react";
import { render } from "react-dom";
import "./App.css";

export default class App extends React.Component {
  state = {
    count: 0,
    isCounting: false,
  };

  componentDidUpdate() {
    console.log("componentDidUpdate");
    localStorage.setItem("timer", this.state.count);
  }
  componentDidMount() {
    console.log("componentDidMount");
    const userCount = localStorage.getItem("timer");
    if (userCount) {
      this.setState({ count: +userCount });
    }
  }
  componentWillUnmount() {
    console.log("componentWillunMount");
    clearInterval(this.countrID);
  }
  handleStart = () => {
    this.setState({ isCounting: true });
    this.countrID = setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);
  };
  handleStop = () => {
    this.setState({ isCounting: false });
    clearInterval(this.countrID);
  };
  handleReset = () => {
    clearInterval(this.countrID);
    this.setState({ isCounting: false });
    this.setState({ count: 0 });
  };

  render() {
    return (
      <div className="App">
        <p>React Timer</p>
        <p>{this.state.count}</p>
        {!this.state.isCounting ? (
          <button className="success" onClick={this.handleStart}>
            Start
          </button>
        ) : (
          <button className="danger" onClick={this.handleStop}>
            Stop
          </button>
        )}
        <button className="secondary" onClick={this.handleReset}>
          Reset
        </button>
      </div>
    );
  }
}
