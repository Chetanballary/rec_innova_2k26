import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAnnouncements, getGetAnnouncementsQueryKey } from "@workspace/api-client-react";
import { format } from "date-fns";
import { Bell, AlertTriangle, Clock, MapPin, Info, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Announcements() {
  const { data: announcements, isLoading, isError } = useGetAnnouncements({ query: { queryKey: getGetAnnouncementsQueryKey() } });

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case "important": return { icon: AlertTriangle, color: "text-destructive", badge: "bg-destructive/20 text-destructive hover:bg-destructive/30" };
      case "deadline": return { icon: Clock, color: "text-accent", badge: "bg-accent/20 text-accent hover:bg-accent/30" };
      case "timing_change": return { icon: Calendar, color: "text-secondary", badge: "bg-secondary/20 text-secondary hover:bg-secondary/30" };
      case "venue": return { icon: MapPin, color: "text-primary", badge: "bg-primary/20 text-primary hover:bg-primary/30" };
      default: return { icon: Info, color: "text-muted-foreground", badge: "bg-white/10 text-white hover:bg-white/20" };
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
            <Bell size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Live Updates</h1>
            <p className="text-muted-foreground mt-1">Stay informed with the latest fest announcements.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-12 text-muted-foreground bg-white/5 rounded-xl border border-white/10">
            Failed to load announcements. Please try again later.
          </div>
        ) : announcements?.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground bg-white/5 rounded-xl border border-white/10">
            <Bell size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-xl">No announcements yet.</p>
            <p>Check back closer to the event date!</p>
          </div>
        ) : (
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {announcements?.map((announcement, i) => {
              const styles = getCategoryStyles(announcement.category);
              const Icon = styles.icon;
              
              return (
                <div key={announcement.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10">
                    <Icon size={16} className={styles.color} />
                  </div>
                  
                  <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border-white/10 hover:border-white/20 transition-colors backdrop-blur-sm">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <Badge className={`font-medium ${styles.badge} border-0 capitalize`}>
                          {announcement.category.replace('_', ' ')}
                        </Badge>
                        <time className="text-xs text-muted-foreground font-mono">
                          {format(new Date(announcement.createdAt), 'MMM d, h:mm a')}
                        </time>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{announcement.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {announcement.content}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
