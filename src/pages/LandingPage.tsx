import React, { useEffect, useState } from "react";
import GradientHeading from "../components/GradientHeading";
import { SubmitButtonLP } from "../components/landingPage/SubmitButtonLP";
import VideoBackground from "../components/landingPage/VIdeoBackground";
import HeroText from "../components/landingPage/HeroText";
import HeroButton from "../components/landingPage/HeroButton";
import FeaturesList from "../components/landingPage/FeaturesList";
import DividerLP from "../components/landingPage/DividerLP";
import StepsList from "../components/landingPage/StepsList";
import CallToActionText from "../components/landingPage/CallToActionText";

/**
 * LandingPage component
 *
 * Renders the main landing page of the app.
 * It includes a parallax video background, hero section, features section,
 * a step-by-step guide on how the app works, and a call to action section.
 */
const LandingPage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  const heroText = {
    title: "Preserve Your Memories.\nUnlock the Future.",
    subtitle: "CHRONO KEEP - Your digital time capsule."
  };

  const features = [
    {
      title: "Time Capsules",
      icon: "/icons/archive.svg",
      text: "Store messages securely."
    },
    {
      title: "Scheduled Release",
      icon: "/icons/hourglass.svg",
      text: "Reveal your capsules later."
    },
    {
      title: "Privacy & Security",
      icon: "/icons/lock.svg",
      text: "Your data is encrypted."
    }
  ];

  const steps = [
    {
      step: "1",
      title: "Create a Capsule",
      text: "Write a message, add media, and choose a release date."
    },
    {
      step: "2",
      title: "Secure & Store",
      text: "Your data is encrypted and stored safely."
    },
    {
      step: "3",
      title: "Unlock in the Future",
      text: "Your message is revealed at the chosen time."
    }
  ];

  const ctaText = {
    heading: "Your story deserves to be remembered.",
    subheading: "Are you ready to write it?"
  };

  // Effect to handle scroll position for parallax background
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      {/* Hero Section with Parallax Video */}
      <section className="relative flex items-center justify-center min-h-screen text-center px-4 overflow-hidden">
        <VideoBackground
          videoSrc="src/assets/landingPageBackgroundVideo.mp4"
          scrollY={scrollY}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
        <div className="relative z-10">
          {/* Hero Text and Buttons */}
          <HeroText title={heroText.title} subtitle={heroText.subtitle} />
          <div className="flex justify-center space-x-4">
            <HeroButton
              text="Sign Up for Free"
              to="/signup"
              variant="primary"
            />
            <HeroButton
              text="Learn More"
              href="#features"
              variant="secondary"
            />
          </div>
        </div>
      </section>

      {/* Features, How-It-Works and CTA Section */}
      <section id="features" className="py-20 bg-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          {/* Features Section */}
          <GradientHeading text="FEATURES OF CHRONO KEEP" />
          <FeaturesList features={features} />

          {/* Divider */}
          <DividerLP />

          {/* How It Works Section */}
          <div className="max-w-5xl mx-auto px-4">
            <GradientHeading text="HOW IT WORKS" />
            <StepsList steps={steps} />
          </div>

          {/* Divider */}
          <DividerLP />

          {/* Call To Action Section */}
          <div className="text-center">
            <CallToActionText
              heading={ctaText.heading}
              subheading={ctaText.subheading}
            />
            <SubmitButtonLP text="GET STARTED" to="/signup" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
