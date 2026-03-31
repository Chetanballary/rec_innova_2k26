import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Calendar, MapPin, Music, Flame, Sparkles, Trophy, Star, Zap, Users } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    function calc() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);
  return timeLeft;
}

const FEST_DATE = new Date("2026-04-15T09:00:00");

function CountdownBlock({ value, label }: { value: number; label: string }) {
  const prev = useRef(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (prev.current !== value) {
      setFlip(true);
      prev.current = value;
      const t = setTimeout(() => setFlip(false), 300);
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <div className={`w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center backdrop-blur-sm shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-transform duration-300 ${flip ? "scale-95" : "scale-100"}`}>
          <span className="font-orbitron text-4xl md:text-5xl font-black text-white tabular-nums leading-none">
            {String(value).padStart(2, "0")}
          </span>
        </div>
        <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-xl -z-10" />
      </div>
      <span className="font-rajdhani text-xs md:text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">{label}</span>
    </div>
  );
}

function Particle({ i }: { i: number }) {
  const colors = ["#a855f7", "#22d3ee", "#f59e0b", "#ec4899", "#10b981"];
  const color = colors[i % colors.length];
  const size = Math.random() * 6 + 3;
  const left = Math.random() * 100;
  const delay = Math.random() * 8;
  const duration = Math.random() * 8 + 6;
  const driftX = (Math.random() - 0.5) * 200;
  const driftY = -(Math.random() * 300 + 100);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${left}%`,
        bottom: "-20px",
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
      animate={{
        x: driftX,
        y: driftY,
        opacity: [0, 1, 0.8, 0],
        scale: [1, 1.2, 0.5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

const EVENTS = [
  { icon: Music, label: "Singing", color: "#a855f7" },
  { icon: Flame, label: "Dance", color: "#22d3ee" },
  { icon: Sparkles, label: "Mehandi", color: "#ec4899" },
  { icon: Star, label: "Makeup", color: "#f59e0b" },
  { icon: Zap, label: "Hairstyle", color: "#10b981" },
  { icon: Trophy, label: "Cooking", color: "#f97316" },
];

const STATS = [
  { value: "6", label: "Events", icon: Trophy },
  { value: "500+", label: "Participants", icon: Users },
  { value: "₹50K", label: "Prize Pool", icon: Star },
  { value: "1 Day", label: "of Glory", icon: Flame },
];

export default function Home() {
  const countdown = useCountdown(FEST_DATE);
  const particles = Array.from({ length: 30 }, (_, i) => i);

  return (
    <Layout>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Particle field */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((i) => <Particle key={i} i={i} />)}
        </div>

        {/* Radial gradient backdrop */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-primary/15 blur-[120px]" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[80px]" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="container mx-auto px-4 flex flex-col items-center text-center z-10 py-24">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-primary mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]"
          >
            <Sparkles size={15} className="animate-pulse" />
            <span className="font-rajdhani text-sm font-semibold tracking-[0.25em] uppercase">The Ultimate Cultural Fest 2026</span>
            <Sparkles size={15} className="animate-pulse" />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="font-orbitron font-black leading-none tracking-tight mb-3">
              <div className="text-5xl md:text-7xl lg:text-9xl text-white/90 mb-2">REC</div>
              <div className="text-5xl md:text-7xl lg:text-9xl text-shimmer">INNOVA</div>
              <div className="text-5xl md:text-7xl lg:text-9xl" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.15)", color: "transparent" }}>2K26</div>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="font-rajdhani text-xl md:text-3xl text-muted-foreground max-w-3xl mx-auto mb-10 font-medium tracking-wide"
          >
            Celebrate <span className="text-primary font-bold">Talent</span>,{" "}
            <span className="text-secondary font-bold">Creativity</span> &{" "}
            <span className="text-accent font-bold">Culture</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-14"
          >
            <Button size="lg" asChild className="glow-button h-14 px-10 text-lg font-rajdhani font-bold tracking-wider rounded-xl bg-gradient-to-r from-primary via-purple-500 to-primary bg-size-200 hover:bg-right shadow-[0_0_40px_rgba(168,85,247,0.5)] animate-pulse-glow border-0">
              <Link href="/register">
                Register Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-14 px-10 text-lg font-rajdhani font-bold tracking-wider rounded-xl border-white/20 hover:bg-white/10 hover:border-white/40 backdrop-blur-sm transition-all">
              <Link href="/events">Explore Events</Link>
            </Button>
          </motion.div>

          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-6 text-muted-foreground mb-16"
          >
            <div className="flex items-center gap-2">
              <Calendar className="text-primary h-5 w-5" />
              <span className="font-rajdhani font-semibold text-lg">April 15, 2026</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="flex items-center gap-2">
              <MapPin className="text-secondary h-5 w-5" />
              <span className="font-rajdhani font-semibold text-lg">REC Main Auditorium</span>
            </div>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center"
          >
            <p className="font-rajdhani text-sm font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-6">Countdown to the Fest</p>
            <div className="flex items-center gap-4 md:gap-6">
              <CountdownBlock value={countdown.days} label="Days" />
              <span className="font-orbitron text-3xl md:text-5xl text-primary font-black mb-5 animate-pulse">:</span>
              <CountdownBlock value={countdown.hours} label="Hours" />
              <span className="font-orbitron text-3xl md:text-5xl text-primary font-black mb-5 animate-pulse">:</span>
              <CountdownBlock value={countdown.minutes} label="Minutes" />
              <span className="font-orbitron text-3xl md:text-5xl text-primary font-black mb-5 animate-pulse">:</span>
              <CountdownBlock value={countdown.seconds} label="Seconds" />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-5 h-9 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, 18, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* ─── Stats Band ─── */}
      <section className="relative py-12 border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className="flex flex-col items-center gap-2 text-center"
              >
                <s.icon className="h-6 w-6 text-primary mb-1" />
                <div className="font-orbitron text-3xl md:text-4xl font-black bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">{s.value}</div>
                <div className="font-rajdhani text-sm text-muted-foreground tracking-widest uppercase font-semibold">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Events Carousel Preview ─── */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent mb-4">
              <Trophy size={14} />
              <span className="font-rajdhani text-xs font-semibold tracking-widest uppercase">6 Competitions</span>
            </div>
            <h2 className="font-orbitron text-3xl md:text-5xl font-black text-white mb-4">Events Lineup</h2>
            <p className="font-rajdhani text-lg text-muted-foreground max-w-xl mx-auto">Compete across six electrifying categories and bring home the glory</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {EVENTS.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 100 }}
                whileHover={{ y: -8, scale: 1.04 }}
                className="group relative rounded-2xl p-5 flex flex-col items-center gap-3 cursor-pointer overflow-hidden border border-white/8 bg-white/4 backdrop-blur-sm transition-all duration-300"
                style={{ "--card-glow": ev.color } as React.CSSProperties}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle at center, ${ev.color}20 0%, transparent 70%)` }} />
                <div className="absolute inset-x-0 bottom-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to right, transparent, ${ev.color}, transparent)` }} />
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${ev.color}22`, boxShadow: `0 0 0 0px ${ev.color}` }}>
                  <ev.icon className="h-7 w-7 transition-all duration-300" style={{ color: ev.color }} />
                </div>
                <span className="font-rajdhani text-sm font-semibold text-center text-white/80 group-hover:text-white transition-colors leading-tight">{ev.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Button variant="outline" size="lg" asChild className="font-rajdhani font-bold tracking-wider border-primary/30 hover:border-primary text-primary hover:bg-primary/10 rounded-xl h-12 px-8">
              <Link href="/events">
                View All Events & Details <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/15" />
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(168,85,247,0.15) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(34,211,238,0.1) 0%, transparent 60%)" }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring" }}
          >
            <h2 className="font-orbitron text-3xl md:text-6xl font-black text-white mb-6 leading-tight">
              Ready to <span className="text-shimmer">Shine?</span>
            </h2>
            <p className="font-rajdhani text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-medium">
              Registration is open. Grab your spot before April 10, 2026 and get ready for the biggest cultural fest of the year.
            </p>
            <Button size="lg" asChild className="glow-button h-14 px-12 text-xl font-rajdhani font-bold tracking-widest rounded-xl bg-gradient-to-r from-primary to-secondary shadow-[0_0_50px_rgba(168,85,247,0.6)] border-0 hover:shadow-[0_0_80px_rgba(168,85,247,0.8)] transition-shadow">
              <Link href="/register">
                Register for Free <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
