const Privacy = () => (
  <div className="min-h-screen bg-[#0b0b0e]">
    <section className="border-b border-[#1a1a1e]">
      <div className="max-w-[900px] mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm">Last updated: March 1, 2026</p>
      </div>
    </section>
    <section className="max-w-[900px] mx-auto px-4 py-12 space-y-8">
      {[
        { title: "1. Information We Collect", content: "We collect information you provide directly (name, email, government ID for KYC), information collected automatically (IP address, device info, browser type, usage data), and information from third parties (identity verification services, blockchain analytics). We only collect what is necessary to provide our services and comply with regulatory requirements." },
        { title: "2. How We Use Your Information", content: "We use your information to: provide and maintain our exchange services, process transactions, verify your identity (KYC/AML compliance), send service-related communications, detect and prevent fraud, improve our platform, comply with legal obligations, and enforce our Terms of Service. We do not sell your personal data to third parties." },
        { title: "3. Data Sharing", content: "We may share your information with: regulatory authorities (as required by law), identity verification partners (Jumio, Onfido), blockchain analytics providers (Chainalysis), cloud infrastructure providers (AWS, Google Cloud), and law enforcement (when legally compelled). All partners are contractually bound to protect your data." },
        { title: "4. Data Security", content: "We implement industry-leading security measures including: AES-256 encryption for data at rest, TLS 1.3 for data in transit, hardware security modules (HSM) for key management, regular penetration testing, SOC 2 Type II compliance, and a dedicated security operations center monitoring 24/7." },
        { title: "5. Data Retention", content: "We retain your account data for the duration of your account plus 5 years after closure (regulatory requirement). Transaction records are kept for 7 years. You may request deletion of non-regulatory data at any time. Anonymized analytics data may be retained indefinitely." },
        { title: "6. Your Rights", content: "Depending on your jurisdiction, you have the right to: access your personal data, correct inaccurate data, delete your data (subject to regulatory requirements), port your data to another service, opt out of marketing communications, and lodge a complaint with your local data protection authority." },
        { title: "7. Cookies & Tracking", content: "We use essential cookies for authentication and security, analytics cookies (Google Analytics) to understand usage patterns, and preference cookies to remember your settings. You can manage cookie preferences in your browser settings. We do not use third-party advertising cookies." },
        { title: "8. International Transfers", content: "Your data may be processed in Singapore, the United States, and the European Union where our servers and team are located. We ensure adequate protection through Standard Contractual Clauses (SCCs) and equivalent safeguards as required by applicable law." },
        { title: "9. Children's Privacy", content: "KORYPTO services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected data from a minor, we will promptly delete it." },
        { title: "10. Changes to This Policy", content: "We may update this Privacy Policy periodically. Material changes will be communicated via email and in-app notification at least 30 days before taking effect. Continued use of KORYPTO after changes constitutes acceptance of the updated policy." },
        { title: "11. Contact Us", content: "For privacy-related inquiries: Email: privacy@korypto.com | Data Protection Officer: dpo@korypto.com | Mailing Address: KORYPTO Pte. Ltd., 1 Raffles Place, #20-61, Singapore 048616" },
      ].map(section => (
        <div key={section.title}>
          <h2 className="text-lg font-semibold text-white mb-2">{section.title}</h2>
          <p className="text-sm text-gray-400 leading-relaxed">{section.content}</p>
        </div>
      ))}
    </section>
  </div>
);

export default Privacy;
