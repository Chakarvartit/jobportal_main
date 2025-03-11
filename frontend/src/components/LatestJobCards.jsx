import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(`/description/${job?._id}`);
    };

    return (
        <div 
            onClick={handleNavigation} 
            className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:shadow-2xl transition-shadow duration-300"
        >
            {/* Company Details */}
            <div className="mb-2">
                <h1 className="font-medium text-lg">{job?.company?.name || "Unknown Company"}</h1>
                <p className="text-sm text-gray-500">{job?.location || "Location Unavailable"}</p>
            </div>

            {/* Job Title & Description */}
            <div>
                <h1 className="font-bold text-lg my-2">{job?.title || "Job Title Not Available"}</h1>
                <p className="text-sm text-gray-600 line-clamp-2">{job?.description || "No description provided."}</p>
            </div>

            {/* Job Tags */}
            <div className="flex items-center gap-2 mt-4">
                <Badge className="text-blue-700 font-bold" variant="ghost">{job?.positions || 1} Positions</Badge>
                <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.jobType || "N/A"}</Badge>
                <Badge className="text-[#7209b7] font-bold" variant="ghost">{job?.salary ? `${job.salary} LPA` : "Salary Unspecified"}</Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
