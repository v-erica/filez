import db from "#db/client";

export async function createFile({ name, size, folder_id }) {
  const sql = `
  INSERT INTO files
    (name, size, folder_id)
  VALUES
    ($1, $2, $3)
  RETURNING *;
  `;
  const {
    rows: [file],
  } = await db.query(sql, [name, size, folder_id]);
  return file;
}

export async function getFiles() {
  const sql = `
  SELECT 
  i.*,
  f.name as folder_name
  FROM files i
  LEFT JOIN folders f
  ON i.folder_id = f.id;
  `;

  const { rows: files } = await db.query(sql);
  return files;
}

export async function getFile(id) {
  const sql = `
  SELECT *
  FROM files
  WHERE id = $1;
  `;

  const {
    rows: [file],
  } = await db.query(sql, [id]);
  return file;
}
