"use strict";

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.less';

class Index extends Component {

  render() {
    return (
      <div className='index'>
        <p>首页</p>
      </div>
    );
  }
}

ReactDOM.render(<Index/>, document.getElementById('root'));