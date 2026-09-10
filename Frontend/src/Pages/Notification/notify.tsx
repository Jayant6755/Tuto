import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

interface IncomingRequest {
    _id: string;
    studentId: {
        _id: string;
        name: string;
        email: string;
    };
    status: string;
    createdAt: string;
}

export const Notify = () => {
    const { id } = useParams<{ id: string }>();
    const [incomingRequest, setIncomingRequest] = useState<IncomingRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching incoming requests
        const fetchIncomingRequest = async () => {
           try{
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/connection/incoming-requests", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIncomingRequest(res.data);
           }
           catch(error){
            console.error("Error fetching incoming requests:", error);
           }
           finally{
            setLoading(false);
           }
        };

        fetchIncomingRequest();
    }, []);

    const handleResponse = async (connectionId: string, action: "accepted" | "rejected") => {
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:5000/api/connection/respond", {
                connectionId,
                action,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIncomingRequest(prev => prev.filter(req => req._id !== connectionId)); // Remove the handled request from the list
        } catch (error) {
            console.error("Error responding to connection request:", error);
        }
    };

    if(loading) {
        return <div>Loading...</div>;
    }


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Student Connection Requests</h2>
      <h4 className="text-sm text-gray-500 mb-6">Connection, session & application requests</h4>
      
      {incomingRequest.length === 0 ? (
        <div className="border-2 text-center border-dashed border-gray-300 p-6 rounded-xl">
          <div className="flex justify-center flex-col items-center gap-2">
             <span className="text-gray-700 bg-gray-200 p-2 rounded-xl"><Bell className="w-8 h-8" /></span>
             <p className="text-gray-500">No connection requests at the moment.</p>
             <Link to={`/teacher-dashboard/${id}`}>
             <button className="mt-2 bg-gray-200 cursor-pointer text-black py-2 px-4 rounded-xl">
               Go to dashboard
             </button>
             </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {incomingRequest.map((request) => (
            <div key={request._id} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div>
                {/* Reads the populated user data array object nested by Mongoose */}
                <p className="font-semibold text-gray-800">{request.studentId.name}</p>
                <p className="text-xs text-gray-400">{request.studentId.email}</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => handleResponse(request._id, "accepted")}
                >
                  Accept
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-red-500 hover:bg-red-50"
                  onClick={() => handleResponse(request._id, "rejected")}
                >
                  Deny
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default Notify;
