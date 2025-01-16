import React from "react";
import "./PrivacyPolicy.css"; 

const PrivacyPolicy = () => (
    <div className="privacy-policy-container">
        <h1>Privacy Policy</h1>
        <p>
            At <strong>Opportuneer</strong>, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.
        </p>

        <h2>1. Information We Collect</h2>
        <ul>
            <li>
                <strong>Personal Information:</strong> Your name, email address, phone number, and other details provided during registration.
            </li>
            <li>
                <strong>Resume Data:</strong> Uploaded resumes for job applications.
            </li>
            <li>
                <strong>Usage Data:</strong> Information about how you use the platform, such as pages visited and actions taken.
            </li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
            <li>To connect you with relevant job opportunities.</li>
            <li>To improve the functionality and user experience of our platform.</li>
            <li>To communicate with you regarding updates or opportunities.</li>
            <li>To comply with legal and regulatory requirements.</li>
        </ul>

        <h2>3. Sharing Your Information</h2>
        <p>
            We do not sell your personal information. However, we may share your data with:
        </p>
        <ul>
            <li>Employers for job application purposes.</li>
            <li>Third-party service providers to support platform functionality.</li>
            <li>Legal authorities if required by law.</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
            We employ robust security measures, including encryption and secure protocols, to protect your data from unauthorized access.
        </p>

        <h2>5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
            <li>Access, modify, or delete your personal information.</li>
            <li>Withdraw consent for data processing.</li>
            <li>Contact us for questions or concerns about your data.</li>
        </ul>

        <h2>6. Changes to This Policy</h2>
        <p>
            We may update this Privacy Policy from time to time. Please review it periodically for updates.
        </p>

        <h2>7. Contact Us</h2>
        <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:contact@opportuneer.com">contact@opportuneer.com</a>.
        </p>
    </div>
);

export default PrivacyPolicy;
