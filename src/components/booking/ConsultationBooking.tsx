
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, Phone, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const ConsultationBooking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  const consultationTypes = [
    {
      id: 'strategy',
      title: 'Strategy Session',
      duration: '30 min',
      description: 'Perfect for discussing your project goals and getting expert advice',
      icon: Video,
      price: 'Free'
    },
    {
      id: 'technical',
      title: 'Technical Review',
      duration: '45 min', 
      description: 'In-depth analysis of your current site and technical requirements',
      icon: Phone,
      price: 'Free'
    },
    {
      id: 'proposal',
      title: 'Project Proposal',
      duration: '60 min',
      description: 'Detailed project planning with timeline and custom quote',
      icon: Calendar,
      price: 'Free'
    }
  ];

  const availableDates = [
    { date: '2024-01-15', label: 'Today', slots: 3 },
    { date: '2024-01-16', label: 'Tomorrow', slots: 5 },
    { date: '2024-01-17', label: 'Wed, Jan 17', slots: 4 },
    { date: '2024-01-18', label: 'Thu, Jan 18', slots: 6 },
    { date: '2024-01-19', label: 'Fri, Jan 19', slots: 2 }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', 
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleBooking = () => {
    // Handle booking submission
    console.log('Booking:', { selectedDate, selectedTime, consultationType, contactInfo });
    setCurrentStep(4);
  };

  if (currentStep === 4) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto"
      >
        <Card className="border-green-500/20 bg-green-500/10">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Consultation Booked!</h3>
            <p className="text-muted-foreground mb-4">
              You'll receive a calendar invite within 5 minutes. We're excited to discuss your project!
            </p>
            <div className="bg-background/50 rounded-lg p-4 mb-4">
              <div className="text-sm font-medium mb-2">Your Consultation Details:</div>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>{consultationTypes.find(t => t.id === consultationType)?.title}</div>
                <div>{availableDates.find(d => d.date === selectedDate)?.label} at {selectedTime}</div>
                <div>Meeting link will be sent to {contactInfo.email}</div>
              </div>
            </div>
            <Button className="w-full">
              Add to Calendar
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
              step <= currentStep 
                ? 'bg-[#8B5CF6] text-white' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {step}
            </div>
            {step < 3 && (
              <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                step < currentStep ? 'bg-[#8B5CF6]' : 'bg-muted'
              }`} />
            )}
          </div>
        ))}
      </div>

      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Step 1: Consultation Type */}
        {currentStep === 1 && (
          <Card>
            <CardContent className="p-4 md:p-6 lg:p-8">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3 lg:mb-4 text-center">Choose Your Consultation Type</h3>
              <p className="text-muted-foreground text-center mb-4 md:mb-6 lg:mb-8 text-sm md:text-base lg:text-lg">
                All consultations are completely free with no obligations
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {consultationTypes.map((type, index) => (
                  <motion.div
                    key={type.id}
                    className={`relative p-4 md:p-6 lg:p-8 rounded-xl border-2 cursor-pointer transition-all duration-300 group overflow-hidden ${
                      consultationType === type.id
                        ? 'border-[#8B5CF6] bg-[#8B5CF6]/10 shadow-xl shadow-[#8B5CF6]/20'
                        : 'border-border hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/5 hover:shadow-lg'
                    }`}
                    onClick={() => setConsultationType(type.id)}
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {/* Background gradient effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      consultationType === type.id ? 'opacity-100' : ''
                    }`}></div>
                    
                    {/* Popular badge for middle option */}
                    {index === 1 && (
                      <div className="absolute -top-2 lg:-top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-2 md:px-3 py-1 rounded-full z-10">
                        POPULAR
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="relative z-10 text-center">
                      <div className={`inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full mb-3 md:mb-4 transition-all duration-300 ${
                        consultationType === type.id 
                          ? 'bg-[#8B5CF6] text-white shadow-lg' 
                          : 'bg-muted text-muted-foreground group-hover:bg-[#8B5CF6] group-hover:text-white'
                      }`}>
                        <type.icon className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
                      </div>
                      
                      <h4 className="text-base md:text-lg font-bold mb-2">{type.title}</h4>
                      
                      <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs font-medium">
                          <Clock className="h-3 w-3 mr-1" />
                          {type.duration}
                        </Badge>
                        <Badge variant="outline" className="text-emerald-600 border-emerald-600 text-xs font-bold">
                          {type.price}
                        </Badge>
                      </div>
                      
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{type.description}</p>
                      
                      {/* Selected indicator */}
                      {consultationType === type.id && (
                        <motion.div 
                          className="mt-2 md:mt-3 flex items-center justify-center gap-2 text-[#8B5CF6] font-semibold"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-pulse"></div>
                          <span className="text-xs">Selected</span>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-end mt-8">
                <Button 
                  onClick={() => setCurrentStep(2)}
                  disabled={!consultationType}
                  className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Date & Time */}
        {currentStep === 2 && (
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-2 text-center">Select Date & Time</h3>
              <p className="text-muted-foreground text-center mb-8">
                Choose your preferred consultation slot
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Date Selection */}
                <div>
                  <h4 className="font-semibold mb-4">Available Dates</h4>
                  <div className="space-y-2">
                    {availableDates.map((date) => (
                      <motion.div
                        key={date.date}
                        className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                          selectedDate === date.date
                            ? 'border-[#8B5CF6] bg-[#8B5CF6]/10'
                            : 'border-border hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/5'
                        }`}
                        onClick={() => setSelectedDate(date.date)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{date.label}</span>
                          <Badge variant="secondary">{date.slots} slots</Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <h4 className="font-semibold mb-4">Available Times</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <motion.button
                        key={time}
                        className={`p-3 rounded-lg border text-sm transition-all duration-300 ${
                          selectedTime === time
                            ? 'border-[#8B5CF6] bg-[#8B5CF6] text-white'
                            : 'border-border hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/5'
                        }`}
                        onClick={() => setSelectedTime(time)}
                        disabled={!selectedDate}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button 
                  onClick={() => setCurrentStep(3)}
                  disabled={!selectedDate || !selectedTime}
                  className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Contact Information */}
        {currentStep === 3 && (
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-2 text-center">Contact Information</h3>
              <p className="text-muted-foreground text-center mb-8">
                We'll use this information to send you the meeting details
              </p>
              
              <div className="max-w-md mx-auto space-y-4">
                <Input
                  placeholder="Full Name *"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                  required
                />
                <Input
                  type="email"
                  placeholder="Email Address *"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                  required
                />
                <Input
                  placeholder="Phone Number *"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                  required
                />
                <Input
                  placeholder="Company/Organization (optional)"
                  value={contactInfo.company}
                  onChange={(e) => setContactInfo({...contactInfo, company: e.target.value})}
                />
              </div>
              
              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button 
                  onClick={handleBooking}
                  disabled={!contactInfo.name || !contactInfo.email || !contactInfo.phone}
                  className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                >
                  Book Consultation
                  <CheckCircle className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};
