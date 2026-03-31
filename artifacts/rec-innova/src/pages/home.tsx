import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Calendar, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-20">
        <div className="container mx-auto px-4 flex flex-col items-center text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary mb-6 backdrop-blur-md">
              <Sparkles size={16} />
              <span className="text-sm font-medium tracking-wider uppercase">The Ultimate Cultural Fest</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">
              <span className="bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">REC </span>
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">INNOVA </span>
              <span className="text-white">2K26</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Celebrate Talent, Creativity & Culture at the most electrifying event of the year.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-16">
              <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_rgba(168,85,247,0.6)]" asChild>
                <Link href="/register">
                  Register Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/20 hover:bg-white/10" asChild>
                <Link href="/events">Explore Events</Link>
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-8 text-muted-foreground justify-center">
              <div className="flex items-center gap-2">
                <Calendar className="text-primary" />
                <span>April 15, 2026</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-white/30" />
              <div className="flex items-center gap-2">
                <MapPin className="text-secondary" />
                <span>REC Main Auditorium</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 bg-black/40 border-t border-b border-white/5 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Event Highlights</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">6 spectacular events across different categories. Compete, win, and shine.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Singing', 'Dance', 'Arts & Style'].map((category, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-primary/50 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${i === 0 ? 'bg-primary/20 text-primary' : i === 1 ? 'bg-secondary/20 text-secondary' : 'bg-accent/20 text-accent'}`}>
                  <Sparkles size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">{category}</h3>
                <p className="text-muted-foreground text-sm">Showcase your skills in front of thousands and claim the ultimate prize.</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10" asChild>
              <Link href="/events">View All 6 Events <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
