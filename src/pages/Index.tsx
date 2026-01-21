"use client";

import { MadeWithDyad } from "@/components/made-with-elmony";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Cloud, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-8">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            Protect Your Digital World with CyberSecure Solutions
          </h1>
          <p className="text-xl mb-8">
            Comprehensive cybersecurity services to safeguard your business from evolving threats.
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/contact">Get a Free Consultation</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Core Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-col items-center">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-2xl font-semibold">Threat Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Proactive monitoring and rapid response to identify and neutralize cyber threats before they cause damage.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-col items-center">
              <Lock className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-2xl font-semibold">Data Encryption</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Robust encryption solutions to protect your sensitive data at rest and in transit.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-col items-center">
              <Cloud className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-2xl font-semibold">Cloud Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Secure your cloud infrastructure and applications with expert-led strategies and implementations.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-col items-center">
              <Lightbulb className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-2xl font-semibold">Security Consulting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Strategic advice and guidance to build a resilient security posture tailored to your needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-secondary text-secondary-foreground py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Ready to Enhance Your Security?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't wait for a breach to happen. Partner with CyberSecure Solutions today for peace of mind.
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/contact">Contact Our Experts</Link>
          </Button>
        </div>
      </section>

      <MadeWithDyad />
    </div>
  );
};

export default Index;