#!/usr/bin/env node
/** Export the current generated route list for shell- and Python-based QA. */
const { getAllRoutes } = require('../src/data');
process.stdout.write(`${getAllRoutes().map((route) => route.path).join('\n')}\n`);
