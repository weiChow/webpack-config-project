"use strict";

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import logo from '../../static/images/1571201205606.jpg';

class Index extends Component {

  render() {
    return (
      <div className='search'>
        <p>NEUROPOL</p>
        <span>NEUROPOL</span>
        <div className='logoContainer'>
          <img src={logo} alt="logo"/>
        </div>
        <section className='flexBox'>
          <div>flexBox-children-one</div>
          <div>flexBox-children-two</div>
        </section>
      </div>
    );
  }
}

ReactDOM.render(<Index/>, document.getElementById('root'));