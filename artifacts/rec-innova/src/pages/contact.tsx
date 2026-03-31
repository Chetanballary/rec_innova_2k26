import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about the events or registration? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-white/5 border-white/10 hover:border-primary/30 transition-all">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-2">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-bold">Venue</h3>
              <p className="text-muted-foreground">
                Main Auditorium,<br />
                Rajalakshmi Engineering College,<br />
                Thandalam, Chennai - 602105
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 hover:border-secondary/30 transition-all">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center text-secondary mb-2">
                <Phone size={32} />
              </div>
              <h3 className="text-xl font-bold">Student Coordinators</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Rahul S (President): +91 98765 43210</p>
                <p>Priya M (Sec): +91 87654 32109</p>
              </div>
              <Button variant="outline" className="mt-4 border-secondary/50 text-secondary hover:bg-secondary hover:text-white" asChild>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp <ExternalLink size={14} className="ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 hover:border-accent/30 transition-all md:col-span-2">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-2">
                <Mail size={32} />
              </div>
              <h3 className="text-xl font-bold">Email Us</h3>
              <p className="text-muted-foreground">
                innova2k26@rajalakshmi.edu.in
              </p>
              <p className="text-sm text-muted-foreground mt-4">We aim to respond to all queries within 24 hours.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
