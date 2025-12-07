
export const getAIResponse = (userInput: string): string => {
  const input = userInput.toLowerCase();

  if (input.includes('template') || input.includes('website')) {
    return "Great! I can help you find the perfect template. We have categories like:\n\n• **Business & Corporate** - Professional sites\n• **E-commerce** - Online stores\n• **Portfolio** - Creative showcases\n• **Blog & News** - Content sites\n• **Landing Pages** - Marketing focused\n\nWhat type of website are you looking to create?";
  }

  if (input.includes('price') || input.includes('cost') || input.includes('quote')) {
    return "Our pricing is transparent and competitive:\n\n• **Template Purchase**: $29-99 (one-time)\n• **Custom Development**: $299-999\n• **Rush Delivery**: +50% (within 24 hours)\n• **Full Package**: Design + Development + Hosting\n\nWould you like a custom quote for your project?";
  }

  if (input.includes('marketplace') || input.includes('sell') || input.includes('list')) {
    return "Our marketplace allows developers to list their creations:\n\n• **Easy Listing Process** - Submit your work\n• **Quality Review** - We ensure high standards\n• **Fair Commission** - Keep 70% of sales\n• **Marketing Support** - We help promote your work\n\nAre you interested in selling your websites or browsing existing ones?";
  }

  if (input.includes('time') || input.includes('delivery') || input.includes('fast')) {
    return "**WebInHour** delivers fast:\n\n• **Templates**: Instant download\n• **Customization**: 2-24 hours\n• **Custom Sites**: 1-7 days\n• **Rush Orders**: Same day delivery\n\nOur rapid development process ensures you get professional results quickly!";
  }

  if (input.includes('help') || input.includes('support')) {
    return "I'm here to help! You can also:\n\n• Browse our **FAQ section**\n• Contact our support team\n• Schedule a consultation\n• Check our **How It Works** guide\n\nWhat specific information do you need?";
  }

  return "I'd be happy to help you with that! Could you tell me more about:\n\n• What type of website you need?\n• Your timeline and budget?\n• Any specific features you require?\n\nOr feel free to browse our templates and marketplace listings!";
};

export const getInitialMessage = () => ({
  content: "Hello! I'm your AI assistant for **WebInHour**. I can help you:\n\n• Find the perfect website template\n• Understand our services\n• Browse marketplace listings\n• Get development quotes\n\nWhat can I help you with today?",
  isUser: false,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
});
