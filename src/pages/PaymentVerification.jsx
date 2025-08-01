import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const PaymentVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('Verifying your payment...');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const transactionId = searchParams.get('transaction_id');
        const txRef = searchParams.get('tx_ref');
        
        if (!transactionId && !txRef) {
          setStatus('error');
          setMessage('Invalid payment verification link');
          return;
        }

        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { 
            transaction_id: transactionId || txRef,
            tx_ref: txRef 
          }
        });

        if (error) {
          console.error('Payment verification error:', error);
          setStatus('error');
          setMessage('Payment verification failed. Please contact support.');
          return;
        }

        if (data.success) {
          setStatus('success');
          setMessage('Payment successful! You have been enrolled in the course.');
          setTimeout(() => navigate('/dashboard'), 3000);
        } else {
          setStatus('error');
          setMessage(data.message || 'Payment verification failed');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage('An error occurred during verification');
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  const getIcon = () => {
    switch (status) {
      case 'verifying':
        return <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-16 w-16 text-green-500" />;
      case 'error':
        return <XCircle className="h-16 w-16 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Payment Verification</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex justify-center">
            {getIcon()}
          </div>
          <p className="text-gray-600">{message}</p>
          {status === 'success' && (
            <p className="text-sm text-gray-500">
              Redirecting to dashboard in 3 seconds...
            </p>
          )}
          {status === 'error' && (
            <div className="space-y-2">
              <Button onClick={() => navigate('/courses')} className="w-full">
                Back to Courses
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard')} 
                className="w-full"
              >
                Go to Dashboard
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentVerification;