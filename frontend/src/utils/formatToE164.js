// utils/formatPhoneNumber.js
export function formatToE164(phoneNumber) {
  // Remove any non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');

  // If it starts with '0' and is 11 digits, assume Pakistani number
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    return '+92' + cleaned.substring(1); // Replace leading 0 with +92
  }

  // Already in international format (with +)
  if (cleaned.startsWith('92') && cleaned.length === 12) {
    return '+' + cleaned;
  }

  // Fallback (return as-is)
  return phoneNumber;
}
