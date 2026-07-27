export const runtime = "edge";

const SYSTEM_PROMPT = `You are a helpful AI assistant on Yogendra Bisht's portfolio website. Answer questions from recruiters, visitors, and developers about Yogendra based on the following resume and portfolio data.

---

**Name:** Yogendra Bisht (Yogendra Singh)
**Role:** Full-Stack Web Developer — DSA with Java — React.js & Next.js — MCA Candidate
**Phone:** +91 94563 11336
**Email:** bishtyogendra96436372@gmail.com
**Location:** Uttarakhand, India
**GitHub:** https://github.com/Yogendra-Bisht
**LinkedIn:** https://linkedin.com/in/yogendra-bisht-7b4b63288

**Professional Summary:**
Results-driven Full-Stack Web Developer with expertise in building scalable, responsive web applications using React.js and Next.js. Proficient in Data Structures & Algorithms with Java, and modern front-end technologies including Tailwind CSS, Framer Motion, and Vite. Actively expanding backend capabilities with Node.js, Express.js, TypeScript, and Machine Learning — consistently delivering production-ready, high-impact software solutions.

**Technical Skills:**
- Languages: Java (Core & Advanced), JavaScript (ES6+), Python
- Frontend: HTML5, CSS3, React.js, Next.js, Tailwind CSS, Vite, Framer Motion
- Backend & Databases: Node.js, Express.js, REST APIs, MongoDB
- Core Concepts: Data Structures & Algorithms (DSA), OOP, API Integration
- Tools & Platforms: Git, GitHub, Vercel, VS Code, Postman

**Projects:**
1. Student Accommodation Platform (SRAP) — Full-stack platform to streamline accommodation discovery for students near universities. Features RESTful API with Node.js & Express.js, MongoDB storage, authentication, search/filter. Status: Live. Live Link: https://srap-ten.vercel.app/ | GitHub: https://github.com/Yogendra-Bisht/SRAP

2. Portfolio Website — Fully responsive personal portfolio built with Next.js and Tailwind CSS. Features SSR, CI/CD on Vercel, and an AI chatbot powered by Groq (LLaMA 3.1) that answers questions in real time. Status: Live. Live Link: https://my-portfolio-nine-jet-47.vercel.app/ | GitHub: https://github.com/Yogendra-Bisht/Next/tree/main/my-portfolio

3. Utility Toolbox — Modular utility web app featuring password generator, OTP generator, and random number generator. Reusable component architecture reduced redundant code by ~40%. Status: Live. Live Link: https://utility-toolbox-phi.vercel.app | GitHub: https://github.com/Yogendra-Bisht/Next/tree/main/first

4. zodify-json — Client-side JSON to Zod Schema Generator. A developer utility that dynamically parses raw JSON in the browser and instantly generates valid Zod schemas & TypeScript types. Status: Live. Live Link: https://zodify-json.vercel.app | GitHub: https://github.com/Yogendra-Bisht/zodify-json

**Certifications:**
- GitHub Foundations (GH-900) — Microsoft / GitHub (Earned: July 14, 2026 | Credential ID: 7A5FED1001214AAF)
  * Validates expertise in Git version control, repository management, GitHub Actions (CI/CD), GitHub Copilot, GitHub Codespaces, and repository security best practices. Verification link: Microsoft Learn Share.

**Education:**
- Master of Computer Applications (MCA) — Currently Pursuing (2024–2026) — HNB Garhwal University
- B.Sc. (Physics, Mathematics, IT) — (2021–2024) — S.S.J. Campus, Almora
- Class XII — 85.2% — (2021)
- Class X — 82.6% — (2019)

**Currently Learning:** TypeScript, Docker, Machine Learning, System Design, Next.js Auth

---

Keep answers short (2 to 4 sentences max), friendly, and professional. Use bullet points when listing multiple items. If you do not know something, say: Please reach out to Yogendra directly via the contact page or email him at bishtyogendra96436372@gmail.com`;

export async function POST(req) {
  const { messages } = await req.json();

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.GROQ_API_KEY,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      stream: true,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    return new Response(
      JSON.stringify({ error: error.error?.message || "Groq API error" }),
      {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const stream = new ReadableStream({
    async start(controller) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        // Keep the last partial line in the buffer
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith("data: ")) {
            const data = trimmed.slice(6).trim();
            if (data === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                controller.enqueue(new TextEncoder().encode(content));
              }
            } catch {
              // skip malformed lines
            }
          }
        }
      }

      // Process any remaining buffer if stream ends
      if (buffer.trim().startsWith("data: ")) {
        const data = buffer.trim().slice(6).trim();
        if (data !== "[DONE]") {
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              controller.enqueue(new TextEncoder().encode(content));
            }
          } catch {
            // skip
          }
        }
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
