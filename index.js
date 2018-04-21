#!/usr/bin/env node

const lnx = require('./src')

const main = () => {
  lnx()
}

if (!module.parent) main()
