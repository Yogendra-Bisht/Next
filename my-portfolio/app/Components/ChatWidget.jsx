"use client";
import { useState, useRef, useEffect } from "react";
import {
  Bot,
  User,
  Send,
  RefreshCw,
  X,
  Sparkles,
  MessageSquare,
  Volume2,
  VolumeX,
  Download,
  Briefcase,
  Code2,
  Rocket,
  Copy,
  Check
} from "lucide-react";

const INITIAL_GREETING = {
  role: "assistant",
  content:
    "Greetings! 👋 I'm **Yogendra's AI Assistant v2.5** powered by Groq LLaMA 3.1. Ask me anything about his DevOps & Cloud specializations (Linux, Docker, AWS), Next.js 16 projects (WordCatch, SRAP, Cosmos Dashboard), GitHub certification (GH-900), or job availability!",
};

const MODE_PRESETS = [
  { id: "all", label: "General Q&A", icon: Sparkles },
  { id: "recruiter", label: "💼 Recruiter View", icon: Briefcase, prompt: "Give me a 3-bullet executive summary of Yogendra's experience, degree, and job availability." },
  { id: "tech", label: "💻 DevOps & Tech Stack", icon: Code2, prompt: "Explain Yogendra's DevOps stack (Linux, Docker, AWS, CI/CD) and backend skills." },
  { id: "projects", label: "🚀 Flagship Projects", icon: Rocket, prompt: "What are Yogendra's top projects? Detail WordCatch (Manifest V3 extension) and SRAP." },
];

const QUICK_TOPICS = [
  { label: "⚡ DevOps & Skills", prompt: "What are Yogendra's key DevOps, Cloud, and Software engineering skills?" },
  { label: "🚀 Pinned Projects", prompt: "Tell me about Yogendra's flagship projects like WordCatch and SRAP." },
  { label: "📜 Certifications", prompt: "Tell me about his GitHub Foundations GH-900 certification." },
  { label: "✉️ Contact Info", prompt: "How can I contact Yogendra?" },
  { label: "💼 Job Availability", prompt: "Is Yogendra actively open for full-time engineering & DevOps roles?" },
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_GREETING]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const [activeMode, setActiveMode] = useState("all");

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
          mode: activeMode,
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

  const handleModeSwitch = (mode) => {
    setActiveMode(mode.id);
    if (mode.prompt) {
      sendMessage(mode.prompt);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClearChat = () => {
    window.speechSynthesis?.cancel();
    setSpeakingIndex(null);
    setMessages([INITIAL_GREETING]);
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleTextToSpeech = (text, index) => {
    if (!("speechSynthesis" in window)) return;

    if (speakingIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
    } else {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*#_\[\]()]/g, ""); // Strip markdown characters
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setSpeakingIndex(null);
      utterance.onerror = () => setSpeakingIndex(null);
      window.speechSynthesis.speak(utterance);
      setSpeakingIndex(index);
    }
  };

  const exportChatLog = () => {
    const chatLogText = messages
      .map((m) => `[${m.role.toUpperCase()}]: ${m.content}`)
      .join("\n\n---\n\n");
    const blob = new Blob([chatLogText], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Yogendra_AI_Chat_Transcript.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* === CHAT WINDOW === */}
      <div
        className={`
          fixed bottom-24 right-4 sm:right-6 z-50
          w-[calc(100vw-2rem)] sm:w-[420px]
          flex flex-col
          bg-[#022C22]/95 backdrop-blur-2xl
          border border-[#F8E7C9]/30 hover:border-[#F8E7C9]/60
          rounded-3xl shadow-2xl shadow-black/90
          overflow-hidden
          transition-all duration-300 ease-out
          ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-90 translate-y-6 pointer-events-none"
          }
        `}
        style={{ maxHeight: "80vh", height: "570px" }}
        aria-label="Advanced AI Chat Assistant"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#064E3B]/90 border-b border-[#F8E7C9]/20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-[#10B981]/30 animate-ping" />
              <div className="relative w-8 h-8 rounded-full bg-[#064E3B] border border-[#F8E7C9]/40 flex items-center justify-center text-lg shadow-md">
                <Sparkles className="w-4 h-4 text-[#F8E7C9]" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#34D399] rounded-full border-2 border-[#022C22]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-[#FAF4E8] leading-tight">Yogendra&apos;s AI</p>
                <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-[#F8E7C9]/20 text-[#F8E7C9] border border-[#F8E7C9]/30 rounded">
                  v2.5 Pro
                </span>
              </div>
              <p className="text-[11px] text-[#34D399] leading-tight mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] inline-block" />
                Online • Groq High-Speed AI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Export Chat Log */}
            {messages.length > 1 && (
              <button
                onClick={exportChatLog}
                title="Export Conversation Log (.md)"
                className="p-1.5 text-[#D4C3A3] hover:text-[#F8E7C9] hover:bg-[#064E3B] rounded-lg transition"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Clear Chat Button */}
            {messages.length > 1 && (
              <button
                onClick={handleClearChat}
                title="Reset conversation"
                className="p-1.5 text-[#D4C3A3] hover:text-[#F8E7C9] hover:bg-[#064E3B] rounded-lg transition"
                aria-label="Clear chat"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={() => {
                window.speechSynthesis?.cancel();
                setSpeakingIndex(null);
                setIsOpen(false);
              }}
              className="p-1.5 text-[#D4C3A3] hover:text-[#FAF4E8] hover:bg-[#064E3B] rounded-lg transition"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mode Switcher Bar */}
        <div className="px-3 py-1.5 bg-[#041C16] border-b border-[#F8E7C9]/15 flex items-center justify-between gap-1 overflow-x-auto shrink-0 scrollbar-none no-scrollbar">
          {MODE_PRESETS.map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => handleModeSwitch(mode)}
                className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition shrink-0 flex items-center gap-1 border ${
                  activeMode === mode.id
                    ? "bg-[#064E3B] text-[#F8E7C9] border-[#F8E7C9]/40 font-bold shadow"
                    : "text-[#D4C3A3]/70 border-transparent hover:text-[#FAF4E8] hover:bg-[#064E3B]/30"
                }`}
              >
                <Icon className="w-3 h-3 text-[#F8E7C9]" />
                {mode.label}
              </button>
            );
          })}
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
              onSpeak={toggleTextToSpeech}
              isSpeaking={speakingIndex === i}
            />
          ))}

          {/* Typing indicator */}
          {isStreaming && messages[messages.length - 1]?.content === "" && (
            <TypingIndicator />
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Topic Chips */}
        <div className="px-3 py-2 bg-[#022C22]/90 border-t border-[#F8E7C9]/10 shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            {QUICK_TOPICS.map((topic) => (
              <button
                key={topic.label}
                disabled={isStreaming}
                onClick={() => sendMessage(topic.prompt)}
                className="shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-[#064E3B]/40 border border-[#F8E7C9]/20 text-[#F8E7C9] hover:border-[#F8E7C9] hover:bg-[#F8E7C9] hover:text-[#022C22] transition disabled:opacity-50"
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
              placeholder="Ask about DevOps, Docker, AWS, Next.js, projects..."
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
          <p className="text-center text-[11px] text-[#D4C3A3]/60 mt-1.5">
            Powered by <span className="text-[#F8E7C9] font-medium">Groq High-Speed AI</span> • Real-time ⚡
          </p>
        </div>
      </div>

      {/* === FLOATING ACTION BUTTON === */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 group">
        {!isOpen && (
          <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-[#022C22] text-[#F8E7C9] text-xs font-semibold px-3 py-1.5 rounded-xl border border-[#F8E7C9]/30 shadow-lg">
            Chat with AI Assistant ✨
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

function MessageBubble({ message, index, onCopy, isCopied, onSpeak, isSpeaking }) {
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
      <div className="relative max-w-[84%]">
        <div
          className={`
            px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed
            ${
              isUser
                ? "bg-[#064E3B] text-[#FAF4E8] border border-[#F8E7C9]/20 rounded-br-xs shadow-md"
                : "bg-[#022C22]/90 text-[#F8E7C9]/90 border border-[#F8E7C9]/15 rounded-bl-xs shadow-md"
            }
          `}
        >
          {message.content ? (
            <FormattedText text={message.content} />
          ) : (
            <span className="text-[#F8E7C9]/50 italic text-xs">Processing prompt…</span>
          )}
        </div>

        {/* Action Controls for Assistant Bubble */}
        {!isUser && message.content && (
          <div className="absolute -right-14 top-1 opacity-0 group-hover/bubble:opacity-100 flex items-center gap-1 transition">
            {/* Copy Button */}
            <button
              onClick={() => onCopy(message.content, index)}
              title="Copy message"
              className="p-1 text-[#F8E7C9]/50 hover:text-[#F8E7C9] transition"
            >
              {isCopied ? (
                <span className="text-[10px] text-[#34D399] font-medium">Copied!</span>
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Read Aloud Button */}
            <button
              onClick={() => onSpeak(message.content, index)}
              title={isSpeaking ? "Stop listening" : "Read message aloud"}
              className={`p-1 transition ${isSpeaking ? "text-[#34D399]" : "text-[#F8E7C9]/50 hover:text-[#F8E7C9]"}`}
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5 animate-pulse text-[#34D399]" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
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

// Lightweight Markdown Formatter (Bold, Links, Bullet lists)
function FormattedText({ text }) {
  const renderFormattedLine = (line, lineIdx) => {
    const parts = [];
    let lastIndex = 0;

    const combinedRegex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
    let match;

    while ((match = combinedRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }

      if (match[1] && match[2]) {
        parts.push(
          <a
            key={`${lineIdx}-${match.index}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#34D399] underline underline-offset-2 hover:text-[#F8E7C9] font-semibold transition"
          >
            {match[1]}
          </a>
        );
      } else if (match[3]) {
        parts.push(
          <strong key={`${lineIdx}-${match.index}`} className="font-semibold text-[#FAF4E8]">
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
              <span className="text-[#34D399] text-xs mt-1">•</span>
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
