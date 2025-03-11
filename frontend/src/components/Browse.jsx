import React, { useEffect, useCallback } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs();
    const { allJobs = [] } = useSelector((store) => store.job);
    const dispatch = useDispatch();

    // Use useCallback for optimized dispatch function
    const clearSearchQuery = useCallback(() => {
        dispatch(setSearchedQuery(""));
    }, [dispatch]);

    useEffect(() => {
        return () => {
            clearSearchQuery();
        };
    }, [clearSearchQuery]);

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10 px-4">
                <h1 className="font-bold text-2xl text-gray-800 my-6">
                    {allJobs.length > 0 ? `Search Results (${allJobs.length})` : "No Jobs Found"}
                </h1>

                {allJobs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {allJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-lg text-center my-10">
                        Try searching with a different keyword.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Browse;
