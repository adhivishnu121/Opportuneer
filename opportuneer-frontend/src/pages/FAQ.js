import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const questionsAnswers = [
        {
            question: "What is Opportuneer?",
            answer: "Opportuneer is a platform that connects job seekers with part-time and sponsorship opportunities tailored to their career goals.",
        },
        {
            question: "How can I post a job?",
            answer: "Employers can easily post jobs by navigating to the 'POST A JOB' section, filling in the job details, and submitting the form.",
        },
        {
            question: "Is Opportuneer free to use?",
            answer: "Yes, Opportuneer is free for job seekers. Employers can post jobs at no cost.",
        },
        {
            question: "What types of jobs are available?",
            answer: "We focus on part-time and sponsorship opportunities across various industries, suitable for students and professionals.",
        },
        {
            question: "How do I apply for a job?",
            answer: "Explore the available opportunities in the 'Explore' section, click on a job to view details, and follow the instructions to apply.",
        },
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq-container">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            {questionsAnswers.map((item, index) => (
                <div
                    key={index}
                    className={`faq-item ${activeIndex === index ? "active" : ""}`}
                >
                    <div
                        className="faq-question"
                        onClick={() => toggleFAQ(index)}
                    >
                        {item.question}
                        <span className="faq-icon">{activeIndex === index ? "-" : "+"}</span>
                    </div>
                    {activeIndex === index && (
                        <div className="faq-answer">{item.answer}</div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FAQ;
