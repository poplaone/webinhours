import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
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
    <Preview>New contact form submission from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>🔔 New Contact Form Submission</Heading>
        
        <Section style={infoBox}>
          <Text style={infoLabel}>CONTACT INFORMATION</Text>
          <Hr style={hr} />
          
          <Row style={infoRow}>
            <Column style={labelColumn}>
              <Text style={label}>Name:</Text>
            </Column>
            <Column>
              <Text style={value}>{name}</Text>
            </Column>
          </Row>
          
          <Row style={infoRow}>
            <Column style={labelColumn}>
              <Text style={label}>Email:</Text>
            </Column>
            <Column>
              <Text style={value}>{email}</Text>
            </Column>
          </Row>
          
          {type && (
            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>Inquiry Type:</Text>
              </Column>
              <Column>
                <Text style={valueHighlight}>{type}</Text>
              </Column>
            </Row>
          )}
          
          {subject && (
            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>Subject:</Text>
              </Column>
              <Column>
                <Text style={value}>{subject}</Text>
              </Column>
            </Row>
          )}
          
          {website && (
            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>Website:</Text>
              </Column>
              <Column>
                <Text style={value}>{website}</Text>
              </Column>
            </Row>
          )}
          
          {projectType && (
            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>Project Type:</Text>
              </Column>
              <Column>
                <Text style={value}>{projectType}</Text>
              </Column>
            </Row>
          )}
        </Section>
        
        <Section style={messageBox}>
          <Text style={infoLabel}>MESSAGE</Text>
          <Hr style={hr} />
          <Text style={messageText}>{message}</Text>
        </Section>
        
        <Hr style={hr} />
        
        <Text style={footer}>
          This is an automated notification from WebInHours contact form
        </Text>
      </Container>
    </Body>
  </Html>
);

export default AdminNotification;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '40px 0 20px',
  padding: '0 40px',
};

const infoBox = {
  backgroundColor: '#f8f9fa',
  border: '1px solid #e9ecef',
  borderRadius: '8px',
  margin: '20px 40px',
  padding: '24px',
};

const messageBox = {
  backgroundColor: '#fff',
  border: '2px solid #8b5cf6',
  borderRadius: '8px',
  margin: '20px 40px',
  padding: '24px',
};

const infoLabel = {
  color: '#8b5cf6',
  fontSize: '12px',
  fontWeight: 'bold',
  letterSpacing: '1px',
  margin: '0 0 12px',
};

const infoRow = {
  marginBottom: '12px',
};

const labelColumn = {
  width: '140px',
  verticalAlign: 'top',
};

const label = {
  color: '#6c757d',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
};

const value = {
  color: '#1a1a1a',
  fontSize: '14px',
  margin: '0',
};

const valueHighlight = {
  color: '#8b5cf6',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0',
  textTransform: 'uppercase' as const,
};

const messageText = {
  color: '#1a1a1a',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const hr = {
  borderColor: '#e9ecef',
  margin: '16px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '20px 40px',
  textAlign: 'center' as const,
};
