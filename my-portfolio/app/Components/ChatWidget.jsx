"use client";
import { useState, useRef, useEffect } from "react";
import { Bot, User, Send, RefreshCw, X, Sparkles, MessageSquare } from "lucide-react";

const INITIAL_GREETING = {
  role: "assistant",
  content:
    "Greetings! 👋 I'm **Yogendra's AI Assistant** powered by Groq. Ask me anything about his full-stack skills, Next.js projects, GitHub certifications, or availability!",
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
          bg-[#022C22]/95 backdrop-blur-xl
          border border-[#F8E7C9]/25 hover:border-[#F8E7C9]/50
          rounded-3xl shadow-2xl shadow-black/80
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
        <div className="flex items-center justify-between px-4 py-3.5 bg-[#064E3B]/80 border-b border-[#F8E7C9]/15 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-[#10B981]/30 animate-ping" />
              <div className="relative w-9 h-9 rounded-full bg-[#064E3B] border border-[#F8E7C9]/40 flex items-center justify-center text-lg shadow-md">
                <Sparkles className="w-4 h-4 text-[#F8E7C9]" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10B981] rounded-full border-2 border-[#022C22]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-[#FAF4E8] leading-tight">Yogendra&apos;s AI</p>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-[#F8E7C9]/15 text-[#F8E7C9] border border-[#F8E7C9]/30 rounded-md">
                  v2.0
                </span>
              </div>
              <p className="text-xs text-[#34D399] leading-tight mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] inline-block" />
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
                className="p-1.5 text-[#D4C3A3] hover:text-[#F8E7C9] hover:bg-[#064E3B] rounded-lg transition"
                aria-label="Clear chat"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-[#D4C3A3] hover:text-[#FAF4E8] hover:bg-[#064E3B] rounded-lg transition"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
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
        <div className="px-3 py-2 bg-[#022C22]/80 border-t border-[#F8E7C9]/10 shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            {QUICK_TOPICS.map((topic) => (
              <button
                key={topic.label}
                disabled={isStreaming}
                onClick={() => sendMessage(topic.prompt)}
                className="shrink-0 text-xs px-2.5 py-1 rounded-full bg-[#064E3B]/40 border border-[#F8E7C9]/20 text-[#F8E7C9] hover:border-[#F8E7C9] hover:bg-[#F8E7C9] hover:text-[#022C22] transition disabled:opacity-50"
              >
                {topic.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="px-3 py-3 bg-[#022C22] border-t border-[#F8E7C9]/15 shrink-0">
          <div className="flex items-end gap-2 bg-[#064E3B]/30 border border-[#F8E7C9]/20 rounded-2xl px-3 py-2 focus-within:border-[#F8E7C9] focus-within:ring-1 focus-within:ring-[#F8E7C9]/30 transition">
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
              className="flex-1 bg-transparent text-sm text-[#FAF4E8] placeholder-[#D4C3A3]/50 resize-none outline-none leading-5 max-h-24 disabled:opacity-50"
              style={{ height: "20px" }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={isStreaming || !input.trim()}
              className="shrink-0 mb-0.5 p-2 rounded-xl bg-[#F8E7C9] text-[#022C22] hover:bg-[#FAF4E8] disabled:bg-[#064E3B]/40 disabled:text-[#D4C3A3]/40 font-bold shadow-md shadow-[#F8E7C9]/10 transition disabled:cursor-not-allowed disabled:shadow-none"
              aria-label="Send message"
            >
              {isStreaming ? (
                <RefreshCw className="w-4 h-4 animate-spin text-[#022C22]" />
              ) : (
                <Send className="w-4 h-4 text-[#022C22]" />
              )}
            </button>
          </div>
          <p className="text-center text-[11px] text-[#D4C3A3]/60 mt-2">
            Powered by <span className="text-[#F8E7C9] font-medium">Groq</span> • LLaMA 3.1 ⚡
          </p>
        </div>
      </div>

      {/* === FLOATING ACTION BUTTON === */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 group">
        {!isOpen && (
          <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-[#022C22] text-[#F8E7C9] text-xs font-semibold px-3 py-1.5 rounded-xl border border-[#F8E7C9]/30 shadow-lg">
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
                ? "bg-[#064E3B] text-[#FAF4E8] border border-[#F8E7C9]/40 shadow-black/80"
                : "bg-[#F8E7C9] text-[#022C22] hover:scale-110 shadow-[#F8E7C9]/25"
            }
          `}
          aria-label={isOpen ? "Close chat" : "Open AI chat assistant"}
        >
          {!isOpen && (
            <span className="absolute -inset-1 rounded-full bg-[#F8E7C9] opacity-30 blur-sm animate-pulse" />
          )}

          {hasUnread && !isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#10B981] rounded-full border-2 border-[#022C22] flex items-center justify-center text-[9px] font-bold text-[#022C22] shadow">
              1
            </span>
          )}

          {isOpen ? <X className="w-6 h-6 text-[#FAF4E8]" /> : <MessageSquare className="w-6 h-6 text-[#022C22]" />}
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
          ? "bg-[#064E3B] border-[#F8E7C9]/30 text-[#F8E7C9]"
          : "bg-[#022C22] border-[#34D399]/30 text-[#34D399]"
      }`}>
        {isUser ? <User className="w-3.5 h-3.5 text-[#F8E7C9]" /> : <Bot className="w-3.5 h-3.5 text-[#34D399]" />}
      </div>

      {/* Bubble Content */}
      <div className="relative max-w-[82%]">
        <div
          className={`
            px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed
            ${
              isUser
                ? "bg-[#064E3B] text-[#FAF4E8] border border-[#F8E7C9]/20 rounded-br-xs shadow-md"
                : "bg-[#022C22]/90 text-[#F8E7C9]/90 border border-[#F8E7C9]/10 rounded-bl-xs shadow-md"
            }
          `}
        >
          {message.content ? (
            <FormattedText text={message.content} />
          ) : (
            <span className="text-[#F8E7C9]/50 italic text-xs">Thinking…</span>
          )}
        </div>

        {/* Copy Button for Assistant */}
        {!isUser && message.content && (
          <button
            onClick={() => onCopy(message.content, index)}
            title="Copy message"
            className="absolute -right-7 top-1 opacity-0 group-hover/bubble:opacity-100 p-1 text-[#F8E7C9]/40 hover:text-[#F8E7C9] transition"
          >
            {isCopied ? (
              <span className="text-[10px] text-[#34D399] font-medium">Copied!</span>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
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
      <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs bg-[#022C22] border border-[#34D399]/30 text-[#34D399]">
        <Bot className="w-3.5 h-3.5 text-[#34D399]" />
      </div>
      <div className="bg-[#022C22] border border-[#F8E7C9]/10 px-4 py-3 rounded-2xl rounded-bl-xs flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 bg-[#34D399] rounded-full animate-bounce"
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
