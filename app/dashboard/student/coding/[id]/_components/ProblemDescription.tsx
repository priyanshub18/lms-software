"use client";

import { useState } from "react";
import { Book, Info } from "lucide-react";
import type { Problem } from "./types";

interface ProblemDescriptionProps {
  problem: Problem;
}

export default function ProblemDescription({ problem }: ProblemDescriptionProps) {
  const [activeTab, setActiveTab] = useState<"problem" | "hints">("problem");

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{problem.title}</h1>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            problem.difficulty === "Easy"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              : problem.difficulty === "Medium"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
          }`}
        >
          {problem.difficulty}
        </span>
      </div>

      <div className="flex border-b dark:border-gray-700">
        <button
          className={`flex items-center gap-2 px-4 py-2 ${
            activeTab === "problem"
              ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-400"
          }`}
          onClick={() => setActiveTab("problem")}
        >
          <Book size={16} />
          Problem
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 ${
            activeTab === "hints"
              ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-400"
          }`}
          onClick={() => setActiveTab("hints")}
        >
          <Info size={16} />
          Hints
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "problem" ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Description</h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{problem.description}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Examples</h2>
              <div className="space-y-4">
                {problem.examples.map((example, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Example {index + 1}:</p>
                    <div className="space-y-2">
                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Input:</span> {example.input}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Output:</span> {example.output}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Explanation:</span> {example.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Constraints</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                {problem.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {problem.hints.map((hint, index) => (
              <div key={index} className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="text-blue-800 dark:text-blue-300">
                  <span className="font-medium">Hint {index + 1}:</span> {hint}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 