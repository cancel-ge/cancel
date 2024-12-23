import { EntryList } from '@/components/entry-list';
import { Header } from '@/components/header';
import { Button } from "@/components/ui/button";
import { Paperclip } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background bg-slate-50">
      <Header />
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background gradient with overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-slate-950" />

        {/* Updated pattern overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:16px]" />

        <div className="container relative mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16">
            {/* Content side */}
            <div className="flex-1 text-white space-y-8 pt-8 lg:pt-0 text-center lg:text-left">
              <div className="space-y-2">
                <p className="text-red-500 font-semibold tracking-wide uppercase text-sm">Stand Against Injustice</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  I'm Georgian 🇬🇪 therefore<br />I'm European 🇪🇺
                </h1>
                <p className="text-sm text-gray-300">
                  <a href="https://www.researchgate.net/publication/264310531_'I_am_Georgian_and_therefore_I_am_European'_Re-searching_the_Europeanness_of_Georgia" target="_blank">
                    <Paperclip className="w-4 h-4 inline-block mr-1 align-middle" />
                    <span className="inline-block align-middle italic">
                      What does that mean?
                    </span>
                  </a>
                </p>
              </div>
              <p className="text-lg md:text-xl leading-relaxed text-gray-300 max-w-2xl mx-auto lg:mx-0">
                Georgia’s <a href="https://www.csce.gov/press-releases/chairman-wilson-and-ranking-member-cohen-express-their-solidarity-with-the-georgian-people" target="_blank" className="text-red-500">de facto government</a> has
                turned its back on the people’s dream of joining the EU. We’re here to highlight companies, public figures, and institutions that are either aligned with this regime or failing to take a clear stance on this critical issue.
                Let’s stand united for a democratic and European future for Georgia!
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

            <div className="flex-1 relative w-full lg:w-[500px] aspect-video">
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="relative w-full h-full">
                  <iframe
                    src="https://www.youtube.com/embed/NqqwXgiyDUU?controls=0"
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