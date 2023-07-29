-- Create initial table for prompts --

CREATE TABLE prompt (
    id INTEGER PRIMARY KEY AUTOINCREMENT,                  -- prompt ids
    prompt TEXT NOT NULL,                                  -- prompt content
    user_id TEXT NOT NULL,                                 -- user id for auth
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP -- timestamp
);


-- Whoops, add a name column --
ALTER TABLE prompt ADD COLUMN name TEXT NOT NULL DEFAULT '';