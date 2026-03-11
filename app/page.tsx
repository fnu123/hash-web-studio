"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Code2,
  Smartphone,
  Search,
  MapPin,
  FileText,
  Zap,
  CheckCircle2,
  ArrowRight,
  Linkedin,
  ExternalLink,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronDown } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const demoWebsites = [
    {
      title: "Plumbing Website Demo",
      businessType: "Plumbing",
      description: "A professional website designed for plumbing service businesses with service listings, contact forms, and customer testimonials.",
      url: "https://plumbingservice-demo.vercel.app",
      available: true,
    },
    {
      title: "HVAC Website Demo",
      businessType: "HVAC",
      description: "A modern website template for heating and cooling companies featuring service areas, equipment information, and scheduling.",
      url: "#",
      available: false,
    },
    {
      title: "Electrician Website Demo",
      businessType: "Electrician",
      description: "A clean website design for electrical service providers with emergency contact options and service galleries.",
      url: "#",
      available: false,
    },
    {
      title: "Roofing Website Demo",
      businessType: "Roofing",
      description: "A robust website for roofing contractors showcasing project portfolios, materials, and free estimate requests.",
      url: "#",
      available: false,
    },
  ]

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "",
    hasWebsite: "",
    features: [] as string[],
    budget: "",
    timeline: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to send message")
      }

      setFormSubmitted(true)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, features: [...formData.features, feature] })
    } else {
      setFormData({
        ...formData,
        features: formData.features.filter((f) => f !== feature),
      })
    }
  }

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div
      className="min-h-screen text-foreground"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.06), transparent 40%), radial-gradient(circle at 80% 60%, rgba(59,130,246,0.04), transparent 40%), linear-gradient(to bottom, #ffffff, #f8fafc, #ffffff)"
      }}
    >
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
              H
            </div>
            <span className="text-lg font-semibold">Hash Web Studio</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => scrollToSection("about")}
              className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("demos")}
              className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Demos
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              size="sm"
              className="cursor-pointer"
            >
              Request Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="cursor-pointer md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-background md:hidden">
            <div className="flex flex-col gap-4 px-4 py-6">
              <button
                onClick={() => scrollToSection("about")}
                className="cursor-pointer text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("demos")}
                className="cursor-pointer text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Demos
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="cursor-pointer text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="cursor-pointer text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Pricing
              </button>
              <Button onClick={() => scrollToSection("contact")} className="cursor-pointer w-full">
                Request Demo
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(59,130,246,0.08), transparent 60%)"
        }}
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
              style={{
                background: "linear-gradient(to right, #111827, #374151)",
                WebkitBackgroundClip: "text",
                color: "transparent"
              }}
            >
              Get a FREE Demo Website for Your Business
            </h1>

            <p className="mt-6 text-lg text-muted-foreground lg:text-xl">
              Built by a Senior Software Engineer & Software Architect with 12+ years of experience working with major companies in the United States.
            </p>

            <p className="mt-4 text-lg text-muted-foreground">
              See exactly how your website will look before paying anything.
            </p>

            <p className="mt-4 text-sm font-medium text-primary">
              ⚡ I only build 5 free demo websites per week.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("demos")}
                className="cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  boxShadow: "0 10px 20px rgba(0,0,0,0.05)"
                }}
              >
                See Live Demo Website
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" onClick={() => scrollToSection("contact")} className="cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  boxShadow: "0 10px 20px rgba(0,0,0,0.05)"
                }}>
                Get My Free Demo Website
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Mobile Friendly
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Fast Loading
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              SEO Optimized
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Built by Senior Software Engineer
            </div>
          </div>

          {/* Hero Image */}
          <div className="mx-auto mt-16 max-w-4xl px-4 lg:mt-20">
            <div
              className="relative overflow-hidden rounded-xl ring-1 ring-border"
              style={{
                boxShadow:
                  "0 25px 50px rgba(0,0,0,0.08), 0 10px 20px rgba(0,0,0,0.05)"
              }}
            >
              <Image
                src="/images/hero2.png"
                alt="Modern web development workspace with laptop showing website design"
                width={1500}
                height={500}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
          {/* Credibility Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

            <div>
              <p className="text-3xl font-bold text-primary">12+</p>
              <p className="text-sm text-muted-foreground">
                Years Engineering Experience
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold text-primary">100%</p>
              <p className="text-sm text-muted-foreground">
                Mobile Friendly Websites
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold text-primary">Fast</p>
              <p className="text-sm text-muted-foreground">
                Optimized Performance
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold text-primary">SEO</p>
              <p className="text-sm text-muted-foreground">
                Google Ready Structure
              </p>
            </div>

          </div>
        </div>
      </section>
      {/* Why Website Matters Section */}
      <section className="border-t border-border bg-secondary/20 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Your Business Needs a Professional Website
            </h2>

            <p className="mt-4 text-lg text-muted-foreground">
              Today, most customers search online before contacting a business.
              If your company doesn’t have a professional website, potential
              customers may choose your competitors instead.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">

            <Card className="bg-background shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Build Trust</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  76% of customers check a company’s website before deciding
                  to contact them. A professional website instantly builds trust.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Get Found on Google</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A properly optimized website helps your business appear in
                  Google search results when customers look for your services.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Convert Visitors into Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A clear service page, strong design, and contact form make
                  it easy for visitors to turn into real customers.
                </p>
              </CardContent>
            </Card>

          </div>

        </div>
      </section>
      {/* About Section */}
      <section id="about" className="border-t border-border py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About Hash Web Studio</h2>
            <div className="mt-6 space-y-4 text-lg text-muted-foreground">
              <p>
                {"Hi, I'm Hashmatullah (Hash), a Senior Software Engineer with over 12 years of experience designing and building enterprise software and modern web applications."}
              </p>
              <p>
                My background includes developing scalable systems using technologies such as .NET,
                Angular, cloud platforms, and modern web frameworks.
              </p>
              <p>
                Through Hash Web Studio, I help local service businesses such as plumbers,
                electricians, HVAC companies, and contractors build fast, professional websites that
                improve their online presence and attract more customers from Google.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="https://www.linkedin.com/in/matt-hash-a82073197/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:underline"
              >
                <Linkedin className="h-5 w-5" />
                Connect on LinkedIn
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Websites Section */}
      <section id="demos" className="border-t border-border bg-secondary/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Example Websites</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              See examples of the professional websites we create for local service businesses.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {demoWebsites.map((demo, index) => (
              <Card key={index} className="group overflow-hidden bg-background shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Preview Image */}
                <div className="relative h-40 bg-secondary/50 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                  <div className="relative text-center">
                    <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-2">
                      <Code2 className="h-7 w-7 text-primary" />
                    </div>
                    <p className="text-sm font-medium">{demo.businessType}</p>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {demo.businessType}
                    </span>
                    {!demo.available && (
                      <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-lg">{demo.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {demo.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  {demo.available ? (
                    <Link
                      href={demo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full shadow-sm hover:shadow-md transition-shadow">
                        View Demo
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      Coming Soon
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Free Demo Program Section */}
      <section className="border-t border-border py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why We Offer Free Demo Websites
            </h2>

            <p className="mt-6 text-lg text-muted-foreground">
              Many web agencies charge between $3,000 and $10,000 to build a professional website.
              We believe local businesses should be able to see how their website will look before
              making any investment.
            </p>

            <p className="mt-4 text-lg text-muted-foreground">
              That’s why we create a free demo website tailored for your business first.
              If you like the design, we help you launch it. If not, there is no obligation.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">

            <Card className="bg-background shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Step 1</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Submit your business information and describe the services you offer.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Step 2</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We create a demo website design specifically for your business.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Step 3</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  If you like the demo, we launch your professional website quickly.
                </p>
              </CardContent>
            </Card>

          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="cursor-pointer shadow-md"
            >
              Get My Free Demo Website
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="border-t border-border bg-secondary/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What We Offer</h2>
            <p className="mt-4 text-muted-foreground">
              Everything you need to establish a strong online presence for your business.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-background shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Professional Website Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Modern, clean websites designed specifically for service businesses.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Mobile-Friendly Websites</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Optimized for phones, tablets, and desktops for the best user experience.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>SEO-Optimized Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Built to help businesses appear in Google search results and attract customers.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Google Maps Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Helps customers easily find your business location and service area.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Contact Forms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Allow customers to easily request services and get in touch with you.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Fast and Secure Hosting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Reliable hosting and deployment for fast performance and security.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="border-t border-border py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Businesses Choose Hash Web Studio
            </h2>
          </div>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[
              "Senior Software Engineer with 12+ years experience",
              "Fast loading modern websites",
              "Mobile-first design",
              "SEO-optimized structure",
              "Professional design tailored for service businesses",
              "Affordable pricing",
              "Reliable hosting and maintenance options",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg border border-border bg-secondary/30 p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="border-t border-border py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What Business Owners Say
            </h2>

            <p className="mt-4 text-lg text-muted-foreground">
              Local businesses trust modern websites to build credibility and attract more customers.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">

            <Card className="bg-background shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  "Our old website looked outdated. After getting a modern site design,
                  customers started taking our business more seriously."
                </p>

                <div className="mt-4 flex items-center gap-1 text-primary">
                  ★★★★★
                </div>

                <p className="mt-3 text-sm font-medium">
                  Local Plumbing Business Owner
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  "The demo website helped us visualize what our online presence could look like.
                  The process was simple and professional."
                </p>

                <div className="mt-4 flex items-center gap-1 text-primary">
                  ★★★★★
                </div>

                <p className="mt-3 text-sm font-medium">
                  HVAC Company Owner
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  "A professional website instantly made our business look more credible.
                  Customers now find us online much easier."
                </p>

                <div className="mt-4 flex items-center gap-1 text-primary">
                  ★★★★★
                </div>

                <p className="mt-3 text-sm font-medium">
                  Electrical Contractor
                </p>
              </CardContent>
            </Card>

          </div>

        </div>
      </section>
      {/* Pricing Section */}
      <section id="pricing" className="border-t border-border bg-secondary/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple Pricing</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Transparent pricing with everything you need to get started.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-lg">
            <Card className="border-primary bg-background shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Starter Website</CardTitle>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-primary">$499</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    "Professional website design",
                    "Mobile-friendly layout",
                    "SEO-optimized structure",
                    "Contact form",
                    "Google Maps integration",
                    "Fast performance",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Optional hosting, maintenance, and updates available.
                </p>
                <Button
                  className="mt-6 w-full shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="border-t border-border py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A simple three-step process to get your new website.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Request a demo website",
                description:
                  "Fill out the form below with your business details and requirements.",
              },
              {
                step: "02",
                title: "Review the design",
                description: "Review the design tailored specifically for your business needs.",
              },
              {
                step: "03",
                title: "Launch your website",
                description: "Launch your new website and start attracting more customers.",
              },
            ].map((item, index) => (
              <div key={index} className="relative rounded-lg bg-secondary/30 p-6 shadow-sm">
                <div className="mb-4 text-6xl font-bold text-primary/20">{item.step}</div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      {/* Modern FAQ Section */}
      <section className="border-t border-border py-24 lg:py-32 bg-secondary/20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">

          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>

            <p className="mt-4 text-lg text-muted-foreground">
              Everything business owners usually ask before getting a website.
            </p>
          </div>

          <div className="mt-16 space-y-5">

            {[
              {
                q: "Is the demo website really free?",
                a: "Yes. We build a demo version of your website so you can see exactly how it will look before paying anything."
              },
              {
                q: "How long does it take to build the website?",
                a: "Most demo websites are ready within a few days depending on the information you provide."
              },
              {
                q: "Do I need a domain?",
                a: "If you already have a domain we can connect it. If not, we can help you purchase one easily."
              },
              {
                q: "Do you provide hosting?",
                a: "Yes. We can deploy and host your website so it stays fast, secure and always online."
              },
              {
                q: "Can I update my website later?",
                a: "Yes. You can update the content yourself or we can provide maintenance services."
              }
            ].map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-border bg-background p-6 shadow-sm transition hover:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-medium">

                  {faq.q}

                  <span className="ml-4 flex h-8 w-8 items-center justify-center rounded-full border border-border text-xl font-light transition group-open:rotate-180">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">−</span>
                  </span>

                </summary>

                <div className="mt-4 text-muted-foreground leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}

          </div>

        </div>
      </section>

      {/* Contact / Lead Form Section */}
      <section id="contact" className="border-t border-border bg-secondary/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Get Your Free Demo Website
            </h2>
            <p className="mt-4 text-muted-foreground">
              Fill out the form below and describe your business needs. I will review your request
              and get back to you shortly with a demo or proposal.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-2xl">
            {formSubmitted ? (
              <Card className="border-primary bg-background shadow-lg">
                <CardContent className="py-16 text-center">
                  <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
                  <h3 className="mt-6 text-2xl font-semibold">Thank you!</h3>
                  <p className="mt-2 text-muted-foreground">
                    Your request has been received. I will contact you shortly.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-background shadow-lg">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit}>
                    <FieldGroup>
                      {/* Basic Info */}
                      <div className="grid gap-6 sm:grid-cols-2">
                        <Field>
                          <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                          <Input
                            id="fullName"
                            placeholder="John Doe"
                            required
                            value={formData.fullName}
                            onChange={(e) =>
                              setFormData({ ...formData, fullName: e.target.value })
                            }
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="email">Email Address</FieldLabel>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </Field>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <Field>
                          <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="(555) 123-4567"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="businessName">Business Name</FieldLabel>
                          <Input
                            id="businessName"
                            placeholder="ABC Plumbing"
                            required
                            value={formData.businessName}
                            onChange={(e) =>
                              setFormData({ ...formData, businessName: e.target.value })
                            }
                          />
                        </Field>
                      </div>

                      {/* Business Type */}
                      <Field>
                        <FieldLabel htmlFor="businessType">Business Type</FieldLabel>
                        <Select
                          value={formData.businessType}
                          onValueChange={(value) =>
                            setFormData({ ...formData, businessType: value })
                          }
                        >
                          <SelectTrigger id="businessType" className="w-full">
                            <SelectValue placeholder="Select your business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="plumbing">Plumbing</SelectItem>
                            <SelectItem value="hvac">HVAC</SelectItem>
                            <SelectItem value="electrician">Electrician</SelectItem>
                            <SelectItem value="roofing">Roofing</SelectItem>
                            <SelectItem value="landscaping">Landscaping</SelectItem>
                            <SelectItem value="cleaning">Cleaning Service</SelectItem>
                            <SelectItem value="contractor">Contractor</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>

                      {/* Has Website */}
                      <FieldSet>
                        <FieldLegend variant="label">
                          Do you currently have a website?
                        </FieldLegend>
                        <RadioGroup
                          value={formData.hasWebsite}
                          onValueChange={(value) =>
                            setFormData({ ...formData, hasWebsite: value })
                          }
                        >
                          <Field orientation="horizontal">
                            <RadioGroupItem value="yes" id="hasWebsite-yes" />
                            <FieldLabel htmlFor="hasWebsite-yes">Yes</FieldLabel>
                          </Field>
                          <Field orientation="horizontal">
                            <RadioGroupItem value="no" id="hasWebsite-no" />
                            <FieldLabel htmlFor="hasWebsite-no">No</FieldLabel>
                          </Field>
                        </RadioGroup>
                      </FieldSet>

                      {/* Features */}
                      <FieldSet>
                        <FieldLegend variant="label">What features do you need?</FieldLegend>
                        <div className="grid gap-3 sm:grid-cols-2" data-slot="checkbox-group">
                          {[
                            { id: "contact-form", label: "Contact Form" },
                            { id: "online-booking", label: "Online Booking" },
                            { id: "seo", label: "SEO Optimization" },
                            { id: "google-maps", label: "Google Maps Integration" },
                            { id: "gallery", label: "Photo Gallery" },
                            { id: "service-pages", label: "Service Pages" },
                            { id: "blog", label: "Blog" },
                            { id: "other-features", label: "Other" },
                          ].map((feature) => (
                            <Field key={feature.id} orientation="horizontal">
                              <Checkbox
                                id={feature.id}
                                checked={formData.features.includes(feature.id)}
                                onCheckedChange={(checked) =>
                                  handleFeatureChange(feature.id, checked as boolean)
                                }
                              />
                              <FieldLabel htmlFor={feature.id}>{feature.label}</FieldLabel>
                            </Field>
                          ))}
                        </div>
                      </FieldSet>

                      {/* Budget */}
                      <Field>
                        <FieldLabel htmlFor="budget">Budget Range</FieldLabel>
                        <Select
                          value={formData.budget}
                          onValueChange={(value) => setFormData({ ...formData, budget: value })}
                        >
                          <SelectTrigger id="budget" className="w-full">
                            <SelectValue placeholder="Select your budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="300-500">$300 – $500</SelectItem>
                            <SelectItem value="500-1000">$500 – $1000</SelectItem>
                            <SelectItem value="1000+">$1000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>

                      {/* Timeline */}
                      <Field>
                        <FieldLabel htmlFor="timeline">Project Timeline</FieldLabel>
                        <Select
                          value={formData.timeline}
                          onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                        >
                          <SelectTrigger id="timeline" className="w-full">
                            <SelectValue placeholder="Select your timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asap">ASAP</SelectItem>
                            <SelectItem value="1-month">Within 1 month</SelectItem>
                            <SelectItem value="exploring">Just exploring options</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>

                      {/* Message */}
                      <Field>
                        <FieldLabel htmlFor="message">Message / Project Details</FieldLabel>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your business and what you're looking for..."
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </Field>

                      {submitError && (
                        <div className="rounded-md bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
                          {submitError}
                        </div>
                      )}
                      <p className="text-sm text-center text-muted-foreground">
                        ⚡ Only 5 free demo websites available this week.
                      </p>

                      <Button type="submit" size="lg" className="w-full shadow-sm hover:shadow-md transition-shadow cursor-pointer" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Spinner className="mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Build My Free Demo Website
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </FieldGroup>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* Footer */}
      <footer className="border-t border-border bg-foreground py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">

          <div className="grid gap-10 md:grid-cols-4">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
                  H
                </div>
                <span className="text-lg font-semibold text-background">
                  Hash Web Studio
                </span>
              </div>

              <p className="mt-3 text-sm text-background/70">
                Modern websites built for plumbers, electricians, HVAC companies and local service businesses.
              </p>

              <div className="mt-4 flex items-center gap-4">
                <Link
                  href="https://www.linkedin.com/in/matt-hash-a82073197/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-background">Quick Links</h4>
              <ul className="mt-4 space-y-2 text-sm text-background/70">
                <li>
                  <button onClick={() => scrollToSection("about")} className="hover:text-background cursor-pointer">
                    About
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("demos")} className="hover:text-background cursor-pointer">
                    Demo Websites
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("services")} className="hover:text-background cursor-pointer">
                    Services
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("pricing")} className="hover:text-background cursor-pointer">
                    Pricing
                  </button>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold text-background">Services</h4>
              <ul className="mt-4 space-y-2 text-sm text-background/70">
                <li>Website Design</li>
                <li>Mobile Friendly Websites</li>
                <li>SEO Optimization</li>
                <li>Google Maps Integration</li>
                <li>Hosting & Deployment</li>
              </ul>
            </div>

            {/* CTA */}
            <div>
              <h4 className="text-sm font-semibold text-background">
                Get Your Free Demo Website
              </h4>

              <p className="mt-3 text-sm text-background/70">
                See how your business website could look before paying anything.
              </p>

              <Button
                onClick={() => scrollToSection("contact")}
                className="mt-4 w-full cursor-pointer"
              >
                Request Free Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <p className="mt-3 text-xs text-background/50">
                Only a few demo slots available each week.
              </p>
            </div>

          </div>

          {/* Bottom */}
          <div className="mt-12 border-t border-border pt-6 text-center text-sm text-background/60">
            © {new Date().getFullYear()} Hash Web Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
