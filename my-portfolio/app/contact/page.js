"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Send,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  Briefcase,
  Terminal,
  Zap,
  Globe
} from "lucide-react";

const GithubIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const InstagramIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.225-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.644-.069-4.849 0-3.204.012-3.584.069-4.849.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const INQUIRY_TOPICS = [
  { label: "💼 Full-Time Job Offer", text: "Hi Yogendra, I have a full-time engineering/DevOps opportunity that aligns with your background..." },
  { label: "🚀 DevOps & Cloud Project", text: "Hi Yogendra, I need assistance setting up Docker containers, CI/CD pipelines, or AWS deployment..." },
  { label: "💻 Web Application", text: "Hi Yogendra, I'm looking to build a modern React / Next.js web application..." },
  { label: "☕ Tech Chat & Networking", text: "Hi Yogendra, I checked out your portfolio and wanted to connect!" },
];

export default function Contact() {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateIST = () => {
      const options = { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit" };
      setCurrentTime(new Date().toLocaleTimeString("en-US", options) + " IST");
    };
    updateIST();
    const interval = setInterval(updateIST, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic.label);
    setMessageContent(topic.text);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("bishtyogendra96436372@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("");

    const formData = new FormData(event.target);
    formData.append("access_key", "3c6e30ef-c56b-4d9f-846a-ebca66772a87");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();

      if (data.success) {
        setResult("Success! Your message has been dispatched to Yogendra's inbox.");
        event.target.reset();
        setMessageContent("");
        setSelectedTopic("");
      } else {
        setResult("Error! Something went wrong while sending.");
      }
    } catch {
      setResult("Error! Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative isolate px-4 sm:px-6 pt-12 lg:px-8 min-h-screen pb-24">
      
      {/* Subtle Background Glow */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#064E3B] to-[#10B981] opacity-25 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="mx-auto max-w-6xl py-8">
        
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#064E3B]/60 border border-[#F8E7C9]/30 text-[#F8E7C9] text-xs font-semibold tracking-wide shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
            Active Signal · Monitoring Communications
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#FAF4E8] sm:text-5xl">
            Let&apos;s Build <span className="text-[#F8E7C9] font-serif italic">Together</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#D4C3A3] max-w-xl mx-auto leading-relaxed">
            Have a project, job opportunity, or DevOps infrastructure query? Dispatch a message or copy direct contact credentials below.
          </p>
        </motion.div>

        {/* 2-Column Creative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column — Interactive Cards & Quick Copy */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {/* Quick Email Copy Card */}
            <div className="p-6 bg-gradient-to-br from-[#064E3B]/60 via-[#043327] to-[#022C22] border border-[#F8E7C9]/30 rounded-3xl backdrop-blur-xl shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#064E3B] border border-[#F8E7C9]/30 flex items-center justify-center text-[#F8E7C9]">
                  <Mail className="w-5 h-5 text-[#F8E7C9]" />
                </div>
                <span className="text-[10px] uppercase font-mono font-bold text-[#34D399] bg-[#10B981]/15 px-2.5 py-1 rounded-full border border-[#10B981]/30">
                  Primary Mail
                </span>
              </div>
              <div>
                <p className="text-xs text-[#D4C3A3]/70 font-mono">Direct Email Address</p>
                <p className="text-sm sm:text-base font-bold text-[#FAF4E8] mt-0.5 break-all">
                  bishtyogendra96436372@gmail.com
                </p>
              </div>
              <button
                onClick={copyEmail}
                className="w-full py-2.5 px-4 rounded-xl bg-[#022C22] border border-[#F8E7C9]/25 hover:border-[#F8E7C9] text-xs font-semibold text-[#F8E7C9] transition duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-[#34D399]" />
                    <span className="text-[#34D399]">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#F8E7C9]" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Location & Timezone Card */}
            <div className="p-6 bg-[#022C22]/85 border border-[#F8E7C9]/20 rounded-3xl backdrop-blur-xl shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#FAF4E8]">
                  <MapPin className="w-4 h-4 text-[#F8E7C9]" />
                  <span>Uttarakhand, India</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#F8E7C9] font-mono bg-[#064E3B]/50 px-3 py-1 rounded-full border border-[#F8E7C9]/20">
                  <Clock className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>{currentTime || "UTC +5:30"}</span>
                </div>
              </div>
              <p className="text-xs text-[#D4C3A3]/80 leading-relaxed">
                Open for remote roles globally as well as on-site positions in India. Flexible with international work shifts.
              </p>
            </div>

            {/* Direct Social Grid */}
            <div className="p-6 bg-[#022C22]/85 border border-[#F8E7C9]/20 rounded-3xl backdrop-blur-xl shadow-xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F8E7C9] block mb-1">
                Direct Profiles
              </span>
              <div className="grid grid-cols-3 gap-3">
                <a
                  href="https://linkedin.com/in/yogendra-bisht-7b4b63288"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#064E3B]/40 border border-[#F8E7C9]/20 hover:border-[#F8E7C9] hover:bg-[#064E3B] transition duration-300 group shadow"
                >
                  <LinkedinIcon className="w-5 h-5 text-[#F8E7C9] group-hover:scale-110 transition duration-300 mb-1" />
                  <span className="text-[11px] font-semibold text-[#FAF4E8]">LinkedIn</span>
                </a>
                <a
                  href="https://github.com/Yogendra-Bisht"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#064E3B]/40 border border-[#F8E7C9]/20 hover:border-[#F8E7C9] hover:bg-[#064E3B] transition duration-300 group shadow"
                >
                  <GithubIcon className="w-5 h-5 text-[#F8E7C9] group-hover:scale-110 transition duration-300 mb-1" />
                  <span className="text-[11px] font-semibold text-[#FAF4E8]">GitHub</span>
                </a>
                <a
                  href="https://www.instagram.com/_yogibisht_?igsh=MXdrN29mZHV0dTJ4eQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#064E3B]/40 border border-[#F8E7C9]/20 hover:border-[#F8E7C9] hover:bg-[#064E3B] transition duration-300 group shadow"
                >
                  <InstagramIcon className="w-5 h-5 text-[#F8E7C9] group-hover:scale-110 transition duration-300 mb-1" />
                  <span className="text-[11px] font-semibold text-[#FAF4E8]">Instagram</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column — Interactive Message Console */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-[#022C22]/90 backdrop-blur-2xl border border-[#F8E7C9]/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              
              {/* Form Console Header */}
              <div className="flex items-center justify-between border-b border-[#F8E7C9]/15 pb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#F8E7C9]" />
                  <span className="text-xs font-mono font-bold text-[#F8E7C9]">dispatch-message.sh</span>
                </div>
                <span className="text-[11px] text-[#34D399] font-mono flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Web3Forms API Active
                </span>
              </div>

              {/* Quick Preset Selector Buttons */}
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-[#F8E7C9] mb-2.5">
                  Select Quick Inquiry Topic:
                </span>
                <div className="flex flex-wrap gap-2">
                  {INQUIRY_TOPICS.map((topic) => (
                    <button
                      key={topic.label}
                      type="button"
                      onClick={() => handleTopicClick(topic)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border ${
                        selectedTopic === topic.label
                          ? "bg-[#F8E7C9] text-[#022C22] border-[#F8E7C9] shadow-md scale-105"
                          : "bg-[#064E3B]/40 text-[#D4C3A3] border-[#F8E7C9]/20 hover:border-[#F8E7C9]/50 hover:text-[#FAF4E8]"
                      }`}
                    >
                      {topic.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#F8E7C9] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      placeholder="e.g. Alex Johnson"
                      className="block w-full rounded-xl border border-[#F8E7C9]/20 bg-[#041C16] px-4 py-3 text-sm text-[#FAF4E8] placeholder-[#D4C3A3]/40 focus:border-[#F8E7C9] focus:ring-1 focus:ring-[#F8E7C9]/40 outline-none transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#F8E7C9] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      placeholder="you@company.com"
                      className="block w-full rounded-xl border border-[#F8E7C9]/20 bg-[#041C16] px-4 py-3 text-sm text-[#FAF4E8] placeholder-[#D4C3A3]/40 focus:border-[#F8E7C9] focus:ring-1 focus:ring-[#F8E7C9]/40 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[#F8E7C9] mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    required
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Describe your project, position details, or technical requirement..."
                    className="block w-full rounded-xl border border-[#F8E7C9]/20 bg-[#041C16] px-4 py-3 text-sm text-[#FAF4E8] placeholder-[#D4C3A3]/40 focus:border-[#F8E7C9] focus:ring-1 focus:ring-[#F8E7C9]/40 outline-none transition resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full rounded-full py-4 px-6 text-sm font-extrabold text-[#022C22] bg-[#F8E7C9] hover:bg-[#FAF4E8] transition duration-300 shadow-xl flex items-center justify-center gap-2 ${
                    isSubmitting ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.01]"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#022C22] border-t-transparent rounded-full animate-spin" />
                      Dispatching Message...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4.5 h-4.5 text-[#022C22]" /> Dispatch Direct Message
                    </>
                  )}
                </button>

                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-center text-xs font-semibold p-3.5 rounded-xl border ${
                      result.includes("Success")
                        ? "bg-[#10B981]/15 text-[#34D399] border-[#10B981]/30"
                        : "bg-red-500/15 text-red-300 border-red-500/30"
                    }`}
                  >
                    {result}
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}