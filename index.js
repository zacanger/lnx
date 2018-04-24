#!/usr/bin/env node

const { exit } = require('zeelib')

if (module.parent) {
  console.error('lnx is a command-line application. please execute lnx.')
  exit(1)
}

require('./src')
