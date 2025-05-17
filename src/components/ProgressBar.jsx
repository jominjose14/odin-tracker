import {Progress} from "@/components/ui/progress";
import reactImg from '../assets/react.svg';
import messmerImg from '../assets/messmer.webp';

function ProgressBar({ progress }) {

    return (
        <div className='px-12 py-8'>
            <div className='mx-8 rounded-2xl flex gap-12 items-center'>
                <div className='grid place-items-center size-40 rounded-2xl overflow-hidden animate-[spin_8s_linear_infinite]'>
                    <img src={reactImg} alt='React' className='h-full w-full' />
                </div>
                <div className='grow grid place-items-center relative'>
                    <Progress value={progress} />
                    <div className='absolute z-1 text-2xl text-white font-bold'>
                        {progress}%
                    </div>
                </div>
                <div className='grid place-items-center size-44 rounded-2xl overflow-hidden animate-pulse'>
                    <img src={messmerImg} alt='Messmer' className='h-full w-full' />
                </div>
            </div>
        </div>
    );
}

export default ProgressBar;