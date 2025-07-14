import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

// Form validation schema
const contactSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', data);
    toast.success('Thank you! Your inquiry has been submitted successfully. We\'ll get back to you within 24 hours.');
    
    reset();
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Showroom',
      details: [
        '123 Art Street, Creative District',
        'Chennai, Tamil Nadu 600001',
        'India'
      ]
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [
        '+91 98765 43210',
        '+91 44 2345 6789',
        'Mon-Sat: 9 AM - 7 PM'
      ]
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [
        'info@shakthiframing.com',
        'orders@shakthiframing.com',
        'support@shakthiframing.com'
      ]
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: [
        'Monday - Saturday: 9:00 AM - 7:00 PM',
        'Sunday: 10:00 AM - 5:00 PM',
        'Closed on public holidays'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed animate-fade-in-up animation-delay-200">
              Have a question about our services or need a custom quote? We'd love to hear from you. 
              Our team is here to help bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Information */}
            <div className="space-y-8">
              <div className="animate-fade-in-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <Card 
                        key={index} 
                        className="p-6 hover:shadow-lg transition-shadow duration-300"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <CardContent className="p-0">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {info.title}
                              </h3>
                              <div className="space-y-1">
                                {info.details.map((detail, detailIndex) => (
                                  <p key={detailIndex} className="text-gray-600">
                                    {detail}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="animate-fade-in-left animation-delay-600">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-64 bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                        <p className="text-lg font-medium text-gray-700">
                          Interactive Map
                        </p>
                        <p className="text-gray-600">
                          Map will be embedded here
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="animate-fade-in-right">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Send Us an Inquiry
                  </CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        {...register('fullName')}
                        className={`mt-1 ${
                          errors.fullName && touchedFields.fullName 
                            ? 'border-red-500 focus:border-red-500' 
                            : ''
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && touchedFields.fullName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        className={`mt-1 ${
                          errors.email && touchedFields.email 
                            ? 'border-red-500 focus:border-red-500' 
                            : ''
                        }`}
                        placeholder="Enter your email address"
                      />
                      {errors.email && touchedFields.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Subject */}
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        {...register('subject')}
                        className={`mt-1 ${
                          errors.subject && touchedFields.subject 
                            ? 'border-red-500 focus:border-red-500' 
                            : ''
                        }`}
                        placeholder="What is your inquiry about?"
                      />
                      {errors.subject && touchedFields.subject && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <Label htmlFor="message">Your Message *</Label>
                      <Textarea
                        id="message"
                        {...register('message')}
                        rows={5}
                        className={`mt-1 resize-none ${
                          errors.message && touchedFields.message 
                            ? 'border-red-500 focus:border-red-500' 
                            : ''
                        }`}
                        placeholder="Please provide details about your inquiry..."
                      />
                      {errors.message && touchedFields.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      className="w-full"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Inquiry
                        </>
                      )}
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                      * Required fields. We respect your privacy and will never share your information.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}