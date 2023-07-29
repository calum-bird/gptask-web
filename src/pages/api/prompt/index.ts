import { createPrompt, getPrompts } from "@/lib/server/crud";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return getAll(req, res);
  } else if (req.method === "POST") {
    return post(req, res);
  } else {
    console.log("method not allowed");
    return res.status(405).json({ error: "Method not allowed" });
  }
}

const getAll = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const rows = await getPrompts(userId);
  return res.status(200).json({ prompts: rows });
};

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = getAuth(req);
  if (!userId) {
    console.log("no user id");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { name, prompt }: { name: string; prompt: string } = JSON.parse(
    req.body
  );
  if (!prompt || !name) {
    return res.status(400).json({ error: "Bad request" });
  }

  const row = await createPrompt(name, prompt, userId);
  return res.status(200).json({ prompt: row });
};
