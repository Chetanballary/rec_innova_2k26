import { Layout } from "@/components/layout";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateRegistration } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const registrationSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits").max(15),
  collegeDepartment: z.string().min(2, "Required"),
  event: z.enum(["singing", "dance", "mehandi", "makeup", "hairstyle", "cooking_without_fire", "nail_art", "reels", "debate"]),
  participationType: z.enum(["individual", "team"]),
  teamName: z.string().optional(),
  teamSize: z.coerce.number().min(1).max(10).optional(),
}).refine(data => {
  if (data.participationType === "team") {
    return !!data.teamName && !!data.teamSize;
  }
  return true;
}, {
  message: "Team details are required for team participation",
  path: ["teamName"]
});

type FormValues = z.infer<typeof registrationSchema>;

export default function Register() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const createReg = useCreateRegistration();
  const [success, setSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      collegeDepartment: "",
      event: "singing", // We'll update this from URL params
      participationType: "individual",
      teamName: "",
      teamSize: undefined,
    }
  });

  const participationType = form.watch("participationType");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const eventParam = searchParams.get("event");
    if (eventParam && ["singing", "dance", "mehandi", "makeup", "hairstyle", "cooking_without_fire", "nail_art", "reels", "debate"].includes(eventParam)) {
      form.setValue("event", eventParam as any);
    }
  }, [form]);

  const onSubmit = (data: FormValues) => {
    createReg.mutate({ data }, {
      onSuccess: () => {
        setSuccess(true);
        toast({
          title: "Registration Successful!",
          description: "We've received your registration for REC INNOVA 2K26.",
        });
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: error?.response?.data?.message || "Something went wrong. Please try again.",
        });
      }
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Register Now
            </h1>
            <p className="text-muted-foreground">Secure your spot in the ultimate cultural fest.</p>
          </div>

          {success ? (
            <Card className="bg-white/5 border-primary/30 p-8 text-center animate-in fade-in zoom-in duration-500">
              <CardContent className="pt-6">
                <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4">You're In!</h2>
                <p className="text-muted-foreground mb-8">
                  Your registration has been confirmed. Get ready to show your talent on April 25, 2026!
                </p>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline" onClick={() => {
                    setSuccess(false);
                    form.reset();
                  }}>Register Another</Button>
                  <Button asChild className="bg-primary text-white"><Link href="/events">Back to Events</Link></Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white/5 border-white/10 p-6 md:p-8 backdrop-blur-sm shadow-xl">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} className="bg-black/50 border-white/10 focus:border-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} className="bg-black/50 border-white/10 focus:border-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 9876543210" {...field} className="bg-black/50 border-white/10 focus:border-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="collegeDepartment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>College & Department</FormLabel>
                          <FormControl>
                            <Input placeholder="REC, CSE" {...field} className="bg-black/50 border-white/10 focus:border-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="event"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Select Event</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-black/50 border-white/10">
                                <SelectValue placeholder="Select an event" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="singing">🎤 Singing Competition</SelectItem>
                              <SelectItem value="dance">💃 Dance Competition</SelectItem>
                              <SelectItem value="mehandi">🌿 Mehandi</SelectItem>
                              <SelectItem value="makeup">💄 Makeup</SelectItem>
                              <SelectItem value="hairstyle">✨ Hairstyle</SelectItem>
                              <SelectItem value="cooking_without_fire">🍱 Cooking Without Fire</SelectItem>
                              <SelectItem value="nail_art">💅 Nail Art</SelectItem>
                              <SelectItem value="reels">🎬 Reels Competition</SelectItem>
                              <SelectItem value="debate">🗣️ Debate Competition</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="participationType"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Participation Type</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-black/50 border-white/10">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="individual">Individual</SelectItem>
                              <SelectItem value="team">Team</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {participationType === "team" && (
                      <>
                        <FormField
                          control={form.control}
                          name="teamName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Team Name</FormLabel>
                              <FormControl>
                                <Input placeholder="The Mavericks" {...field} className="bg-black/50 border-white/10 focus:border-primary" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="teamSize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Team Size (including you)</FormLabel>
                              <FormControl>
                                <Input type="number" min="1" max="10" {...field} className="bg-black/50 border-white/10 focus:border-primary" 
                                  value={field.value || ''} 
                                  onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-[0_0_20px_rgba(168,85,247,0.4)] mt-4" 
                    disabled={createReg.isPending}
                  >
                    {createReg.isPending ? <Loader2 className="animate-spin mr-2" /> : null}
                    Submit Registration
                  </Button>
                </form>
              </Form>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
