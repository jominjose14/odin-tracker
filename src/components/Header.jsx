import {useState} from "react";
import {Switch} from "@/components/ui/switch";

function Header({ progress }) {
    const [sits, setSits] = useState(1);

    const timeToProgressOnePercent = 1.4; // number of days it takes to make 1% progress
    let daysRemain = timeToProgressOnePercent * (100-progress) / sits;
    daysRemain = Math.ceil(daysRemain);

    let endDate = new Date();
    endDate.setDate(endDate.getDate() + daysRemain);
    endDate = endDate.toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'});
    endDate = endDate.replace(', 20', ' \'');

    return (
        <header className='grid auto-rows-auto grid-cols-[1fr 1fr] gap-y-[1.5em] justify-between items-center lg:flex mx-8 md:mx-12 lg:mx-16 my-6 md:my-8 text-[0.75rem] md:text-[1rem] lg:text-[1.1rem]'>
            <div className='row-start-2 w-full lg:w-1/5 rounded-[0.75em] bg-gray-900 p-[0.75em] lg:p-[1em] text-[0.75rem] min-[768px]:text-[0.8rem] min-[1220px]:text-[0.9rem] min-[1430px]:text-[1.1rem] text-center flex justify-center items-center gap-1 lg:gap-4'>
                <span>1 sits/day</span>
                <Switch onCheckedChange={(checked) => setSits(checked ? 2 : 1)} />
                <span>2 sits/day</span>
            </div>
            <h1 className='col-span-2 bg-gray-900/75 text-center mx-auto px-[1.25em] py-[0.75em] pl-[1.5em] w-fit text-2xl md:text-3xl lg:text-4xl font-bold rounded-2xl'>
                Odin Tracker
            </h1>
            <div className='row-start-2 w-full lg:w-1/5 text-center rounded-[0.75em] bg-gray-900 p-[0.75em] lg:p-[1em] text-[0.75rem] md:text-[1.1rem]'>
                <span>{daysRemain} days: </span>
                <span className='text-white/50'>{endDate}</span>
            </div>
        </header>
    );
}

export default Header;