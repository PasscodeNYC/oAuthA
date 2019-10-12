const path = require('path')

function component() {
    const element = document.createElement('div');
  
    element.innerHTML = 'Hello from webpack'
  
    return element;
  }
  
// document.body.appendChild(component());