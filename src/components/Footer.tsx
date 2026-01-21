"use client";

import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground p-6 mt-8">
      <div className="container mx-auto text-center">
        <div className="flex flex-col items-center space-y-4">
          <Link to="/" className="flex items-center space-x-2">
            <ShieldCheck className="h-6 w-6" />
            <span className="text-lg font-bold">CyberSecure Solutions</span>
          </Link>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} CyberSecure Solutions. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm">
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;