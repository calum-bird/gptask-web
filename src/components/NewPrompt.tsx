import { createPrompt } from "@/lib/client/crud";
import { classNames } from "@/util";
import {
  Bars4Icon,
  ClockIcon,
  TableCellsIcon,
  SpeakerWaveIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const docsWriterPrompt = `Your sole job is to write documentation for the code provided. Please only return the code, with succinct and useful docstrings added. Do not include a markdown code block header or anything like that, only output the code with new/updated docs. Include parameters, a short description, and the returns field, all using JSDoc formatting as exists already. Overwrite the existing docs, as they are likely low-quality. It is critical that you include the existing code in your response, and append the docstrings as necessary.`;

const betterLanguagePrompt = `You are a junior developer at a company that is trying to clean up their codebase of obscene language. You have been tasked with simply finding every swear word you can, and replacing it with an absolutely hilarious replacement. You must ensure that all existing code is maintained, but find and replace swear words as mentioned above. You got this!`;

const simplifyCodePrompt = `You are a senior developer who is trying to clean up the work of a summer intern. Your goal is to simplify complex expressions if they're too long, and to remove any unnecessary comments. You must ensure that all existing code functionality is maintained, but simplify any complex expressions and remove any unnecessary comments. You may only use existing variables, though you can rename them to be more clear.`;

const spacesToTabsPrompt = `You are a junior developer at a company that has a tendancy to use spaces instead of tabs to indent code. To show off to a senior coworker whom you'd like to replace one day, you have made it your sole mission to turn spaces into tabs. If you find any spaces used for indentation, immediately turn them into tabs. Make sure all code is kept exactly as it was (other than terrible indentation, of course).`;

const items = [
  {
    name: "Docs Writer",
    description: "Rewrite docstrings and improve your documentation instantly.",
    prompt: docsWriterPrompt,
    icon: Bars4Icon,
    background: "bg-pink-500",
  },
  {
    name: "Better Language",
    description: "Remove vulgar language before your boss sees it!",
    prompt: betterLanguagePrompt,
    icon: SpeakerWaveIcon,
    background: "bg-yellow-500",
  },
  {
    name: "Simplify Code",
    description: "We get it, your code is impossible to read. We can help!",
    prompt: simplifyCodePrompt,
    icon: TableCellsIcon,
    background: "bg-indigo-500",
  },
  {
    name: "Spaces to tabs",
    description: "Show your coworkers you care, with this one simple trick.",
    prompt: spacesToTabsPrompt,
    icon: ClockIcon,
    background: "bg-purple-500",
  },
];

type NewPromptFormProps = {
  name: string;
  setName: (name: string) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
  setIsCreatingPrompt: (isCreatingPrompt: boolean) => void;
};
export const NewPromptForm = (props: NewPromptFormProps) => {
  const { name, setName, prompt, setPrompt, setIsCreatingPrompt } = props;
  const [loading, setLoading] = useState(false);

  const getRowCount = (prompt: string) => {
    // First, check if newlines are present, and count them if so
    if (prompt.indexOf("\n") > -1) {
      return prompt.split("\n").length * 2;
    }

    // Otherwise, count the number of characters and divide by 80
    return prompt.length / 80 + 2;
  };

  return (
    <form className="relative">
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="block w-full border-0 py-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
          placeholder="Doc-reviewer 3000..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="w-full border-t border-gray-300" />
        <label htmlFor="description" className="sr-only">
          Prompt
        </label>
        <textarea
          rows={getRowCount(prompt)}
          name="description"
          id="description"
          className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Your job is to review my docs and prove me right..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="h-px" />
          <div className="py-2">
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-px bottom-0">
        <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <div className="flex-shrink-0">
            <button
              className="inline-flex items-center rounded-md bg-gray-100 border border-gray-500 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:pointer-events-none mr-2"
              onClick={() => setIsCreatingPrompt(false)}
            >
              Cancel
            </button>
            <button
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:pointer-events-none"
              onClick={() => {
                setLoading(true);
                createPrompt(name, prompt)
                  .then(() => {
                    setLoading(false);
                    setIsCreatingPrompt(false);
                  })
                  .catch(() => {
                    alert("Something went wrong. Please try again.");
                    setLoading(false);
                  });
              }}
              disabled={loading}
            >
              Create
              {loading ? (
                <ArrowPathIcon className="inline w-5 h-5 ml-2" />
              ) : null}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default function NewPrompt() {
  const [promptName, setPromptName] = useState<string>("");
  const [promptContent, setPromptContent] = useState<string>("");
  const [isCreatingPrompt, setIsCreatingPrompt] = useState<boolean>(false);

  const selectTemplate = (name?: string) => {
    const template = items.find((item) => item.name === name);
    if (template) {
      setPromptName(template.name);
      setPromptContent(template.prompt);
    } else {
      setPromptName("");
      setPromptContent("");
    }

    setIsCreatingPrompt(true);
  };

  return isCreatingPrompt ? (
    <NewPromptForm
      name={promptName}
      setName={setPromptName}
      prompt={promptContent}
      setPrompt={setPromptContent}
      setIsCreatingPrompt={setIsCreatingPrompt}
    />
  ) : (
    <div>
      <h2 className="text-base font-semibold leading-6 text-gray-900">
        You don&apos;t have any prompts!
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Let&apos;s get started by selecting a template, or start from an empty
        prompt. Don&apos;t worry, you&apos;ll be able to edit these later.
      </p>
      <ul
        role="list"
        className="mt-6 grid grid-cols-1 gap-6 border-b border-t border-gray-200 py-6 sm:grid-cols-2"
      >
        {items.map((item, itemIdx) => (
          <li
            key={itemIdx}
            className="flow-root"
            onClick={() => selectTemplate(item.name)}
          >
            <div className="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
              <div
                className={classNames(
                  item.background,
                  "flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg"
                )}
              >
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  <a href="#" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <span>{item.name}</span>
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex">
        <a
          onClick={() => selectTemplate("")}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Or start from an empty prompt
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </div>
  );
}
