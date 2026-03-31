import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Clock, Info, Users, Music, Flame, Sparkles, Star, Zap, Trophy, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const EVENT_LIST = [
  {
    id: "singing",
    title: "Singing Competition",
    emoji: "🎤",
    Icon: Music,
    description: "Hit the right notes and captivate the audience with your melodious voice. Open to solo and group performers.",
    rules: "Time limit: 3-5 mins. Karaoke track to be submitted in advance.",
    time: "10:00 AM - 12:00 PM",
    type: "Individual / Team",
    from: "#a855f7",
    to: "#7c3aed",
    glow: "rgba(168,85,247,0.4)",
    tag: "Performance",
  },
  {
    id: "dance",
    title: "Dance Competition",
    emoji: "💃",
    Icon: Flame,
    description: "Set the stage on fire with your moves. Classical, Western, Folk or Freestyle - show us what you've got.",
    rules: "Time limit: 4-6 mins. Props allowed but no fire/water.",
    time: "1:00 PM - 3:30 PM",
    type: "Individual / Team",
    from: "#22d3ee",
    to: "#0891b2",
    glow: "rgba(34,211,238,0.4)",
    tag: "Performance",
  },
  {
    id: "mehandi",
    title: "Mehandi",
    emoji: "🌿",
    Icon: Sparkles,
    description: "Create intricate and beautiful henna designs. A test of creativity, speed, and precision.",
    rules: "Time limit: 1 hour. Participants must bring their own cones.",
    time: "10:30 AM - 11:30 AM",
    type: "Individual",
    from: "#ec4899",
    to: "#be185d",
    glow: "rgba(236,72,153,0.4)",
    tag: "Art",
  },
  {
    id: "makeup",
    title: "Makeup",
    emoji: "💄",
    Icon: Star,
    description: "Transform faces into art. Show your styling and makeup prowess on live models.",
    rules: "Time limit: 1.5 hours. Bring your own model and makeup kit.",
    time: "12:00 PM - 1:30 PM",
    type: "Individual",
    from: "#f59e0b",
    to: "#d97706",
    glow: "rgba(245,158,11,0.4)",
    tag: "Style",
  },
  {
    id: "hairstyle",
    title: "Hairstyle",
    emoji: "✨",
    Icon: Zap,
    description: "Weave magic with hair. Braids, updos, or avant-garde styles - let your imagination run wild.",
    rules: "Time limit: 1 hour. Accessories allowed.",
    time: "2:00 PM - 3:00 PM",
    type: "Individual",
    from: "#10b981",
    to: "#059669",
    glow: "rgba(16,185,129,0.4)",
    tag: "Style",
  },
  {
    id: "cooking_without_fire",
    title: "Cooking Without Fire",
    emoji: "🍱",
    Icon: Trophy,
    description: "Whip up delicious and presentable dishes without using any heat source.",
    rules: "Time limit: 1 hour. Pre-cut ingredients allowed but no pre-cooked food.",
    time: "3:00 PM - 4:00 PM",
    type: "Individual / Team",
    from: "#f97316",
    to: "#ea580c",
    glow: "rgba(249,115,22,0.4)",
    tag: "Culinary",
  },
];

export default function Events() {
  return (
    <Layout>
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/10 blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent mb-6">
              <Trophy size={14} />
              <span className="font-rajdhani text-xs font-semibold tracking-widest uppercase">6 Competitions · April 15, 2026</span>
            </div>
            <h1 className="font-orbitron text-4xl md:text-7xl font-black mb-5 leading-none">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Events</span>
              <span className="text-white"> Lineup</span>
            </h1>
            <p className="font-rajdhani text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
              Six thrilling competitions. One epic day. Which stage will you own?
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cards grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENT_LIST.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 80 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl overflow-hidden flex flex-col h-full"
                style={{ isolation: "isolate" }}
              >
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-2xl p-px z-0"
                  style={{ background: `linear-gradient(135deg, ${event.from}80, transparent 50%, ${event.to}40)` }}>
                  <div className="w-full h-full rounded-2xl bg-[hsl(232,20%,8%)]" />
                </div>

                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  style={{ background: `radial-gradient(ellipse at top, ${event.from}18 0%, transparent 70%)`, boxShadow: `0 0 50px ${event.glow}` }} />

                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl z-10"
                  style={{ background: `linear-gradient(90deg, ${event.from}, ${event.to})` }} />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full p-6 pt-8">
                  {/* Icon + tag row */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${event.from}30, ${event.to}20)`, border: `1px solid ${event.from}40` }}>
                      {event.emoji}
                    </div>
                    <span className="font-rajdhani text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border"
                      style={{ color: event.from, borderColor: `${event.from}50`, background: `${event.from}12` }}>
                      {event.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-orbitron text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
                    style={{ backgroundImage: `linear-gradient(135deg, ${event.from}, ${event.to})` }}>
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="font-rajdhani text-base text-muted-foreground mb-5 flex-1 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Rules */}
                  <div className="flex items-start gap-3 text-sm text-muted-foreground rounded-xl p-3 mb-4 border"
                    style={{ background: `${event.from}0a`, borderColor: `${event.from}25` }}>
                    <Info className="h-4 w-4 shrink-0 mt-0.5" style={{ color: event.from }} />
                    <span className="font-rajdhani leading-relaxed">{event.rules}</span>
                  </div>

                  {/* Meta */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2.5 text-sm">
                      <Clock className="h-4 w-4" style={{ color: event.from }} />
                      <span className="font-rajdhani text-white/70 font-medium">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm">
                      <Users className="h-4 w-4" style={{ color: event.to }} />
                      <span className="font-rajdhani text-white/70 font-medium">{event.type}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    asChild
                    className="w-full rounded-xl font-rajdhani font-bold tracking-wider text-white border-0 transition-all duration-300 group-hover:shadow-lg h-12"
                    style={{
                      background: `linear-gradient(135deg, ${event.from}, ${event.to})`,
                    }}
                  >
                    <Link href={`/register?event=${event.id}`}>
                      Register for this Event <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
