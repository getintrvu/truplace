import React, { useRef, useState, useEffect, KeyboardEvent, ClipboardEvent } from 'react';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 8,
  value,
  onChange,
  disabled = false,
  error = false
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [localValue, setLocalValue] = useState<string[]>(Array(length).fill(''));

  useEffect(() => {
    const digits = value.split('').slice(0, length);
    const newLocalValue = [...digits, ...Array(length - digits.length).fill('')];
    setLocalValue(newLocalValue);
  }, [value, length]);

  const handleChange = (index: number, inputValue: string) => {
    if (disabled) return;

    const sanitized = inputValue.replace(/[^0-9]/g, '');

    if (sanitized.length === 0) {
      const newValue = [...localValue];
      newValue[index] = '';
      setLocalValue(newValue);
      onChange(newValue.join(''));
      return;
    }

    if (sanitized.length === 1) {
      const newValue = [...localValue];
      newValue[index] = sanitized;
      setLocalValue(newValue);
      onChange(newValue.join(''));

      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (sanitized.length > 1) {
      const digits = sanitized.split('').slice(0, length);
      const newValue = [...digits, ...Array(Math.max(0, length - digits.length)).fill('')];
      setLocalValue(newValue);
      onChange(newValue.join(''));

      const nextIndex = Math.min(digits.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === 'Backspace' && !localValue[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    const sanitized = pasteData.replace(/[^0-9]/g, '');
    const digits = sanitized.split('').slice(0, length);
    const newValue = [...digits, ...Array(Math.max(0, length - digits.length)).fill('')];

    setLocalValue(newValue);
    onChange(newValue.join(''));

    const nextIndex = Math.min(digits.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="flex gap-2 justify-center">
      {localValue.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={`w-12 h-14 text-center text-2xl font-semibold rounded-lg border-2 transition-all duration-200
            ${error
              ? 'border-red-300 bg-red-50 text-red-600 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500'
            }
            focus:ring-2 focus:outline-none
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:border-gray-400
          `}
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default OTPInput;
