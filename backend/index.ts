import express from 'express';
import cors from 'cors';
import db from './models';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import 'dotenv/config';

const corsOptions = {
  origin: "*",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  headers: 'Content-Type, Authorization',
  exposedHeaders: 'Authorization',
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to CNAM application." });
});

// Use routes
app.use('/api', productRoutes);
app.use('/api', authRoutes);

// Sync database
db.sequelize.sync()
    .then(() => {
      console.log("Synced db.");
    })
    .catch((err: Error) => {
      console.log("Failed to sync db: " + err.message);
    });

const PORT = process.env.PORT || 443;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
