import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs = [] } = useSelector(store => store.job);

    // Function to get badge color styles
    const getStatusBadgeStyles = (status) => {
        switch (status) {
            case 'rejected': return 'bg-red-500 text-white';
            case 'pending': return 'bg-yellow-500 text-black';
            case 'accepted': return 'bg-green-500 text-white';
            default: return 'bg-blue-500 text-white';
        }
    };

    return (
        <div className="p-6 bg-gray-50 shadow-lg rounded-xl">
            <Table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <TableCaption className="text-lg font-semibold text-gray-700">
                    Your Applied Jobs
                </TableCaption>
                <TableHeader className="bg-gray-200">
                    <TableRow>
                        <TableHead className="text-gray-700">Date</TableHead>
                        <TableHead className="text-gray-700">Job Role</TableHead>
                        <TableHead className="text-gray-700">Company</TableHead>
                        <TableHead className="text-right text-gray-700">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan="4" className="text-center text-gray-500 py-4">
                                You haven't applied for any jobs yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob?._id} className="hover:bg-gray-100 transition-all">
                                <TableCell className="py-3">{appliedJob?.createdAt?.split("T")[0] || 'N/A'}</TableCell>
                                <TableCell className="py-3">{appliedJob?.job?.title || 'N/A'}</TableCell>
                                <TableCell className="py-3">{appliedJob?.job?.company?.name || 'N/A'}</TableCell>
                                <TableCell className="text-right py-3">
                                    <Badge className={`${getStatusBadgeStyles(appliedJob?.status)} px-3 py-1 rounded-lg text-sm font-semibold`}>
                                        {appliedJob?.status?.toUpperCase() || 'UNKNOWN'}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobTable;
