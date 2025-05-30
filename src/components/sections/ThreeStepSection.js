'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Upload, Brain, Bell, ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ThreeStepSection = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(stepsRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.8
      });

      gsap.set(".step-connector", {
        scaleX: 0,
        transformOrigin: "left center"
      });

      // Timeline animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate steps in sequence
      stepsRef.current.forEach((step, index) => {
        tl.to(step, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)"
        }, index * 0.3);

        // Animate connector after step
        if (index < stepsRef.current.length - 1) {
          tl.to(`.step-connector-${index}`, {
            scaleX: 1,
            duration: 0.4,
            ease: "power2.out"
          }, index * 0.3 + 0.3);
        }
      });

      // Floating animation for icons
      gsap.to(".step-icon", {
        y: -5,
        duration: 2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.5
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToStepsRefs = (el) => {
    if (el && !stepsRef.current.includes(el)) {
      stepsRef.current.push(el);
    }
  };

  const steps = [
    {
      number: "01",
      title: "Upload & Scan",
      description: "Simply upload receipts, photos, or forward emails. Our AI instantly extracts product details, warranty info, and service dates.",
      icon: <Upload className="w-8 h-8" />,
      color: "primary",
      features: ["Receipt scanning", "Email integration", "Photo recognition", "Bulk upload"]
    },
    {
      number: "02", 
      title: "AI Processing",
      description: "Advanced machine learning analyzes your items, identifies warranty terms, and creates smart reminders for optimal timing.",
      icon: <Brain className="w-8 h-8" />,
      color: "secondary",
      features: ["Smart extraction", "Warranty detection", "Service scheduling", "Data validation"]
    },
    {
      number: "03",
      title: "Smart Alerts",
      description: "Receive timely notifications before warranties expire, service is due, or claims need to be filed. Never miss another deadline.",
      icon: <Bell className="w-8 h-8" />,
      color: "accent",
      features: ["Proactive reminders", "Custom alerts", "Claim assistance", "Calendar sync"]
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">How It Works</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            From chaos to clarity in minutes. Our AI handles the complexity so you don't have to.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Desktop Timeline */}
          <div className="hidden lg:flex items-center justify-between mb-16">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                {/* Step */}
                <div 
                  ref={addToStepsRefs}
                  className={`relative z-10 w-32 h-32 rounded-full border-4 border-${step.color} bg-gradient-to-br from-${step.color}/20 to-transparent flex items-center justify-center group hover:scale-110 transition-all duration-300`}
                >
                  <div className="step-icon text-white group-hover:text-accent transition-colors duration-300">
                    {step.icon}
                  </div>
                  <div className={`absolute -top-2 -right-2 w-8 h-8 bg-${step.color} rounded-full flex items-center justify-center text-xs font-bold text-space`}>
                    {step.number}
                  </div>
                </div>

                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className={`step-connector step-connector-${index} flex-1 h-1 bg-gradient-to-r from-${step.color} to-${steps[index + 1].color} mx-8`}></div>
                )}
              </div>
            ))}
          </div>

          {/* Step Details */}
          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                ref={addToStepsRefs}
                className="group"
              >
                {/* Mobile Step Icon */}
                <div className="lg:hidden mb-6">
                  <div className={`w-20 h-20 rounded-full border-4 border-${step.color} bg-gradient-to-br from-${step.color}/20 to-transparent flex items-center justify-center mx-auto`}>
                    <div className="step-icon text-white">
                      {step.icon}
                    </div>
                    <div className={`absolute -top-2 -right-2 w-6 h-6 bg-${step.color} rounded-full flex items-center justify-center text-xs font-bold text-space`}>
                      {step.number}
                    </div>
                  </div>
                </div>

                {/* Content Card */}
                <div className="glass rounded-lg p-6 h-full border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:glow-primary">
                  <div className="text-center lg:text-left">
                    <h3 className="font-heading text-2xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-white/80 mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      {step.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full bg-${step.color}`}></div>
                          <span className="text-sm text-white/70">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <button className={`mt-6 w-full bg-gradient-to-r from-${step.color}/20 to-${step.color}/10 border border-${step.color}/30 px-4 py-2 rounded-lg text-white hover:bg-${step.color}/30 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-105`}>
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-primary to-secondary px-8 py-4 rounded-full text-white font-semibold text-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105 glow-primary">
            Try It Now - Free
          </button>
          <p className="text-white/60 mt-4">No credit card required • 30-day free trial</p>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-secondary/20 to-transparent rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-gradient-to-r from-accent/20 to-transparent rounded-full blur-xl animate-pulse delay-2000"></div>
    </section>
  );
};

export default ThreeStepSection;
