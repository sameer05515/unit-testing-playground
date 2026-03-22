const { createPdfFromImages } = require('./createPdfFromImages');

/**
 * Runs PDF creation for each job in parallel (same behavior as original forEach + catch).
 * @param {{ inputFolder: string, outputFolder: string, outputFileName: string }[]} jobs
 */
function runPdfJobs(jobs) {
  for (const job of jobs) {
    createPdfFromImages(job).catch(err => {
      console.error('Error creating PDF:', err);
    });
  }
}

module.exports = { runPdfJobs };
