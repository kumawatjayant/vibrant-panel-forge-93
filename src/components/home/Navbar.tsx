import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({
      behavior: 'smooth'
    });
    setIsMenuOpen(false);
  };
  const handleEnquiry = () => {
    navigate('/enquiry');
  };
  return <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex items-center justify-center">
              <img src="/lovable-uploads/27dc2b04-e229-49b5-aaa4-00858f77cc79.png" alt="EduVeritas Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold">EduVeritas</h1>
              <p className="text-xs text-muted-foreground">Elevating Education</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('hero')} className="text-foreground hover:text-primary transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('features')} className="text-foreground hover:text-primary transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-primary transition-colors">
              About
            </button>
            
            
            <Button onClick={handleEnquiry} className="gradient-primary text-white font-semibold">
              Enquire Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-xl border-t border-border/50">
              <button onClick={() => scrollToSection('hero')} className="block px-3 py-2 text-foreground hover:text-primary transition-colors w-full text-left">
                Home
              </button>
              <button onClick={() => scrollToSection('features')} className="block px-3 py-2 text-foreground hover:text-primary transition-colors w-full text-left">
                Features
              </button>
              <button onClick={() => scrollToSection('about')} className="block px-3 py-2 text-foreground hover:text-primary transition-colors w-full text-left">
                About
              </button>
              <button onClick={() => scrollToSection('contact')} className="block px-3 py-2 text-foreground hover:text-primary transition-colors w-full text-left">
                Contact
              </button>
              <div className="px-3 py-2 space-y-2">
                <Link to="/login" className="block">
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <User className="h-4 w-4" />
                    Student Login
                  </Button>
                </Link>
                <Button onClick={handleEnquiry} className="w-full gradient-primary text-white font-semibold">
                  Enquire Now
                </Button>
              </div>
            </div>
          </div>}
      </div>
    </nav>;
}