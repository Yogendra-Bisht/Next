"use client";
import { useState, useRef, useEffect } from "react";

const BOT_AVATAR = "🤖";
const USER_AVATAR = "🧑";

const INITIAL_GREETING = {
  role: "assistant",
  content:
    "Hey there! 👋 I'm **Yogendra's AI Assistant** powered by Groq. Ask me anything about his skills, projects, certifications, or background!",
};

const QUICK_TOPICS = [
  { label: "⚡ Key Skills", prompt: "What are Yogendra's key technical skills?" },
  { label: "📁 Projects", prompt: "Show me Yogendra's top projects and live demos." },
  { label: "📜 Certifications", prompt: "Tell me about his GitHub certification." },
  { label: "✉️ Contact", prompt: "How can I contact Yogendra?" },
  { label: "💼 Availability", prompt: "Is Yogendra open for work or internships?" },
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_GREETING]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  const sendMessage = async (customPrompt) => {
    const textToSend = typeof customPrompt === "string" ? customPrompt : input.trim();
    if (!textToSend || isStreaming) return;

    const userMessage = { role: "user", content: textToSend };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsStreaming(true);

    // Add empty assistant message to stream into
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: `⚠️ Error: ${err.error || "Something went wrong. Please try again."}`,
          };
          return updated;
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: updated[updated.length - 1].content + chunk,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "⚠️ Network error. Please check your connection and try again.",
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_GREETING]);
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
      {/* === CHAT WINDOW === */}
      <div
        className={`
          fixed bottom-24 right-4 sm:right-6 z-50
          w-[calc(100vw-2rem)] sm:w-[410px]
          flex flex-col
          bg-slate-950/90 backdrop-blur-xl
          border border-slate-700/80 hover:border-cyan-500/50
          rounded-3xl shadow-2xl shadow-cyan-500/10
          overflow-hidden
          transition-all duration-300 ease-out
          ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-90 translate-y-6 pointer-events-none"
          }
        `}
        style={{ maxHeight: "78vh", height: "540px" }}
        aria-label="AI Chat Assistant"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 bg-slate-900/90 border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-cyan-500/30 animate-ping" />
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 border border-cyan-400/40 flex items-center justify-center text-lg shadow-md shadow-cyan-500/20">
                🤖
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-white leading-tight">Yogendra&apos;s AI</p>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-md">
                  v2.0
                </span>
              </div>
              <p className="text-xs text-emerald-400 leading-tight mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                Online • Powered by Groq
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Clear Chat Button */}
            {messages.length > 1 && (
              <button
                onClick={handleClearChat}
                title="Reset conversation"
                className="p-1.5 text-gray-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition"
                aria-label="Clear chat"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
              aria-label="Close chat"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth">
          {messages.map((msg, i) => (
            <MessageBubble
              key={i}
              message={msg}
              index={i}
              onCopy={handleCopy}
              isCopied={copiedIndex === i}
            />
          ))}

          {/* Typing indicator */}
          {isStreaming && messages[messages.length - 1]?.content === "" && (
            <TypingIndicator />
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Topic Chips */}
        <div className="px-3 py-2 bg-slate-900/60 border-t border-slate-800/80 shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            {QUICK_TOPICS.map((topic) => (
              <button
                key={topic.label}
                disabled={isStreaming}
                onClick={() => sendMessage(topic.prompt)}
                className="shrink-0 text-xs px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-200 transition disabled:opacity-50"
              >
                {topic.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="px-3 py-3 bg-slate-900 border-t border-slate-800 shrink-0">
          <div className="flex items-end gap-2 bg-slate-950 border border-slate-700/80 rounded-2xl px-3 py-2 focus-within:border-cyan-500/70 focus-within:ring-1 focus-within:ring-cyan-500/30 transition">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${Math.min(e.target.scrollHeight, 96)}px`;
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask about skills, projects, resume..."
              disabled={isStreaming}
              className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 resize-none outline-none leading-5 max-h-24 disabled:opacity-50"
              style={{ height: "20px" }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={isStreaming || !input.trim()}
              className="shrink-0 mb-0.5 p-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-gray-500 text-white shadow-md shadow-cyan-500/20 transition disabled:cursor-not-allowed disabled:shadow-none"
              aria-label="Send message"
            >
              {isStreaming ? (
                <svg className="w-4 h-4 animate-spin text-cyan-300" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-center text-[11px] text-gray-500 mt-2">
            Powered by <span className="text-cyan-400 font-medium">Groq</span> • LLaMA 3.1 ⚡
          </p>
        </div>
      </div>

      {/* === FLOATING ACTION BUTTON === */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 group">
        {/* Tooltip badge on hover */}
        {!isOpen && (
          <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-slate-900 text-cyan-300 text-xs font-semibold px-3 py-1.5 rounded-xl border border-cyan-500/30 shadow-lg">
            Chat with AI ✨
          </div>
        )}

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`
            relative w-14 h-14 rounded-full shadow-2xl
            flex items-center justify-center
            transition-all duration-300 transform
            ${
              isOpen
                ? "bg-slate-800 text-white rotate-0 shadow-slate-950/80 border border-slate-700"
                : "bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:scale-110 shadow-cyan-500/40"
            }
          `}
          aria-label={isOpen ? "Close chat" : "Open AI chat assistant"}
        >
          {/* Glowing ring animation when closed */}
          {!isOpen && (
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-40 blur-sm animate-pulse" />
          )}

          {/* Unread notification badge */}
          {hasUnread && !isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-950 flex items-center justify-center text-[9px] font-bold text-slate-950 shadow">
              1
            </span>
          )}

          {/* Toggle Icons */}
          <span
            className={`absolute transition-all duration-200 ${
              isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"
            }`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>

          <span
            className={`absolute transition-all duration-200 ${
              !isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
            }`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </span>
        </button>
      </div>
    </>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function MessageBubble({ message, index, onCopy, isCopied }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex items-end gap-2 group/bubble ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-sm border ${
        isUser
          ? "bg-cyan-900/60 border-cyan-500/40 text-white"
          : "bg-slate-800 border-slate-700 text-white"
      }`}>
        {isUser ? USER_AVATAR : BOT_AVATAR}
      </div>

      {/* Bubble Content */}
      <div className="relative max-w-[82%]">
        <div
          className={`
            px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed
            ${
              isUser
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-xs shadow-md shadow-cyan-600/10"
                : "bg-slate-900/90 text-gray-200 border border-slate-800 rounded-bl-xs shadow-md"
            }
          `}
        >
          {message.content ? (
            <FormattedText text={message.content} />
          ) : (
            <span className="text-gray-400 italic text-xs">Thinking…</span>
          )}
        </div>

        {/* Copy Button for Assistant */}
        {!isUser && message.content && (
          <button
            onClick={() => onCopy(message.content, index)}
            title="Copy message"
            className="absolute -right-7 top-1 opacity-0 group-hover/bubble:opacity-100 p-1 text-gray-500 hover:text-cyan-400 transition"
          >
            {isCopied ? (
              <span className="text-[10px] text-emerald-400 font-medium">Copied!</span>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs bg-slate-800 border border-slate-700">
        {BOT_AVATAR}
      </div>
      <div className="bg-slate-900 border border-slate-800 px-4 py-3 rounded-2xl rounded-bl-xs flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }}
          />
        ))}
      </div>
    </div>
  );
}

// Lightweight Markdown Formatter (Bold, Links, Bullet lists, Inline Code)
function FormattedText({ text }) {
  // Replace links [label](url)
  const renderFormattedLine = (line, lineIdx) => {
    const parts = [];
    let lastIndex = 0;

    // Regex for markdown links [text](url) and bold **text**
    const combinedRegex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
    let match;

    while ((match = combinedRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }

      if (match[1] && match[2]) {
        // Link match
        parts.push(
          <a
            key={`${lineIdx}-${match.index}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300 font-medium transition"
          >
            {match[1]}
          </a>
        );
      } else if (match[3]) {
        // Bold match
        parts.push(
          <strong key={`${lineIdx}-${match.index}`} className="font-semibold text-white">
            {match[3]}
          </strong>
        );
      }

      lastIndex = combinedRegex.lastIndex;
    }

    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }

    return parts;
  };

  const lines = text.split("\n");

  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const bulletContent = trimmed.slice(2);
          return (
            <div key={i} className="flex items-start gap-1.5 ml-1">
              <span className="text-cyan-400 text-xs mt-1">•</span>
              <span>{renderFormattedLine(bulletContent, i)}</span>
            </div>
          );
        }
        return (
          <p key={i} className="min-h-[1.2em]">
            {renderFormattedLine(line, i)}
          </p>
        );
      })}
    </div>
  );
}
