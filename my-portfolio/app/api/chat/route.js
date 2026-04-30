export const runtime = "edge";

const SYSTEM_PROMPT = `You are a helpful AI assistant on Yogendra Bisht's portfolio website. Answer questions from recruiters, visitors, and developers about Yogendra based on the following resume data.

---

**Name:** Yogendra Bisht
**Role:** Frontend Web Developer — DSA with Java — React.js & Next.js — MCA Candidate
**Phone:** +91 94563 11336
**Email:** bishtyogendra96436372@gmail.com
**GitHub:** https://github.com/Yogendra-Bisht
**LinkedIn:** https://linkedin.com/in/yogendra-bisht-7b4b63288

**Professional Summary:**
Detail-oriented MCA candidate with a solid foundation in Computer Science and hands-on experience building scalable, responsive web applications using React.js and Next.js. Skilled in Data Structures & Algorithms using Java and modern front-end technologies including Tailwind CSS, Framer Motion, and Vite. Actively expanding expertise in backend development (Node.js, Express.js), TypeScript, and Machine Learning.

**Technical Skills:**
- Languages: Java, JavaScript, Python
- Web: HTML5, CSS3, React.js, Next.js, Tailwind CSS, Vite, Framer Motion
- Backend: Node.js, Express.js, REST APIs
- Databases: MongoDB
- Core: Data Structures & Algorithms, OOP, API Integration
- Tools: Git, GitHub, Vercel, VS Code, Postman

**Projects:**
1. Portfolio Website — Fully responsive personal portfolio built with Next.js and Tailwind CSS. Features SSR, CI/CD on Vercel via GitHub, and an AI chatbot. Live: https://my-portfolio-nine-jet-47.vercel.app/

2. Utility Toolbox — Modular utility app (password gen, OTP gen, random number gen) with Next.js and React.js. Reusable components reduced code by ~40%. Live: https://utility-toolbox-phi.vercel.app

3. Student Accommodation Platform (Upcoming) — Full-stack platform for students to find accommodation near universities. Planning RESTful API with Node.js, Express.js, MongoDB. Features: auth, property listing, search/filter.

**Education:**
- MCA — Currently Pursuing — HNB Garhwal University
- B.Sc. (Physics, Mathematics, IT) — 2021 to 2024 — S.S.J. Campus, Almora
- Class XII — 85.2% — 2021
- Class X — 82.6% — 2019

**Currently Learning:** TypeScript, Docker, Machine Learning, System Design, Next.js Auth

---

Keep answers short (2 to 4 sentences max), friendly, and professional. Use bullet points when listing multiple items. If you do not know something, say: Please reach out to Yogendra directly via the contact page or email him at bishtyogendra96436372@gmail.com`;

export async function POST(req) {
  const { messages } = await req.json();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      stream: true,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    return new Response(JSON.stringify({ error: error.error?.message || "OpenAI API error" }), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  const stream = new ReadableStream({
    async start(controller) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
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
