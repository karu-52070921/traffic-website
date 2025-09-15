import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-primary to-primary-foreground py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-white mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Making Roads Safer Together</h1>
            <p className="text-xl mb-8">
              Join our community-driven platform to report road hazards, avoid traffic congestion, and contribute to
              safer roads for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/explore-map">Explore Map</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <img
                  src="/WhatsApp Image 2025-03-21 at 14.44.49_0783e823.jpg"
                  alt="Road Safety Map Interface"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm font-medium">Low Traffic</span>
                </div>
                <div className="flex items-center mt-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm font-medium">Moderate Traffic</span>
                </div>
                <div className="flex items-center mt-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm font-medium">Heavy Traffic</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

