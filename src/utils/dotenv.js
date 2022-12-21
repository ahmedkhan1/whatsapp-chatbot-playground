const dotenv = require('dotenv');
const path = require("path");

/**
 * Config() will read the .env file, parse the contents,
 * assign it to process.env.
 * 
 * */
dotenv.config({ path: path.resolve(__dirname, '../../.env') })
