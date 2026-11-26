import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader2, Mail, ArrowRight, RefreshCw, Sparkles, ChefHat } from 'lucide-react';
import toast from 'react-hot-toast';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { user } = useAuth();

  const [status, setStatus] = useState('verifying'); // 'verifying' | 'success' | 'expired' | 'error' | 'manual'
  const [message, setMessage] = useState('');
  const [emailInput, setEmailInput] = useState(user?.email || '');
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => (prev > 1 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    if (!token) {
      setStatus('manual');
      return;
    }

    let isMounted = true;
    const performVerification = async () => {
      try {
        const result = await authService.verifyEmail(token);
        if (isMounted) {
          setStatus('success');
          setMessage(result.message || 'Email verified successfully!');
          toast.success('Email verified successfully!');
        }
      } catch (err) {
        if (isMounted) {
          const errCode = err.code || err.response?.data?.code;
          if (errCode === 'TOKEN_EXPIRED') {
            setStatus('expired');
            setMessage('Your verification link has expired (links are valid for 24 hours). Please request a new one below.');
          } else {
            setStatus('error');
            setMessage(err.message || 'Invalid or already used verification token.');
          }
        }
      }
    };

    performVerification();
    return () => {
      isMounted = false;
    };
  }, [token]);

  const handleResend = async (e) => {
    e.preventDefault();
    const targetEmail = (emailInput || user?.email || '').trim();

    if (!targetEmail || !targetEmail.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (cooldown > 0) {
      toast.error(`Please wait ${cooldown}s before resending.`);
      return;
    }

    setIsResending(true);
    try {
      const res = await authService.resendVerification(targetEmail);
      toast.success('Verification email sent! Please check your inbox.');
      setCooldown(res.cooldownSeconds || 60);
      setStatus('manual');
      setMessage(`A fresh verification link has been dispatched to ${targetEmail}.`);
    } catch (err) {
      const remaining = err.retryAfterSeconds;
      if (remaining) {
        setCooldown(remaining);
      }
      toast.error(err.message || 'Failed to dispatch verification email.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E5] text-[#303A32] flex flex-col justify-center items-center px-4 py-12 selection:bg-[#D99A38]/30">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#D99A38]/20 p-8 text-center"
      >
        {/* Brand header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#244B39] flex items-center justify-center text-[#D99A38] shadow-md">
            <ChefHat className="w-6 h-6" />
          </div>
          <span className="font-serif font-bold text-xl tracking-wider text-[#244B39]">
            RASAVANTA <span className="text-[#D99A38]">AI</span>
          </span>
        </div>

        {/* State: Verifying */}
        {status === 'verifying' && (
          <div className="py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D99A38]/10 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-[#D99A38] animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-[#244B39] mb-2">Verifying Your Email...</h2>
            <p className="text-sm text-gray-600">Please wait while we confirm your culinary account credentials.</p>
          </div>
        )}

        {/* State: Success */}
        {status === 'success' && (
          <div className="py-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-[#244B39] mb-2 font-serif">Email Verified!</h2>
            <p className="text-sm text-gray-600 mb-6">
              {message || 'Your account is now fully verified. Welcome to smarter cooking and AI-powered kitchen intelligence.'}
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 bg-gradient-to-r from-[#D99A38] to-[#C48728] text-white font-medium rounded-xl shadow-lg shadow-[#D99A38]/20 hover:brightness-105 transition-all"
            >
              <span>Go to Culinary Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* State: Expired or Error */}
        {(status === 'expired' || status === 'error' || status === 'manual') && (
          <div className="py-2">
            <div
              className={`w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center ${
                status === 'error' || status === 'expired' ? 'bg-rose-100 text-rose-600' : 'bg-[#D99A38]/10 text-[#D99A38]'
              }`}
            >
              {status === 'error' || status === 'expired' ? (
                <AlertCircle className="w-8 h-8" />
              ) : (
                <Mail className="w-8 h-8" />
              )}
            </div>

            <h2 className="text-xl font-bold text-[#244B39] mb-2">
              {status === 'expired'
                ? 'Verification Link Expired'
                : status === 'error'
                ? 'Verification Failed'
                : 'Email Verification'}
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              {message ||
                'Enter your registered email address below to receive a secure, 24-hour verification link powered by Resend.'}
            </p>

            <form onSubmit={handleResend} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D99A38] focus:border-transparent text-sm bg-gray-50 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isResending || cooldown > 0}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#244B39] hover:bg-[#1A382A] text-white font-medium rounded-xl shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isResending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Dispatching via Resend...</span>
                  </>
                ) : cooldown > 0 ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#D99A38]" />
                    <span>Resend in {cooldown}s</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-[#D99A38]" />
                    <span>Send Verification Email</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <Link to="/login" className="hover:text-[#244B39] underline">
                Back to Sign In
              </Link>
              <Link to="/" className="hover:text-[#244B39]">
                Home
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
