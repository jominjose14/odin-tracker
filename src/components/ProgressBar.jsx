import {Progress} from "@/components/ui/progress";
import reactImg from '../assets/react.svg';
import messmerImg from '../assets/messmer.webp';

function ProgressBar({ progress }) {

    return (
        <div className='px-2 md:px-12 lg:px-16 py-4 md:py-6 lg:py-8'>
            <div className='mx-8 rounded-2xl flex gap-2 md:gap-7 lg:gap-12 items-center'>
                <div className='grid place-items-center size-16 md:size-30 lg:size-40 rounded-2xl overflow-hidden animate-[spin_8s_linear_infinite]'>
                    <img src={reactImg} alt='React' className='h-full w-full' />
                </div>
                <div className='grow grid place-items-center relative'>
                    <Progress value={progress} />
                    <div className='absolute z-1 text-sm md:text-xl lg:text-2xl text-white font-bold'>
                        {progress}%
                    </div>
                </div>
                <div className='grid place-items-center size-18 md:size-34 lg:size-44 rounded-2xl overflow-hidden animate-pulse'>
                    <img src={messmerImg} alt='Messmer' className='h-full w-full' />
                </div>
            </div>
        </div>
    );
}

export default ProgressBar;