import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export function Hero() {
  const navigate = useNavigate();
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const handleEnquiry = () => {
    navigate('/enquiry');
  };
  const handleLogin = () => {
    navigate('/login');
  };
  return <section id="hero" className="pt-20 pb-16 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
                EduVeritas
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Master the digital world with our comprehensive computer courses. 
              From programming to digital marketing, we shape your tech career.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 gradient-primary rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 gradient-primary rounded-full flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 gradient-primary rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleEnquiry} size="lg" className="gradient-primary text-white font-semibold">
                Enquire Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative animate-slide-in-right">
            <div className="glass rounded-3xl p-8 bg-gradient-to-br from-purple-500/10 to-blue-500/10">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-background/50 rounded-xl">
                  <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Web Development</div>
                    <div className="text-sm text-muted-foreground">Full-stack programming courses</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-background/50 rounded-xl">
                  <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Digital Marketing</div>
                    <div className="text-sm text-muted-foreground">SEO, Social Media & Analytics</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-background/50 rounded-xl">
                  <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Industry Certified</div>
                    <div className="text-sm text-muted-foreground">Job-ready certification programs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}