import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className="max-w-7xl mx-auto my-20 px-4">
            {/* Section Title */}
            <h1 className="text-4xl font-bold text-center">
                <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
            </h1>

            {/* Job Listing Grid */}
            {allJobs.length === 0 ? (
                <div className="text-center text-gray-500 mt-6">🚀 No Job Available</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
                    {allJobs.slice(0, 6).map((job) => (
                        <LatestJobCards key={job?._id} job={job} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default LatestJobs;
