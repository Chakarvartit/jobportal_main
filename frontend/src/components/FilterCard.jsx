import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42k-1L", "1L-5L"]
    }
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className="w-full bg-white p-4 rounded-md shadow-md">
            <h1 className="font-bold text-xl mb-3">Filter Jobs</h1>
            <hr className="mb-4" />
            <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-4">
                {filterData.map((data, index) => (
                    <div key={index} className="mb-4">
                        <h2 className="font-semibold text-lg mb-2">{data.filterType}</h2>
                        {data.array.map((item, idx) => {
                            const itemId = `filter-${index}-${idx}`;
                            return (
                                <div key={itemId} className="flex items-center space-x-2 my-1">
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId} className="cursor-pointer">
                                        {item}
                                    </Label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
