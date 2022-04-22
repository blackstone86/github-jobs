import { useState, useEffect } from "react";

const terms:string[] = [
  "GitHub",
  "JavaScript",
  "Java",
  "Python",
  "Rust",
  "Design",
  "Developer",
  "Engineer",
  "InVision",
];

const SuggestionsAPI = {
  load(keyword: string): Promise<string[]> {
    return new Promise((resolve) => {
      if (keyword.length === 0) resolve([]);
      else
        setTimeout(() => {
          resolve(terms.filter((term: string) =>
            term.toLowerCase().includes(keyword.toLowerCase())
          ));
        }, 500);
    });
  },
};

export function useSearchSuggestions(keyword: string) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    SuggestionsAPI.load(keyword).then((result: string[]) => {
      setSuggestions(result);
      setIsLoading(false);
    });
  }, [keyword]);
  return { suggestions, isLoading };
}
