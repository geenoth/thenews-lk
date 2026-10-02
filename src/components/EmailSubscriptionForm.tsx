import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

interface EmailSubscriptionFormProps {
  onSubscribe?: (email: string) => Promise<boolean> | boolean | void;
}

export const EmailSubscriptionForm: React.FC<EmailSubscriptionFormProps> = ({ onSubscribe }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const validateEmail = (val: string): boolean => {
    // RFC 5322 compliant regex for standard email addresses
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return emailRegex.test(val.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(trimmed)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      if (onSubscribe) {
        await onSubscribe(trimmed);
      } else {
        const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
        
        if (!accessKey) {
          throw new Error('Web3Forms access key is not configured.');
        }

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            email: trimmed,
            subject: "New Subscription from The News LK",
            from_name: "The News LK Notification",
          }),
        });

        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.message || 'Submission failed');
        }
      }

      setSubmittedEmail(trimmed);
      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error('Subscription error:', err);
      setStatus('error');
      setErrorMessage('Unable to process your request right now. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div 
        className="w-full max-w-lg mx-auto bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs text-center transition-all duration-300"
        role="status"
        aria-live="polite"
      >
        <div className="w-12 h-12 mx-auto mb-3.5 rounded-full bg-[#e6f5fc] text-[#009fe3] flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
        </div>
        <p className="text-base sm:text-lg font-semibold text-[#1e293b] leading-snug">
          You&apos;re on the list. We&apos;ll let you know when The News LK goes live.
        </p>
        <p className="text-xs text-slate-500 mt-2 font-mono break-all">
          {submittedEmail}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-4 text-xs font-semibold text-[#009fe3] hover:text-[#008ecc] focus-visible:outline-hidden focus-visible:underline transition-colors cursor-pointer"
        >
          Add another email address
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-center mb-3">
        <h2 className="text-base sm:text-lg font-semibold text-[#1e293b]">
          Get notified when we go live.
        </h2>
      </div>

      <form 
        onSubmit={handleSubmit} 
        noValidate 
        className="w-full"
        aria-label="Email notification signup"
      >
        <div className="flex flex-col sm:flex-row items-stretch gap-2.5 sm:gap-2 p-1.5 sm:p-2 bg-white rounded-2xl sm:rounded-xl border border-slate-300 focus-within:border-[#009fe3] focus-within:ring-2 focus-within:ring-[#009fe3]/20 shadow-xs transition-all duration-200">
          <label htmlFor="email-input" className="sr-only">
            Enter your email address
          </label>
          <input
            id="email-input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') {
                setStatus('idle');
                setErrorMessage('');
              }
            }}
            placeholder="Enter your email address"
            autoComplete="email"
            disabled={status === 'submitting'}
            aria-invalid={status === 'error'}
            aria-describedby={status === 'error' ? 'email-error' : undefined}
            className="flex-1 px-4 py-3 sm:py-2.5 text-sm sm:text-base text-[#1e293b] placeholder-slate-400 bg-transparent rounded-lg outline-none disabled:opacity-60 disabled:cursor-not-allowed"
          />

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 text-xs sm:text-sm font-bold tracking-wider text-white uppercase bg-[#009fe3] hover:bg-[#008ecc] active:bg-[#007eb5] rounded-xl sm:rounded-lg shadow-xs transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#009fe3] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer shrink-0"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>NOTIFY ME</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </div>

        {status === 'error' && (
          <p 
            id="email-error" 
            role="alert" 
            className="mt-2.5 text-xs sm:text-sm text-red-600 font-medium text-center transition-opacity"
          >
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
};
