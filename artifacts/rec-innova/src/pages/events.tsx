import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Clock, Info, Users } from "lucide-react";
import { motion } from "framer-motion";

const EVENT_LIST = [
  {
    id: "singing",
    title: "Singing Competition",
    description: "Hit the right notes and captivate the audience with your melodious voice. Open to solo and group performers.",
    rules: "Time limit: 3-5 mins. Karaoke track to be submitted in advance.",
    time: "10:00 AM - 12:00 PM",
    type: "Individual / Team"
  },
  {
    id: "dance",
    title: "Dance Competition",
    description: "Set the stage on fire with your moves. Classical, Western, Folk or Freestyle - show us what you've got.",
    rules: "Time limit: 4-6 mins. Props allowed but no fire/water.",
    time: "1:00 PM - 3:30 PM",
    type: "Individual / Team"
  },
  {
    id: "mehandi",
    title: "Mehandi",
    description: "Create intricate and beautiful henna designs. A test of creativity, speed, and precision.",
    rules: "Time limit: 1 hour. Participants must bring their own cones.",
    time: "10:30 AM - 11:30 AM",
    type: "Individual"
  },
  {
    id: "makeup",
    title: "Makeup",
    description: "Transform faces into art. Show your styling and makeup prowess on live models.",
    rules: "Time limit: 1.5 hours. Bring your own model and makeup kit.",
    time: "12:00 PM - 1:30 PM",
    type: "Individual"
  },
  {
    id: "hairstyle",
    title: "Hairstyle",
    description: "Weave magic with hair. Braids, updos, or avant-garde styles - let your imagination run wild.",
    rules: "Time limit: 1 hour. Accessories allowed.",
    time: "2:00 PM - 3:00 PM",
    type: "Individual"
  },
  {
    id: "cooking_without_fire",
    title: "Cooking Without Fire",
    description: "Whip up delicious and presentable dishes without using any heat source.",
    rules: "Time limit: 1 hour. Pre-cut ingredients allowed but no pre-cooked food.",
    time: "3:00 PM - 4:00 PM",
    type: "Individual / Team"
  }
];

export default function Events() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
            Events Lineup
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Six thrilling competitions to showcase your talents. April 15, 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENT_LIST.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full flex flex-col bg-white/5 border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader>
                  <CardTitle className="text-2xl">{event.title}</CardTitle>
                  <CardDescription className="text-base mt-2">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="flex items-start gap-3 text-sm text-muted-foreground bg-black/20 p-3 rounded-lg border border-white/5">
                    <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{event.rules}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Users className="w-4 h-4 text-accent" />
                    <span>{event.type}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-white/10 hover:bg-primary text-foreground hover:text-primary-foreground border border-white/10 hover:border-primary transition-all" asChild>
                    <Link href={`/register?event=${event.id}`}>Register for this Event</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
