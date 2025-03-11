import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector((store) => store.job);

    // Optimized Filtering using useMemo to avoid redundant calculations
    const filteredJobs = useMemo(() => {
        if (!searchedQuery) return allJobs;

        return allJobs.filter((job) =>
            [job.title, job.description, job.location]
                .some(field => field.toLowerCase().includes(searchedQuery.toLowerCase()))
        );
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto mt-5">
                <div className="flex gap-5">
                    {/* Sidebar */}
                    <div className="w-[20%] hidden md:block">
                        <FilterCard />
                    </div>

                    {/* Job Listings */}
                    <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                        {filteredJobs.length === 0 ? (
                            <div className="text-center text-gray-500 py-10 text-lg">
                                No jobs found. Try a different search term.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        key={job?._id}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
