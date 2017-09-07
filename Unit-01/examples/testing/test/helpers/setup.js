require('babel-register')
require('babel-polyfill')

// setup JSDOM for 
global.document = require('jsdom').jsdom('<body><div id="app"></div></body>')
global.window = document.defaultView
global.navigator = window.navigator
