const sendEmail = async (to, subject, message) => {
  console.log(` MOCK EMAIL\nTo: ${to}\nSubject: ${subject}\nMessage: ${message}`);
};

module.exports = sendEmail;
