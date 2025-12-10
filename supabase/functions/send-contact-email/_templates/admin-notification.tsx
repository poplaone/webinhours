import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from 'npm:@react-email/components@0.0.22';
import * as React from 'npm:react@18.3.1';

interface AdminNotificationProps {
  name: string;
  email: string;
  subject?: string;
  message: string;
  type?: string;
  website?: string;
  projectType?: string;
}

export const AdminNotification = ({
  name,
  email,
  subject,
  message,
  type,
  website,
  projectType,
}: AdminNotificationProps) => (
  <Html>
    <Head />
    <Preview>🔔 New inquiry from {name} - WebInHour</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={logo}>WebInHour</Heading>
          <Text style={tagline}>New Lead Alert</Text>
        </Section>
        
        <Section style={content}>
          <Heading style={h1}>📬 New Contact Form Submission</Heading>
          <Text style={urgencyBadge}>⚡ Respond within 1 hour</Text>
          
          <Section style={infoBox}>
            <Text style={infoLabel}>CONTACT DETAILS</Text>
            <Hr style={hrLight} />
            
            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>👤 Name:</Text>
              </Column>
              <Column>
                <Text style={value}>{name}</Text>
              </Column>
            </Row>
            
            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>📧 Email:</Text>
              </Column>
              <Column>
                <Link href={`mailto:${email}`} style={emailLink}>{email}</Link>
              </Column>
            </Row>
            
            {type && (
              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>📋 Inquiry Type:</Text>
                </Column>
                <Column>
                  <Text style={valueHighlight}>{type}</Text>
                </Column>
              </Row>
            )}
            
            {subject && (
              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>📌 Subject:</Text>
                </Column>
                <Column>
                  <Text style={value}>{subject}</Text>
                </Column>
              </Row>
            )}
            
            {website && (
              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>🌐 Website:</Text>
                </Column>
                <Column>
                  <Link href={website} style={emailLink}>{website}</Link>
                </Column>
              </Row>
            )}
            
            {projectType && (
              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>🎯 Project Type:</Text>
                </Column>
                <Column>
                  <Text style={value}>{projectType}</Text>
                </Column>
              </Row>
            )}
          </Section>
          
          <Section style={messageBox}>
            <Text style={infoLabel}>💬 MESSAGE</Text>
            <Hr style={hrLight} />
            <Text style={messageText}>{message}</Text>
          </Section>
          
          <Section style={actionBox}>
            <Link href={`mailto:${email}?subject=Re: Your inquiry to WebInHour`} style={replyButton}>
              Reply to {name} →
            </Link>
          </Section>
        </Section>
        
        <Section style={footer}>
          <Text style={footerText}>
            This is an automated notification from WebInHour contact form
          </Text>
          <Text style={footerLink}>
            <Link href="https://webinhour.com" style={link}>webinhour.com</Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default AdminNotification;

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
  padding: '32px 40px',
  textAlign: 'center' as const,
};

const logo = {
  color: '#ffffff',
  fontSize: '28px',
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
  padding: '32px 40px',
};

const h1 = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 8px',
  lineHeight: '1.3',
};

const urgencyBadge = {
  color: '#fbbf24',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 24px',
  display: 'inline-block',
  backgroundColor: 'rgba(251, 191, 36, 0.1)',
  padding: '6px 12px',
  borderRadius: '20px',
  border: '1px solid rgba(251, 191, 36, 0.3)',
};

const infoBox = {
  backgroundColor: '#252525',
  border: '1px solid #333',
  borderRadius: '12px',
  padding: '24px',
  margin: '0 0 20px',
};

const messageBox = {
  backgroundColor: '#252525',
  border: '2px solid #8b5cf6',
  borderRadius: '12px',
  padding: '24px',
  margin: '0 0 24px',
};

const infoLabel = {
  color: '#8b5cf6',
  fontSize: '12px',
  fontWeight: 'bold',
  letterSpacing: '1.5px',
  margin: '0 0 12px',
};

const infoRow = {
  marginBottom: '14px',
};

const labelColumn = {
  width: '140px',
  verticalAlign: 'top',
};

const label = {
  color: '#9ca3af',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0',
};

const value = {
  color: '#ffffff',
  fontSize: '14px',
  margin: '0',
};

const emailLink = {
  color: '#8b5cf6',
  fontSize: '14px',
  textDecoration: 'none',
};

const valueHighlight = {
  color: '#8b5cf6',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0',
  textTransform: 'uppercase' as const,
  backgroundColor: 'rgba(139, 92, 246, 0.1)',
  padding: '4px 10px',
  borderRadius: '4px',
  display: 'inline-block',
};

const messageText = {
  color: '#e5e5e5',
  fontSize: '15px',
  lineHeight: '1.7',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const hrLight = {
  borderColor: '#333',
  margin: '16px 0',
};

const actionBox = {
  textAlign: 'center' as const,
};

const replyButton = {
  backgroundColor: '#8b5cf6',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  display: 'inline-block',
  padding: '14px 32px',
  borderRadius: '8px',
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

const footerLink = {
  margin: '0',
};

const link = {
  color: '#8b5cf6',
  fontSize: '12px',
  textDecoration: 'none',
};