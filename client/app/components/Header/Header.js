import React, {Fragment, Component} from 'react';
import './styles.scss';

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: ""
    }
  }

  componentDidMount () {
    fetch("/myinfo").then(res => res.json()).then(json => {
      this.setState({
        username: json.username
      })
    })
  }

  render() {
    return (
      <header className="headerWrapper">
        <div className="serviceName">
          Webditor
        </div>
        <div className="userName">
          {this.state.username}
        </div>
      </header>
    )
  }
}


export default Header;
