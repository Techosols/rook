import React, { useState } from 'react';
import userService from '../../services/user';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

function Payment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

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

    if (!paymentData.cardNumber || !paymentData.expiry || !paymentData.cvv) {
      alert('Please fill in all payment fields');
      return;
    }

    setIsProcessing(true);

    try {
      /*
      const response = await userService.updateUserStatus(userExternalId);
      if (response.status === 200) {
        // Payment successful
        toast.success('Payment successful! Your account is now active.');
        setIsProcessing(false);
        setIsLoggedIn(true);
      } else {
        // Payment failed
      }
        */
      setIsLoggedIn(true);
    } catch (error) {
      if(error.status === 500){
        toast.error('Internal Server Error, Please try again later!');
      } else if (error.status === 400) {
        toast.error('Invalid Data');
      }
    }

  };



  return (
    <section className="bg-background dark:bg-background-dark p-6 text-text dark:text-text-dark">
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

        <button
          className={`py-3 px-8 rounded-full text-white w-full sm:w-auto ${isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary dark:bg-primary-dark hover:bg-primary-hover dark:hover:bg-primary-dark-hover cursor-pointer'
            }`}
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'CONFIRM & CONTINUE'}
        </button>
      </div>
    </section>
  );
}

export default Payment