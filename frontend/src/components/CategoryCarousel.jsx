import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="w-full max-w-2xl mx-auto my-16">
            <Carousel className="w-full">
                <CarouselContent>
                    {categories.map((cat, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 flex justify-center">
                            <Button
                                onClick={() => searchJobHandler(cat)}
                                variant="outline"
                                className="px-6 py-3 text-lg rounded-full shadow-md hover:bg-gray-100 transition-all"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
