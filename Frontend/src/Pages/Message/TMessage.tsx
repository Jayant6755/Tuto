import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  ArrowLeft,
  Check,
  CheckCheck,
  Image,
  Smile,
  Trash2,
} from "lucide-react";
import Navbar from "../../Pages/Home/Navbar/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import socket from "@/Socket/Socket";


type Student = {
  _id: string;
  name: string;
  avatar: string;
  online: boolean;
  subject: string;
  time: string;
};

// Define a structural interface for message state uniformity
interface MessageStructure {
  _id?: string;
  senderId: string;
  receiverId: string;
  content: string;
  time?: string;
  read?: boolean;
}

const TMessages = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [convos, setConvos] = useState<MessageStructure[]>([]);

   
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileShowChat, setMobileShowChat] = useState(false);

  const { id } = useParams<{ id: string }>(); // This represents the logged-in user's ID
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [selectedStudentInfo, setSelectedStudentInfo] = useState<Student | null>(null);
  const [activeConnections, setActiveConnections] = useState<Student[]>([]);
  

  const senderID = id;
  const receiverID = selectedStudent;

  // 1. Fetch conversational list history
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/connection/active-connections`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const data = await res.json();
        console.log("Fetched active connections:", data);

        const formattedConnections = data.map((conn: any) => {

          if(!conn.studentId || !conn.teacherId) return null;

          const currentLoggedInId = senderID?.toString();
          const connectionStudentId = conn.studentId._id?.toString() || conn.studentId.toString();

          if(connectionStudentId === currentLoggedInId){
            return conn.teacherId;
          }
          else{
            return conn.studentId;
          }
        }).filter(Boolean);
        
        setActiveConnections(formattedConnections);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, [senderID]);

  

  useEffect(() => {
    if (!senderID || !selectedStudent) {
      setConvos([]);
      return;
    }

    const fetchConversation = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/connection/messages/${selectedStudent}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (!res.ok) {
          throw new Error("Failed to fetch conversation");
        }

        const data = await res.json();
        const formattedMessages = data.map((msg: any) => ({
          ...msg,
          senderId: msg.senderId?.toString?.() ?? msg.senderId,
          receiverId: msg.receiverId?.toString?.() ?? msg.receiverId,
          time: msg.time || (msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Just now")
        }));

        setConvos(formattedMessages);
      } catch (error) {
        console.error("Error fetching conversation:", error);
        setConvos([]);
      }
    };

    fetchConversation();
  }, [senderID, selectedStudent]);

  // 2. Manage real-time Socket relationships safely
  useEffect(() => {
    if (!senderID) return;

    const handleConnect = () => {
      socket.emit("join", senderID);
      console.log("Socket connected. Joined room:", senderID);
    };

    const handleIncomingMessage = (data: MessageStructure) => {
      const isCurrentChat =
        data.senderId?.toString() === receiverID?.toString() ||
        data.receiverId?.toString() === receiverID?.toString();

      if (isCurrentChat || !receiverID) {
        setConvos((prevMessages) => [...prevMessages, data]);
      }
    };

    if (socket.connected) {
      handleConnect();
    } else {
      socket.on("connect", handleConnect);
    }

    socket.on("receiveMessage", handleIncomingMessage);
    socket.on("messageDeleted", (payload: { messageId: string }) => {
      setConvos((prevMessages) => prevMessages.filter((msg) => msg._id !== payload.messageId));
    });

    return () => {
      socket.off("connect", handleConnect);
      socket.off("receiveMessage", handleIncomingMessage);
      socket.off("messageDeleted");
    };
  }, [senderID, receiverID]);

  const sendMessage = () => {
    if (!message || !receiverID || !senderID) return;
    

    const messageData: MessageStructure = {
      
      senderId: senderID,
      receiverId: receiverID,
      content: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    // Emit structural object to backend pipeline
    socket.emit("sendMessage", messageData);
    
    setMessage("");
  };

  const deleteMessage = async (messageId?: string) => {
    if (!messageId || !senderID || !receiverID) return;

    try {
      const res = await fetch(`http://localhost:5000/api/connection/messages/${messageId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (!res.ok) {
        throw new Error("Failed to delete message");
      }

      setConvos((prevMessages) => prevMessages.filter((msg) => msg._id !== messageId));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  //back button
  const handleBack = () => {
    //take the id from url
    const userId = id;
    
    if (userId) {
      navigate(`/teacher-dashboard/${userId}`);
    }
    
  }

  localStorage.setItem("activeUser", JSON.stringify(activeConnections));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className=" h-screen flex">
        {/* Sidebar — conversation list */}
        <div className={`w-full md:w-[360px] lg:w-[400px] flex flex-col bg-card border-r border-gray-300 ${mobileShowChat ? "hidden md:flex" : "flex"}`}>
          <div className="p-4 border-b border-gray-300">
            <div className="flex flex-row gap-2">
           
              <span className="cursor-pointer" onClick={handleBack}> <ArrowLeft className="pt-1 w-7 h-7 " /> </span>
           
            <span><h1 className="text-xl font-bold text-foreground mb-3">Messages</h1></span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations…"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="divide-y divide-border">
              {activeConnections.map((rec) => (
                <button
                  key={rec._id}
                  onClick={() => {
                    setSelectedStudentInfo(rec);
                    setMobileShowChat(true);
                    setSelectedStudent(rec._id);
                  }}
                  className={`flex items-center gap-4 p-4 hover:bg-gray-100 border-b border-gray-200 transition-colors w-full text-left ${selectedStudent === rec._id ? "bg-gray-100" : ""}`}
                >
                  <div className="relative shrink-0">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={rec?.avatar} alt={rec?.name} />
                      <AvatarFallback>{rec?.name ? rec?.name[0] : "U"}</AvatarFallback>
                    </Avatar>
                    {rec?.online && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-card" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-semibold text-sm text-foreground truncate">{rec?.name || "Unknown User"}</span>
                      <span className="text-xs text-muted-foreground shrink-0 ml-2">{rec?.time || "Just now"}</span>
                    </div>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 mb-1 border-gray-300">
                      {rec?.subject || ""}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat panel */}
        <div className={`flex-1 flex flex-col ${!mobileShowChat ? "hidden md:flex" : "flex"}`}>
          {selectedStudentInfo ? (
            <>
              {/* Chat header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b bg-card border-gray-300">
                <button className="md:hidden p-1 rounded-lg hover:bg-secondary" onClick={() => setMobileShowChat(false)}>
                  <ArrowLeft className="w-5 h-5 text-foreground" />
                </button>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedStudentInfo.avatar} alt={selectedStudentInfo.name} />
                  <AvatarFallback>{selectedStudentInfo.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground">{selectedStudentInfo.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedStudentInfo.online ? <span className="text-green-500">Online</span> : "Offline"}
                    {" · "}{selectedStudentInfo.subject}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-9 w-9"><Phone className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9"><Video className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9"><MoreVertical className="w-4 h-4" /></Button>
                </div>
              </div>

              {/* Messages Grid */}
              <ScrollArea className="flex-1 p-4 bg-gray-50">
                <div className="max-w-2xl mx-auto space-y-4">
                  {convos.map((msg) => {
                    const isMe = msg.senderId?.toString() === senderID?.toString();
                    return (
                      <div key={msg._id || `&{msg.createdAt}-&{msg.content}`} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm ${isMe ? "bg-red-300 text-gray-800 rounded-br-md" : "bg-white text-black rounded-bl-md"}`}>
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm leading-relaxed">{msg.content}</p>
                            {isMe && (
                              <button
                                onClick={() => deleteMessage(msg._id)}
                                className="ml-2 text-gray-500 hover:text-red-600"
                                aria-label="Delete message"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                          <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${isMe ? "text-black/60" : "text-black/60"}`}>
                            <span>{msg.time || "Just now"}</span>
                            {isMe && (msg.read ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>

              {/* Input bar */}
              <div className="border-t bg-card p-3 border-gray-300">
                <div className="max-w-2xl mx-auto flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="shrink-0 h-9 w-9"><Paperclip className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="shrink-0 h-9 w-9"><Image className="w-4 h-4" /></Button>
                  <Input
                    placeholder="Type a message…"
                    className="flex-1"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && message.trim() && sendMessage()}
                  />
                  <Button variant="ghost" size="icon" className="shrink-0 h-9 w-9"><Smile className="w-4 h-4" /></Button>
                  <Button size="icon" className="h-9 w-9 bg-red-500 text-white hover:bg-red-600 cursor-pointer" onClick={sendMessage}>
                    <Send className="w-4 h-4 text-white" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-muted-foreground p-4">
              <p className="text-lg font-medium">Select a student from the sidebar to open a conversation layout panel.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TMessages;