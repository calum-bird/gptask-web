export const createPrompt = async (name: string, prompt: string) => {
  return fetch("/api/prompt", {
    method: "POST",
    body: JSON.stringify({ name, prompt }),
  }).then((res) => res.json());
};

export const getPrompts = async () => {
  return fetch("/api/prompt")
    .then((res) => res.json())
    .then((res) => (res && res.prompts ? res.prompts : []));
};
