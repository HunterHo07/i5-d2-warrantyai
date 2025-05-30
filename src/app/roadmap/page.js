'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import { 
  CheckCircle, 
  Clock, 
  Calendar, 
  Zap, 
  Brain, 
  Globe, 
  Shield, 
  Smartphone,
  Eye,
  Users,
  Building,
  Rocket
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function RoadmapPage() {
  const [selectedPhase, setSelectedPhase] = useState('current');
  const timelineRef = useRef(null);
  const phaseRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline animation
      gsap.set(phaseRefs.current, { opacity: 0, x: -50 });
      
      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(phaseRefs.current, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
          });
        }
      });

    }, []);

    return () => ctx.revert();
  }, []);

  const addToPhaseRefs = (el) => {
    if (el && !phaseRefs.current.includes(el)) {
      phaseRefs.current.push(el);
    }
  };

  const roadmapPhases = [
    {
      id: 'current',
      title: 'MVP (Current)',
      period: 'Q4 2024',
      status: 'active',
      progress: 85,
      description: 'Core warranty management features with AI-powered receipt scanning',
      features: [
        { name: 'Receipt Upload & Scanning', status: 'completed', icon: <Smartphone className="w-4 h-4" /> },
        { name: 'AI Data Extraction', status: 'completed', icon: <Brain className="w-4 h-4" /> },
        { name: 'Warranty Dashboard', status: 'completed', icon: <Calendar className="w-4 h-4" /> },
        { name: 'Smart Reminders', status: 'in-progress', icon: <Clock className="w-4 h-4" /> },
        { name: 'Basic Claim Assistant', status: 'planned', icon: <Shield className="w-4 h-4" /> }
      ],
      metrics: {
        users: '5,000+',
        accuracy: '99.9%',
        items: '25,000+'
      }
    },
    {
      id: 'phase1',
      title: 'Enhanced AI',
      period: 'Q1 2025',
      status: 'planned',
      progress: 0,
      description: 'Advanced AI capabilities and improved user experience',
      features: [
        { name: 'Email Integration', status: 'planned', icon: <Globe className="w-4 h-4" /> },
        { name: 'Voice Commands', status: 'planned', icon: <Smartphone className="w-4 h-4" /> },
        { name: 'Advanced OCR', status: 'planned', icon: <Eye className="w-4 h-4" /> },
        { name: 'Multi-language Support', status: 'planned', icon: <Globe className="w-4 h-4" /> },
        { name: 'Bulk Import Tools', status: 'planned', icon: <Zap className="w-4 h-4" /> }
      ],
      metrics: {
        users: '50,000+',
        accuracy: '99.95%',
        languages: '10+'
      }
    },
    {
      id: 'phase2',
      title: '3D & AR Features',
      period: 'Q2 2025',
      status: 'planned',
      progress: 0,
      description: 'Immersive 3D inventory visualization and AR experiences',
      features: [
        { name: '3D Item Visualization', status: 'planned', icon: <Eye className="w-4 h-4" /> },
        { name: 'AR Room Mapping', status: 'planned', icon: <Smartphone className="w-4 h-4" /> },
        { name: 'Virtual Inventory Tours', status: 'planned', icon: <Globe className="w-4 h-4" /> },
        { name: 'Item Location Tracking', status: 'planned', icon: <Calendar className="w-4 h-4" /> },
        { name: 'Photo-to-3D Conversion', status: 'planned', icon: <Brain className="w-4 h-4" /> }
      ],
      metrics: {
        users: '200,000+',
        '3d_models': '1,000+',
        ar_accuracy: '95%+'
      }
    },
    {
      id: 'phase3',
      title: 'Enterprise & API',
      period: 'Q3 2025',
      status: 'planned',
      progress: 0,
      description: 'Business features and third-party integrations',
      features: [
        { name: 'Team Management', status: 'planned', icon: <Users className="w-4 h-4" /> },
        { name: 'Enterprise Dashboard', status: 'planned', icon: <Building className="w-4 h-4" /> },
        { name: 'Public API', status: 'planned', icon: <Globe className="w-4 h-4" /> },
        { name: 'Retailer Integrations', status: 'planned', icon: <Building className="w-4 h-4" /> },
        { name: 'Advanced Analytics', status: 'planned', icon: <Brain className="w-4 h-4" /> }
      ],
      metrics: {
        users: '500,000+',
        businesses: '1,000+',
        integrations: '50+'
      }
    },
    {
      id: 'phase4',
      title: 'Global Expansion',
      period: 'Q4 2025',
      status: 'planned',
      progress: 0,
      description: 'International markets and advanced features',
      features: [
        { name: 'Global Marketplace', status: 'planned', icon: <Globe className="w-4 h-4" /> },
        { name: 'Blockchain Verification', status: 'planned', icon: <Shield className="w-4 h-4" /> },
        { name: 'IoT Device Integration', status: 'planned', icon: <Smartphone className="w-4 h-4" /> },
        { name: 'AI Predictive Maintenance', status: 'planned', icon: <Brain className="w-4 h-4" /> },
        { name: 'Insurance Partnerships', status: 'planned', icon: <Building className="w-4 h-4" /> }
      ],
      metrics: {
        users: '1M+',
        countries: '25+',
        partnerships: '100+'
      }
    },
    {
      id: 'future',
      title: 'Future Vision',
      period: '2026+',
      status: 'vision',
      progress: 0,
      description: 'Next-generation features and emerging technologies',
      features: [
        { name: 'AI Personal Assistant', status: 'vision', icon: <Brain className="w-4 h-4" /> },
        { name: 'Metaverse Integration', status: 'vision', icon: <Eye className="w-4 h-4" /> },
        { name: 'Quantum Security', status: 'vision', icon: <Shield className="w-4 h-4" /> },
        { name: 'Neural Interface', status: 'vision', icon: <Zap className="w-4 h-4" /> },
        { name: 'Autonomous Claims', status: 'vision', icon: <Rocket className="w-4 h-4" /> }
      ],
      metrics: {
        users: '10M+',
        ai_accuracy: '99.99%',
        automation: '100%'
      }
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'accent';
      case 'in-progress': return 'primary';
      case 'planned': return 'secondary';
      case 'vision': return 'white';
      default: return 'white';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'planned': return <Calendar className="w-4 h-4" />;
      case 'vision': return <Rocket className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const selectedPhaseData = roadmapPhases.find(phase => phase.id === selectedPhase);

  return (
    <div className="min-h-screen bg-gradient-to-br from-space via-surface to-space">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Product</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Roadmap
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Our journey to revolutionize warranty management with cutting-edge AI and immersive technologies
          </p>
        </div>
      </section>

      {/* Timeline Navigation */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {roadmapPhases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setSelectedPhase(phase.id)}
                className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                  selectedPhase === phase.id
                    ? 'bg-primary/20 border-primary text-primary'
                    : 'border-white/20 text-white/70 hover:border-white/40 hover:text-white'
                }`}
              >
                {phase.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Timeline */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Timeline Sidebar */}
            <div ref={timelineRef} className="space-y-6">
              {roadmapPhases.map((phase, index) => (
                <div
                  key={phase.id}
                  ref={addToPhaseRefs}
                  onClick={() => setSelectedPhase(phase.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                    selectedPhase === phase.id
                      ? 'border-primary bg-primary/10 glow-primary'
                      : 'border-white/20 hover:border-white/40 bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-semibold ${
                      selectedPhase === phase.id ? 'text-primary' : 'text-white'
                    }`}>
                      {phase.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full border ${
                      phase.status === 'active' ? 'border-accent/30 text-accent bg-accent/10' :
                      phase.status === 'planned' ? 'border-secondary/30 text-secondary bg-secondary/10' :
                      'border-white/30 text-white/70 bg-white/5'
                    }`}>
                      {phase.period}
                    </span>
                  </div>
                  
                  <p className="text-white/70 text-sm mb-3">{phase.description}</p>
                  
                  {phase.progress > 0 && (
                    <div className="mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-white/60">Progress</span>
                        <span className="text-xs text-white/60">{phase.progress}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-1">
                        <div 
                          className="bg-gradient-to-r from-primary to-accent h-1 rounded-full transition-all duration-500"
                          style={{ width: `${phase.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2 text-xs text-white/60">
                    {getStatusIcon(phase.status)}
                    <span className="capitalize">{phase.status}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Phase Details */}
            <div className="lg:col-span-2">
              <div className="glass rounded-lg border border-white/10 overflow-hidden">
                
                {/* Phase Header */}
                <div className="bg-surface/50 border-b border-white/10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-heading text-2xl font-bold text-white">
                      {selectedPhaseData?.title}
                    </h2>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full border text-sm ${
                        selectedPhaseData?.status === 'active' ? 'border-accent/30 text-accent bg-accent/10' :
                        selectedPhaseData?.status === 'planned' ? 'border-secondary/30 text-secondary bg-secondary/10' :
                        'border-white/30 text-white/70 bg-white/5'
                      }`}>
                        {selectedPhaseData?.period}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-white/80 mb-4">{selectedPhaseData?.description}</p>
                  
                  {selectedPhaseData?.progress > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-white/70">Overall Progress</span>
                        <span className="text-sm text-white/70">{selectedPhaseData.progress}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                          style={{ width: `${selectedPhaseData.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Features List */}
                <div className="p-6">
                  <h3 className="font-semibold text-white mb-4">Key Features</h3>
                  <div className="space-y-3">
                    {selectedPhaseData?.features.map((feature, index) => (
                      <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg border ${
                        feature.status === 'completed' ? 'border-accent/30 bg-accent/10' :
                        feature.status === 'in-progress' ? 'border-primary/30 bg-primary/10' :
                        'border-white/20 bg-white/5'
                      }`}>
                        <div className={`text-${getStatusColor(feature.status)}`}>
                          {feature.icon}
                        </div>
                        <div className="flex-1">
                          <span className="text-white font-medium">{feature.name}</span>
                        </div>
                        <div className={`text-${getStatusColor(feature.status)}`}>
                          {getStatusIcon(feature.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="p-6 border-t border-white/10">
                  <h3 className="font-semibold text-white mb-4">Target Metrics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(selectedPhaseData?.metrics || {}).map(([key, value]) => (
                      <div key={key} className="text-center p-3 bg-white/5 rounded-lg">
                        <div className="text-lg font-bold text-primary mb-1">{value}</div>
                        <div className="text-white/70 text-sm capitalize">{key.replace('_', ' ')}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
            Be Part of the Journey
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join our community and help shape the future of warranty management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-primary to-secondary px-8 py-4 rounded-full text-white font-semibold text-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105">
              Join Beta Program
            </button>
            <button className="border border-primary/50 px-8 py-4 rounded-full text-white font-semibold text-lg hover:bg-primary/10 transition-all duration-300 transform hover:scale-105">
              Subscribe to Updates
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
