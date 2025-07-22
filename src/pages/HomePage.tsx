
import { Navbar } from '@/components/home/Navbar';
import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { About } from '@/components/home/About';
import { Contact } from '@/components/home/Contact';
import { Footer } from '@/components/home/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;
