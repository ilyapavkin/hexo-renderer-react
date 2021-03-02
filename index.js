/* global hexo */
'use strict'

var compile = require('./dist/compile').default

function renderer (data, locals) {
  return compile(data)(locals)
}

renderer.compile = compile

hexo.extend.renderer.register('jsx', 'html', renderer, true);
hexo.extend.renderer.register('tsx', 'html', renderer, true);
