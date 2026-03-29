const Terms = () => (
  <div className="min-h-screen bg-[#0b0b0e]">
    <section className="border-b border-[#1a1a1e]">
      <div className="max-w-[900px] mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-gray-500 text-sm">Last updated: March 1, 2026</p>
      </div>
    </section>
    <section className="max-w-[900px] mx-auto px-4 py-12 space-y-8">
      {[
        { title: "1. Acceptance of Terms", content: "By accessing or using KORYPTO's services, you agree to be bound by these Terms of Service, our Privacy Policy, and all applicable laws and regulations. If you do not agree with any part of these terms, you must not use our services. These terms constitute a legally binding agreement between you and KORYPTO Pte. Ltd." },
        { title: "2. Eligibility", content: "You must be at least 18 years old (or the age of majority in your jurisdiction) to use KORYPTO. You must not be a resident of any jurisdiction where cryptocurrency trading is prohibited. You must complete identity verification (KYC) before accessing trading features. We reserve the right to refuse service to anyone at our discretion." },
        { title: "3. Account Registration", content: "You must provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials. You must immediately notify us of any unauthorized access. You may not create multiple accounts or transfer your account to another person. One account per individual." },
        { title: "4. Trading Services", content: "KORYPTO provides cryptocurrency spot trading, futures trading, staking, and conversion services. All trades are executed on a best-effort basis. We do not guarantee order execution at any specific price. Market orders are filled at the best available price. Limit orders are filled at the specified price or better. Past performance does not guarantee future results." },
        { title: "5. Fees", content: "Trading fees, withdrawal fees, and other charges are published on our Fee Schedule page. We reserve the right to modify fee structures with 14 days' advance notice. Fees are deducted automatically from your account at the time of the transaction. VIP tier status is calculated based on 30-day rolling trading volume." },
        { title: "6. Risk Disclosure", content: "Cryptocurrency trading involves substantial risk of loss. Prices are highly volatile and can move significantly in short periods. Futures and leveraged trading amplify both gains and losses — you can lose more than your initial margin. You should only trade with funds you can afford to lose. KORYPTO does not provide financial, investment, or trading advice." },
        { title: "7. Prohibited Activities", content: "You may not: manipulate markets (wash trading, spoofing, layering), use automated systems to gain unfair advantage, attempt to exploit platform vulnerabilities, use the platform for money laundering or terrorism financing, create multiple accounts to circumvent trading limits, or engage in any activity that violates applicable laws." },
        { title: "8. Intellectual Property", content: "All content, software, and technology on KORYPTO are owned by or licensed to KORYPTO Pte. Ltd. and protected by intellectual property laws. You may not copy, modify, distribute, or reverse-engineer any part of our platform. The KORYPTO name, logo, and brand elements are registered trademarks." },
        { title: "9. Limitation of Liability", content: "To the maximum extent permitted by law, KORYPTO shall not be liable for: trading losses, system downtime or delays, unauthorized access resulting from your negligence, losses due to blockchain network issues, or any indirect, consequential, or punitive damages. Our total liability is limited to the fees you paid in the preceding 12 months." },
        { title: "10. Account Suspension & Termination", content: "We may suspend or terminate your account if: you violate these terms, we suspect fraudulent activity, required by law or regulation, or you fail to complete required identity verification. Upon termination, you may withdraw your remaining funds within 30 days, subject to applicable legal holds." },
        { title: "11. Dispute Resolution", content: "Any disputes shall be resolved through binding arbitration administered by the Singapore International Arbitration Centre (SIAC). The arbitration shall be conducted in English in Singapore. You agree to waive your right to a jury trial or participation in a class action lawsuit." },
        { title: "12. Governing Law", content: "These Terms are governed by the laws of the Republic of Singapore, without regard to conflict of law principles. Any legal proceedings shall be brought exclusively in the courts of Singapore." },
        { title: "13. Contact", content: "For questions about these Terms: legal@korypto.com | KORYPTO Pte. Ltd., 1 Raffles Place, #20-61, Singapore 048616" },
      ].map(section => (
        <div key={section.title}>
          <h2 className="text-lg font-semibold text-white mb-2">{section.title}</h2>
          <p className="text-sm text-gray-400 leading-relaxed">{section.content}</p>
        </div>
      ))}
    </section>
  </div>
);

export default Terms;
