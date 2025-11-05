"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  BarChart3,
  Table2,
  TrendingUp,
  LineChart,
  SlidersHorizontal,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 flex items-center justify-center gap-4">
              <div className="flex -space-x-2">
                <div className="bg-blue-100 text-blue-600 flex size-10 items-center justify-center rounded-full border-2 border-white">
                  <Image
                    src="/facebook.svg"
                    alt="Facebook"
                    width={20}
                    height={20}
                    className="size-5"
                  />
                </div>
                <div className="bg-pink-100 text-pink-600 flex size-10 items-center justify-center rounded-full border-2 border-white">
                  <Image
                    src="/instagram.svg"
                    alt="Instagram"
                    width={20}
                    height={20}
                    className="size-5"
                  />
                </div>
                <div className="bg-sky-100 text-sky-600 flex size-10 items-center justify-center rounded-full border-2 border-white">
                  <Image
                    src="/twitter.svg"
                    alt="Twitter"
                    width={20}
                    height={20}
                    className="size-5"
                  />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Social Media Analytics
              <span className="text-primary block">Dashboard Platform</span>
            </h1>
            <p className="text-muted-foreground mt-6 text-lg leading-8">
              Centralize your social media data from Instagram, Facebook,
              Twitter, and more. Visualize performance metrics, analyze trends,
              and make data-driven decisions with our comprehensive analytics
              dashboard.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="bg-muted/50 py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">
                Everything You Need to Analyze Your Social Media
              </h2>
              <p className="text-muted-foreground mx-auto max-w-2xl">
                Access powerful tools to track, analyze, and optimize your
                social media performance across all platforms.
              </p>
            </div>
            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
              <div className="bg-background group flex flex-col rounded-lg border p-6 transition-shadow hover:shadow-lg">
                <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <BarChart3 className="size-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Interactive Dashboard
                </h3>
                <p className="text-muted-foreground text-sm">
                  Visualize your social media data with dynamic charts and
                  graphs. Apply filters to drill down into specific metrics and
                  time periods.
                </p>
              </div>

              <div className="bg-background group flex flex-col rounded-lg border p-6 transition-shadow hover:shadow-lg">
                <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <LineChart className="size-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Real-time Analytics
                </h3>
                <p className="text-muted-foreground text-sm">
                  Track engagement, reach, and performance metrics in real-time
                  across all your connected social media accounts.
                </p>
              </div>

              <div className="bg-background group flex flex-col rounded-lg border p-6 transition-shadow hover:shadow-lg">
                <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Table2 className="size-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Data Tables</h3>
                <p className="text-muted-foreground text-sm">
                  View detailed data in organized tables. Add, edit, and manage
                  your records with an intuitive interface and CRUD operations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold">
                  Powerful Features for Social Media Success
                </h2>
                <p className="text-muted-foreground mx-auto max-w-2xl">
                  Our platform provides comprehensive tools to help you
                  understand and grow your social media presence.
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="flex gap-4">
                  <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
                    <TrendingUp className="size-5" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Performance Tracking</h3>
                    <p className="text-muted-foreground text-sm">
                      Monitor likes, comments, shares, and engagement rates
                      across all your social media platforms in one unified
                      dashboard.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
                    <BarChart3 className="size-5" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Visual Analytics</h3>
                    <p className="text-muted-foreground text-sm">
                      Transform complex data into easy-to-understand charts and
                      graphs. Choose from multiple visualization types to suit
                      your needs.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
                    <SlidersHorizontal className="size-5" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Custom Filters</h3>
                    <p className="text-muted-foreground text-sm">
                      Apply advanced filters to analyze specific time periods,
                      platforms, or content types. Save your favorite filter
                      configurations.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
                    <Table2 className="size-5" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Data Management</h3>
                    <p className="text-muted-foreground text-sm">
                      Full CRUD operations on your data. Add new records, update
                      existing entries, and maintain your social media database
                      effortlessly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted/50 py-24">
          <div className="container mx-auto px-4">
            <div className="bg-primary text-primary-foreground mx-auto max-w-4xl rounded-2xl p-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">
                Ready to Transform Your Social Media Strategy?
              </h2>
              <p className="mb-8 text-lg opacity-90">
                Join thousands of businesses using Camaleonic Analytics to make
                smarter decisions about their social media presence.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/signup">Start Now</Link>
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-primary-foreground border border-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
