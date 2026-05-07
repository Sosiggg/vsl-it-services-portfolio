/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Mail, Shield, Settings, Anchor, Terminal, Cpu, Clock, MessageSquare, Menu, X, ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function App() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const sections = ["about", "services", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Focus on the center 10% of the viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", subject: "", service: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
      valid = false;
    }

    if (!formData.service) {
      newErrors.service = "Please select a service";
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", service: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      }, 1500);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user interacts
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const navLinks = [
    { name: "About", href: "#about", id: "about" },
    { name: "Services", href: "#services", id: "services" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-vsl-bg relative">
      {/* Techy Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-vsl-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-vsl-blue/10 blur-[100px] pointer-events-none" />

      {/* Navigation */}
      <nav id="navbar" className="fixed top-0 w-full bg-vsl-blue z-50 shadow-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1.5">
              <img 
                src="untitled.png" 
                alt="VSL Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="poppins-black text-lg md:text-xl tracking-tight text-white">
              VSL IT Services
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10 text-[11px] font-black tracking-widest uppercase">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`transition-all relative py-1 ${
                  activeSection === link.id ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? "auto" : 0, opacity: isMenuOpen ? 1 : 0 }}
          className="md:hidden bg-vsl-blue border-t border-white/10 overflow-hidden"
        >
          <div className="px-6 py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-black uppercase tracking-widest ${
                  activeSection === link.id ? "text-white" : "text-white/60"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="about" className="min-h-screen flex items-center relative pt-40 pb-20 lg:py-0">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center w-full">
            {/* Left: Profile Shot */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="lg:col-span-5 relative group order-1 lg:order-1 max-w-[400px] mx-auto lg:max-w-none w-full"
            >
              {/* Techy HUD Accents */}
              <div className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 border-vsl-blue/40 rounded-tl-2xl transition-all duration-500 group-hover:-top-5 group-hover:-left-5 group-hover:border-vsl-blue" />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 border-vsl-blue/40 rounded-br-2xl transition-all duration-500 group-hover:-bottom-5 group-hover:-right-5 group-hover:border-vsl-blue" />
              <div className="absolute -top-3 -right-3 w-12 h-12 border-t-4 border-r-4 border-vsl-blue/10 rounded-tr-2xl transition-all duration-500 group-hover:border-vsl-blue/30" />
              <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-4 border-l-4 border-vsl-blue/10 rounded-bl-2xl transition-all duration-500 group-hover:border-vsl-blue/30" />
              
              {/* Main Image Container */}
              <div className="relative aspect-square sm:aspect-auto sm:h-[450px] lg:h-auto lg:aspect-square bg-vsl-blue/5 rounded-[2rem] overflow-hidden shadow-2xl shadow-vsl-blue/20 border border-white/50 z-10 group-hover:shadow-vsl-blue/40 transition-shadow duration-700">
                {/* Tech Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(5,88,186,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(5,88,186,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-10 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-50" />
                
                <img 
                  src="Vince (1).png" 
                  alt="Vince Sen Lope Salas" 
                  className="w-full h-full object-cover object-top contrast-125 grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" 
                  referrerPolicy="no-referrer"
                />
                
                {/* Tech Blue Color Tint (fades on hover) */}
                <div className="absolute inset-0 bg-vsl-blue/20 mix-blend-color group-hover:opacity-0 transition-opacity duration-700 pointer-events-none z-10" />

                {/* Tech gradient & info box */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent border-t border-vsl-blue/20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 z-20 backdrop-blur-sm">
                  <div className="absolute top-0 left-0 w-1/3 h-[2px] bg-vsl-blue shadow-[0_0_10px_2px_rgba(5,88,186,0.8)] transition-all duration-500 group-hover:w-full" />
                  <p className="text-white font-black text-2xl lg:text-xl xl:text-2xl uppercase tracking-tight">Vince Sen Lope Salas</p>
                  <div className="mt-2">
                    <p className="text-vsl-blue text-[10px] font-black uppercase tracking-[0.2em] pt-0.5">
                      MARINE ENGINEER • TECHNICIAN / INSTALLER
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7 space-y-6 lg:space-y-8 order-2 lg:order-2 text-center lg:text-left"
            >
              <div className="inline-block px-4 py-1.5 bg-vsl-blue/10 rounded-lg text-vsl-blue text-[10px] font-black uppercase tracking-[0.2em]">
                Hardware Precision • Software Solutions
              </div>
              
              <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-black leading-[1.1] tracking-tight">
                Reliable <br className="hidden sm:block" />
                <span className="text-vsl-blue">IT Support</span><br className="hidden sm:block" />
                & Infrastructure.
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-500 max-w-xl leading-relaxed mx-auto lg:mx-0">
                I can assist you with any IT needs you may have. From hardware repairs and upgrades to software configuration and technical troubleshooting.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="frosted-card p-4 sm:p-5 rounded-2xl flex items-center gap-4 sm:gap-5 text-left">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-vsl-blue flex items-center justify-center text-white font-black text-base sm:text-lg shrink-0">01</div>
                  <div>
                    <h4 className="font-black text-xs sm:text-sm text-black">Technician</h4>
                    <p className="text-[10px] sm:text-[11px] text-gray-400 uppercase font-black">Systems & Repairs</p>
                  </div>
                </div>
                <div className="frosted-card p-4 sm:p-5 rounded-2xl flex items-center gap-4 sm:gap-5 text-left">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-vsl-blue flex items-center justify-center text-white font-black text-base sm:text-lg shrink-0">02</div>
                  <div>
                    <h4 className="font-black text-xs sm:text-sm text-black">Installer</h4>
                    <p className="text-[10px] sm:text-[11px] text-gray-400 uppercase font-black">Infrastructure & Cabling</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 lg:pt-6">
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 bg-vsl-blue text-white rounded-full font-black uppercase tracking-widest text-[10px] sm:text-xs hover:shadow-2xl hover:shadow-vsl-blue/40 transition-all hover:scale-105"
                >
                  Start A Project
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" className="min-h-screen flex items-center relative py-20 lg:py-0">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-8">
              <div className="space-y-4">
                <h2 className="text-vsl-blue font-black text-xs uppercase tracking-[0.3em]">Core Services</h2>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-black">Technical Solutions</h3>
              </div>
              <p className="text-gray-400 max-w-sm font-medium text-sm sm:text-base">
                Professional grade installation and support for residential and commercial environments.
              </p>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  title: "Network Installation",
                  desc: "Structured cabling, high-performance Wi-Fi, and server rack deployments.",
                  icon: <Settings size={28} />
                },
                {
                  title: "Infrastructure Maintenance",
                  desc: "Proactive monitoring and hardware lifecycle management to prevent downtime.",
                  icon: <Shield size={28} />
                },
                {
                  title: "Hardware & Software Support",
                  desc: "Troubleshooting and repairs for all technical issues, from desktop setups to network hardware.",
                  icon: <Anchor size={28} />
                }
              ].map((service, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="frosted-card p-8 sm:p-10 lg:p-12 rounded-[2.5rem] hover:bg-white transition-all duration-500 group"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-vsl-blue rounded-2xl flex items-center justify-center mb-8 sm:mb-10 text-white shadow-lg group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black mb-4 uppercase tracking-tight">{service.title}</h4>
                  <p className="text-gray-500 leading-relaxed font-medium text-sm sm:text-base">{service.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center relative py-20 lg:py-0">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="space-y-4 text-center lg:text-left">
                  <h2 className="text-vsl-blue font-black text-xs uppercase tracking-[0.3em]">Contact</h2>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-tight">
                    Ready to solve your <br className="hidden sm:block" />
                    <span className="text-vsl-blue text-2xl sm:text-3xl md:text-4xl lg:text-5xl">tech challenges?</span>
                  </h3>
                  <p className="text-base sm:text-lg text-gray-500 max-w-md leading-relaxed font-medium mx-auto lg:mx-0">
                    I believe in straightforward, honest service. Whether it's a minor software glitch or a full hardware overhaul, I'm here to ensure your technology works for you, not against you.
                  </p>
                </div>

                <div className="space-y-4 max-w-md mx-auto lg:mx-0">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-vsl-blue/10 flex items-center justify-center text-vsl-blue mt-1 shrink-0">
                      <Clock size={14} className="font-black" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-black text-sm uppercase tracking-tight text-black">Quick Response</h4>
                      <p className="text-sm text-gray-400">I value your time and aim for prompt solutions.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-vsl-blue text-white rounded-[3rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                    <img src="untitled.png" alt="Logo BG" className="w-48 h-48 brightness-0 invert" />
                  </div>
                  
                  <div className="relative z-10">
                    <h4 className="text-2xl font-black mb-8 uppercase tracking-tight">Direct Inquiry</h4>
                    
                    {isSubmitted ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20"
                      >
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Shield size={32} className="text-white" />
                        </div>
                        <h5 className="text-xl font-black mb-2">Message Sent!</h5>
                        <p className="text-sm text-white/70">Thank you for reaching out. I'll get back to you shortly.</p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/50 ml-1">Full Name</label>
                            <input 
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="John Doe"
                              className={`w-full bg-white/10 border ${errors.name ? 'border-red-400' : 'border-white/20'} rounded-xl px-5 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-all`}
                            />
                            {errors.name && <p className="text-[10px] font-bold text-red-300 ml-1">{errors.name}</p>}
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/50 ml-1">Email Address</label>
                            <input 
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="john@example.com"
                              className={`w-full bg-white/10 border ${errors.email ? 'border-red-400' : 'border-white/20'} rounded-xl px-5 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-all`}
                            />
                            {errors.email && <p className="text-[10px] font-bold text-red-300 ml-1">{errors.email}</p>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/50 ml-1">Subject</label>
                            <input 
                              type="text"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              placeholder="Brief topic"
                              className={`w-full bg-white/10 border ${errors.subject ? 'border-red-400' : 'border-white/20'} rounded-xl px-5 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-all`}
                            />
                            {errors.subject && <p className="text-[10px] font-bold text-red-300 ml-1">{errors.subject}</p>}
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/50 ml-1">Service Inquiry</label>
                            <div className="relative">
                              <select 
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                className={`w-full bg-white/10 border ${errors.service ? 'border-red-400' : 'border-white/20'} rounded-xl px-5 py-3 text-white text-sm appearance-none focus:outline-none focus:border-white/50 transition-all cursor-pointer [&>option]:text-black`}
                              >
                                <option value="" disabled>Select a service</option>
                                <option value="network">Network Installation</option>
                                <option value="infrastructure">Infrastructure Maintenance</option>
                                <option value="support">Hardware & Software Support</option>
                                <option value="consultation">General Consultation</option>
                                <option value="other">Other Inquiry</option>
                              </select>
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                                <ChevronDown size={14} />
                              </div>
                            </div>
                            {errors.service && <p className="text-[10px] font-bold text-red-300 ml-1">{errors.service}</p>}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/50 ml-1">Message</label>
                          <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={3}
                            placeholder="How can I help you?"
                            className={`w-full bg-white/10 border ${errors.message ? 'border-red-400' : 'border-white/20'} rounded-xl px-5 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/50 resize-none transition-all`}
                          />
                          {errors.message && <p className="text-[10px] font-bold text-red-300 ml-1">{errors.message}</p>}
                        </div>

                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-14 bg-white text-vsl-blue font-black rounded-xl flex items-center justify-center gap-3 text-sm uppercase tracking-widest hover:bg-gray-100 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                          {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-vsl-blue border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <>
                              <span>Submit Message</span>
                              <Terminal size={18} />
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
                
                {/* Techy Detail */}
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-vsl-blue/5 border border-vsl-blue/10 rounded-3xl -z-10 animate-pulse" />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Simplified Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-white/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <img src="untitled.png" alt="Logo" className="w-6 h-6 opacity-30" />
            <span className="poppins-black text-gray-300 text-[10px] sm:text-sm uppercase tracking-[0.2em]">
              VSL IT SERVICES • VINCE SALAS
            </span>
          </div>
          <div className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-relaxed">
            © {new Date().getFullYear()} VSL IT Services <span className="hidden sm:inline">•</span> <br className="sm:hidden" /> Tech Support & Installation
          </div>
        </div>
      </footer>
    </div>
  );
}

