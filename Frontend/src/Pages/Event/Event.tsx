import { useState } from "react";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../../Hero/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  Star,
  ArrowRight,
  Filter,
  Sparkles,
  Bell,
  Share2,
  Bookmark,
} from "lucide-react";
import { Link } from "react-router-dom";

type EventCategory = "workshop" | "webinar" | "study" | "live";

interface EduEvent {
  id: number;
  title: string;
  category: EventCategory;
  subject: string;
  host: string;
  hostAvatar: string;
  date: string;
  day: string;
  month: string;
  time: string;
  duration: string;
  location: string;
  mode: "online" | "in-person" | "hybrid";
  attendees: number;
  capacity: number;
  price: string;
  rating: number;
  featured: boolean;
  description: string;
  tags: string[];
}

const events: EduEvent[] = [
//   {
//     id: 1,
//     title: "Mastering Calculus: Integration Techniques",
//     category: "workshop",
//     subject: "Mathematics",
//     host: "Dr. Sarah Chen",
//     hostAvatar:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
//     date: "2026-08-27",
//     day: "27",
//     month: "AUG",
//     time: "4:00 PM - 6:00 PM",
//     duration: "2 hours",
//     location: "Online · Zoom",
//     mode: "online",
//     attendees: 124,
//     capacity: 200,
//     price: "Free",
//     rating: 4.9,
//     featured: true,
//     description:
//       "A hands-on workshop covering integration by parts, partial fractions, and substitution methods. Perfect for high school seniors preparing for exams.",
//     tags: ["Integration", "Exam Prep", "Grade 12"],
//   },
//   {
//     id: 2,
//     title: "Quantum Mechanics: A Beginner's Guide",
//     category: "webinar",
//     subject: "Physics",
//     host: "Prof. James Okafor",
//     hostAvatar:
//       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
//     date: "2026-08-29",
//     day: "29",
//     month: "AUG",
//     time: "6:00 PM - 7:30 PM",
//     duration: "1.5 hours",
//     location: "Online · YouTube Live",
//     mode: "online",
//     attendees: 88,
//     capacity: 500,
//     price: "$5",
//     rating: 4.8,
//     featured: true,
//     description:
//       "Demystify the strange world of quantum physics. We'll explore wave-particle duality, superposition, and the famous Schrödinger's cat thought experiment.",
//     tags: ["Quantum", "Physics", "Advanced"],
//   },
//   {
//     id: 3,
//     title: "Chemistry Lab: Acid-Base Titration",
//     category: "study",
//     subject: "Chemistry",
//     host: "Mr. David Kim",
//     hostAvatar:
//       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
//     date: "2026-09-02",
//     day: "02",
//     month: "SEP",
//     time: "2:00 PM - 5:00 PM",
//     duration: "3 hours",
//     location: "Science Block, Room 204",
//     mode: "in-person",
//     attendees: 18,
//     capacity: 25,
//     price: "$15",
//     rating: 4.7,
//     featured: false,
//     description:
//       "Get hands-on experience with titration techniques, indicator selection, and calculating unknown concentrations. Lab equipment provided.",
//     tags: ["Practical", "Lab Skills", "Grade 11"],
//   },
//   {
//     id: 4,
//     title: "Creative Writing: Crafting Compelling Narratives",
//     category: "workshop",
//     subject: "English",
//     host: "Ms. Priya Sharma",
//     hostAvatar:
//       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
//     date: "2026-09-05",
//     day: "05",
//     month: "SEP",
//     time: "11:00 AM - 1:00 PM",
//     duration: "2 hours",
//     location: "Online · Zoom",
//     mode: "online",
//     attendees: 56,
//     capacity: 100,
//     price: "Free",
//     rating: 4.9,
//     featured: false,
//     description:
//       "Learn to build unforgettable characters, structure your plot, and find your unique voice. Bring a short draft to workshop live.",
//     tags: ["Writing", "Storytelling", "All Levels"],
//   },
//   {
//     id: 5,
//     title: "Live Q&A: Crack the SAT Math Section",
//     category: "live",
//     subject: "Test Prep",
//     host: "Dr. Elena Rodriguez",
//     hostAvatar:
//       "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
//     date: "2026-09-08",
//     day: "08",
//     month: "SEP",
//     time: "7:00 PM - 8:00 PM",
//     duration: "1 hour",
//     location: "Online · Discord",
//     mode: "online",
//     attendees: 212,
//     capacity: 1000,
//     price: "Free",
//     rating: 5.0,
//     featured: true,
//     description:
//       "Bring your toughest SAT math questions and get them solved live. Plus strategies for time management and avoiding common traps.",
//     tags: ["SAT", "Strategy", "Q&A"],
//   },
//   {
//     id: 6,
//     title: "Biology Field Trip: Local Ecosystem Study",
//     category: "study",
//     subject: "Biology",
//     host: "Dr. Elena Rodriguez",
//     hostAvatar:
//       "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
//     date: "2026-09-12",
//     day: "12",
//     month: "SEP",
//     time: "9:00 AM - 1:00 PM",
//     duration: "4 hours",
//     location: "Riverside Nature Reserve",
//     mode: "in-person",
//     attendees: 12,
//     capacity: 20,
//     price: "$25",
//     rating: 4.8,
//     featured: false,
//     description:
//       "Observe biodiversity firsthand. Collect samples, identify species, and learn field research methods. Transportation included from campus.",
//     tags: ["Field Study", "Ecology", "Practical"],
//   },
];

const categoryConfig: Record<
  EventCategory,
  { label: string; color: string; icon: typeof Calendar }
> = {
  workshop: { label: "Workshop", color: "bg-primary/15 text-primary", icon: Sparkles },
  webinar: { label: "Webinar", color: "bg-blue-500/15 text-blue-500", icon: Video },
  study: { label: "Study Session", color: "bg-emerald-500/15 text-emerald-500", icon: Users },
  live: { label: "Live Q&A", color: "bg-amber-500/15 text-amber-500", icon: Bell },
};

const Events = () => {
  const [filter, setFilter] = useState<EventCategory | "all">("all");
  const [bookmarked, setBookmarked] = useState<number[]>([]);

  const filtered =
    filter === "all" ? events : events.filter((e) => e.category === filter);

  const featured = events.filter((e) => e.featured);

  const toggleBookmark = (id: number) =>
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id],
    );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden bg-gradient-to-r from-red-800 to-red-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_hsl(0_0%_100%/0.15),_transparent_60%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 gap-1.5 bg-white">
              <Calendar className="w-3.5 h-3.5" /> Upcoming Events
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Learn together, grow together
            </h1>
            <p className="text-lg text-white/80">
              Join live workshops, webinars, and study sessions hosted by our top
              educators. Reserve your spot before seats fill up.
            </p>
          </div>
        </div>
      </section>

      {/* Featured event */}
      {featured.length > 0 && (
        <section className="container mx-auto px-4 -mt-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-4">
            {featured.slice(0, 2).map((ev) => {
              const cat = categoryConfig[ev.category];
              return (
                <Card
                  key={ev.id}
                  className="overflow-hidden border-border/60 hover:shadow-glow transition-shadow duration-300"
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex sm:flex-col items-center justify-center bg-primary/10 p-5 sm:w-24 gap-1">
                        <span className="text-3xl font-bold text-primary leading-none">
                          {ev.day}
                        </span>
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                          {ev.month}
                        </span>
                      </div>
                      <div className="flex-1 p-5">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${cat.color}`}
                          >
                            <cat.icon className="w-3 h-3" /> {cat.label}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            {ev.rating}
                          </span>
                        </div>
                        <h3 className="font-bold text-foreground mb-1.5 line-clamp-1">
                          {ev.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {ev.description}
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={ev.hostAvatar} alt={ev.host} />
                            <AvatarFallback>{ev.host[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">
                            Hosted by <strong className="text-foreground">{ev.host}</strong>
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" /> {ev.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3.5 h-3.5" /> {ev.attendees}/{ev.capacity}
                            </span>
                          </div>
                          <Button size="sm" className="gap-1">
                            Reserve <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}
      

      {/* Main content */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">All Events</h2>
            <p className="text-sm text-muted-foreground">
              {filtered.length} event{filtered.length !== 1 && "s"} found
            </p>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1  ">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            <FilterChip
              active={filter === "all"}
              onClick={() => setFilter("all")}
              label="All"
            />
            {(Object.keys(categoryConfig) as EventCategory[]).map((cat) => (
              <FilterChip
                key={cat}
                active={filter === cat}
                onClick={() => setFilter(cat)}
                label={categoryConfig[cat].label}
              />
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((ev) => {
            const cat = categoryConfig[ev.category];
            const pct = Math.round((ev.attendees / ev.capacity) * 100);
            const isBookmarked = bookmarked.includes(ev.id);
            return (
              <Card
                key={ev.id}
                className=" group flex flex-col border-border/60 hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Date banner */}
                <div className="flex items-center justify-between px-4 py-3 bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                      <span className="text-base font-bold text-primary leading-none">
                        {ev.day}
                      </span>
                      <span className="text-[10px] font-semibold text-primary uppercase">
                        {ev.month}
                      </span>
                    </div>
                    <div>
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${cat.color}`}
                      >
                        <cat.icon className="w-3 h-3" /> {cat.label}
                      </span>
                      <p className="text-xs text-muted-foreground mt-0.5">{ev.time}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleBookmark(ev.id)}
                    className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                    aria-label="Bookmark"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        isBookmarked
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                </div>

                <CardContent className="flex-1 flex flex-col p-4 pt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-[10px]">
                      {ev.subject}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {ev.rating}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {ev.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {ev.description}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={ev.hostAvatar} alt={ev.host} />
                      <AvatarFallback>{ev.host[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground truncate">
                      {ev.host}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      {ev.mode === "online" ? (
                        <Video className="w-3.5 h-3.5" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5" />
                      )}
                      <span className="truncate max-w-[120px]">{ev.location}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {ev.duration}
                    </span>
                  </div>

                  {/* Capacity bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1">
                      <span>{ev.attendees} attending</span>
                      <span>{pct}% full</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-sm font-bold text-foreground">
                      {ev.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Share2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button size="sm" className="gap-1">
                        Join <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">No events in this category yet.</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => setFilter("all")}
            >
              View all events
            </Button>
          </div>
        )}

        {/* Host CTA */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-red-600 to-red-800 p-8 text-center">
          <Sparkles className="w-8 h-8 text-white mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-white mb-2">
            Want to host your own event?
          </h3>
          <p className="text-white/80 mb-5 max-w-lg mx-auto">
            Reach hundreds of eager learners. Create a workshop, webinar, or study
            session and manage registrations right from your dashboard.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/teacherregister">
              <Button variant="default" className="gap-1 bg-red-500 text-white cursor-pointer">
                Become a Teacher <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
           
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const FilterChip = ({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) => (
  <button
    onClick={onClick}
    className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
      active
        ? "bg-red-500 text-white"
        : "bg-gray-200 text-black/60 hover:text-black cursor-pointer"
    }`}
  >
    {label}
  </button>
);

export default Events;
