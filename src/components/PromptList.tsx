import { Prompt } from "@/types";

type PromptListProps = {
  prompts: Prompt[];
};
export default function PromptList(props: PromptListProps) {
  const { prompts } = props;

  return (
    <ul className="divide-y divide-gray-200">
      {prompts.map((prompt) => (
        <li key={prompt.id} className="py-4 flex">
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 truncate">
              {prompt.name}
            </p>
            <p className="text-sm text-gray-500">{prompt.created_at}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
