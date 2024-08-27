import React from "react";

// TODO: improve this
const AboutSection = () => {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">About This Blog</h2>
          <p className="mt-4 text-lg">
            Welcome to my blog! This is your go-to resource for learning how to
            build websites, especially if you’re not a technical expert. My goal
            is to make web development accessible to everyone, no matter your
            skill level.
          </p>
          <p className="mt-4 text-lg">
            While the primary focus is on helping non-technical people, I also
            cover technical topics for those who want to delve deeper. Whether
            you’re just starting out or looking to advance your skills, you'll
            find valuable insights here.
          </p>
          <p className="mt-4 text-lg">
            Join me as we explore the world of web development together, one
            step at a time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
