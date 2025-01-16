import React from "react";
import "./TermsOfService.css"; 

const TermsOfService = () => (
    <div className="terms-of-service-container">
        <h1>Terms of Service</h1>
        <p>
            Welcome to <strong>Opportuneer</strong>. By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
            By registering or using the platform, you agree to abide by these Terms of Service. If you do not agree to these terms, please do not use the platform.
        </p>

        <h2>2. User Responsibilities</h2>
        <ul>
            <li>You must provide accurate and complete information during registration.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You may not use the platform for unlawful activities or to violate any applicable laws or regulations.</li>
        </ul>

        <h2>3. Job Postings</h2>
        <ul>
            <li>Employers are solely responsible for the accuracy and legality of job postings.</li>
            <li>Opportuneer does not guarantee job offers or the outcome of applications.</li>
        </ul>

        <h2>4. Prohibited Activities</h2>
        <p>Users are prohibited from:</p>
        <ul>
            <li>Submitting false or misleading information.</li>
            <li>Posting content that is offensive, defamatory, or harmful.</li>
            <li>Attempting to hack, disrupt, or compromise the security of the platform.</li>
        </ul>

        <h2>5. Intellectual Property</h2>
        <p>
            All content on the platform, including text, graphics, logos, and software, is the property of Opportuneer or its licensors and is protected by copyright and intellectual property laws.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
            Opportuneer is not liable for any damages resulting from the use of the platform, including but not limited to job outcomes or data loss.
        </p>

        <h2>7. Modifications to the Terms</h2>
        <p>
            We reserve the right to update these Terms of Service at any time. Changes will be effective upon posting on the platform.
        </p>

        <h2>8. Termination</h2>
        <p>
            We reserve the right to terminate or suspend access to the platform for users who violate these terms.
        </p>

        <h2>9. Governing Law</h2>
        <p>
            These Terms of Service are governed by and construed in accordance with the laws of the United Kingdom.
        </p>

        <h2>10. Contact Us</h2>
        <p>
            If you have any questions about these Terms of Service, please contact us at{" "}
            <a href="mailto:contact@opportuneer.com">contact@opportuneer.com</a>.
        </p>
    </div>
);

export default TermsOfService;
