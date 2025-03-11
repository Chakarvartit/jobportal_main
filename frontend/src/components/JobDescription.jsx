import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);
    const [isApplied, setIsApplied] = useState(false);
    const [loading, setLoading] = useState(true);

    const { id: jobId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some((application) => application.applicant === user?._id));
                }
            } catch (error) {
                toast.error('Error fetching job details');
            } finally {
                setLoading(false);
            }
        };

        if (jobId) fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true); // Update state instantly
                dispatch(setSingleJob({ ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Application failed');
        }
    };

    if (loading) {
        return <p className="text-center py-10 text-gray-500">Loading job details...</p>;
    }

    return (
        <div className="max-w-7xl mx-auto my-10">
            {/* Header Section */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="font-bold text-2xl">{singleJob?.title}</h1>
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                        <Badge className="text-blue-700 bg-blue-100">{singleJob?.position} Positions</Badge>
                        <Badge className="text-red-700 bg-red-100">{singleJob?.jobType}</Badge>
                        <Badge className="text-purple-700 bg-purple-100">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={!isApplied ? applyJobHandler : null}
                    disabled={isApplied}
                    className={`rounded-lg transition ${
                        isApplied ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'
                    }`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

            {/* Job Details */}
            <h1 className="border-b-2 border-gray-300 font-medium py-4 text-lg">Job Description</h1>
            <div className="my-4 space-y-2 text-gray-800">
                <p><span className="font-bold">Role:</span> {singleJob?.title}</p>
                <p><span className="font-bold">Location:</span> {singleJob?.location || 'Not specified'}</p>
                <p><span className="font-bold">Description:</span> {singleJob?.description}</p>
                <p><span className="font-bold">Experience:</span> {singleJob?.experience} yrs</p>
                <p><span className="font-bold">Salary:</span> {singleJob?.salary} LPA</p>
                <p><span className="font-bold">Total Applicants:</span> {singleJob?.applications?.length}</p>
                <p><span className="font-bold">Posted Date:</span> {singleJob?.createdAt?.split('T')[0]}</p>
            </div>
        </div>
    );
};

export default JobDescription;
