import React, { Component } from "react";
import "whatwg-fetch";
import styles from "./styles.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      script: "",
      option: "c",
      result: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit() {
    console.log(this.state.script);
    console.log(this.state.option);
    fetch("http://ssal.sparcs.org:16200/api/compile/script", {
      method: "POST",
      body: JSON.stringify({
        script: `${this.state.script}`,
        option: this.state.option
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          result: json.result.stdout
        });
      });
  }

  render() {
    return (
      <>
        <div>
          <textarea
            onChange={this.handleChange}
            name="script"
            value={this.state.script}
          />
          <select
            name="option"
            onChange={this.handleChange}
            value={this.state.option}
            name="option"
          >
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="js">Javascript</option>
          </select>
          <button onClick={this.handleSubmit}>코드 돌리기</button>
          <div>{this.state.result}</div>
        </div>
      </>
    );
  }
}

export default Home;
