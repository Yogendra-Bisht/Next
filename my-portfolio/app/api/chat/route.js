export const runtime = "edge";

const SYSTEM_PROMPT = `You are a helpful AI assistant on Yogendra Bisht's portfolio website. Your job is to answer questions from recruiters, visitors, and curious developers about Yogendra.

Here is everything you know about Yogendra Bisht:

---

**Personal Background:**
- Name: Yogendra Bisht
- Currently a Final Year MCA (Master of Computer Applications) student
- Email: bishtyogendra96436372@gmail.com
- GitHub: https://github.com/Yogendra-Bisht
- LinkedIn: https://linkedin.com/in/yogendra-bisht-7b4b63288

**Technical Skills:**
Frontend:
- React.js (90% proficiency)
- Next.js 14 App Router (85%)
- Tailwind CSS (95%)
- JavaScript ES6+ (90%)
- HTML5 / CSS3 (100%)

Backend & Logic:
- Java Core & Advanced (90%)
- Data Structures & Algorithms / DSA (85%)
- SQL / MySQL (50%)
- Node.js basics (60%)
- REST APIs (75%)

Tools & Environment:
- Git & GitHub (85%) — daily user
- VS Code (95%)
- Postman (80%)
- Vercel Deployment (90%)

Currently learning: Backend Design patterns, Next.js Auth, Docker, Machine Learning

**Projects:**
1. Student Room Finder ("NEST") — A comprehensive platform for students to find and book accommodation. Features real-time availability, dynamic filtering, and a secure booking system. Tech: Next.js, React, Tailwind, SQL. Status: In Progress.

2. Portfolio Website — Personal digital garden built with Next.js 14 App Router and Tailwind CSS. Features a modern dark glassmorphism UI and responsive design. Tech: Next.js, Tailwind CSS. Deployed on Vercel: https://my-portfolio-nine-jet-47.vercel.app/

3. Utility Toolbox — A collection of utility tools: password generator, OTP generator, random number generator. Built for Next.js practice. Deployed: https://utility-toolbox-phi.vercel.app Tech: Next.js, Tailwind.

**Strengths:**
- Strong foundation in Java and DSA — excellent problem solver
- Frontend specialist with a keen eye for UI/UX
- Familiar with full-stack development concepts
- Active on GitHub, deploying real projects to production
- Growth mindset — actively learning system design and advanced backend

---

Keep answers short (2-4 sentences), friendly, and professional. Use bullet points when listing multiple things. If you don't know something specific, say: "Please reach out to Yogendra directly via the contact page or email him at bishtyogendra96436372@gmail.com!"`;

export async function POST(req) {
  const { messages } = await req.json();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
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

  // Pass through the stream directly to the client
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
