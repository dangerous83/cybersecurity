import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "About",
    links: [
      { label: "About KORYPTO", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Exchange", href: "/trade" },
      { label: "Futures", href: "/futures" },
      { label: "Earn", href: "/earn" },
      { label: "NFT", href: "/nft" },
      { label: "Convert", href: "/convert" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Markets", href: "/markets" },
      { label: "Wallet", href: "/wallet" },
      { label: "Fee Schedule", href: "/fees" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Risk Warning", href: "/risk-warning" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#0b0b0e] border-t border-[#1a1a1e]">
      <div className="max-w-[1600px] mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 brand-gradient rounded-lg flex items-center justify-center font-black text-black text-sm">
                K
              </div>
              <span className="text-lg font-bold brand-text font-heading">KORYPTO</span>
            </Link>
            <p className="text-gray-500 text-sm mb-4">
              The world's leading cryptocurrency exchange platform.
            </p>
            <p className="text-gray-600 text-xs">
              KORYPTO Pte. Ltd.<br />
              1 Raffles Place, #20-61<br />
              Singapore 048616
            </p>
          </div>

          {footerSections.map(section => (
            <div key={section.title}>
              <h4 className="font-semibold text-white mb-3 text-sm">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-gray-500 hover:text-[#0ecb81] text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[#1a1a1e] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} KORYPTO. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              All Systems Operational
            </span>
            <span>English (US)</span>
            <span>USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
