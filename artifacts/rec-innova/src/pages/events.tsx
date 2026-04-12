import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Clock, Info, Users, Music, Flame, Sparkles, Star, Zap, Trophy, ArrowRight, Fingerprint, Video, MessageSquare, Calendar, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const EVENT_LIST = [
  {
    id: "singing",
    title: "Singing Competition",
    emoji: "🎤",
    Icon: Music,
    description: "Hit the right notes and captivate the audience with your melodious voice. Open to solo and group performers. (Afternoon)",
    rules: "• Solo and group categories open\n• Max 4 members in a group\n• Time: 5+2 min (performance + setup)\n• Karaoke track must be provided by participants\n• Report 10 mins prior to event\n• Judge's decision is final",
    date: "21/04/26",
    time: "Afternoon",
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
    description: "Set the stage on fire with your moves. Classical, Western, Folk or Freestyle - show us what you've got. (Afternoon)",
    rules: "• Solo and group dance allowed\n• Group: 8-10 participants\n• Duration: As per event guidelines\n• Report 10 mins prior to event\n• Judge's decision is final",
    date: "27/04/26",
    time: "Afternoon",
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
    description: "Create intricate and beautiful henna designs. A test of creativity, speed, and precision. (Morning)",
    rules: "• Must bring your own model\n• Total time: 90 minutes\n• Bring own mehendi cones & materials\n• Pre-drawn outlines/stencils not permitted\n• Mobile phones strictly prohibited\n• Judge's decision is final",
    date: "21/04/26",
    time: "Morning",
    type: "Individual",
    from: "#ec4899",
    to: "#be185d",
    glow: "rgba(236,72,153,0.4)",
    tag: "Art",
  },
  {
    id: "hair_and_makeover",
    title: "Hair and Makeover Competition",
    emoji: "💄",
    Icon: Star,
    description: "Create a complete beauty transformation with coordinated hair styling and makeover artistry on a live model. (Afternoon)",
    rules: "• Bring your own makeup & accessories\n• Partner must follow dress code related to makeover theme\n• Natural hair only - no extensions\n• Total time: 2 hours\n• Report 10 mins prior to event\n• Judge's decision is final",
    date: "24/04/26",
    time: "Afternoon",
    type: "Individual",
    from: "#f59e0b",
    to: "#d97706",
    glow: "rgba(245,158,11,0.4)",
    tag: "Style",
  },
  {
    id: "rangoli",
    title: "Rangoli Competition",
    emoji: "✨",
    Icon: Zap,
    description: "Turn colors into celebration with vibrant rangoli designs that showcase symmetry, creativity, and festive flair. (Morning)",
    rules: "Session: Morning. Participants must bring their own rangoli colors and materials.",
    date: "22/04/26",
    time: "Morning",
    type: "Individual",
    from: "#10b981",
    to: "#059669",
    glow: "rgba(16,185,129,0.4)",
    tag: "Art",
  },
  {
    id: "cooking_without_fire",
    title: "Cooking Without Fire",
    emoji: "🍱",
    Icon: Trophy,
    description: "Whip up delicious and presentable dishes without using any heat source. (Afternoon)",
    rules: "• Bring all ingredients & materials\n• Max 30% pre-preparation allowed\n• No cooking stoves/heating appliances\n• Total duration: 60 minutes\n• Report 10 mins prior to event\n• Judge's decision is final",
    date: "23/04/26",
    time: "Afternoon",
    type: "Individual / Team",
    from: "#f97316",
    to: "#ea580c",
    glow: "rgba(249,115,22,0.4)",
    tag: "Culinary",
  },
  {
    id: "nail_art",
    title: "Nail Art",
    emoji: "💅",
    Icon: Fingerprint,
    description: "Express your artistry on tiny canvases. Design intricate, creative, and colorful nail art patterns that wow the judges. (Morning)",
    rules: "• Own hands or bring a model\n• Total time: 90 minutes\n• Bring own nail paints, brushes & tools\n• No artificial nails permitted\n• Must complete both hands\n• Work must be done during competition only\n• Pre-designed nails not allowed\n• Judge's decision is final",
    date: "24/04/26",
    time: "Morning",
    type: "Individual",
    from: "#f43f5e",
    to: "#e11d48",
    glow: "rgba(244,63,94,0.4)",
    tag: "Art",
  },
  {
    id: "reels",
    title: "Reels Competition",
    emoji: "🎬",
    Icon: Video,
    description: "Create and present a short, engaging reel on stage. Showcase storytelling, editing skills, and creativity in under 60 seconds. (Morning)",
    rules: "• Each team: 3 members\n• Duration: 30-60 seconds\n• Topic provided by organizing team",
    date: "23/04/26",
    time: "Morning",
    type: "Individual / Team",
    from: "#8b5cf6",
    to: "#6d28d9",
    glow: "rgba(139,92,246,0.4)",
    tag: "Digital",
  },
  {
    id: "debate",
    title: "Debate Competition",
    emoji: "🗣️",
    Icon: MessageSquare,
    description: "Battle of minds and words. Argue your stance on thought-provoking topics. Fluency, reasoning, and confidence are key. (Afternoon)",
    rules: "Session: Afternoon. 2 speakers per team. Topics revealed 30 mins before.",
    date: "22/04/26",
    time: "Afternoon",
    type: "Team (2 members)",
    from: "#06b6d4",
    to: "#0891b2",
    glow: "rgba(6,182,212,0.4)",
    tag: "Speaking",
  },
];

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<typeof EVENT_LIST[0] | null>(null);

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
              <span className="font-rajdhani text-xs font-semibold tracking-widest uppercase">9 Competitions · April 6, 2026</span>
            </div>
            <h1 className="font-orbitron text-4xl md:text-7xl font-black mb-5 leading-none">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Events</span>
              <span className="text-white"> Lineup</span>
            </h1>
            <p className="font-rajdhani text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
              Nine thrilling competitions. One epic day. Which stage will you own?
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cards grid with details modal */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENT_LIST.map((event, i) => (
              <motion.div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 80 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer transition-all"
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
                      <span className="font-rajdhani text-white/70 font-medium">{event.date}</span>
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

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${selectedEvent.from}15, ${selectedEvent.to}08)`,
                  border: `2px solid ${selectedEvent.from}40`,
                  boxShadow: `0 25px 50px -12px ${selectedEvent.glow}`
                }}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-6 right-6 z-10 p-2 rounded-lg transition-colors hover:bg-white/10"
                >
                  <X className="h-6 w-6 text-white" />
                </button>

                {/* Content */}
                <div className="p-8">
                  {/* Header */}
                  <div className="mb-6 flex items-start gap-6">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shrink-0 shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${selectedEvent.from}30, ${selectedEvent.to}20)`, border: `1px solid ${selectedEvent.from}40` }}>
                      {selectedEvent.emoji}
                    </div>
                    <div className="flex-1">
                      <h2 className="font-orbitron text-3xl font-bold text-white mb-3">{selectedEvent.title}</h2>
                      <div className="flex gap-2 flex-wrap">
                        <span className="font-rajdhani text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border"
                          style={{ color: selectedEvent.from, borderColor: `${selectedEvent.from}50`, background: `${selectedEvent.from}12` }}>
                          {selectedEvent.tag}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Session Details */}
                  <div className="space-y-4 mb-6 pb-6 border-b" style={{ borderColor: `${selectedEvent.from}25` }}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-rajdhani text-xs uppercase tracking-widest text-muted-foreground mb-2">Session Date</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" style={{ color: selectedEvent.from }} />
                          <span className="font-rajdhani font-bold text-white">{selectedEvent.date}</span>
                        </div>
                      </div>
                      <div>
                        <p className="font-rajdhani text-xs uppercase tracking-widest text-muted-foreground mb-2">Session Time</p>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5" style={{ color: selectedEvent.from }} />
                          <span className="font-rajdhani font-bold text-white">{selectedEvent.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Team/Participation Info */}
                  <div className="mb-6">
                    <p className="font-rajdhani text-xs uppercase tracking-widest text-muted-foreground mb-2">Participation</p>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg w-fit"
                      style={{ background: `${selectedEvent.from}12`, borderLeft: `3px solid ${selectedEvent.from}` }}>
                      <Users className="h-4 w-4" style={{ color: selectedEvent.from }} />
                      <span className="font-rajdhani font-medium text-white">{selectedEvent.type}</span>
                    </div>
                  </div>

                  {/* Rules */}
                  <div className="mb-6">
                    <p className="font-rajdhani text-xs uppercase tracking-widest text-muted-foreground mb-3">Competition Rules</p>
                    <div className="space-y-2 px-4 py-3 rounded-lg" style={{ background: `${selectedEvent.from}0a`, border: `1px solid ${selectedEvent.from}25` }}>
                      {selectedEvent.rules.split('\n').map((rule, idx) => (
                        rule.trim() && (
                          <div key={idx} className="flex gap-2 text-sm">
                            <span className="font-bold shrink-0" style={{ color: selectedEvent.from }}>•</span>
                            <span className="font-rajdhani text-white/80 leading-relaxed">{rule.trim()}</span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    asChild
                    className="w-full rounded-xl font-rajdhani font-bold tracking-wider text-white border-0 h-12"
                    style={{
                      background: `linear-gradient(135deg, ${selectedEvent.from}, ${selectedEvent.to})`,
                    }}
                  >
                    <Link href={`/register?event=${selectedEvent.id}`}>
                      Register Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <section className="relative border-t border-white/10 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="font-rajdhani text-sm text-muted-foreground mb-2">Cultural Secretary</p>
            <h3 className="font-orbitron text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Chetan Suresh Ballary
            </h3>
            <div className="flex items-center justify-center gap-6 mb-4">
              <a href="https://chezresume.netlify.app" target="_blank" rel="noopener noreferrer" className="font-rajdhani text-xs text-primary hover:text-white transition-colors">
                Portfolio
              </a>
              <a href="https://www.linkedin.com/in/chetan-suresh-ballary-136188326/" target="_blank" rel="noopener noreferrer" className="font-rajdhani text-xs text-blue-400 hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>
            <p className="font-rajdhani text-xs text-muted-foreground/70">REC INNOVA 2K26</p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
