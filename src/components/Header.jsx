import {useState} from "react";
import {Switch} from "@/components/ui/switch";

function Header({ progress }) {
    const [sits, setSits] = useState(1);
    const timeToProgressOnePercent = 1.4; // number of days it takes to make 1% progress
    let daysRemain = timeToProgressOnePercent * (100-progress) / sits;
    daysRemain = Math.ceil(daysRemain);
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + daysRemain);

    return (
        <header className='flex items-center mx-16 my-8 text-[1.1rem]'>
            <div className='w-1/5 rounded-sm bg-gray-900 p-4 flex justify-center items-center gap-4'>
                <span>1 sits/day</span>
                <Switch onCheckedChange={(checked) => setSits(checked ? 2 : 1)} />
                <span>2 sits/day</span>
            </div>
            <h1 className='bg-gray-900/50 text-center mx-auto px-16 py-8 w-fit pl-18 text-4xl font-bold rounded-2xl'>
                Odin Tracker
            </h1>
            <div className='w-1/5 text-center rounded-sm bg-gray-900 p-4'>
                <span>{daysRemain} days: </span>
                <span className='text-white/50'>{endDate.toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'})}</span>
            </div>
        </header>
    );
}

export default Header;