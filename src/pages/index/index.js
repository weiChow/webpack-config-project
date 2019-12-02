"use strict";

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.less';

// 接收热更新输出，只有accept才能被更新
if (module.hot) {
  module.hot.accept();
}

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