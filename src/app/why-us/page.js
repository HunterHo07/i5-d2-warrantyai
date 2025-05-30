'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import { 
  Zap, 
  Brain, 
  Shield, 
  Globe, 
  Users, 
  Award,
  TrendingUp,
  Code,
  Lightbulb,
  Target,
  Heart,
  Star
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyUsPage() {
  const heroRef = useRef(null);
  const advantagesRef = useRef([]);
  const teamRef = useRef([]);
  const valuesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Stagger animations for sections
      [advantagesRef, teamRef, valuesRef].forEach((ref) => {
        if (ref.current.length > 0) {
          gsap.set(ref.current, { opacity: 0, y: 50 });
          
          ScrollTrigger.create({
            trigger: ref.current[0].parentElement,
            start: "top 80%",
            onEnter: () => {
              gsap.to(ref.current, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out"
              });
            }
          });
        }
      });

    }, []);

    return () => ctx.revert();
  }, []);

  const addToAdvantagesRefs = (el) => {
    if (el && !advantagesRef.current.includes(el)) {
      advantagesRef.current.push(el);
    }
  };

  const addToTeamRefs = (el) => {
    if (el && !teamRef.current.includes(el)) {
      teamRef.current.push(el);
    }
  };

  const addToValuesRefs = (el) => {
    if (el && !valuesRef.current.includes(el)) {
      valuesRef.current.push(el);
    }
  };

  const competitiveAdvantages = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-First Approach",
      description: "Built from the ground up with advanced machine learning, not retrofitted with basic automation.",
      stats: "99.9% accuracy rate",
      color: "primary"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Comprehensive Coverage",
      description: "Only solution covering electronics, appliances, vehicles, and home systems in one platform.",
      stats: "25+ item categories",
      color: "secondary"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Intelligence",
      description: "Proactive reminders and smart insights, not just passive storage of warranty information.",
      stats: "< 2s processing time",
      color: "accent"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Future-Ready Technology",
      description: "3D/AR visualization and blockchain ownership proof for the next generation of asset management.",
      stats: "Web3 compatible",
      color: "primary"
    }
  ];

  const teamMembers = [
    {
      name: "Alex Chen",
      role: "CEO & Co-founder",
      background: "Former Apple AI Engineer, Stanford CS",
      expertise: "Machine Learning, Product Strategy",
      achievements: "Led AI initiatives for 50M+ users",
      image: "/team/alex.jpg"
    },
    {
      name: "Sarah Kim",
      role: "CTO & Co-founder",
      background: "Ex-Google Cloud Architect, MIT",
      expertise: "Distributed Systems, Security",
      achievements: "Built systems handling 1B+ requests/day",
      image: "/team/sarah.jpg"
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of AI",
      background: "Former Tesla Autopilot, PhD Computer Vision",
      expertise: "Computer Vision, Deep Learning",
      achievements: "20+ patents in AI/ML",
      image: "/team/marcus.jpg"
    },
    {
      name: "Emily Watson",
      role: "Head of Design",
      background: "Ex-Airbnb Design Lead, RISD",
      expertise: "UX/UI, Design Systems",
      achievements: "Designed for 100M+ users",
      image: "/team/emily.jpg"
    }
  ];

  const coreValues = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "User-Centric",
      description: "Every decision starts with how it benefits our users",
      color: "red-500"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge technology",
      color: "yellow-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Trust & Security",
      description: "Your data privacy and security is our top priority",
      color: "green-500"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Excellence",
      description: "Delivering exceptional quality in everything we build",
      color: "blue-500"
    }
  ];

  const achievements = [
    { metric: "99.9%", label: "AI Accuracy Rate", icon: <Brain className="w-5 h-5" /> },
    { metric: "< 2s", label: "Processing Time", icon: <Zap className="w-5 h-5" /> },
    { metric: "5,000+", label: "Beta Users", icon: <Users className="w-5 h-5" /> },
    { metric: "25,000+", label: "Items Tracked", icon: <Award className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-space via-surface to-space">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div ref={heroRef} className="text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Why Choose</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                WarrantyAI?
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              We're not just another warranty tracker. We're building the future of intelligent 
              asset management with cutting-edge AI and user-centric design.
            </p>
            
            {/* Achievement Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center p-6 glass rounded-lg border border-white/10">
                  <div className="text-primary mb-2">{achievement.icon}</div>
                  <div className="text-2xl font-bold text-white mb-1">{achievement.metric}</div>
                  <div className="text-white/70 text-sm">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Our Competitive Edge
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              What sets us apart from traditional warranty management solutions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {competitiveAdvantages.map((advantage, index) => (
              <div
                key={index}
                ref={addToAdvantagesRefs}
                className={`p-8 glass rounded-lg border border-${advantage.color}/20 hover:border-${advantage.color}/40 transition-all duration-300 group`}
              >
                <div className="flex items-start space-x-6">
                  <div className={`text-${advantage.color} group-hover:scale-110 transition-transform duration-300`}>
                    {advantage.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-bold text-white mb-3">
                      {advantage.title}
                    </h3>
                    <p className="text-white/80 mb-4 leading-relaxed">
                      {advantage.description}
                    </p>
                    <div className={`inline-flex items-center px-3 py-1 bg-${advantage.color}/20 border border-${advantage.color}/30 rounded-full text-${advantage.color} text-sm font-medium`}>
                      <Star className="w-3 h-3 mr-1" />
                      {advantage.stats}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              World-Class Team
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Experienced leaders from top tech companies building the future of warranty management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                ref={addToTeamRefs}
                className="text-center p-6 glass rounded-lg border border-white/10 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-white text-lg mb-1">{member.name}</h3>
                <div className="text-primary text-sm mb-2">{member.role}</div>
                <div className="text-white/70 text-sm mb-3">{member.background}</div>
                <div className="text-white/60 text-xs mb-3">{member.expertise}</div>
                <div className="text-accent text-xs">{member.achievements}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <div
                key={index}
                ref={addToValuesRefs}
                className="text-center p-6 glass rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 bg-${value.color}/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`text-${value.color}`}>
                    {value.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Cutting-Edge Technology
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Built with the latest technologies for performance, scalability, and security
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 glass rounded-lg border border-white/10">
              <Code className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-white text-lg mb-3">AI & Machine Learning</h3>
              <p className="text-white/70 text-sm mb-4">
                Advanced neural networks, computer vision, and natural language processing
              </p>
              <div className="space-y-1 text-xs text-white/60">
                <div>• TensorFlow & PyTorch</div>
                <div>• OpenCV & Tesseract OCR</div>
                <div>• Custom ML Models</div>
              </div>
            </div>

            <div className="text-center p-8 glass rounded-lg border border-white/10">
              <Globe className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="font-semibold text-white text-lg mb-3">Cloud Infrastructure</h3>
              <p className="text-white/70 text-sm mb-4">
                Scalable, secure, and globally distributed cloud architecture
              </p>
              <div className="space-y-1 text-xs text-white/60">
                <div>• AWS & Kubernetes</div>
                <div>• Microservices Architecture</div>
                <div>• Global CDN</div>
              </div>
            </div>

            <div className="text-center p-8 glass rounded-lg border border-white/10">
              <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-white text-lg mb-3">Security & Privacy</h3>
              <p className="text-white/70 text-sm mb-4">
                Enterprise-grade security with end-to-end encryption
              </p>
              <div className="space-y-1 text-xs text-white/60">
                <div>• AES-256 Encryption</div>
                <div>• SOC 2 Compliance</div>
                <div>• GDPR Ready</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of users who trust WarrantyAI to protect their valuable assets
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-primary to-secondary px-8 py-4 rounded-full text-white font-semibold text-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="border border-primary/50 px-8 py-4 rounded-full text-white font-semibold text-lg hover:bg-primary/10 transition-all duration-300 transform hover:scale-105">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
