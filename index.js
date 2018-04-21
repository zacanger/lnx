#!/usr/bin/env node

const { exit } = require('zeelib')

if (module.parent) exit(1)
else require('./src')()
