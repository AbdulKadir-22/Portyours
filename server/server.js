const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./src/config/db");
connectDB();

const app = require("./src/index");

const PORT = process.env.PORT || 3000;
const appName = process.env.APP_NAME;

app.listen(PORT, (req, res) => {
  console.log(`${appName} is running on http://localhost:${PORT}`);
});
