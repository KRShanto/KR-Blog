"use client";

import { createNewsletter } from "@/actions/newsletter/create";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function NewsLetter() {
  const { toast } = useToast();

  async function handleSubmit(data: FormData) {
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const res = await createNewsletter({ name, email });

    if (res.type === "error") {
      toast({
        variant: "destructive",
        description: res.message,
      });
    } else {
      toast({
        description: res.message,
      });
    }
  }

  return (
    <section className="w-full bg-muted py-8 sm:py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Subscribe to Our Newsletter
            </h2>
            <p className="mx-auto max-w-xs text-sm text-muted-foreground sm:max-w-md sm:text-base md:text-lg lg:text-xl">
              Want help in your business journey? Subscribe to get useful tips
              and resources every week.
            </p>
          </div>
          <div className="w-[20rem] md:w-[30rem]">
            <form className="flex flex-col space-y-2">
              <Input
                className="p-6 text-base"
                placeholder="Enter your name"
                required
                name="name"
              />
              <Input
                className="p-6 text-base"
                placeholder="Enter your email"
                type="email"
                required
                name="email"
              />
              <Button formAction={handleSubmit}>Subscribe</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
