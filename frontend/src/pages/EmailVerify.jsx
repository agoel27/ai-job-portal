import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EmailVerify = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/verify-email/${uid}/${token}/`);
        if (response.data.status === 'success') {
          setStatus('success');
          setMessage('Your email has been verified successfully!');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          setStatus('error');
          setMessage('Invalid token or user not found.');
        }
      } catch (error) {
        setStatus('error');
        if (error.response) {
          setMessage(error.response.data.message || 'An error occurred while verifying your email.');
        } else {
          setMessage('An error occurred while verifying your email.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [uid, token, navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Email Verification</h1>
      {isLoading ? (
        <p>Verifying your email...</p>
      ) : (
        <>
          <p>{message}</p>
          {status === 'success' && <p>Redirecting to login...</p>}
        </>
      )}
    </div>
  );
};

export default EmailVerify;