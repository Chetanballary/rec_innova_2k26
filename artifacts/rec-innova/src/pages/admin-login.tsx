import { Layout } from "@/components/layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAdminLogin, getGetAdminMeQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Loader2, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const competitionEvents = [
  "all",
  "singing",
  "dance",
  "mehandi",
  "hair_and_makeover",
  "rangoli",
  "cooking_without_fire",
  "nail_art",
  "reels",
  "debate",
] as const;

const loginSchema = z.object({
  event: z.enum(competitionEvents),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const login = useAdminLogin();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      event: "all",
      username: "",
      password: "",
    }
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    login.mutate({ data }, {
      onSuccess: (response) => {
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard.",
        });
        queryClient.invalidateQueries({ queryKey: getGetAdminMeQueryKey() });
        setLocation(`/admin/${response.event ?? data.event}/dashboard`);
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: error?.response?.data?.message || "Invalid credentials",
        });
      }
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-[70vh]">
        <Card className="w-full max-w-md bg-white/5 border-white/10 backdrop-blur-md shadow-2xl">
          <CardHeader className="text-center pb-8 border-b border-white/5">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mx-auto mb-4">
              <ShieldAlert size={32} />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
            <CardDescription>Sign in for a specific competition</CardDescription>
            <CardDescription>Use `onlyadmin` / `onlyadmin` with `All Competitions` for full access.</CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="event"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Competition</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-black/50 border-white/10 h-12">
                            <SelectValue placeholder="Select competition" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">All Competitions</SelectItem>
                          <SelectItem value="singing">Singing</SelectItem>
                          <SelectItem value="dance">Dance</SelectItem>
                          <SelectItem value="mehandi">Mehandi</SelectItem>
                          <SelectItem value="hair_and_makeover">Hair and Makeover Competition</SelectItem>
                          <SelectItem value="rangoli">Rangoli Competition</SelectItem>
                          <SelectItem value="cooking_without_fire">Cooking Without Fire</SelectItem>
                          <SelectItem value="nail_art">Nail Art</SelectItem>
                          <SelectItem value="reels">Reels</SelectItem>
                          <SelectItem value="debate">Debate</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="admin" {...field} className="bg-black/50 border-white/10 h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} className="bg-black/50 border-white/10 h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium"
                  disabled={login.isPending}
                >
                  {login.isPending ? <Loader2 className="animate-spin mr-2" /> : null}
                  Sign In
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
