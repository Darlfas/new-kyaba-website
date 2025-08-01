import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

const PaymentModal = ({ isOpen, onClose, course, onPaymentSuccess }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Debug logs
  console.log('PaymentModal render:', { isOpen, course, user });

  // Initialize form data when user or modal opens
  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        name: user?.user_metadata?.full_name || user?.user_metadata?.name || '',
        email: user?.email || '',
        phone: ''
      });
    }
  }, [user, isOpen]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('process-payment', {
        body: {
          courseId: course.id,
          amount: course.price,
          email: formData.email,
          name: formData.name,
          phone: formData.phone
        }
      });

      if (error) throw error;

      if (data?.success) {
        const redirectUrl = `${window.location.origin}/payment/verify`;
        const paymentUrl = `${data.payment_link}&redirect_url=${encodeURIComponent(redirectUrl)}`;
        window.location.href = paymentUrl;
      } else {
        throw new Error(data?.error || 'Payment initialization failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment initialization failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Always render something when isOpen is true for debugging
  if (!isOpen) return null;

  // Show error state if no course
  if (!course) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '400px',
          width: '90%'
        }}>
          <h2>Error: No course selected</h2>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>
            Complete Your Enrollment
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={24} />
          </button>
        </div>
        
        <div style={{ padding: '24px' }}>
          {/* Course Info */}
          <div style={{
            backgroundColor: '#eff6ff',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #dbeafe',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontWeight: '600', fontSize: '18px', marginBottom: '8px' }}>
              {course.title}
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280' }}>Total Amount:</span>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>
                ${course.price}
              </span>
            </div>
          </div>

          {/* Payment Form */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ marginBottom: '16px' }}>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                style={{ marginTop: '4px' }}
              />
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                style={{ marginTop: '4px' }}
              />
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                required
                style={{ marginTop: '4px' }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', paddingTop: '16px' }}>
            <Button 
              variant="outline" 
              onClick={onClose} 
              style={{ flex: 1 }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handlePayment} 
              disabled={loading || !formData.name || !formData.email || !formData.phone}
              style={{ 
                flex: 1, 
                backgroundColor: '#2563eb',
                color: 'white'
              }}
            >
              {loading ? 'Processing...' : `Pay $${course.price}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;