import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (!query.trim()) return; // Prevent empty search
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    };

    return (
        <div className="text-center py-16 bg-gradient-to-b from-white to-gray-100">
            <div className="flex flex-col gap-6 max-w-3xl mx-auto px-4">
                <span className="mx-auto px-5 py-2 rounded-full bg-gray-100 text-[#5c02f8] font-medium shadow-sm">
                    No. 1 Job Hunt Website
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                    Search, Apply & <br /> Get Your <span className="text-[#3d38c2]">Dream Job</span>
                </h1>
                <p className="text-lg text-gray-600">
                    Find the perfect job that matches your skills and passion. Take the next step in your career with exciting opportunities waiting for you!
                </p>

                {/* Search Input */}
                <div className="flex w-full md:w-[40%] shadow-lg border border-gray-300 pl-3 rounded-full items-center gap-3 mx-auto bg-white">
                    <input
                        type="text"
                        placeholder="Find your dream job..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="outline-none border-none w-full px-4 py-2 text-lg rounded-l-full focus:ring-2 focus:ring-[#6A38C2]"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="rounded-r-full bg-[#6A38C2] px-5 py-2 hover:bg-[#5c02f8] transition-all"
                        disabled={!query.trim()} // Disable button if query is empty
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
