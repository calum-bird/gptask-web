import { createClient } from "@libsql/client";

// load up Turso deets
const TURSO_DB_URL = process.env.TURSO_DB_URL;
const TURSO_DB_AUTH_TOKEN = process.env.TURSO_DB_AUTH_TOKEN;
if (!TURSO_DB_URL || !TURSO_DB_AUTH_TOKEN) {
  throw new Error("Missing TURSO_DB_URL or TURSO_DB_AUTH_TOKEN");
}

const client = createClient({
  url: TURSO_DB_URL,
  authToken: TURSO_DB_AUTH_TOKEN,
});

export const createPrompt = async (
  name: string,
  prompt: string,
  user_id: string
) => {
  const { rows } = await client.execute({
    sql: "INSERT INTO prompt (name, prompt, user_id) VALUES (:name, :prompt, :user_id)",
    args: { name, prompt, user_id },
  });
  return rows[0];
};

export const getPrompts = async (user_id: string) => {
  const { rows } = await client.execute({
    sql: "SELECT * FROM prompt WHERE user_id = :user_id",
    args: { user_id },
  });
  return rows;
};

export const updatePrompt = async (
  id: number,
  name: string,
  prompt: string,
  user_id: string
) => {
  const { rows } = await client.execute({
    sql: "UPDATE prompt SET prompt = :prompt, name = :name WHERE id = :id AND user_id = :user_id",
    args: { id, name, prompt, user_id },
  });
  return rows[0];
};
