#!/usr/bin/env node

if (module.parent) {
  console.error('lnx is a command-line application. please execute lnx.')
  process.exit(1)
}

require('./src')
