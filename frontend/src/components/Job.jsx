import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        return daysAgo <= 0 ? 'Today' : `${daysAgo} days ago`;
    };

    return (
        <div className="p-6 rounded-lg shadow-lg bg-white border border-gray-200 transition hover:shadow-xl">
            {/* Job Date & Save Button */}
            <div className="flex items-center justify-between text-sm text-gray-500">
                <p>{daysAgoFunction(job?.createdAt)}</p>
                <Button variant="outline" className="rounded-full hover:bg-gray-100" size="icon">
                    <Bookmark />
                </Button>
            </div>

            {/* Company Info */}
            <div className="flex items-center gap-3 my-4">
                <Avatar className="w-12 h-12 border">
                    <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                </Avatar>
                <div>
                    <h1 className="font-semibold text-lg">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-500">{job?.location || 'India'}</p>
                </div>
            </div>

            {/* Job Title & Description */}
            <div>
                <h1 className="font-bold text-xl text-gray-800 my-2">{job?.title}</h1>
                <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
            </div>

            {/* Job Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge className="text-blue-700 bg-blue-100">{job?.position} Positions</Badge>
                <Badge className="text-red-600 bg-red-100">{job?.jobType}</Badge>
                <Badge className="text-purple-700 bg-purple-100">{job?.salary} LPA</Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mt-4">
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className="hover:bg-gray-100">
                    Details
                </Button>
                <Button className="bg-[#7209b7] text-white hover:bg-[#5a078c]">Save For Later</Button>
            </div>
        </div>
    );
};

export default Job;
