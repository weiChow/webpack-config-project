"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from "react-hot-loader";
import IndexComponent from './component/banner/IndexComponent.js';

const root = document.getElementById("root");
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    root
  );
};

render(IndexComponent);

module.hot.accept('./component/banner/IndexComponent.js', () => {
  const nextIndexComponent = require('./component/banner/IndexComponent.js').default;
  render(nextIndexComponent);
});