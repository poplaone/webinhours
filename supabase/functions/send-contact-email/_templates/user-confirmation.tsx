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
}

export const UserConfirmation = ({
  name,
  message,
}: UserConfirmationProps) => (
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
            We've successfully received your message and our team is already reviewing it.
          </Text>
          
          <Section style={messageBox}>
            <Text style={messageLabel}>Your Message:</Text>
            <Text style={messageText}>{message}</Text>
          </Section>
          
          <Section style={infoBox}>
            <Heading style={h2}>What Happens Next?</Heading>
            
            <Section style={step}>
              <Text style={stepNumber}>1</Text>
              <Section>
                <Text style={stepTitle}>Team Review</Text>
                <Text style={stepDesc}>
                  Our team is reviewing your inquiry and gathering the necessary information
                </Text>
                <Text style={stepTime}>⏱️ Within 1-2 hours</Text>
              </Section>
            </Section>
            
            <Section style={step}>
              <Text style={stepNumber}>2</Text>
              <Section>
                <Text style={stepTitle}>Personalized Response</Text>
                <Text style={stepDesc}>
                  You'll receive a detailed response with next steps and recommendations
                </Text>
                <Text style={stepTime}>⏱️ Within 24 hours</Text>
              </Section>
            </Section>
            
            <Section style={step}>
              <Text style={stepNumber}>3</Text>
              <Section>
                <Text style={stepTitle}>Get Started</Text>
                <Text style={stepDesc}>
                  We'll guide you through the process and answer any questions you have
                </Text>
                <Text style={stepTime}>⏱️ At your convenience</Text>
              </Section>
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

const step = {
  display: 'flex',
  gap: '16px',
  marginBottom: '20px',
};

const stepNumber = {
  color: '#ffffff',
  backgroundColor: '#8b5cf6',
  fontSize: '18px',
  fontWeight: 'bold',
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: '0',
  margin: '0',
  padding: '8px',
  textAlign: 'center' as const,
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
