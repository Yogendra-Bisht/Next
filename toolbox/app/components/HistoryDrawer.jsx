"use client";
import React, { useState, useEffect } from "react";
import { History, Copy, Trash2, X, Clock } from "lucide-react";
import { useToast } from "./ToastContext";

export const saveToHistory = (item) => {
  try {
    const existing = JSON.parse(localStorage.getItem("omnitoolbox_history") || "[]");
    const newItem = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...item,
    };
    const updated = [newItem, ...existing].slice(0, 30); // Keep last 30 items
    localStorage.setItem("omnitoolbox_history", JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("history-updated"));
  } catch (err) {
    console.error("Failed to save history", err);
  }
};

export default function HistoryDrawer({ isOpen, onClose }) {
  const [history, setHistory] = useState([]);
  const { addToast } = useToast();

  const loadHistory = () => {
    try {
      const items = JSON.parse(localStorage.getItem("omnitoolbox_history") || "[]");
      setHistory(items);
    } catch {
      setHistory([]);
    }
  };

  useEffect(() => {
    if (isOpen) loadHistory();
    const handleUpdate = () => loadHistory();
    window.addEventListener("history-updated", handleUpdate);
    return () => window.removeEventListener("history-updated", handleUpdate);
  }, [isOpen]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    addToast("Copied from history to clipboard!");
  };

  const handleClear = () => {
    localStorage.removeItem("omnitoolbox_history");
    setHistory([]);
    addToast("History cleared", "info");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-md h-full bg-slate-900 border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <History className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">Activity History</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-slate-400 mt-3">
            Stored locally in your browser for privacy. Shows last 30 activities.
          </p>

          {/* History Items List */}
          <div className="mt-6 space-y-3 max-h-[70vh] overflow-y-auto pr-1">
            {history.length > 0 ? (
              history.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                        {item.tool}
                      </span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="font-mono text-sm text-slate-200 truncate select-all">
                      {item.val}
                    </p>
                    {item.detail && (
                      <p className="text-xs text-slate-500 mt-0.5">{item.detail}</p>
                    )}
                  </div>

                  <button
                    onClick={() => handleCopy(item.val)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all shrink-0 active:scale-95"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-16 text-center text-slate-500">
                <History className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">No activity logged yet.</p>
                <p className="text-xs mt-1 text-slate-600">Generated items will automatically appear here.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        {history.length > 0 && (
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={handleClear}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-400 font-semibold text-sm transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Clear Local History
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
