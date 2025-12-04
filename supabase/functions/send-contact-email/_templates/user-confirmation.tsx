import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22';
import * as React from 'npm:react@18.3.1';

interface UserConfirmationProps {
  name: string;
  message: string;
  services?: string[];
  budget?: string;
  timeline?: string;
  customService?: string;
}

export const UserConfirmation = ({
  name,
  message,
  services = [],
  budget,
  timeline,
  customService,
}: UserConfirmationProps) => {
  const serviceLabels: Record<string, string> = {
    'free-website': '🌐 Free Website',
    'custom-website': '🎨 Custom Website',
    'ecommerce': '🛒 E-commerce Store',
    'seo-geo': '📈 SEO & GEO Optimization',
    'content-creation': '✍️ Content Creation',
    'social-media': '📱 Social Media Management',
    'pr-marketing': '📣 PR & Marketing',
    'maintenance': '🔧 Website Maintenance',
    'other': '💬 Other',
  };

  const budgetLabels: Record<string, string> = {
    'free': 'Free Tier',
    'starter': '$500 - $2,000',
    'growth': '$2,000 - $5,000',
    'enterprise': '$5,000+',
    'not-sure': 'Not Sure Yet',
  };

  const timelineLabels: Record<string, string> = {
    'asap': 'ASAP (Within 1 week)',
    '2-weeks': '2 Weeks',
    '1-month': '1 Month',
    'planning': 'Just Planning',
  };

  const hasSelections = services.length > 0 || budget || timeline;

  return (
    <Html>
      <Head />
      <Preview>Thank you for contacting WebInHours - We've received your message</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={logo}>WebInHours</Heading>
            <Text style={tagline}>Professional Website Solutions</Text>
          </Section>
          
          <Section style={content}>
            <Heading style={h1}>Thank You, {name}! 🎉</Heading>
            
            <Text style={text}>
              We've successfully received your inquiry and our team is already reviewing it. You'll hear back from us within 2 hours!
            </Text>

            {hasSelections && (
              <Section style={summaryBox}>
                <Heading style={summaryTitle}>📋 Your Selection Summary</Heading>
                
                {services.length > 0 && (
                  <Section style={summarySection}>
                    <Text style={summaryLabel}>Services You're Interested In:</Text>
                    {services.map((serviceId, index) => (
                      <Text key={index} style={summaryItem}>
                        {serviceId === 'other' && customService 
                          ? `💬 Other: ${customService}`
                          : serviceLabels[serviceId] || serviceId
                        }
                      </Text>
                    ))}
                  </Section>
                )}

                {budget && (
                  <Section style={summarySection}>
                    <Text style={summaryLabel}>Budget Range:</Text>
                    <Text style={summaryValue}>💰 {budgetLabels[budget] || budget}</Text>
                  </Section>
                )}

                {timeline && (
                  <Section style={summarySection}>
                    <Text style={summaryLabel}>Timeline:</Text>
                    <Text style={summaryValue}>⏰ {timelineLabels[timeline] || timeline}</Text>
                  </Section>
                )}
              </Section>
            )}

            {!hasSelections && message && (
              <Section style={messageBox}>
                <Text style={messageLabel}>Your Message:</Text>
                <Text style={messageText}>{message}</Text>
              </Section>
            )}
            
            <Section style={infoBox}>
              <Heading style={h2}>What Happens Next?</Heading>
              
              <Section style={stepContainer}>
                <table style={stepTable}>
                  <tr>
                    <td style={stepNumberCell}>
                      <Text style={stepNumber}>1</Text>
                    </td>
                    <td style={stepContentCell}>
                      <Text style={stepTitle}>Team Review</Text>
                      <Text style={stepDesc}>
                        Our team is reviewing your inquiry and gathering the necessary information
                      </Text>
                      <Text style={stepTime}>⏱️ Within 1-2 hours</Text>
                    </td>
                  </tr>
                </table>
              </Section>
              
              <Section style={stepContainer}>
                <table style={stepTable}>
                  <tr>
                    <td style={stepNumberCell}>
                      <Text style={stepNumber}>2</Text>
                    </td>
                    <td style={stepContentCell}>
                      <Text style={stepTitle}>Personalized Response</Text>
                      <Text style={stepDesc}>
                        You'll receive a detailed response with next steps and recommendations
                      </Text>
                      <Text style={stepTime}>⏱️ Within 24 hours</Text>
                    </td>
                  </tr>
                </table>
              </Section>
              
              <Section style={stepContainer}>
                <table style={stepTable}>
                  <tr>
                    <td style={stepNumberCell}>
                      <Text style={stepNumber}>3</Text>
                    </td>
                    <td style={stepContentCell}>
                      <Text style={stepTitle}>Get Started</Text>
                      <Text style={stepDesc}>
                        We'll guide you through the process and answer any questions you have
                      </Text>
                      <Text style={stepTime}>⏱️ At your convenience</Text>
                    </td>
                  </tr>
                </table>
              </Section>
            </Section>
            
            <Section style={ctaBox}>
              <Text style={ctaText}>
                While you wait, explore our marketplace of professional website templates!
              </Text>
              <Link href="https://webinhours.com/marketplace" style={button}>
                Browse Marketplace →
              </Link>
            </Section>
            
            <Hr style={hr} />
            
            <Text style={footer}>
              Need immediate assistance? Reply to this email or call us at +1 (555) 123-4567
            </Text>
            
            <Text style={footer}>
              <Link href="https://webinhours.com" style={link}>WebInHours</Link> •{' '}
              <Link href="https://webinhours.com/privacy" style={link}>Privacy Policy</Link> •{' '}
              <Link href="https://webinhours.com/terms" style={link}>Terms of Service</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default UserConfirmation;

const main = {
  backgroundColor: '#f3f4f6',
  fontFamily: 'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  maxWidth: '600px',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const header = {
  backgroundColor: '#8b5cf6',
  padding: '32px 40px',
  textAlign: 'center' as const,
};

const logo = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0',
};

const tagline = {
  color: '#e9d5ff',
  fontSize: '14px',
  margin: '8px 0 0',
};

const content = {
  padding: '40px',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 24px',
  lineHeight: '1.3',
};

const h2 = {
  color: '#1a1a1a',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 16px',
};

const text = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 24px',
};

const summaryBox = {
  backgroundColor: '#faf5ff',
  border: '2px solid #8b5cf6',
  borderRadius: '12px',
  padding: '24px',
  margin: '24px 0',
};

const summaryTitle = {
  color: '#8b5cf6',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 20px',
  textAlign: 'center' as const,
};

const summarySection = {
  marginBottom: '16px',
  paddingBottom: '16px',
  borderBottom: '1px solid #e9d5ff',
};

const summaryLabel = {
  color: '#6b7280',
  fontSize: '12px',
  fontWeight: 'bold',
  letterSpacing: '0.5px',
  textTransform: 'uppercase' as const,
  margin: '0 0 8px',
};

const summaryItem = {
  color: '#1a1a1a',
  fontSize: '15px',
  fontWeight: '500',
  margin: '4px 0',
  paddingLeft: '8px',
};

const summaryValue = {
  color: '#1a1a1a',
  fontSize: '16px',
  fontWeight: '600',
  margin: '4px 0',
};

const messageBox = {
  backgroundColor: '#f9fafb',
  border: '2px solid #e5e7eb',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
};

const messageLabel = {
  color: '#6b7280',
  fontSize: '12px',
  fontWeight: 'bold',
  letterSpacing: '1px',
  textTransform: 'uppercase' as const,
  margin: '0 0 8px',
};

const messageText = {
  color: '#1a1a1a',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const infoBox = {
  backgroundColor: '#faf5ff',
  border: '1px solid #e9d5ff',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
};

const stepContainer = {
  marginBottom: '16px',
};

const stepTable = {
  width: '100%',
  borderCollapse: 'collapse' as const,
};

const stepNumberCell = {
  width: '44px',
  verticalAlign: 'top' as const,
  paddingRight: '12px',
};

const stepContentCell = {
  verticalAlign: 'top' as const,
};

const stepNumber = {
  color: '#ffffff',
  backgroundColor: '#8b5cf6',
  fontSize: '16px',
  fontWeight: 'bold',
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  display: 'inline-block',
  lineHeight: '36px',
  textAlign: 'center' as const,
  margin: '0',
};

const stepTitle = {
  color: '#1a1a1a',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 4px',
};

const stepDesc = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0 0 4px',
  lineHeight: '1.5',
};

const stepTime = {
  color: '#8b5cf6',
  fontSize: '13px',
  fontWeight: '600',
  margin: '0',
};

const ctaBox = {
  backgroundColor: '#8b5cf6',
  borderRadius: '8px',
  padding: '24px',
  textAlign: 'center' as const,
  margin: '24px 0',
};

const ctaText = {
  color: '#ffffff',
  fontSize: '16px',
  margin: '0 0 16px',
};

const button = {
  backgroundColor: '#ffffff',
  color: '#8b5cf6',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 32px',
  borderRadius: '6px',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
};

const footer = {
  color: '#9ca3af',
  fontSize: '12px',
  lineHeight: '20px',
  textAlign: 'center' as const,
  margin: '8px 0',
};

const link = {
  color: '#8b5cf6',
  textDecoration: 'underline',
};
