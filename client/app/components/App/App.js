import React, { Fragment, Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Header />
        <main>
          {this.props.children}
        </main>
        <Footer />
      </Fragment>
    )
  }

}


export default App;
