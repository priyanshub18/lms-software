"use client";

import { useState } from "react";
import CodeEditor from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { Play, Send } from "lucide-react";

interface CodeEditorProps {
  code: string;
  language: string;
  onCodeChange: (value: string) => void;
  onRunTests: () => void;
  onSubmit: () => void;
  darkMode: boolean;
}

export default function CodeEditorComponent({
  code,
  language,
  onCodeChange,
  onRunTests,
  onSubmit,
  darkMode,
}: CodeEditorProps) {
  const [editorInstance, setEditorInstance] = useState<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    setEditorInstance(editor);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 relative">
        <CodeEditor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => onCodeChange(value || "")}
          theme={darkMode ? "vs-dark" : "light"}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 18,
            tabSize: 2,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: "on",
            lineNumbers: "on",
            renderWhitespace: "selection",
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </div>
      <div className="flex justify-end gap-4 p-4 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700">
        <button
          onClick={onRunTests}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <Play size={16} />
          Run Tests
        </button>
        <button
          onClick={onSubmit}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          <Send size={16} />
          Submit
        </button>
      </div>
    </div>
  );
} 