import { EntryList } from '@/components/entry-list';
import { Header } from '@/components/header';
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background gradient with overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-red-950 mix-blend-multiply" />
        
        {/* Updated pattern overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:16px]" />
        
        <div className="container relative mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16">
            {/* Content side */}
            <div className="flex-1 text-white space-y-8 pt-8 lg:pt-0 text-center lg:text-left">
              <div className="space-y-2">
                <p className="text-red-500 font-semibold tracking-wide uppercase text-sm">Take Action Now</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Stand Against Injustice
                </h1>
              </div>
              <p className="text-lg md:text-xl leading-relaxed text-gray-300 max-w-2xl mx-auto lg:mx-0">
                The Georgian government has refused to join the EU, and we are here to protest against the companies and individuals who do not support the aspirations of the Georgian people.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                <a href="https://daitove.ge/" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="destructive" className="w-full sm:w-auto">
                    Join the Movement
                  </Button>
                </a>
                <a href="https://ge.usembassy.gov/statement-on-georgias-suspension-of-european-union-accession/"
                   target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
            
            {/* Video section */}
            <div className="flex-1 relative w-full lg:w-[500px] aspect-video">
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="relative w-full h-full">
                  <iframe
                    src="https://www.youtube.com/embed/NqqwXgiyDUU"
                    title="Georgian Protest Video"
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        <EntryList />
      </div>
    </main>
  );
}