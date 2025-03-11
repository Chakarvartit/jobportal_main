import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div>
            <Navbar />

            {/* Profile Card */}
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
                {/* Profile Header */}
                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage 
                                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" 
                                alt="profile" 
                            />
                        </Avatar>
                        <div>
                            <h1 className="font-medium text-xl">{user?.fullname || "N/A"}</h1>
                            <p className="text-gray-600">{user?.profile?.bio || "No bio available"}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} variant="outline">
                        <Pen className="w-4 h-4" />
                    </Button>
                </div>

                {/* Contact Info */}
                <div className="my-5">
                    <div className="flex items-center gap-3 my-2">
                        <Mail className="text-gray-500" />
                        <span>{user?.email || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-3 my-2">
                        <Contact className="text-gray-500" />
                        <span>{user?.phoneNumber || "N/A"}</span>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="my-5">
                    <h1 className="font-bold text-lg">Skills</h1>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {user?.profile?.skills?.length > 0 ? (
                            user.profile.skills.map((item, index) => (
                                <Badge key={index} className="text-sm">{item}</Badge>
                            ))
                        ) : (
                            <span className="text-gray-500">N/A</span>
                        )}
                    </div>
                </div>

                {/* Resume Section */}
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-md font-bold">Resume</Label>
                    {user?.profile?.resume ? (
                        <a 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            href={user.profile.resume} 
                            className="text-blue-500 hover:underline"
                        >
                            {user?.profile?.resumeOriginalName || "View Resume"}
                        </a>
                    ) : (
                        <span className="text-gray-500">N/A</span>
                    )}
                </div>
            </div>

            {/* Applied Jobs Section */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6">
                <h1 className="font-bold text-lg mb-4">Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            {/* Update Profile Dialog */}
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
