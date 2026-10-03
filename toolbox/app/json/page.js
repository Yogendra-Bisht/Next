"use client";
import React, { useState } from "react";
import { ArrowLeft, FileCode, Copy, Check, Code, Play, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useToast } from "../components/ToastContext";
import { saveToHistory } from "../components/HistoryDrawer";

const SAMPLE_JSON = `{
  "user": {
    "id": 101,
    "name": "Alex Mercer",
    "role": "Lead Engineer",
    "active": true,
    "skills": ["Next.js", "TypeScript", "TailwindCSS"]
  },
  "status": "success"
}`;

function jsonToTypeScript(jsonObj, rootName = "RootObject") {
  let interfaces = [];

  function getType(val) {
    if (val === null) return "any";
    if (Array.isArray(val)) {
      if (val.length === 0) return "any[]";
      const itemType = getType(val[0]);
      return `${itemType}[]`;
    }
    const type = typeof val;
    if (type === "object") return "object";
    return type;
  }

  function parseObject(obj, name) {
    let keys = Object.keys(obj);
    let fields = keys.map((key) => {
      let val = obj[key];
      let valType = getType(val);

      if (valType === "object" && val !== null && !Array.isArray(val)) {
        let childName = key.charAt(0).toUpperCase() + key.slice(1);
        parseObject(val, childName);
        valType = childName;
      }

      return `  ${key}: ${valType};`;
    });

    interfaces.push(`export interface ${name} {\n${fields.join("\n")}\n}`);
  }

  try {
    parseObject(jsonObj, rootName);
    return interfaces.reverse().join("\n\n");
  } catch {
    return "// Unable to generate TypeScript interface";
  }
}

export default function JsonPage() {
  const [inputJson, setInputJson] = useState(SAMPLE_JSON);
  const [outputFormatted, setOutputFormatted] = useState("");
  const [outputTs, setOutputTs] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState("formatted"); // "formatted" or "ts"
  const [copied, setCopied] = useState(false);

  const { addToast } = useToast();

  const handleFormat = (spaces = 2) => {
    try {
      setErrorMsg("");
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, spaces);
      setOutputFormatted(formatted);

      const ts = jsonToTypeScript(parsed);
      setOutputTs(ts);

      addToast("JSON formatted successfully!");
      saveToHistory({ tool: "JSON Tool", val: "Valid JSON Formatted", detail: `${Object.keys(parsed).length} Root Keys` });
    } catch (err) {
      setErrorMsg(err.message);
      setOutputFormatted("");
      setOutputTs("");
      addToast("Invalid JSON syntax", "error");
    }
  };

  const handleMinify = () => {
    try {
      setErrorMsg("");
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setOutputFormatted(minified);
      addToast("JSON minified!");
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    addToast("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4 pt-24 pb-16 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="relative w-full max-w-4xl">
        
        {/* Back link */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 w-fit"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to Hub</span>
        </Link>

        {/* Main Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/15 rounded-2xl border border-emerald-500/30 text-emerald-400">
                <FileCode size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">JSON & TypeScript Studio</h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                  Format, validate JSON & auto-generate TypeScript interfaces
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setInputJson(SAMPLE_JSON);
                setErrorMsg("");
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
            >
              Load Sample
            </button>
          </div>

          {/* Code Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Column */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span>Raw JSON Input</span>
              </div>
              <textarea
                rows={14}
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
                placeholder="Paste JSON here..."
                className="w-full p-4 rounded-2xl border border-slate-700 bg-slate-950 font-mono text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            {/* Output Column */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex p-1 rounded-xl bg-slate-950 border border-slate-800">
                  <button
                    onClick={() => setActiveTab("formatted")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === "formatted" ? "bg-emerald-500/20 text-emerald-300" : "text-slate-400"
                    }`}
                  >
                    Formatted JSON
                  </button>
                  <button
                    onClick={() => setActiveTab("ts")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === "ts" ? "bg-emerald-500/20 text-emerald-300" : "text-slate-400"
                    }`}
                  >
                    TS Interface
                  </button>
                </div>

                <button
                  onClick={() => handleCopy(activeTab === "formatted" ? outputFormatted : outputTs)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white transition-colors"
                  title="Copy Output"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              <textarea
                rows={14}
                readOnly
                value={activeTab === "formatted" ? outputFormatted : outputTs}
                placeholder="Click 'Format JSON' to generate output..."
                className="w-full p-4 rounded-2xl border border-slate-800 bg-slate-950 font-mono text-xs text-emerald-300 focus:outline-none"
              />
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => handleFormat(2)}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white text-sm shadow-xl shadow-emerald-600/20 cursor-pointer"
            >
              <Play size={16} />
              Format JSON (2 Spaces)
            </button>
            <button
              onClick={handleMinify}
              className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 font-bold text-slate-200 text-sm cursor-pointer"
            >
              Minify JSON
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
