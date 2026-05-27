import React, { useEffect, useRef } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';

interface MonacoEditorProps {
  value: string;
  language: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

export const MonacoEditor: React.FC<MonacoEditorProps> = ({
  value,
  language,
  onChange,
  readOnly = false,
}) => {
  const editorRef = useRef<any>(null);

  // Map custom language ID to Monaco supported IDs
  const getMonacoLanguage = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'javascript':
        return 'javascript';
      case 'typescript':
        return 'typescript';
      case 'java':
        return 'java';
      case 'python':
        return 'python';
      default:
        return 'plaintext';
    }
  };

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;

    // Define custom premium theme matching our background: #0B0F14
    monaco.editor.defineTheme('collabcode-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'ff79c6' },
        { token: 'identifier', foreground: 'f8f8f2' },
        { token: 'string', foreground: 'f1fa8c' },
        { token: 'number', foreground: 'bd93f9' },
        { token: 'operator', foreground: 'ff79c6' },
      ],
      colors: {
        'editor.background': '#0B0F14',
        'editor.foreground': '#F8FAFC',
        'editor.lineHighlightBackground': '#1A2332/30',
        'editorLineNumber.foreground': '#4f5d75',
        'editorLineNumber.activeForeground': '#3B82F6',
        'editor.selectionBackground': '#3B82F6/20',
        'editor.inactiveSelectionBackground': '#3B82F6/10',
      },
    });

    monaco.editor.setTheme('collabcode-dark');
  };

  const handleEditorChange = (val: string | undefined) => {
    if (val !== undefined) {
      onChange(val);
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-brand-bg rounded-lg border border-brand-border">
      <Editor
        height="100%"
        width="100%"
        language={getMonacoLanguage(language)}
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        loading={
          <div className="absolute inset-0 flex items-center justify-center bg-brand-bg text-brand-secondary gap-3">
            <svg className="animate-spin h-5 w-5 text-brand-blue" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-widest font-space-grotesk animate-pulse">
              Initializing Workspace...
            </span>
          </div>
        }
        options={{
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
          fontLigatures: true,
          minimap: { enabled: false },
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            verticalScrollbarSize: 6,
            horizontalScrollbarSize: 6,
          },
          lineNumbers: 'on',
          roundedSelection: true,
          scrollBeyondLastLine: false,
          readOnly: readOnly,
          automaticLayout: true,
          cursorBlinking: 'smooth',
          cursorStyle: 'line',
          formatOnType: true,
          tabSize: 4,
          padding: { top: 12, bottom: 12 },
        }}
      />
    </div>
  );
};

export default MonacoEditor;
