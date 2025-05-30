'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Star, Zap, Crown, Rocket } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PricingSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [billingCycle, setBillingCycle] = useState('monthly');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(cardsRef.current, {
        opacity: 0,
        y: 50,
        rotationY: 15
      });

      // Entrance animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(cardsRef.current, {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
          });
        }
      });

      // Hover animations
      cardsRef.current.forEach(card => {
        if (card) {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.05,
              rotationY: -5,
              z: 50,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              rotationY: 0,
              z: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToCardsRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const plans = [
    {
      name: "Free",
      icon: <Star className="w-6 h-6" />,
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for getting started with warranty tracking",
      features: [
        "5 items per month",
        "Basic receipt scanning",
        "Simple reminders",
        "Mobile app access",
        "Cloud storage (1GB)"
      ],
      limitations: [
        "Limited AI features",
        "Basic support"
      ],
      color: "white",
      popular: false,
      cta: "Start Free"
    },
    {
      name: "Pro",
      icon: <Zap className="w-6 h-6" />,
      price: { monthly: 9.99, yearly: 99.99 },
      description: "For individuals and families who want full control",
      features: [
        "Unlimited items",
        "Advanced AI extraction",
        "Smart reminders",
        "Email integration",
        "Calendar sync",
        "Priority support",
        "Cloud storage (10GB)",
        "Export capabilities"
      ],
      limitations: [],
      color: "primary",
      popular: true,
      cta: "Start Pro Trial"
    },
    {
      name: "Premium",
      icon: <Crown className="w-6 h-6" />,
      price: { monthly: 19.99, yearly: 199.99 },
      description: "Advanced features for power users and families",
      features: [
        "Everything in Pro",
        "3D/AR inventory view",
        "Advanced analytics",
        "Family sharing (5 users)",
        "Custom categories",
        "API access",
        "White-label options",
        "Cloud storage (100GB)",
        "Phone support"
      ],
      limitations: [],
      color: "secondary",
      popular: false,
      cta: "Start Premium"
    },
    {
      name: "Business",
      icon: <Rocket className="w-6 h-6" />,
      price: { monthly: 99, yearly: 999 },
      description: "For businesses managing multiple assets and teams",
      features: [
        "Everything in Premium",
        "Unlimited team members",
        "Advanced reporting",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantee",
        "Custom training",
        "Unlimited storage",
        "On-premise option"
      ],
      limitations: [],
      color: "accent",
      popular: false,
      cta: "Contact Sales"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Simple, Transparent</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your needs. Start free, upgrade anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white' : 'text-white/60'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-14 h-7 bg-surface rounded-full border border-primary/30 transition-all duration-300"
            >
              <div className={`absolute top-1 w-5 h-5 bg-primary rounded-full transition-all duration-300 ${
                billingCycle === 'yearly' ? 'left-8' : 'left-1'
              }`}></div>
            </button>
            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-white' : 'text-white/60'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                Save 17%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              ref={addToCardsRefs}
              className={`relative group perspective-1000 ${plan.popular ? 'lg:-mt-4' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full text-white text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card */}
              <div className={`glass rounded-lg p-6 h-full border-2 transition-all duration-300 ${
                plan.popular 
                  ? 'border-primary glow-primary' 
                  : `border-${plan.color}/20 hover:border-${plan.color}/40`
              } ${plan.popular ? 'lg:py-8' : ''}`}>
                
                {/* Header */}
                <div className="text-center mb-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${plan.color}/20 to-transparent border border-${plan.color}/30 flex items-center justify-center mx-auto mb-4`}>
                    <div className={`text-${plan.color === 'white' ? 'white' : plan.color}`}>
                      {plan.icon}
                    </div>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold text-white">
                      ${plan.price[billingCycle]}
                    </span>
                    <span className="text-white/60 ml-1">
                      /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && plan.price.monthly > 0 && (
                    <div className="text-sm text-white/60 mt-1">
                      ${(plan.price.yearly / 12).toFixed(2)}/month billed yearly
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className={`w-4 h-4 mt-0.5 text-${plan.color === 'white' ? 'accent' : plan.color} flex-shrink-0`} />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, limitIndex) => (
                    <div key={limitIndex} className="flex items-start space-x-3 opacity-60">
                      <div className="w-4 h-4 mt-0.5 border border-white/30 rounded-sm flex-shrink-0"></div>
                      <span className="text-white/60 text-sm">{limitation}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/25 glow-primary'
                    : plan.color === 'white'
                    ? 'border border-white/30 text-white hover:bg-white/10'
                    : `bg-gradient-to-r from-${plan.color}/20 to-${plan.color}/10 border border-${plan.color}/30 text-white hover:bg-${plan.color}/30`
                }`}>
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Features */}
        <div className="mt-16 text-center">
          <h3 className="font-heading text-2xl font-bold text-white mb-8">
            All plans include:
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center space-x-3">
              <Check className="w-5 h-5 text-accent" />
              <span className="text-white/80">30-day free trial</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Check className="w-5 h-5 text-accent" />
              <span className="text-white/80">Cancel anytime</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Check className="w-5 h-5 text-accent" />
              <span className="text-white/80">24/7 customer support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-secondary/10 to-transparent rounded-full blur-xl animate-pulse delay-1000"></div>
    </section>
  );
};

export default PricingSection;
