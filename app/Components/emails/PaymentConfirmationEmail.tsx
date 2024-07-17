import React from 'react';
import { Html, Button, Container, Row, Text, Heading } from '@react-email/components';

interface User {
  fullName: string;
  emailAddress: string;
}

interface PaymentDetails {
  amount: string;
  destination: string;
  checkinDate: string;
  checkoutDate: string;
}

const PaymentConfirmationEmail = (user: User, paymentDetails: PaymentDetails) => {
  return (
    <Html>
      <Container style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f4f4f4' }}>
        <Row style={{ backgroundColor: '#007bff', padding: '20px', textAlign: 'center' }}>
          <Heading style={{ color: '#ffffff', fontSize: '24px', margin: '0' }}>Payment Confirmation</Heading>
        </Row>
        <Row style={{ padding: '20px', backgroundColor: '#ffffff' }}>
          <Text style={{ fontSize: '16px', color: '#333333' }}>Hello {user.fullName},</Text>
          <Text style={{ fontSize: '16px', color: '#333333' }}>
            Thank you for your payment. We have received your payment of {paymentDetails.amount} for the following booking:
          </Text>
          <Text style={{ fontSize: '16px', color: '#333333', marginTop: '10px' }}>
            <strong>Booking Details:</strong>
            <br />
            Destination: {paymentDetails.destination}
            <br />
            Check-in Date: {paymentDetails.checkinDate}
            <br />
            Check-out Date: {paymentDetails.checkoutDate}
            <br />
          </Text>
          <Button
            href="https://example.com"
            style={{ background: '#007bff', color: '#ffffff', padding: '12px 20px', textDecoration: 'none', display: 'inline-block', marginTop: '20px' }}
          >
            View Booking Details
          </Button>
        </Row>
        <Row style={{ padding: '20px', backgroundColor: '#ffffff', textAlign: 'center' }}>
          <Text style={{ fontSize: '14px', color: '#777777' }}>
            If you have any questions, please contact us at <a href="mailto:support@globetrotter.com" style={{ color: '#007bff' }}>support@globetrotter.com</a>.
          </Text>
        </Row>
        <Row style={{ backgroundColor: '#f4f4f4', padding: '10px', textAlign: 'center' }}>
          <Text style={{ fontSize: '14px', color: '#777777' }}>&copy; 2024 Globetrotter. All rights reserved.</Text>
        </Row>
      </Container>
    </Html>
  );
};

export default PaymentConfirmationEmail;
