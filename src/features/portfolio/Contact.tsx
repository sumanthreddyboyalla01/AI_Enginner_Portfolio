import { useState } from "react";
import { motion } from "motion/react";
import { Mail, MessageCircle, Send, Instagram, Github, Linkedin, Phone } from "lucide-react";

const WHATSAPP = "916281353467";
const PHONE_DISPLAY = "+91 62813 53467";
const EMAIL = "oksumanth@gmail.com";
const GITHUB = "https://github.com/sumanthreddyboyalla01";
const LINKEDIN = "https://www.linkedin.com/in/boyalla-sumanth-reddy-06112a31b/";
const INSTAGRAM = "https://www.instagram.com/sumanth__reddy__01?igsh=MWpzeXVzOXJjemwwdw==";

export function Contact() {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(`Hi Sumanth, I'm ${name || "someone"}.\n\n${msg}`);
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank");
  };

  return (
    <section
      className="relative overflow-hidden bg-background py-28"
      style={{ contentVisibility: "auto", containIntrinsicSize: "900px" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 40%, oklch(0.3 0.15 145 / 15%), transparent 70%), radial-gradient(ellipse 60% 50% at 90% 20%, oklch(0.3 0.15 260 / 18%), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
              — Get in touch —
            </div>
            <h2
              className="font-sans text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-tight"
              style={{
                background: "linear-gradient(180deg, oklch(0.98 0 0) 0%, oklch(0.5 0.01 260) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Let's build
              <br /> something great.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              Have an idea, project, or something in mind? Send me a message and let's create
              something clean, modern, and impactful together.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${EMAIL}`}
                aria-label="Email Sumanth"
                className="magnetic-hover glass flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href={`tel:+${WHATSAPP}`}
                aria-label={`Call ${PHONE_DISPLAY}`}
                className="magnetic-hover glass flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Sumanth"
                className="magnetic-hover flex h-11 w-11 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 text-emerald-300 shadow-[0_0_30px_-6px_oklch(0.7_0.16_150/60%)] hover:bg-emerald-400/20"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>

            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={`mailto:${EMAIL}`} className="hover:text-foreground">
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href={`tel:+${WHATSAPP}`} className="hover:text-foreground">
                  {PHONE_DISPLAY}
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.form
            onSubmit={send}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-strong rounded-3xl p-6 md:p-8"
          >
            <div className="space-y-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-white/30 focus:bg-white/10"
              />
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                rows={6}
                placeholder="Write your message..."
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-white/30 focus:bg-white/10"
              />
            </div>

            <button
              type="submit"
              className="magnetic-hover mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/95 px-6 py-3.5 text-sm font-medium text-[#050505] transition hover:-translate-y-0.5 hover:brightness-95"
            >
              <Send className="h-4 w-4" /> SEND MESSAGE
            </button>

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Usually replies within a few hours
            </div>
          </motion.form>
        </div>

        {/* Follow me */}
        <div className="mt-24 text-center">
          <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Follow Me
          </div>
          <div className="flex justify-center gap-3">
            {[
              { Icon: Instagram, href: INSTAGRAM, label: "Instagram" },
              { Icon: Github, href: GITHUB, label: "GitHub" },
              { Icon: Linkedin, href: LINKEDIN, label: "LinkedIn" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="magnetic-hover glass flex h-11 w-11 items-center justify-center rounded-full hover:-translate-y-0.5 hover:bg-white/10"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
