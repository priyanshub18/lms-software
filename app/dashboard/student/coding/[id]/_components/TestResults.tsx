"use client";

import { CheckCircle, XCircle } from "lucide-react";
import type { TestResults as TestResultsType } from "./types";

interface TestResultsProps {
  results: TestResultsType | null;
}

export default function TestResults({ results }: TestResultsProps) {
  if (!results) return null;

  const progressPercentage = ((results.passed / (results.passed + results.failed)) * 100) || 0;

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Test Results</h2>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {results.passed} passed, {results.failed} failed
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {results.testCases.map((testCase) => (
            <div
              key={testCase.id}
              className={`p-4 rounded-lg border ${
                testCase.status === "passed"
                  ? "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {testCase.status === "passed" ? (
                  <CheckCircle className="text-green-500" size={16} />
                ) : (
                  <XCircle className="text-red-500" size={16} />
                )}
                <span
                  className={`font-medium ${
                    testCase.status === "passed"
                      ? "text-green-700 dark:text-green-300"
                      : "text-red-700 dark:text-red-300"
                  }`}
                >
                  {testCase.name}
                </span>
              </div>
              {testCase.expected && testCase.actual && (
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Expected:</span> {testCase.expected}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Actual:</span> {testCase.actual}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 