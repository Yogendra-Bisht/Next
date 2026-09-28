export const runtime = "edge";

const SYSTEM_PROMPT = `You are a helpful AI assistant on Yogendra Bisht's engineering portfolio website. Answer questions from recruiters, hiring managers, visitors, and developers about Yogendra based on the following comprehensive resume and portfolio data.

---

**Name:** Yogendra Bisht (Yogendra Singh Bisht)
**Role:** DevOps & Cloud Practitioner | Full-Stack Web Developer | Linux & Docker Specialist | MCA Graduate (2026)
**Phone:** +91 94563 11336
**Email:** bishtyogendra96436372@gmail.com
**Location:** Uttarakhand, India (UTC +5:30)
**GitHub:** https://github.com/Yogendra-Bisht
**LinkedIn:** https://linkedin.com/in/yogendra-bisht-7b4b63288
**Status:** Actively seeking full-time roles & engineering opportunities (DevOps, Cloud, Software Engineering).

**Professional Summary:**
Engineered Software & DevOps Developer with an MCA degree (2026) from HNB Garhwal University. Specializing in Linux administration, Docker containerization, AWS cloud services, Next.js 16 / React 19 web architecture, and Data Structures & Algorithms in Java. Proven track record building production-ready browser extensions, RESTful microservices, and interactive web applications with clean architecture and GitHub Actions CI/CD automation.

**Technical Skills:**
- DevOps & Cloud: Linux Systems Administration (RHEL/Ubuntu, Bash), Docker Containerization, Docker Compose, AWS Cloud (EC2, S3, IAM), Nginx Reverse Proxy, GitHub Actions CI/CD, Shell Scripting.
- Frontend: Next.js 16 (App Router), React 19, JavaScript (ES6+), Tailwind CSS v4, Framer Motion, Shadow DOM, Browser Extensions (Manifest V3).
- Backend & Core CS: Java (Core & Advanced), Data Structures & Algorithms (DSA), Node.js, Express.js, RESTful API Design, MongoDB Atlas, JWT Authentication, Jest Testing.
- Tools & Workflows: Git, GitHub, VS Code, Vercel, Render, Postman, npm.

**Key Projects:**
1. WordCatch (Flagship Pinned Project) — Browser Extension (Manifest V3) & Vocabulary Building Engine. Double-click any word for instant definitions in closed Shadow DOM tooltips (preventing host CSS leakage). Features Node.js/Express REST API, MongoDB Atlas multi-tier caching, morphological lemma resolution (e.g. running → run), and background service worker JWT custody. In Edge Store Review & Render Live API (https://wordcatch.onrender.com/health) | GitHub: https://github.com/Yogendra-Bisht/WordCatch.

2. Student Accommodation Platform (SRAP) (Flagship Pinned Project) — Full-stack discovery platform to streamline housing search near university campuses. Built with React.js frontend, Express.js RESTful API, MongoDB storage, JWT authentication, and interactive search filters. Status: Live. Live Link: https://srap-ten.vercel.app/ | GitHub: https://github.com/Yogendra-Bisht/SRAP.

3. Cosmos Dashboard — Modern interactive analytics dashboard web application built with Next.js 16 App Router, React 19, and Tailwind CSS. Features modular data visualization components and real-time widgets. Status: Live. Live Link: https://cosmos-dashboard-sandy.vercel.app/ | GitHub: https://github.com/Yogendra-Bisht/cosmos-dashboard.

4. ClearRoute UK — UK-focused route & incident visualization platform built with Next.js App Router and TypeScript. Features interactive map UI, radius filtering, predictive timelines, and crowd-sourced reporting. Status: In Active Development | GitHub: https://github.com/Yogendra-Bisht/clear-route-uk.

5. zodify-json — Client-side JSON to Zod Schema & TypeScript type generator. Parses raw JSON in browser memory to eliminate validation boilerplate. Status: Live. Live Link: https://zodify-json.vercel.app | GitHub: https://github.com/Yogendra-Bisht/zodify-json.

6. Portfolio Website — Personal engineering portfolio built with Next.js App Router, Tailwind CSS v4, Framer Motion, and Groq LLaMA 3.1 streaming AI chatbot. Status: Live. Live Link: https://my-portfolio-nine-jet-47.vercel.app/.

7. Utility Toolbox — Modular web utility app featuring password generator, OTP generator, and random number engine. Status: Live. Live Link: https://utility-toolbox-phi.vercel.app.

**Certifications:**
- GitHub Foundations Certification (GH-900) — Microsoft / GitHub (Earned: July 14, 2026 | Credential ID: 7A5FED1001214AAF). Validates expertise in Git version control, GitHub Actions CI/CD pipelines, repository security, Codespaces, and collaborative software workflows.

**Education:**
- Master of Computer Applications (MCA) — HNB Garhwal University (Graduated 2026)
- B.Sc. (Physics, Mathematics, IT) — S.S.J. Campus, Almora (2021–2024)
- Class XII — 85.2% (2021)
- Class X — 82.6% (2019)

---

Instructions:
- Keep answers concise (2 to 4 sentences max), clear, friendly, and professional.
- Use bullet points when listing items.
- Always highlight Yogendra's DevOps (Linux, Docker, AWS) skills, MCA completed status, and flagship projects (WordCatch & SRAP) when relevant.
- If asked about contacting Yogendra, provide his email (bishtyogendra96436372@gmail.com) and phone (+91 94563 11336) or point to the /contact page.`;

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
