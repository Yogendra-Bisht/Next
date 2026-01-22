"use client";
import { useState } from "react";

export default function Contact() {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("");

    const formData = new FormData(event.target);
    // REMEMBER: Replace with your actual Access Key from Web3Forms
    formData.append("access_key", "3c6e30ef-c56b-4d9f-846a-ebca66772a87");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();

      if (data.success) {
        setResult("Success! Your message has been sent.");
        event.target.reset();
      } else {
        setResult("Error! Something went wrong.");
      }
    } catch (error) {
      setResult("Error! Check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative isolate px-6 pt-20 lg:px-8 min-h-screen pb-20">
      
      {/* Background Glow */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#f59e0b] to-[#dc2626] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      <div className="mx-auto max-w-2xl py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Let's <span className="text-cyan-400">Connect</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Have a project in mind or just want to say hi? Send me a message below.
          </p>
        </div>

        {/* 1. THE CONTACT FORM */}
        <form onSubmit={onSubmit} className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl shadow-xl mb-12">
          <div className="grid grid-cols-1 gap-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold leading-6 text-white">Name</label>
              <div className="mt-2.5">
                <input type="text" name="name" id="name" required placeholder="Your Name" className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-white">Email</label>
              <div className="mt-2.5">
                <input type="email" name="email" id="email" required placeholder="you@example.com" className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm" />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-white">Message</label>
              <div className="mt-2.5">
                <textarea name="message" id="message" rows="4" required placeholder="How can I help you?" className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm"></textarea>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button type="submit" disabled={isSubmitting} className={`block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition ${isSubmitting ? 'bg-gray-500' : 'bg-cyan-600 hover:bg-cyan-500'}`}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
          {result && <div className={`mt-4 text-center text-sm font-medium ${result.includes("Success") ? "text-green-400" : "text-red-400"}`}>{result}</div>}
        </form>


        {/* 2. NEW SOCIAL LINKS SECTION */}
        <div className="text-center">
          <div className="relative flex py-5 items-center">
            <div className="grow border-t border-slate-700"></div>
            <span className="shrink-0 mx-4 text-gray-500 text-sm">Or connect directly on</span>
            <div className="grow border-t border-slate-700"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            
            {/* LinkedIn */}
            <SocialButton 
              href="https://linkedin.com/in/yogendra-bisht-7b4b63288" 
              icon={<svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>}
              label="LinkedIn"
              bgColor="hover:bg-[#0077b5]" // LinkedIn Blue
            />

            {/* GitHub */}
            <SocialButton 
              href="https://github.com/Yogendra-Bisht" 
              icon={<svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>}
              label="GitHub"
              bgColor="hover:bg-gray-700" // GitHub Grey
            />

            {/* Instagram */}
            <SocialButton 
              href="https://www.instagram.com/_yogibisht_?igsh=MXdrN29mZHV0dTJ4eQ==" 
              icon={<svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.225-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.644-.069-4.849 0-3.204.012-3.584.069-4.849.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>}
              label="Instagram"
              bgColor="hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500" // Instagram Gradient
            />

            {/* Email */}
            <SocialButton 
              href="mailto:bishtyogendra96436372@gmail.com" 
              icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>}
              label="Email"
              bgColor="hover:bg-cyan-600" // Cyan for Email
            />

          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Helper Component for Buttons (Keeps code clean)
function SocialButton({ href, icon, label, bgColor }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`flex flex-col items-center justify-center p-4 bg-slate-900 border border-slate-800 rounded-xl transition duration-300 group ${bgColor} hover:border-transparent`}
    >
      <div className="text-gray-400 group-hover:text-white transition duration-300 mb-2">
        {icon}
      </div>
      <span className="text-xs font-medium text-gray-500 group-hover:text-white transition duration-300">
        {label}
      </span>
    </a>
  );
}