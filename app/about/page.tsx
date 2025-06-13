import { Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="mx-auto max-w-screen-lg px-4 md:px-6 py-8">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">About H. Slamet</h1>
          <p className="text-muted-foreground">Learn about our story and mission</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2010, H. Slamet has been dedicated to providing high-quality products to our customers. What
                started as a small family business has grown into a trusted name in the industry.
              </p>
              <p className="text-muted-foreground mb-4">
                Our commitment to quality, customer satisfaction, and innovation has been the cornerstone of our
                success. We carefully select each product in our inventory to ensure it meets our high standards.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                At H. Slamet, our mission is to provide exceptional products that enhance our customers' lives. We
                believe in building lasting relationships with our customers through honesty, integrity, and outstanding
                service. We strive to continuously improve and innovate, bringing you the best products at competitive
                prices.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>
                  We'd love to hear from you. Send us a message or use our contact information below.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="Your email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="Subject" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea id="message" placeholder="Your message" rows={4} />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>123 Main Street, City, Country</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span>info@hslamet.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "I GEDE KRISNA GANESHA WIDHIARTA", nim: "103012300088" },
              { name: "RAZAQ FARHAN", nim: "103012300322" },
              { name: "DERIL DIAZ", nim: "103012300074" },
              { name: "I PUTU JUSTINE BUDI WIJAYA", nim: "103012300361" },
              { name: "ZIYAD FATHIR AL BIAROZA", nim: "103012300455" }
            ].map((member, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-muted mb-4"></div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.nim}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="py-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
              <p className="text-muted-foreground mb-2">
                <strong>Effective Date:</strong> June 13, 2025
              </p>
              <p className="text-muted-foreground mb-4">
                H. Slamet we values your privacy. This Privacy Policy explains how we collect, use,
                and protect your information when you visit our website and use our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li><strong>Personal Information:</strong> Name, email, phone number, address, billing info.</li>
                <li><strong>Usage Data:</strong> IP address, browser info, and site interaction logs.</li>
                <li><strong>Cookies:</strong> Used for functionality and analytics.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>To fulfill orders and deliver products</li>
                <li>To send updates and promotions</li>
                <li>To improve site experience</li>
                <li>To ensure security and prevent fraud</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">3. Data Security</h2>
              <p className="text-muted-foreground">
                We take reasonable measures to protect your information from unauthorized access, disclosure, or destruction.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">4. Contact Us</h2>
              <p className="text-muted-foreground">
                For questions, contact us at <a className="underline" href="mailto:info@hslamet.com">info@hslamet.com</a>.
              </p>
            </div>
          </div>
        </div>

        <div className="py-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
              <p className="text-muted-foreground mb-2">
                <strong>Effective Date:</strong> June 13, 2025
              </p>
              <p className="text-muted-foreground mb-4">
                By using our website and services, you agree to the following terms and conditions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">1. User Responsibilities</h2>
              <p className="text-muted-foreground">
                You agree to provide accurate information and not misuse our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">2. Orders and Payment</h2>
              <p className="text-muted-foreground">
                All transactions are subject to availability and confirmation. Prices may change without prior notice.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">3. Shipping and Returns</h2>
              <p className="text-muted-foreground">
                Items can be returned within 7 days if unused and in original packaging.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">4. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                We are not responsible for indirect damages resulting from use of our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">5. Contact Us</h2>
              <p className="text-muted-foreground">
                For any inquiries, please contact us at <a className="underline" href="mailto:info@hslamet.com">info@hslamet.com</a>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
