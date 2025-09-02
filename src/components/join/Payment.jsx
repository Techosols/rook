import React, { useState } from 'react';
import userService from '../../services/user';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import useTab from '../../hooks/useTab';
import api from '../../services/api';

function Payment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const { setActiveTab } = useTab();

  const { userExternalId, setIsLoggedIn } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    /*
    if (!paymentData.cardNumber || !paymentData.expiry || !paymentData.cvv) {
      toast.error('Please fill in all payment fields');
      return;
    }

    */

    setIsProcessing(true);

    try {
      
      /*
      const response = await userService.updateUserStatus(userExternalId);
      if (response.status === 200) {
        // Payment successful
        toast.success('Payment successful! Your account is now active.');
        setIsProcessing(false);
        setIsLoggedIn(true);
        setActiveTab('matches');
      } */
      setIsProcessing(false);
      setIsLoggedIn(true);
      setActiveTab('matches');
    } catch (error) {
      if(error.status === 500){
        toast.error('Internal Server Error, Please try again later!');
      } else if (error.status === 400) {
        toast.error('Invalid Data');
      }
    }

  };



  return (
    <div className="bg-background dark:bg-background-dark p-3 md:p-8 min-h-screen">
      <div className="container mx-auto max-w-2xl flex flex-col gap-y-8">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-primary dark:text-primary-dark mb-1">Payment Information</h2>
          <p className="text-base text-gray-500 dark:text-gray-300">Secure your membership with payment details.</p>
        </div>
        
        <form onSubmit={handlePayment} className="bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 md:p-10">
          {/* Payment Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Credit Card Details</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col">
                <label htmlFor="cardNumber" className="text-sm font-medium dark:text-white mb-1">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white"
                  value={paymentData.cardNumber}
                  onChange={handleInputChange}
                  maxLength="19"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="expiry" className="text-sm font-medium dark:text-white mb-1">Expiry Date</label>
                  <input
                    type="text"
                    name="expiry"
                    id="expiry"
                    placeholder="MM/YY"
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white"
                    value={paymentData.expiry}
                    onChange={handleInputChange}
                    maxLength="5"
                  />
                </div>
                
                <div className="flex flex-col">
                  <label htmlFor="cvv" className="text-sm font-medium dark:text-white mb-1">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    id="cvv"
                    placeholder="123"
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white"
                    value={paymentData.cvv}
                    onChange={handleInputChange}
                    maxLength="4"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mb-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">🔒</span>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Secure Payment</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Your payment information is encrypted and secure. We never store your full card details.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <button
              type="submit"
              className={`py-3 px-8 rounded-full text-white cursor-pointer shadow-md transition-all duration-200 font-medium ${
                isProcessing
                  ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-50'
                  : 'bg-primary dark:bg-primary-dark hover:bg-primary-hover dark:hover:bg-primary-dark-hover hover:shadow-lg'
              }`}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <span>CONFIRM & CONTINUE</span>
              )}
            </button>
            <p className='text-center text-gray-600 dark:text-gray-400 mt-4'>
             You may skip this step for now. The current implementation does not support payment processing. Just click "Confirm & Continue" to proceed.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Payment