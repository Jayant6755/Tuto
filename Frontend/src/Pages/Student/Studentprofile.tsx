import { useEffect, useState } from "react";
import Navbar from "../../Pages/Home/Navbar/Navbar";
import Footer from "../../Hero/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import axios from "axios";
import {
  MapPin,
  Mail,
  Phone,
  Camera,
  Pencil,
  Save,
  X,
  User,
} from "lucide-react";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";


interface StudentData {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatar: string;
}

const StudentProfile = () => {
  const [data, setData] = useState<StudentData | null>(null); // 🟢 Start as null to check if data arrived
  const [draft, setDraft] = useState<StudentData | null>(null);
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 🟢 Tracks network state
  const { id } = useParams();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5000/api/student/student/${id}`);
        
        if (response.data && response.data.findstudent) {
          const studentProfile = response.data.findstudent;
          setData(studentProfile);
          setDraft(studentProfile); 
        }
        
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchStudentData();
    }
  }, [id]);


  const handleSave = () => {
    if (draft) {
      setData(draft);
      setEditing(false);
      // Optional: Add your axios.put updates here to save changes permanently to MongoDB!
    }
  };

  const handleCancel = () => {
    setDraft(data);
    setEditing(false);
  };

  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground animate-pulse text-lg font-medium">
          Loading student profile...
        </p>
      </div>
    );
  }

  // Fallback state if database can't find a record
  if (!data || !draft) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background flex-col gap-2">
        <p className="text-destructive text-lg font-medium">Profile record not found.</p>
       <Link to={`/student-form/${id}`} className="text-primary border-border border p-2 rounded-xl mt-4 inline-block">
          Create Profile
        </Link>
      </div>
    
    );
  }

  
  const firstInitial = data.name ? data.name[0] : "?";
  
  const initials = `${firstInitial}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="">
        {/* Hero banner */}
        <div className="h-48 md:h-56 bg-red-600 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,transparent_20%,hsl(var(--foreground)/0.25)_100%)] " />
        </div>

        <div className="container mx-auto px-4 -mt-20 pb-20 relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Avatar + name header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 mb-8">
              <div className="relative group">
                <Avatar className="w-32 h-32 bg-gray-300 border-1 shadow-xl">
                  <AvatarImage src={data.avatar} alt={data.name} />
                  <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  {data.name}
                </h1>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {data.location || "Earth"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" /> {data.email}
                  </span>
                </div>
              </div>

              {!editing && (
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  onClick={() => setEditing(true)}
                >
                  <Pencil className="w-4 h-4 mr-1.5" />
                  Edit Profile
                </Button>
              )}
            </div>

            {/* Profile card */}
            <Card className="border border-border shadow-lg">
              <CardContent className="p-6 md:p-8">
                {editing ? (
                  <div className="space-y-6">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-primary flex items-center gap-2">
                      <User className="w-4 h-4" /> Personal Information
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={draft.name}
                          onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={draft.email}
                          onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={draft.phone}
                          onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={draft.location}
                        onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">About Me</Label>
                      <Textarea
                        id="bio"
                        rows={4}
                        value={draft.bio}
                        onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                        className="resize-none"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button onClick={handleSave} className="rounded-xl">
                        <Save className="w-4 h-4 mr-1.5" /> Save Changes
                      </Button>
                      <Button variant="ghost" onClick={handleCancel} className="rounded-xl">
                        <X className="w-4 h-4 mr-1.5" /> Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h2 className="text-sm text-red-600 font-semibold uppercase tracking-[0.15em] text-primary flex items-center gap-2">
                      <User className="w-4 h-4 " /> About Me
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-[15px] whitespace-pre-line">
                      {data.bio || "No description written yet."}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 pt-2">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                        <Mail className="w-4 h-4 text-red-600 shrink-0" />
                        <div>
                          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Email</p>
                          <p className="text-sm font-medium text-foreground">{data.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                        <Phone className="w-4 h-4 text-red-600 shrink-0" />
                        <div>
                          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Phone</p>
                          <p className="text-sm font-medium text-foreground">{data.phone || "None"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                        <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                        <div>
                          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Location</p>
                          <p className="text-sm font-medium text-foreground">{data.location || "None"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentProfile;