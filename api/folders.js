import express from "express";
const router = express.Router();
export default router;

import { createFile } from "#db/queries/files";
import { getFolders, getFolder } from "#db/queries/folders";

router.get("/", fetchFolders);

async function fetchFolders(req, res) {
  const folders = await getFolders();
  res.send(folders);
}

router.param("id", fetchFolderId);

async function fetchFolderId(req, res, next, id) {
  const folder = await getFolder(id);

  if (!folder) {
    return res.status(404).send("Folder not found.");
  }

  req.folder = folder;
  next();
}

router.get("/:id", (req, res) => {
  res.send(req.folder);
});

router.post("/:id/files", postFile);

async function postFile(req, res) {
  if (!req.body) return res.status(400).send("Request body not provided.");

  const { name, size } = req.body;

  if (!name || !size)
    return res.status(400).send("Missing required field (name, size)");

  const file = await createFile({
    name: name,
    size: size,
    folder_id: req.folder.id,
  });
  res.status(201).send(file);
}
