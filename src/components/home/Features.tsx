
import { Code, Globe, Smartphone, Database, PaintBucket, TrendingUp, Shield, Monitor } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js and build modern responsive websites.'
  },
  {
    icon: Globe,
    title: 'Digital Marketing',
    description: 'Master SEO, Google Ads, Social Media Marketing and grow your online presence.'
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Create native and cross-platform mobile applications using React Native and Flutter.'
  },
  {
    icon: Database,
    title: 'Database Management',
    description: 'Learn SQL, MySQL, MongoDB and become proficient in database design and administration.'
  },
  {
    icon: PaintBucket,
    title: 'Graphic Design',
    description: 'Master Photoshop, Illustrator, CorelDraw and create stunning visual designs.'
  },
  {
    icon: TrendingUp,
    title: 'Data Science',
    description: 'Learn Python, machine learning, data analysis and become a data scientist.'
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Master ethical hacking, network security and protect digital infrastructure.'
  },
  {
    icon: Monitor,
    title: 'Computer Basics',
    description: 'Learn fundamentals of computers, MS Office, typing and digital literacy.'
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Professional Courses for{' '}
            <span className="bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
              Tech Career
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive computer courses designed to make you industry-ready. 
            Learn from basics to advanced with hands-on practical training.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="glass border-0 hover:scale-105 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-2xl flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
