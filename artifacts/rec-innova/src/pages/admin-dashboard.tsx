import { Layout } from "@/components/layout";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { 
  useGetAdminMe, 
  getGetAdminMeQueryKey,
  useAdminLogout,
  useGetRegistrationStats,
  getGetRegistrationStatsQueryKey,
  useGetAllRegistrations,
  getGetAllRegistrationsQueryKey,
  useGetAnnouncements,
  getGetAnnouncementsQueryKey,
  useCreateAnnouncement,
  useUpdateAnnouncement,
  useDeleteAnnouncement
} from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, LogOut, Plus, Trash2, Edit, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const announcementSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  content: z.string().min(2, "Content must be at least 2 characters"),
  category: z.enum(["general", "deadline", "timing_change", "venue", "important"]),
  isActive: z.boolean().default(true),
});

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");

  // Auth check
  const { data: adminSession, isLoading: isAuthLoading, isError: isAuthError } = useGetAdminMe({
    query: {
      queryKey: getGetAdminMeQueryKey(),
      retry: false,
    }
  });

  const logout = useAdminLogout();

  useEffect(() => {
    if (!isAuthLoading && (!adminSession || !adminSession.isAuthenticated || isAuthError)) {
      setLocation("/admin");
    }
  }, [adminSession, isAuthLoading, isAuthError, setLocation]);

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        queryClient.setQueryData(getGetAdminMeQueryKey(), null);
        setLocation("/admin");
      }
    });
  };

  if (isAuthLoading) {
    return (
      <Layout>
        <div className="flex h-[60vh] items-center justify-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!adminSession?.isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage REC INNOVA 2K26</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="border-white/10 hover:bg-white/5">
            <LogOut className="w-4 h-4 mr-2" />
            Logout ({adminSession.username})
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-black/50 border border-white/10 p-1 mb-8">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Overview</TabsTrigger>
            <TabsTrigger value="registrations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Registrations</TabsTrigger>
            <TabsTrigger value="announcements" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Announcements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="registrations">
            <RegistrationsTab />
          </TabsContent>

          <TabsContent value="announcements">
            <AnnouncementsTab />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

function OverviewTab() {
  const { data: stats, isLoading, refetch } = useGetRegistrationStats({
    query: { queryKey: getGetRegistrationStatsQueryKey() }
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => <Card key={i} className="bg-white/5 border-white/10 h-32 animate-pulse" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={() => refetch()} className="border-white/10">
          <RefreshCw className="w-4 h-4 mr-2" /> Refresh
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/5 border-primary/30 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors" />
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium uppercase tracking-wider">Total Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black text-white">{stats?.total || 0}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-secondary/30 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-secondary/20 rounded-full blur-2xl group-hover:bg-secondary/30 transition-colors" />
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium uppercase tracking-wider">Individual vs Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-white">{stats?.byParticipationType?.individual || 0}</span>
              <span className="text-muted-foreground mb-1">/</span>
              <span className="text-2xl font-bold text-muted-foreground">{stats?.byParticipationType?.team || 0}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/5 border-white/10 mt-8">
        <CardHeader>
          <CardTitle>Registrations by Event</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {stats?.byEvent?.map((item: any) => (
              <div key={item.event} className="bg-black/40 p-4 rounded-lg border border-white/5 flex justify-between items-center">
                <span className="font-medium capitalize">{item.event.replace(/_/g, ' ')}</span>
                <span className="text-xl font-bold text-primary">{item.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RegistrationsTab() {
  const [eventFilter, setEventFilter] = useState<string>("all");
  const { data, isLoading } = useGetAllRegistrations(
    eventFilter !== "all" ? { event: eventFilter } : {},
    { query: { queryKey: getGetAllRegistrationsQueryKey(eventFilter !== "all" ? { event: eventFilter } : {}) } }
  );

  return (
    <Card className="bg-white/5 border-white/10 animate-in fade-in duration-500">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <CardTitle>All Registrations</CardTitle>
          <CardDescription>View and filter participant details.</CardDescription>
        </div>
        <Select value={eventFilter} onValueChange={setEventFilter}>
          <SelectTrigger className="w-[200px] bg-black/50 border-white/10">
            <SelectValue placeholder="Filter by Event" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="singing">Singing</SelectItem>
            <SelectItem value="dance">Dance</SelectItem>
            <SelectItem value="mehandi">Mehandi</SelectItem>
            <SelectItem value="makeup">Makeup</SelectItem>
            <SelectItem value="hairstyle">Hairstyle</SelectItem>
            <SelectItem value="cooking_without_fire">Cooking Without Fire</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="rounded-md border border-white/10 overflow-hidden">
            <Table>
              <TableHeader className="bg-black/60">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>College/Dept</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Registered</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.registrations?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No registrations found.
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.registrations?.map((reg: any) => (
                    <TableRow key={reg.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="font-medium">{reg.fullName}</TableCell>
                      <TableCell>
                        <div className="text-sm">{reg.email}</div>
                        <div className="text-xs text-muted-foreground">{reg.phone}</div>
                      </TableCell>
                      <TableCell>{reg.collegeDepartment}</TableCell>
                      <TableCell className="capitalize">{reg.event.replace(/_/g, ' ')}</TableCell>
                      <TableCell>
                        <div className="capitalize">{reg.participationType}</div>
                        {reg.participationType === 'team' && (
                          <div className="text-xs text-muted-foreground">{reg.teamName} ({reg.teamSize})</div>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(new Date(reg.registeredAt), 'MMM d, yyyy')}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AnnouncementsTab() {
  const { data: announcements, isLoading } = useGetAnnouncements({ query: { queryKey: getGetAnnouncementsQueryKey() } });
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const form = useForm<z.infer<typeof announcementSchema>>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "general",
      isActive: true,
    }
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const createAnn = useCreateAnnouncement();
  const updateAnn = useUpdateAnnouncement();
  const deleteAnn = useDeleteAnnouncement();

  const handleEdit = (announcement: any) => {
    form.reset({
      title: announcement.title,
      content: announcement.content,
      category: announcement.category,
      isActive: announcement.isActive,
    });
    setEditingId(announcement.id);
    setIsCreateOpen(true);
  };

  const onSubmit = (data: z.infer<typeof announcementSchema>) => {
    if (editingId) {
      updateAnn.mutate({ id: editingId, data }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetAnnouncementsQueryKey() });
          setIsCreateOpen(false);
          setEditingId(null);
          toast({ title: "Announcement updated" });
        }
      });
    } else {
      createAnn.mutate({ data }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetAnnouncementsQueryKey() });
          setIsCreateOpen(false);
          form.reset();
          toast({ title: "Announcement created" });
        }
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      deleteAnn.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetAnnouncementsQueryKey() });
          toast({ title: "Announcement deleted" });
        }
      });
    }
  };

  return (
    <Card className="bg-white/5 border-white/10 animate-in fade-in duration-500">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Announcements</CardTitle>
          <CardDescription>Manage updates shown on the announcements page.</CardDescription>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={(open) => {
          setIsCreateOpen(open);
          if (!open) {
            setEditingId(null);
            form.reset({ title: "", content: "", category: "general", isActive: true });
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="w-4 h-4 mr-2" /> New
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-background border-white/10 sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Announcement" : "Create Announcement"}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-black/50 border-white/10" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-black/50 border-white/10">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="deadline">Deadline</SelectItem>
                          <SelectItem value="timing_change">Timing Change</SelectItem>
                          <SelectItem value="venue">Venue</SelectItem>
                          <SelectItem value="important">Important</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="bg-black/50 border-white/10 min-h-[100px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={createAnn.isPending || updateAnn.isPending} className="bg-primary">
                    {(createAnn.isPending || updateAnn.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingId ? "Update" : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {announcements?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground border border-white/5 rounded-lg">
                No announcements created yet.
              </div>
            ) : (
              announcements?.map((ann: any) => (
                <div key={ann.id} className="p-4 bg-black/40 border border-white/10 rounded-lg flex justify-between items-start gap-4 hover:border-white/20 transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                        ann.category === 'important' ? 'bg-destructive/20 text-destructive' :
                        ann.category === 'venue' ? 'bg-primary/20 text-primary' :
                        ann.category === 'timing_change' ? 'bg-secondary/20 text-secondary' :
                        'bg-white/10 text-muted-foreground'
                      }`}>
                        {ann.category.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(ann.createdAt), 'MMM d, yyyy h:mm a')}
                      </span>
                    </div>
                    <h4 className="font-bold text-lg">{ann.title}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{ann.content}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(ann)} className="h-8 w-8 text-muted-foreground hover:text-white">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(ann.id)} className="h-8 w-8 text-destructive hover:bg-destructive/20" disabled={deleteAnn.isPending}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
