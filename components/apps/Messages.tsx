"use client";

import { useState, useRef, useEffect } from "react";
import { portfolio } from "@/portfolio.config";
import { getAutoReply } from "@/lib/messagesReplies";
import type { Message } from "@/types/macos";

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    text: portfolio.messages.greeting,
    sender: "owner",
    timestamp: new Date(Date.now() - 60000),
  },
  {
    id: "2",
    text: portfolio.messages.availability,
    sender: "owner",
    timestamp: new Date(Date.now() - 30000),
  },
  {
    id: "3",
    text: portfolio.messages.contact,
    sender: "owner",
    timestamp: new Date(),
    rich: "contact",
  },
];

function ContactLinks() {
  const linkClass =
    "text-[#64D2FF] underline underline-offset-2 hover:text-[#7AE0FF]";

  return (
    <div className="space-y-1.5">
      <p>{portfolio.messages.contact}</p>
      <p>
        <a href={`mailto:${portfolio.email}`} className={`${linkClass} break-all`}>
          {portfolio.email}
        </a>
      </p>
      <p>
        <a
          href={portfolio.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          LinkedIn
        </a>
      </p>
      <p>
        <a
          href={portfolio.github}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          GitHub
        </a>
      </p>
      {portfolio.blog && (
        <p>
          <a
            href={portfolio.blog}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Developer Blog
          </a>
        </p>
      )}
    </div>
  );
}

function MessageContent({ msg }: { msg: Message }) {
  if (msg.rich === "contact") return <ContactLinks />;
  return <>{msg.text}</>;
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const visitorMsg: Message = {
      id: `v-${Date.now()}`,
      text: input.trim(),
      sender: "visitor",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, visitorMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply: Message = {
        id: `o-${Date.now()}`,
        text: getAutoReply(visitorMsg.text),
        sender: "owner",
        timestamp: new Date(),
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, reply]);
    }, 800);
  };

  return (
    <div className="flex h-full flex-col" style={{ background: "#1C1C1E" }}>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-sm font-semibold text-white">
          {portfolio.name[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{portfolio.name}</p>
          <p className="text-xs text-white/50">iMessage</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto px-4 py-3 macos-scroll">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 flex ${msg.sender === "visitor" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                msg.sender === "visitor"
                  ? "bg-[#0A84FF] text-white"
                  : "bg-[#3A3A3C] text-white"
              }`}
            >
              <MessageContent msg={msg} />
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-[#3A3A3C] px-4 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-white/40" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-white/40" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-white/40" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t border-white/10 px-3 py-2 pb-safe">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="iMessage"
          className="flex-1 rounded-full bg-[#3A3A3C] px-4 py-2 text-sm text-white placeholder-white/40 outline-none focus:ring-1 focus:ring-white/20"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!input.trim()}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0A84FF] text-white disabled:opacity-40"
          aria-label="Send message"
        >
          ↑
        </button>
      </div>
    </div>
  );
}
