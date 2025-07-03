const express = require("express");
const cors = require("cors");
const sequelize = require('./database/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Login API is active" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!"})
});

// Sync database and start server
const StartServer = async () => {
  try { 
    // Sync all models with database
    await sequelize.sync({ alter: true})
    console.log('Database synced succesfully')
  
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })

  } catch ( error ) { 
    console.error( 'Unable to start server:', error)
  }

}

StartServer()
