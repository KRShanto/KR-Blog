import { SITE_NAME } from "@/lib/consts";
import { ArrowRight, Code, Lightbulb, Rocket, Signal } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `About Us | ${SITE_NAME}`,
  description: `Discover the mission and focus areas of ${SITE_NAME}. We aim to empower businesses and individuals with cutting-edge insights and practical knowledge in technology, business growth, and digital innovation. Learn more about our journey and how we can help you thrive in the digital age.`,
};

export default function AboutUs() {
  const focusAreas = [
    {
      icon: Rocket,
      title: "Business Growth",
      description:
        "Actionable strategies and insights to propel your business forward.",
    },
    {
      icon: Code,
      title: "Web Development",
      description:
        "Exploring cutting-edge technologies and best practices in web development.",
    },
    {
      icon: Lightbulb,
      title: "Artificial Intelligence",
      description:
        "Demystifying AI and its practical applications in modern business.",
    },
    {
      icon: Signal,
      title: "Online Presence",
      description:
        "Proven techniques to enhance your digital footprint and reach.",
    },
  ];

  return (
    <main className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-center text-4xl font-bold">About {SITE_NAME}</h1>

      <p className="mb-12 text-center text-xl text-muted-foreground">
        Your personal guide to navigating the intersection of technology,
        business growth, and digital innovation.
      </p>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">What We Cover</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {focusAreas.map((area, index) => (
            <div key={index} className="flex items-start space-x-4">
              <area.icon className="mt-1 h-6 w-6 text-primary" />
              <div>
                <h3 className="mb-2 font-semibold">{area.title}</h3>
                <p className="text-muted-foreground">{area.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold">My Mission</h2>
        <p className="mb-4 text-muted-foreground">
          Hi, I'm KR Shanto, the voice behind {SITE_NAME}. My mission is to
          empower businesses and individuals with the knowledge and insights
          they need to thrive in the digital age. Drawing from my diverse
          experience in business, technology, and digital marketing, I aim to
          provide you with comprehensive, practical, and forward-thinking
          content.
        </p>
        <p className="mb-4 text-muted-foreground">
          Whether you're a startup founder, a seasoned entrepreneur, or a
          curious tech enthusiast, I'm here to be your trusted companion in
          navigating the ever-evolving landscape of business and technology.
          Through {SITE_NAME}, I share my expertise, insights, and discoveries
          to help you stay ahead in this fast-paced digital world.
        </p>
        <a
          href="https://www.krshanto.com"
          target="_blank"
          className="inline-flex items-center text-primary hover:underline"
        >
          Learn more about me <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </section>
    </main>
  );
}
