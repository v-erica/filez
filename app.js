import express from "express";
const app = express();
export default app;

import fileRouter from "#api/files";
import folderRouter from "#api/folders";

app.use(express.json());

app.use("/files", fileRouter);
app.use("/folders", folderRouter);

app.use((err, req, res, next) => {
  // Unique constraint violation
  if (err.code === "23505") {
    return res.status(400).send(err.detail);
  }

  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
