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
      <Preview>Thank you for contacting WebInHour - We will respond within an hour!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={logo}>WebInHour</Heading>
            <Text style={tagline}>Professional Website Solutions</Text>
          </Section>
          
          <Section style={content}>
            <Heading style={h1}>Thank You, {name}! 🎉</Heading>
            
            <Text style={text}>
              We have successfully received your inquiry, and our team is already reviewing it. You will hear back from us <strong>within an hour</strong>!
            </Text>

            {hasSelections && (
              <Section style={summaryBox}>
                <Heading style={summaryTitle}>📋 Your Selection Summary</Heading>
                
                {services.length > 0 && (
                  <Section style={summarySection}>
                    <Text style={summaryLabel}>Services You Are Interested In:</Text>
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
                      <Text style={stepTitle}>Instant Review</Text>
                      <Text style={stepDesc}>
                        Our team is already reviewing your inquiry and preparing a personalized response
                      </Text>
                      <Text style={stepTime}>⚡ Happening now</Text>
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
                        You will receive a detailed response with next steps and recommendations
                      </Text>
                      <Text style={stepTime}>⏱️ Within an hour</Text>
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
                        We will guide you through the process and answer any questions you have
                      </Text>
                      <Text style={stepTime}>🚀 At your convenience</Text>
                    </td>
                  </tr>
                </table>
              </Section>
            </Section>
            
            <Section style={ctaBox}>
              <Text style={ctaText}>
                While you wait, explore our marketplace of professional website templates!
              </Text>
              <Link href="https://webinhour.com/marketplace" style={button}>
                Browse Marketplace →
              </Link>
            </Section>
            
            <Hr style={hr} />
            
            <Text style={contactInfo}>
              Need immediate assistance? Reply to this email or reach out to us directly.
            </Text>
            
            <Section style={socialLinks}>
              <Link href="https://webinhour.com" style={socialLink}>Website</Link>
              <Text style={socialDivider}>•</Text>
              <Link href="https://webinhour.com/contact" style={socialLink}>Contact</Link>
              <Text style={socialDivider}>•</Text>
              <Link href="https://webinhour.com/pricing" style={socialLink}>Pricing</Link>
            </Section>
          </Section>
          
          <Section style={footer}>
            <Text style={footerText}>
              © 2025 WebInHour. All rights reserved.
            </Text>
            <Text style={footerLinks}>
              <Link href="https://webinhour.com/privacy" style={footerLink}>Privacy Policy</Link>
              <Text style={footerDivider}>•</Text>
              <Link href="https://webinhour.com/terms" style={footerLink}>Terms of Service</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default UserConfirmation;

const main = {
  backgroundColor: '#0f0f0f',
  fontFamily: 'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  padding: '40px 20px',
};

const container = {
  backgroundColor: '#1a1a1a',
  margin: '0 auto',
  maxWidth: '600px',
  borderRadius: '16px',
  overflow: 'hidden',
  border: '1px solid #2a2a2a',
};

const header = {
  backgroundColor: '#8b5cf6',
  background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
  padding: '40px',
  textAlign: 'center' as const,
};

const logo = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0',
  letterSpacing: '-0.5px',
};

const tagline = {
  color: '#e9d5ff',
  fontSize: '14px',
  margin: '8px 0 0',
  fontWeight: '500',
};

const content = {
  padding: '40px',
};

const h1 = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 20px',
  lineHeight: '1.3',
};

const h2 = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 20px',
};

const text = {
  color: '#d1d5db',
  fontSize: '16px',
  lineHeight: '1.7',
  margin: '0 0 28px',
};

const summaryBox = {
  backgroundColor: '#252525',
  border: '2px solid #8b5cf6',
  borderRadius: '12px',
  padding: '24px',
  margin: '0 0 28px',
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
  borderBottom: '1px solid #333',
};

const summaryLabel = {
  color: '#9ca3af',
  fontSize: '12px',
  fontWeight: 'bold',
  letterSpacing: '0.5px',
  textTransform: 'uppercase' as const,
  margin: '0 0 8px',
};

const summaryItem = {
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: '500',
  margin: '6px 0',
  paddingLeft: '8px',
};

const summaryValue = {
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  margin: '4px 0',
};

const messageBox = {
  backgroundColor: '#252525',
  border: '1px solid #333',
  borderRadius: '12px',
  padding: '24px',
  margin: '0 0 28px',
};

const messageLabel = {
  color: '#9ca3af',
  fontSize: '12px',
  fontWeight: 'bold',
  letterSpacing: '1px',
  textTransform: 'uppercase' as const,
  margin: '0 0 12px',
};

const messageText = {
  color: '#e5e5e5',
  fontSize: '14px',
  lineHeight: '1.7',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const infoBox = {
  backgroundColor: '#252525',
  border: '1px solid #333',
  borderRadius: '12px',
  padding: '28px',
  margin: '0 0 28px',
};

const stepContainer = {
  marginBottom: '20px',
};

const stepTable = {
  width: '100%',
  borderCollapse: 'collapse' as const,
};

const stepNumberCell = {
  width: '50px',
  verticalAlign: 'top' as const,
  paddingRight: '16px',
};

const stepContentCell = {
  verticalAlign: 'top' as const,
};

const stepNumber = {
  color: '#ffffff',
  backgroundColor: '#8b5cf6',
  fontSize: '16px',
  fontWeight: 'bold',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  display: 'inline-block',
  lineHeight: '40px',
  textAlign: 'center' as const,
  margin: '0',
};

const stepTitle = {
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 6px',
};

const stepDesc = {
  color: '#9ca3af',
  fontSize: '14px',
  margin: '0 0 6px',
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
  background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
  borderRadius: '12px',
  padding: '28px',
  textAlign: 'center' as const,
  margin: '0 0 28px',
};

const ctaText = {
  color: '#ffffff',
  fontSize: '16px',
  margin: '0 0 20px',
  lineHeight: '1.5',
};

const button = {
  backgroundColor: '#ffffff',
  color: '#8b5cf6',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 36px',
  borderRadius: '8px',
};

const hr = {
  borderColor: '#333',
  margin: '32px 0',
};

const contactInfo = {
  color: '#9ca3af',
  fontSize: '14px',
  textAlign: 'center' as const,
  margin: '0 0 16px',
};

const socialLinks = {
  textAlign: 'center' as const,
  margin: '0 0 8px',
};

const socialLink = {
  color: '#8b5cf6',
  fontSize: '14px',
  textDecoration: 'none',
  fontWeight: '500',
};

const socialDivider = {
  color: '#4b5563',
  fontSize: '14px',
  display: 'inline',
  margin: '0 12px',
};

const footer = {
  backgroundColor: '#151515',
  padding: '24px 40px',
  textAlign: 'center' as const,
  borderTop: '1px solid #2a2a2a',
};

const footerText = {
  color: '#6b7280',
  fontSize: '12px',
  margin: '0 0 8px',
};

const footerLinks = {
  margin: '0',
};

const footerLink = {
  color: '#8b5cf6',
  fontSize: '12px',
  textDecoration: 'none',
};

const footerDivider = {
  color: '#4b5563',
  fontSize: '12px',
  display: 'inline',
  margin: '0 8px',
};