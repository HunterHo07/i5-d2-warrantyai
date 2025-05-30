'use client';

import { useState } from 'react';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Check, 
  Star, 
  Zap, 
  Crown,
  Shield,
  CreditCard,
  ArrowRight
} from 'lucide-react';

export default function SignupPage() {
  const [step, setStep] = useState(1); // 1: Account, 2: Plan, 3: Payment, 4: Success
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  });

  const plans = [
    {
      id: 'free',
      name: 'Free',
      icon: <Star className="w-6 h-6" />,
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started',
      features: [
        '5 items per month',
        'Basic receipt scanning',
        'Simple reminders',
        'Mobile app access',
        'Cloud storage (1GB)'
      ],
      popular: false,
      color: 'white'
    },
    {
      id: 'pro',
      name: 'Pro',
      icon: <Zap className="w-6 h-6" />,
      price: { monthly: 9.99, yearly: 99.99 },
      description: 'For individuals and families',
      features: [
        'Unlimited items',
        'Advanced AI extraction',
        'Smart reminders',
        'Email integration',
        'Priority support',
        'Cloud storage (10GB)'
      ],
      popular: true,
      color: 'primary'
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: <Crown className="w-6 h-6" />,
      price: { monthly: 19.99, yearly: 199.99 },
      description: 'Advanced features for power users',
      features: [
        'Everything in Pro',
        '3D/AR inventory view',
        'Advanced analytics',
        'Family sharing (5 users)',
        'API access',
        'Cloud storage (100GB)'
      ],
      popular: false,
      color: 'secondary'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate account creation
    setTimeout(() => {
      setStep(4);
    }, 1500);
  };

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-space via-surface to-space">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Join</span>
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent ml-3">
              WarrantyAI
            </span>
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Start managing your warranties like a pro in just a few minutes
          </p>

          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  stepNum < step ? 'bg-accent text-space' :
                  stepNum === step ? 'bg-primary text-space' :
                  'bg-white/20 text-white/60'
                }`}>
                  {stepNum < step ? <Check className="w-4 h-4" /> : stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-12 h-1 mx-2 transition-all duration-300 ${
                    stepNum < step ? 'bg-accent' : 'bg-white/20'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-lg border border-white/10 overflow-hidden">
            
            {/* Step 1: Account Creation */}
            {step === 1 && (
              <div className="p-8">
                <h2 className="font-heading text-2xl font-bold text-white mb-6 text-center">
                  Create Your Account
                </h2>
                
                <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/70 text-sm mb-2">First Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary transition-colors duration-300"
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Last Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary transition-colors duration-300"
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary transition-colors duration-300"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary transition-colors duration-300"
                        placeholder="Create a strong password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="mt-1 w-4 h-4 text-primary bg-transparent border border-white/30 rounded focus:ring-primary focus:ring-2"
                        required
                      />
                      <span className="text-white/70 text-sm">
                        I agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                      </span>
                    </label>
                    
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="subscribeNewsletter"
                        checked={formData.subscribeNewsletter}
                        onChange={handleInputChange}
                        className="mt-1 w-4 h-4 text-primary bg-transparent border border-white/30 rounded focus:ring-primary focus:ring-2"
                      />
                      <span className="text-white/70 text-sm">
                        Subscribe to our newsletter for updates and warranty tips
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-secondary py-3 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105"
                  >
                    Continue to Plan Selection
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Plan Selection */}
            {step === 2 && (
              <div className="p-8">
                <h2 className="font-heading text-2xl font-bold text-white mb-6 text-center">
                  Choose Your Plan
                </h2>

                {/* Billing Toggle */}
                <div className="flex items-center justify-center space-x-4 mb-8">
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

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        selectedPlan === plan.id
                          ? 'border-primary bg-primary/10 glow-primary'
                          : 'border-white/20 hover:border-white/40 bg-white/5'
                      } ${plan.popular ? 'relative' : ''}`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <div className="bg-gradient-to-r from-primary to-secondary px-3 py-1 rounded-full text-white text-xs font-semibold">
                            Most Popular
                          </div>
                        </div>
                      )}

                      <div className="text-center">
                        <div className={`w-12 h-12 rounded-lg bg-${plan.color}/20 border border-${plan.color}/30 flex items-center justify-center mx-auto mb-4`}>
                          <div className={`text-${plan.color === 'white' ? 'white' : plan.color}`}>
                            {plan.icon}
                          </div>
                        </div>
                        
                        <h3 className="font-heading text-lg font-bold text-white mb-2">{plan.name}</h3>
                        <p className="text-white/70 text-sm mb-4">{plan.description}</p>
                        
                        <div className="mb-4">
                          <div className="text-2xl font-bold text-white">
                            ${plan.price[billingCycle]}
                          </div>
                          <div className="text-white/60 text-sm">
                            /{billingCycle === 'monthly' ? 'month' : 'year'}
                          </div>
                        </div>

                        <div className="space-y-2 text-left">
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <Check className="w-3 h-3 text-accent flex-shrink-0" />
                              <span className="text-white/80">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={handlePrevStep}
                    className="px-6 py-3 border border-white/20 rounded-lg text-white/70 hover:text-white hover:border-white/40 transition-all duration-300"
                  >
                    Back
                  </button>
                  
                  <button
                    onClick={handleNextStep}
                    className="px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment (Simulated) */}
            {step === 3 && (
              <div className="p-8">
                <h2 className="font-heading text-2xl font-bold text-white mb-6 text-center">
                  Payment Information
                </h2>

                {/* Order Summary */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
                  <h3 className="font-semibold text-white mb-4">Order Summary</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/70">{selectedPlanData?.name} Plan ({billingCycle})</span>
                    <span className="text-white font-semibold">
                      ${selectedPlanData?.price[billingCycle]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-bold text-white pt-2 border-t border-white/20">
                    <span>Total</span>
                    <span>${selectedPlanData?.price[billingCycle]}</span>
                  </div>
                </div>

                {/* Simulated Payment Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-white/70 text-sm">
                    <Shield className="w-4 h-4 text-accent" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-6 py-3 border border-white/20 rounded-lg text-white/70 hover:text-white hover:border-white/40 transition-all duration-300"
                    >
                      Back
                    </button>
                    
                    <button
                      type="submit"
                      className="px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105"
                    >
                      Complete Purchase
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-space" />
                </div>
                
                <h2 className="font-heading text-2xl font-bold text-white mb-4">
                  Welcome to WarrantyAI!
                </h2>
                
                <p className="text-white/80 mb-8">
                  Your account has been created successfully. You can now start managing your warranties like a pro.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-center space-x-3 text-white/70">
                    <Check className="w-4 h-4 text-accent" />
                    <span>Account created and verified</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-white/70">
                    <Check className="w-4 h-4 text-accent" />
                    <span>{selectedPlanData?.name} plan activated</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-white/70">
                    <Check className="w-4 h-4 text-accent" />
                    <span>Welcome email sent</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-gradient-to-r from-primary to-secondary px-8 py-3 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105">
                    Go to Dashboard
                  </button>
                  <button className="border border-primary/50 px-8 py-3 rounded-lg text-white font-semibold hover:bg-primary/10 transition-all duration-300 transform hover:scale-105">
                    Take a Tour
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
