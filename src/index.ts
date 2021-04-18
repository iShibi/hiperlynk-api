import express from 'express';
import mongoose from 'mongoose';
import { HYPR_ATLAS_URI } from './config.js';
import { linksRouter } from './routes/links.js';

mongoose
  .connect(HYPR_ATLAS_URI as string, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Atlas database'))
  .catch(err => console.log(err));

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server listening to http://localhost:${PORT}`);
});

app.use('/links', linksRouter);
