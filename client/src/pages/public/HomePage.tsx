import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductCard from '@/components/public/ProductCard';
import { mockProducts } from '@/lib/mockData';
import { Award, Clock, Shield, ArrowRight } from 'lucide-react';

export default function HomePage() {
  // Get first 4 products for featured section
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1579708/pexels-photo-1579708.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        />
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            Preserving Your
            <span className="block text-primary"> Memories in Style</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 animate-fade-in-up animation-delay-300">
            Premium picture framing services with over 20 years of craftsmanship excellence
          </p>
          <Button 
            asChild 
            size="lg" 
            className="text-lg px-8 py-6 animate-fade-in-up animation-delay-600 hover:scale-105 transition-transform duration-300"
          >
            <Link to="/products">
              Browse Our Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              Featured Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Discover our most popular frames, carefully crafted to showcase your precious memories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              Why Choose Shakthi Picture Framing?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              We combine traditional craftsmanship with modern techniques to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Premium Quality */}
            <Card className="text-center p-8 hover:shadow-lg transition-shadow duration-300 animate-fade-in-up">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-4">Premium Quality</CardTitle>
                <p className="text-gray-600 leading-relaxed">
                  We use only the finest materials and archival-quality components to ensure your frames last for generations.
                </p>
              </CardContent>
            </Card>

            {/* Expert Craftsmanship */}
            <Card className="text-center p-8 hover:shadow-lg transition-shadow duration-300 animate-fade-in-up animation-delay-200">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-4">Expert Craftsmanship</CardTitle>
                <p className="text-gray-600 leading-relaxed">
                  Our skilled artisans bring over 20 years of experience to every frame, ensuring perfect results every time.
                </p>
              </CardContent>
            </Card>

            {/* Fast Turnaround */}
            <Card className="text-center p-8 hover:shadow-lg transition-shadow duration-300 animate-fade-in-up animation-delay-400">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-4">Fast Turnaround</CardTitle>
                <p className="text-gray-600 leading-relaxed">
                  Most custom frames are completed within 5-7 business days, so you can enjoy your memories sooner.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 animate-fade-in-up">
            Ready to Frame Your Memories?
          </h2>
          <p className="text-xl mb-8 opacity-90 animate-fade-in-up animation-delay-200">
            Visit our showroom or browse our collection online to get started
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}