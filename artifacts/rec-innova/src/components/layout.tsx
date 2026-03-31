import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/announcements", label: "Announcements" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              INNOVA 2K26
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${location === link.href ? "text-primary" : "text-muted-foreground"}`}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 ml-4 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              <Link href="/register">Register Now</Link>
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-white/10 flex flex-col items-center pt-8 gap-6 h-fit pb-8 shadow-xl">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg font-medium transition-colors ${location === link.href ? "text-primary" : "text-foreground"}`}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 shadow-[0_0_15px_rgba(168,85,247,0.5)] w-48" onClick={() => setMobileMenuOpen(false)}>
            <Link href="/register">Register Now</Link>
          </Button>
        </div>
      )}

      <main className="flex-1 flex flex-col relative z-0">
        {/* Glow Effects */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px]" />
        </div>
        
        {children}
      </main>

      <footer className="border-t border-white/10 bg-background/80 py-8 mt-auto z-10 relative">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>&copy; 2026 REC INNOVA. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="/admin" className="hover:text-primary transition-colors">Admin Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
