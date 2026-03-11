import express from "express";
const router = express.Router();
export default router;

import { getFiles } from "#db/queries/files";

router.get("/", fetchFiles);

async function fetchFiles(req, res) {
  const files = await getFiles();
  return res.status(200).send(files);
}
