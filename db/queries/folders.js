import db from "#db/client";

export async function createFolder(name) {
  const sql = `
  insert into folders 
    (name)
  VALUES 
    ($1)
  RETURNING *;`;

  const {
    rows: [folder],
  } = await db.query(sql, [name]);
  return folder;
}

export async function getFolders() {
  const sql = `
    select *
    from folders`;

  const { rows: folders } = await db.query(sql);
  return folders;
}

export async function getFolder(id) {
  const sql = `
    select 
    f.*,
    coalesce(
        (select json_agg(i)
        from files i
        where f.id = i.folder_id)
        ,'[]'::json) as files
    from folders f
    where f.id = $1`;

  const {
    rows: [folder],
  } = await db.query(sql, [id]);

  return folder;
}
