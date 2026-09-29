const { buildPdfJobs } = require('./src/batchJobs');
const { runPdfJobs } = require('./src/runPdfJobs');

runPdfJobs(buildPdfJobs());
