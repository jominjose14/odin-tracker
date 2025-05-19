import newItemMp3 from '../assets/new-item.mp3';
import gamingPcImg from '../assets/gaming-pc.png';

function Reward({ setAppState }) {
    const fadeSidesStyle = '[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]';

    const selfDestruct = () => {
        document.removeEventListener('keydown', onKeyDownE);
        setAppState('end');
    }

    const onKeyDownE = (e) => {
        if(e.key !== 'e') return;
        selfDestruct();
    };

    const audio = new Audio(newItemMp3);
    audio.play();

    document.addEventListener('keydown', onKeyDownE);

    return (
        <div
            id='reward'
            className='animate-fade-in font-serif fixed bottom-1/20 left-1/20 right-1/20 md:left-1/12 md:right-1/12 lg:left-1/3 lg:right-1/3 mx-auto h-fit'
            onClick={selfDestruct}
        >
            <div className={`flex flex-col items-center justify-center pt-2 pb-4 mb-8 border-y-2 border-y-amber-200 bg-black/50 ${fadeSidesStyle}`}>
                <div className='text-xs text-amber-200 my-1'>NEW</div>
                <div className={`w-1/2 text-center border-b-1 border-b-amber-200 mb-4 ${fadeSidesStyle}`}>Gaming PC</div>
                <div className='grow grid place-items-center pl-6'>
                    <img src={gamingPcImg} alt='Gaming PC' className='w-1/2 h-auto aspect-video' />
                </div>
            </div>
            <div className={`text-center py-2 border-y-2 border-y-amber-200 bg-black/40 ${fadeSidesStyle}`}>
                <span className='px-2 py-1 border-[0.5px] rounded-[6px]'>E</span> : OK
            </div>
        </div>
    );
}

export default Reward;