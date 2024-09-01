import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Submit from "./Submit";
import { Metadata } from "next";
import { SITE_NAME } from "@/lib/consts";

export const metadata: Metadata = {
  title: `Get in Touch with Us | ${SITE_NAME}`,
  description: `We're here to help! Reach out to the ${SITE_NAME} team with your questions, feedback, or inquiries. We're committed to providing you with the support and information you need.`,
};

export default function ContactForm() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>
            Get in touch with us for any inquiries or feedback.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your name" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Your email"
                  type="email"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message"
                  required
                />
              </div>
            </div>
            <Submit />
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <h3 className="mb-2 text-lg font-semibold">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Button variant="outline" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Button variant="outline" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Button variant="outline" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Button variant="outline" size="icon">
                <Github className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
