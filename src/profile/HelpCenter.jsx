import React from "react";

const faqs = [
  {
    question: "How do I change my password?",
    answer:
      "Go to Account Settings → Change Password and follow the instructions.",
  },
  {
    question: "How do I upgrade my subscription?",
    answer:
      "Navigate to Membership and select your preferred Premium plan.",
  },
  {
    question: "How can I download movies?",
    answer:
      "Open any movie and click the Download button to watch offline.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach us through email, phone, or live chat available 24×7.",
  },
];

const HelpCenter = () => {
  return (
    <div className="help-section">
      <h1>Help Center</h1>

      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div className="faq-card" key={index}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="contact-card">
        <h2>Contact Support</h2>

        <p>📧 support@disneyplushotstar.com</p>

        <p>📞 +91 1800-123-4567</p>

        <p>💬 Live Chat : Available 24 × 7</p>

        <button
          className="feedback-btn"
          onClick={() => alert("Thank you for your feedback!")}
        >
          Send Feedback
        </button>
      </div>
    </div>
  );
};

export default HelpCenter;