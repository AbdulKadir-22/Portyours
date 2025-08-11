const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
connectDB();

const app = require("./index");

const PORT = process.env.PORT || 3000;
const appName = process.env.APP_NAME;

app.listen(PORT, (req, res) => {
  console.log(`${appName} is running on http://localhost:${PORT}`);
});
