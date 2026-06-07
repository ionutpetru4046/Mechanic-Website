export const submitContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      message: 'Please provide your name, email, and a short message.',
    });
  }

  console.log(`\n[Contact Message]\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n`);

  return res.status(201).json({
    message: 'Thank you — your message has been received. We will get back to you soon.',
  });
};
