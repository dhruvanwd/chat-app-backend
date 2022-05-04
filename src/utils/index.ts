
export const validateEmail = (email: string) => {
  const matchResult = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  return matchResult && matchResult.length > 0;
};

const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export const validateMobile = (mobile: string) => mobileRegex.test(mobile);



export function generateOTP(otpLength = 6) {
          
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < otpLength; i++ ) {
      OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
