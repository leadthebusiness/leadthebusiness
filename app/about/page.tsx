import React from 'react';
import Image from 'next/image';
import { Mail, MapPin, Users, Award, Target, Heart, User, Home, Briefcase } from 'lucide-react';
import Navigation from '@/components/Nav';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black lg:pt-20 text-white">
        <Navigation />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-yellow-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-yellow-500">Chandrabhan Singh</span>
                <br />
                <span className="text-white">Rajawat</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Visionary Entrepreneur, Motivational Speaker, and Founder of YOUTAG - 
                Empowering lives through innovation and values-driven leadership.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-yellow-600/20 px-4 py-2 rounded-full border border-yellow-600/30">
                  <span className="text-yellow-400 font-medium">Businessman</span>
                </div>
                <div className="bg-yellow-600/20 px-4 py-2 rounded-full border border-yellow-600/30">
                  <span className="text-yellow-400 font-medium">Life Coach</span>
                </div>
                <div className="bg-yellow-600/20 px-4 py-2 rounded-full border border-yellow-600/30">
                  <span className="text-yellow-400 font-medium">Lawyer</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="relative w-80 h-80 rounded-2xl overflow-hidden border-2 border-yellow-600/30 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-yellow-800/20"></div>
                  <Image
                    src="/pic-3.png" // Replace with actual image path
                    alt="Chandrabhan Singh Rajawat"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-600/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-yellow-600/5 rounded-full blur-2xl"></div>
                {/* <div className="absolute -top-2 -left-2 w-16 h-16 border-2 border-yellow-400/40 rounded-full"></div>
                <div className="absolute -bottom-2 -right-2 w-20 h-20 border border-yellow-400/20 rounded-full"></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Personal Profile</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 p-8 rounded-2xl border border-gray-800 hover:border-yellow-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-600/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-600/10 to-transparent rounded-full blur-xl group-hover:from-yellow-600/20 transition-all duration-300"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-600/30 to-yellow-700/30 rounded-xl flex items-center justify-center border border-yellow-600/40 group-hover:scale-110 transition-transform duration-300">
                    <User className="text-yellow-400" size={24} />
                  </div>
                  <h3 className="text-yellow-400 font-bold text-xl">Basic Information</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <p className="text-gray-300"><span className="text-yellow-400 font-semibold">Born:</span> June 10, 1982 (Age 42)</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <p className="text-gray-300"><span className="text-yellow-400 font-semibold">Village:</span> Ichhalwara (Madhopura) Todabhim, Karouli, Rajasthan</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <p className="text-gray-300"><span className="text-yellow-400 font-semibold">Net Worth:</span> ₹10 Crores</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 p-8 rounded-2xl border border-gray-800 hover:border-yellow-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-600/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-600/10 to-transparent rounded-full blur-xl group-hover:from-yellow-600/20 transition-all duration-300"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-600/30 to-yellow-700/30 rounded-xl flex items-center justify-center border border-yellow-600/40 group-hover:scale-110 transition-transform duration-300">
                    <Heart className="text-yellow-400" size={24} />
                  </div>
                  <h3 className="text-yellow-400 font-bold text-xl">Family</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <p className="text-gray-300"><span className="text-yellow-400 font-semibold">Spouse:</span> Sarita Singh</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <p className="text-gray-300"><span className="text-yellow-400 font-semibold">Children:</span> Siddharth Singh Rajawat, Jahnvi Kanwar Rajawat</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <p className="text-gray-300"><span className="text-yellow-400 font-semibold">Parents:</span> Shri Ballu Singh Rajawat, Smt. Guman Kanwar Chouhan</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <p className="text-gray-300"><span className="text-yellow-400 font-semibold">Siblings:</span> Ompratap Singh Rajawat, Nagendra Singh Rajawat</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 p-8 rounded-2xl border border-gray-800 hover:border-yellow-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-600/10 md:col-span-2 lg:col-span-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-600/10 to-transparent rounded-full blur-xl group-hover:from-yellow-600/20 transition-all duration-300"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-600/30 to-yellow-700/30 rounded-xl flex items-center justify-center border border-yellow-600/40 group-hover:scale-110 transition-transform duration-300">
                    <Home className="text-yellow-400" size={24} />
                  </div>
                  <h3 className="text-yellow-400 font-bold text-xl">Current Residence</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-300 leading-relaxed">
                        Shri Jamuway Palace, Jeen Mata Nagar, Shekhwat Marg, Kalwar Road, Jhotwara, Jaipur, Rajasthan
                      </p>
                      <div className="mt-3 px-3 py-1 bg-yellow-600/20 rounded-full inline-block">
                        <span className="text-yellow-400 text-sm font-medium">Jaipur, Rajasthan</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Education & Qualifications</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Schooling & Higher Education", location: "Paota, Mahwa, Dausa, Rajasthan" },
              { title: "Graduation & Post Graduation", degree: "BSc. PG (Public Administration)", location: "PG College, Dausa, Rajasthan" },
              { title: "B.Ed.", location: "Srinagar, Jammu & Kashmir" },
              { title: "LLB", location: "Jaipur, Rajasthan University" },
              { title: "Advocacy", details: "Enrolled 2006 with the Bar Council of Rajasthan" }
            ].map((edu, index) => (
              <div key={index} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-yellow-600/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="text-yellow-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{edu.title}</h3>
                    {edu.degree && <p className="text-yellow-400 mb-1">{edu.degree}</p>}
                    <p className="text-gray-400">{edu.location || edu.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Vision & Mission</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-black/50 p-8 rounded-2xl border border-gray-800">
              <div className="flex items-center gap-4 mb-6">
                <Target className="text-yellow-400" size={32} />
                <h3 className="text-2xl font-bold text-white">Our Vision</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                To become a globally recognized leader in delivering top-quality services & products while empowering our distributors with unique business opportunities to earn through usage and sales. We aim to set new benchmarks in the industry and stay ahead of competition.
              </p>
            </div>
            
            <div className="bg-black/50 p-8 rounded-2xl border border-gray-800">
              <div className="flex items-center gap-4 mb-6">
                <Heart className="text-yellow-400" size={32} />
                <h3 className="text-2xl font-bold text-white">Our Mission</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                To provide top-quality services and products to customers at the most competitive prices. Our guiding philosophy "Empowering People, Enhancing Lives" reflects our belief in values-driven success and creating a platform for ethical business practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* YOUTAG Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">The YOUTAG Story</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 p-8 lg:p-12 rounded-2xl border border-gray-800">
            <div className="prose prose-lg max-w-none text-gray-300">
              <p className="text-xl leading-relaxed mb-6">
                During the Global COVID-19 Pandemic, Mr. Rajawat observed the severe unemployment crisis and its impact on India's middle and lower classes. This led him to conceive an innovative idea: <span className="text-yellow-400">empowering individuals, especially women and students, to earn through flexible work-from-home opportunities</span> using mobile phones and digital gadgets.
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                His mission is to uplift lives by offering accessible earning tools while providing high-quality services and products at affordable prices. He envisions building a trusted platform that fosters transparency, accountability, and career-building opportunities.
              </p>
              
              <p className="text-lg leading-relaxed">
                Today, millions across India benefit from his company's superior products and services, such as <span className="text-yellow-400 font-semibold">YOUTAG HERBAL</span>, leading healthier lives and generating income by sharing these products with others.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Core Values</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { value: "Transparency", icon: "🔍" },
              { value: "Integrity", icon: "🤝" },
              { value: "Discipline", icon: "⚡" },
              { value: "Respect", icon: "🙏" },
              { value: "Value Addition", icon: "📈" }
            ].map((item, index) => (
              <div key={index} className="bg-black/50 p-6 rounded-xl border border-gray-800 text-center hover:border-yellow-600/30 transition-colors group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-lg font-semibold text-yellow-400">{item.value}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-black/50 p-8 rounded-xl border border-gray-800">
              <div className="flex items-center gap-4 mb-4">
                <MapPin className="text-yellow-400" size={24} />
                <h3 className="text-xl font-semibold text-white">Office Address</h3>
              </div>
              <p className="text-gray-300">
                P.no- 678 Gokul Nagar, Kalwar Road<br />
                Jhotwara, Jaipur, Rajasthan<br />
                Pin - 302012
              </p>
            </div>
            
            <div className="bg-black/50 p-8 rounded-xl border border-gray-800">
              <div className="flex items-center gap-4 mb-4">
                <Mail className="text-yellow-400" size={24} />
                <h3 className="text-xl font-semibold text-white">Customer Care</h3>
              </div>
              <p className="text-gray-300">
                Email: careleadthebusiness@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;