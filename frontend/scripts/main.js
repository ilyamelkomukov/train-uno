'use strict';

console.log('Hello js');

// if a cdn jquery isn`t available
if (!window.JQuery) {
  document.write("<script src='/scripts/jquery.js'></script>");
}
