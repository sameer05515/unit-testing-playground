require('dotenv').config();

const GIT_REPO = process.env.GIT_REPO || "D:/GIT";

const CgptProjectRoot = process.env.CGPT_PROJECT_ROOT || `${GIT_REPO}/microservices-playground/example-base-03/fontend/chat-gpt-conversation`;

const CGPT_SNAPSHOT_FILE_LOCATION = process.env.CGPT_SNAPSHOT_FILE_LOCATION || `${CgptProjectRoot}/src/common/utils/snapshots.json`;

const PDF_DIRECTORY_PATH = process.env.PDF_DIRECTORY_PATH || "D:/prem/comics";

const TEST_DIR = process.env.TEST_DIR || "D:/v-dir";

const PORT = process.env.PORT || 3000;

const NODE_ENV = process.env.NODE_ENV || 'development';

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;

const MAX_REQUEST_SIZE = process.env.MAX_REQUEST_SIZE || '10mb';

const RATE_LIMIT_WINDOW_MS = process.env.RATE_LIMIT_WINDOW_MS || '900000';

const RATE_LIMIT_MAX_REQUESTS = process.env.RATE_LIMIT_MAX_REQUESTS || '100';

module.exports = { 
  GIT_REPO, 
  CgptProjectRoot, 
  CGPT_SNAPSHOT_FILE_LOCATION,
  PDF_DIRECTORY_PATH,
  TEST_DIR,
  PORT,
  NODE_ENV,
  ALLOWED_ORIGINS,
  MAX_REQUEST_SIZE,
  RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX_REQUESTS
};
