import React, { useState } from 'react';

function Payment({ paymentType, onPaymentSuccess}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!paymentData.cardNumber || !paymentData.expiry || !paymentData.cvv) {
      alert('Please fill in all payment fields');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Call the success handler
      if (onPaymentSuccess) {
        await onPaymentSuccess(paymentData);
      }
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getPaymentInfo = () => {
    if (paymentType === 'reactivation') {
      return {
        title: 'Reactivate Your Account',
        description: 'Your account is paused. To reactivate your membership:',
        charges: [
          'Your card will be charged $5 for the monthly membership fee.',
          'After this payment, your card will be charged $5 every month until you cancel.',
          'You can cancel anytime in your account settings.'
        ],
        total: '$5.00'
      };
    } else {
      return {
        title: 'Complete Your Registration',
        description: 'To complete your registration and activate your account:',
        charges: [
          'Your card will be charged $10 today. This covers the cost of safety screening ($5) and the first month of membership ($5).',
          'After the first month, your card will be charged $5 every month until you cancel.',
          'You can cancel anytime in your account settings.'
        ],
        total: '$10.00'
      };
    }
  };

  const paymentInfo = getPaymentInfo();

  return (
    <section className="bg-background dark:bg-background-dark p-6 text-text dark:text-text-dark">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">{paymentInfo.title}</h2>
        
        <div className="mb-6">
          <p className="text-center mb-4">{paymentInfo.description}</p>
          <ul className="space-y-2">
            {paymentInfo.charges.map((charge, index) => (
              <li key={index} className="text-center text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded">
                {charge}
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-6 mb-6">
          <div className="flex justify-center items-center mb-4 gap-4">
            <h3 className="text-lg font-semibold">Payment Information</h3>
            <input 
              type="text" 
              name="cardNumber"
              placeholder="Card number here" 
              className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800"
              value={paymentData.cardNumber}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="flex justify-center items-center mb-4 gap-4">
            <input 
              type="text" 
              name="expiry"
              placeholder="Exp: MM/YY" 
              className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800"
              value={paymentData.expiry}
              onChange={handleInputChange}
            />
            <input 
              type="text" 
              name="cvv"
              placeholder="CVV" 
              className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800"
              value={paymentData.cvv}
              onChange={handleInputChange}
            />
          </div>

          <div className="text-center">
            <div className="mb-4">
              <p className="text-lg font-semibold">Total: {paymentInfo.total}</p>
            </div>
            
            <button 
              className={`py-3 px-8 rounded-full text-white w-full sm:w-auto ${
                isProcessing 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-primary dark:bg-primary-dark hover:bg-primary-hover dark:hover:bg-primary-dark-hover cursor-pointer'
              }`}
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'CONFIRM & CONTINUE'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Payment