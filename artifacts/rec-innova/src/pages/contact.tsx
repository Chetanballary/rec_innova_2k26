import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, ExternalLink, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <Layout>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-primary/10 blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="font-orbitron text-4xl md:text-6xl font-black text-white mb-4">
              Get In <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="font-rajdhani text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
              Have questions about the events or registration? We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

            {/* Phone */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, type: "spring" }}>
              <Card className="group h-full bg-white/4 border border-white/10 hover:border-secondary/40 transition-all duration-300 rounded-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary to-cyan-400 opacity-60" />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(ellipse at top, rgba(34,211,238,0.06) 0%, transparent 70%)" }} />
                <CardContent className="p-8 flex flex-col items-center text-center space-y-4 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-secondary/15 border border-secondary/30 flex items-center justify-center text-secondary shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                    <Phone size={28} />
                  </div>
                  <h3 className="font-orbitron text-lg font-bold text-white">Cultural Secretary</h3>
                  <div className="space-y-1">
                    <p className="font-rajdhani text-lg font-semibold text-white/90">Chetan S Ballary</p>
                    <a href="tel:+916361343593" className="font-rajdhani text-secondary hover:text-white transition-colors text-base block">
                      +91 63613 43593
                    </a>
                  </div>
                  <Button variant="outline" className="mt-2 border-secondary/40 text-secondary hover:bg-secondary hover:text-white rounded-xl font-rajdhani font-semibold tracking-wide" asChild>
                    <a href="https://wa.me/916361343593" target="_blank" rel="noopener noreferrer">
                      Chat on WhatsApp <ExternalLink size={14} className="ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Email */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, type: "spring" }}>
              <Card className="group h-full bg-white/4 border border-white/10 hover:border-primary/40 transition-all duration-300 rounded-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-purple-400 opacity-60" />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(ellipse at top, rgba(168,85,247,0.06) 0%, transparent 70%)" }} />
                <CardContent className="p-8 flex flex-col items-center text-center space-y-4 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                    <Mail size={28} />
                  </div>
                  <h3 className="font-orbitron text-lg font-bold text-white">Email Us</h3>
                  <a
                    href="mailto:chetansureshballary@gmail.com"
                    className="font-rajdhani text-primary hover:text-white transition-colors text-base break-all"
                  >
                    chetansureshballary@gmail.com
                  </a>
                  <p className="font-rajdhani text-sm text-muted-foreground">We aim to respond within 24 hours.</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Fest Info card — full width */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, type: "spring" }} className="md:col-span-2">
              <Card className="group bg-white/4 border border-white/10 hover:border-accent/40 transition-all duration-300 rounded-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-yellow-400 to-orange-400 opacity-60" />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(ellipse at top, rgba(251,191,36,0.05) 0%, transparent 70%)" }} />
                <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shadow-[0_0_20px_rgba(251,191,36,0.2)] shrink-0">
                    <Crown size={28} />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="font-orbitron text-lg font-bold text-white mb-2">REC INNOVA 2K26</h3>
                    <div className="space-y-1 font-rajdhani text-muted-foreground">
                      <p><span className="text-white/70 font-semibold">Competitions Day:</span> April 6, 2026</p>
                      <p><span className="text-white/70 font-semibold">Fest Date:</span> April 25, 2026</p>
                      <p><span className="text-white/70 font-semibold">Venue:</span> REC Main Auditorium, Rajalakshmi Engineering College</p>
                    </div>
                  </div>
                  <div className="md:ml-auto">
                    <Button asChild className="font-rajdhani font-bold tracking-wider rounded-xl bg-gradient-to-r from-primary to-secondary border-0 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-shadow text-white h-11 px-6">
                      <a href="/register">Register Now</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
