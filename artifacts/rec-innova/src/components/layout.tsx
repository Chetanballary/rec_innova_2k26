import { Link, useLocation } from "wouter";
import { Menu, X, Sparkles, Music, Flame, Trophy } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/announcements", label: "Updates" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* ─── Navbar ─── */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-500 ${scrolled ? "border-b border-white/10 bg-[hsl(232,25%,5%)]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : "bg-transparent"}`}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-orbitron text-lg font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              INNOVA 2K26
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-rajdhani px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-200 rounded-lg ${
                  location === link.href
                    ? "text-white"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
              >
                {location === link.href && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-white/8 border border-primary/30"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
            <Button asChild className="font-rajdhani font-bold tracking-wider ml-3 h-9 px-5 rounded-lg bg-gradient-to-r from-primary to-secondary border-0 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-shadow text-white">
              <Link href="/register">Register Now</Link>
            </Button>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-foreground rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={22} /></motion.div>
                : <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={22} /></motion.div>
              }
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed top-16 inset-x-0 z-40 bg-[hsl(232,25%,6%)]/98 backdrop-blur-xl border-b border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block font-rajdhani text-lg font-semibold py-3 px-4 rounded-xl transition-all ${
                      location === link.href
                        ? "text-primary bg-primary/10 border border-primary/20"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="mt-2">
                <Button asChild className="w-full font-rajdhani font-bold tracking-wider h-12 rounded-xl bg-gradient-to-r from-primary to-secondary border-0 text-white text-base" onClick={() => setMobileMenuOpen(false)}>
                  <Link href="/register">Register Now</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[150px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[45%] h-[45%] rounded-full bg-secondary/8 blur-[130px]" />
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-accent/6 blur-[100px]" />
      </div>

      <main className="flex-1 flex flex-col relative z-0">
        {children}
      </main>

      {/* ─── Footer ─── */}
      <footer className="relative border-t border-white/8 bg-[hsl(232,25%,4%)]/90 backdrop-blur-md overflow-hidden">
        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="container mx-auto px-4 py-12">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="font-orbitron text-lg font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">INNOVA 2K26</span>
              </div>
              <p className="font-rajdhani text-sm text-muted-foreground leading-relaxed max-w-xs">
                The premier college cultural fest celebrating creativity, talent, and culture.
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground/60 font-rajdhani">
                <Calendar className="h-3 w-3" />
                <span>April 25, 2026 · REC Main Auditorium</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-orbitron text-xs font-bold tracking-widest text-white/50 uppercase mb-4">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { href: "/", label: "Home" },
                  { href: "/events", label: "Events" },
                  { href: "/register", label: "Register" },
                  { href: "/announcements", label: "Updates" },
                  { href: "/contact", label: "Contact" },
                  { href: "/admin", label: "Admin" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="font-rajdhani text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Events */}
            <div>
              <h4 className="font-orbitron text-xs font-bold tracking-widest text-white/50 uppercase mb-4">Events</h4>
              <div className="flex flex-col gap-2">
                {[
                  { icon: Music, label: "Singing Competition", color: "#a855f7" },
                  { icon: Flame, label: "Dance Competition", color: "#22d3ee" },
                  { icon: Sparkles, label: "Mehandi & Makeup", color: "#ec4899" },
                  { icon: Trophy, label: "Cooking Without Fire", color: "#f97316" },
                ].map((e, i) => (
                  <Link key={i} href="/events" className="flex items-center gap-2 group">
                    <e.icon className="h-3.5 w-3.5 transition-colors" style={{ color: e.color }} />
                    <span className="font-rajdhani text-sm text-muted-foreground group-hover:text-white transition-colors">{e.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="font-rajdhani text-center md:text-left">
              &copy; 2026 REC INNOVA. All rights reserved.
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="font-rajdhani text-xs tracking-widest uppercase text-muted-foreground/50">Developed by</div>
              <div className="font-orbitron font-bold text-sm bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Chetan Suresh Ballary
              </div>
            </div>

            <div className="font-rajdhani text-center md:text-right text-muted-foreground/50 text-xs tracking-wide">
              Made with passion for REC INNOVA 2K26
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Calendar({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
