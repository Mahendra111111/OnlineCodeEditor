import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Editor2 from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import { api_base_url } from "../helper";
import { toast } from "react-toastify";

const Editor = () => {
  const [code, setCode] = useState(""); // State to hold the code
  const { id } = useParams(); // Extract project ID from URL params
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  // Fetch project data on mount
  useEffect(() => {
    fetch(`${api_base_url}/getProject`, {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        projectId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCode(data.project.code); // Set the fetched code
          setData(data.project);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => {
        console.error("Error fetching project:", err);
        toast.error("Failed to load project.");
      });
  }, [id]);

  // Save project function
  const saveProject = () => {
    const trimmedCode = code?.toString().trim();
    fetch(`${api_base_url}/saveProject`, {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        projectId: id,
        code: trimmedCode,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        data.success
          ? toast.success("Code saved successfully!")
          : toast.error("Failed to save code.");
      })
      .catch((err) => {
        console.error("Error saving project:", err);
        toast.error("Error: Could not save the project.");
      });
  };

  // Keyboard shortcut (Ctrl+S) for saving
  useEffect(() => {
    const handleSaveShortcut = (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        saveProject();
      }
    };
    window.addEventListener("keydown", handleSaveShortcut);
    return () => {
      window.removeEventListener("keydown", handleSaveShortcut);
    };
  }, [code]);

  // Run project function
  const runProject = () => {
    fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: data?.projLanguage,
        version: data?.version,
        files: [
          {
            filename:
              data?.name +
              (data?.projLanguage === "python"
                ? ".py"
                : data?.projLanguage === "java"
                ? ".java"
                : data?.projLanguage === "javascript"
                ? ".js"
                : data?.projLanguage === "c"
                ? ".c"
                : data?.projLanguage === "cpp"
                ? ".cpp"
                : data?.projLanguage === "bash"
                ? ".sh"
                : ""),
            content: code,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOutput(data.run.output);
        setError(data.run.code === 1);
      });
  };

  return (
    <>
      <Navbar />
      {/* Fix: Added mt-[70px] to push the editor below navbar */}
      <div className="mt-[70px] flex flex-col sm:flex-row items-stretch justify-between h-[calc(100vh-70px)]">
        {/* Left Section - Code Editor */}
        <div className="w-full sm:w-1/2 h-full flex flex-col">
          <Editor2
            onChange={(newCode) => setCode(newCode || "")}
            theme="vs-dark"
            height="100%"
            width="100%"
            language="python"
            value={code}
          />
        </div>

        {/* Right Section - Output */}
        <div className="w-full sm:w-1/2 h-full bg-[#27272a] p-4 flex flex-col">
          <div className="flex pb-3 border-b border-[#1e1e1f] items-center justify-between px-4">
            <p className="text-lg text-white">Output</p>
            <div className="flex gap-2">
              {/* Run Button - Improved */}
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all font-medium shadow-md"
                onClick={runProject}
                title="Run Code"
              >
                ▶ Run
              </button>

              {/* Save Button */}
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all font-medium shadow-md"
                onClick={saveProject}
                title="Save Code"
              >
                💾 Save
              </button>
            </div>
          </div>
          <pre
            className={`flex-1 overflow-auto p-4 bg-[#1e1e1f] rounded-lg ${
              error ? "text-red-500" : "text-white"
            }`}
            style={{ whiteSpace: "pre-wrap" }}
          >
            {output}
          </pre>
        </div>
      </div>
    </>
  );
};

export default Editor;
