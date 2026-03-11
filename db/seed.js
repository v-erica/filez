import db from "#db/client";
import { createFolder } from "./queries/folders.js";
import { createFile } from "./queries/files.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const folderNames = ["folder_a", "folder_b", "folder_c"];

  for (const folderName of folderNames) {
    const folder = await createFolder(folderName);

    for (let i = 1; i <= 5; i++) {
      await createFile({
        name: `file_${i}`,
        size: i * 100,
        folder_id: folder.id,
      });
    }
  }
}
