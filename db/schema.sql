DROP TABLE IF EXISTS files;
DROP TABLE IF EXISTS folders;

CREATE TABLE folders (
    id serial primary KEY,
    name text unique not null
);

CREATE TABLE files (
    id serial primary KEY,
    name text not null,
    size int not null,
    folder_id int not null REFERENCES folders(id) ON DELETE CASCADE,
    UNIQUE(name, folder_id)
);
