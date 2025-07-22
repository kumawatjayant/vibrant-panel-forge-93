
import { CheckCircle, Target, Eye, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function About() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              About{' '}
              <span className="bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
                EduVeritas
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              EduVeritas has been at the forefront of educational excellence for over 15 years. 
              We believe in empowering educational institutions with cutting-edge technology 
              and comprehensive management solutions.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">15+ Years of Excellence</h4>
                  <p className="text-muted-foreground">Proven track record in educational management</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">1000+ Students Served</h4>
                  <p className="text-muted-foreground">Comprehensive student lifecycle management</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">50+ Courses Offered</h4>
                  <p className="text-muted-foreground">Diverse academic programs and specializations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Mission, Vision, Values */}
          <div className="space-y-6 animate-slide-in-right">
            <Card className="glass border-0">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To provide innovative educational technology solutions that empower institutions 
                  to deliver exceptional learning experiences and achieve academic excellence.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-0">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To be the leading provider of comprehensive educational management systems, 
                  transforming how institutions operate and students learn.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-0">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Our Values</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Excellence, Innovation, Integrity, and Student Success drive everything we do. 
                  We are committed to fostering educational environments that inspire growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
