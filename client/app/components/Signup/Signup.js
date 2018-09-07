import React, { Component, Fragment } from 'react';
import 'whatwg-fetch';
import styles from './styles.scss';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.newCounter = this.newCounter.bind(this);
    this.change = this.change.bind(this);
  }
  change (e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  newCounter() {
    fetch('/api/counters', { method: 'POST' })
      .then(res => res.json())
      .then(json => {
        let data = this.state.counters;
        data.push(json);

        this.setState({
          counters: data
        });
      });
  }
  render() {
    return (
      <Fragment>
        <form method="post" className={styles.formWrapper} action="/api/auth/signup">
            <input name="username" value={this.username} type="username" onChange={this.change} className={styles.input}/>
            <input name="password" value={this.password} type="password" onChange={this.change} className={styles.input}/>
            <input type="submit" className={styles.button} value="회원가입" />
        </form>
      </Fragment>
    );
  }
}

export default Home;
