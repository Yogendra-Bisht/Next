"use client";
import { useState, useRef, useEffect } from "react";

const BOT_AVATAR = "🤖";
const USER_AVATAR = "🧑";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey there! 👋 I'm Yogendra's AI assistant. Ask me anything about his skills, projects, or background!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatWindowRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    const userMessage = { role: "user", content: trimmed };
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

  return (
    <>
      {/* === CHAT WINDOW === */}
      <div
        ref={chatWindowRef}
        className={`
          fixed bottom-24 right-4 sm:right-6 z-50
          w-[calc(100vw-2rem)] sm:w-96
          flex flex-col
          bg-slate-900 border border-slate-700
          rounded-2xl shadow-2xl shadow-black/60
          overflow-hidden
          transition-all duration-300 ease-in-out
          ${isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
          }
        `}
        style={{ maxHeight: "70vh", height: "520px" }}
        aria-label="AI Chat Assistant"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-lg">
                🤖
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-800" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-tight">AI Assistant</p>
              <p className="text-xs text-emerald-400 leading-tight">Online • Knows about Yogendra</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition"
            aria-label="Close chat"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth">
          {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} />
          ))}

          {/* Typing indicator — shown while streaming but last message is empty */}
          {isStreaming && messages[messages.length - 1]?.content === "" && (
            <TypingIndicator />
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions (shown only when 1 message = greeting) */}
        {messages.length === 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
            {[
              "What are his top skills?",
              "Tell me about his projects",
              "Is he open to work?",
            ].map((q) => (
              <button
                key={q}
                onClick={() => {
                  setInput(q);
                  setTimeout(() => inputRef.current?.focus(), 0);
                }}
                className="text-xs px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-cyan-300 hover:border-cyan-500/50 hover:bg-slate-700 transition"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="px-3 py-3 bg-slate-800/60 border-t border-slate-700 shrink-0">
          <div className="flex items-end gap-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 focus-within:border-cyan-500/60 transition">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                // Auto-resize
                e.target.style.height = "auto";
                e.target.style.height = `${Math.min(e.target.scrollHeight, 96)}px`;
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about Yogendra..."
              disabled={isStreaming}
              className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 resize-none outline-none leading-5 max-h-24 disabled:opacity-50"
              style={{ height: "20px" }}
            />
            <button
              onClick={sendMessage}
              disabled={isStreaming || !input.trim()}
              className="shrink-0 mb-0.5 p-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-gray-500 text-white transition disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              {isStreaming ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
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
          <p className="text-center text-xs text-gray-600 mt-2">Powered by GPT-4o mini</p>
        </div>
      </div>

      {/* === FLOATING BUTTON === */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`
          fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50
          w-14 h-14 rounded-full shadow-2xl shadow-cyan-500/30
          flex items-center justify-center
          transition-all duration-300
          ${isOpen
            ? "bg-slate-700 hover:bg-slate-600 rotate-0"
            : "bg-cyan-600 hover:bg-cyan-500 hover:scale-110"
          }
        `}
        aria-label={isOpen ? "Close chat" : "Open AI chat assistant"}
      >
        {/* Pulse ring when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-cyan-500 animate-ping opacity-20" />
        )}

        {/* Unread dot */}
        {hasUnread && !isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-950 flex items-center justify-center text-[9px] font-bold text-slate-900">
            1
          </span>
        )}

        {/* Icon toggles */}
        <span
          className={`absolute transition-all duration-200 ${isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"}`}
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
        <span
          className={`absolute transition-all duration-200 ${!isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`}
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </span>
      </button>
    </>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm bg-slate-800 border border-slate-700">
        {isUser ? USER_AVATAR : BOT_AVATAR}
      </div>

      {/* Bubble */}
      <div
        className={`
          max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
          ${isUser
            ? "bg-cyan-600 text-white rounded-br-sm"
            : "bg-slate-800 text-gray-200 border border-slate-700 rounded-bl-sm"
          }
        `}
      >
        {message.content || (
          <span className="text-gray-500 italic text-xs">Thinking…</span>
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm bg-slate-800 border border-slate-700">
        {BOT_AVATAR}
      </div>
      <div className="bg-slate-800 border border-slate-700 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
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
