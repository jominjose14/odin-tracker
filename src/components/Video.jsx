

function Video({ setAppState }) {
    const closeVideo = () => {
        setAppState('start');
        setTimeout(() => setAppState('reward'), 2000);
    };

    return (
        <>
            <button
                id='messmer-iframe-close-btn'
                className='fixed z-3 inset-0 m-auto grid place-items-center size-12 rounded-full font-mono pl-0.5 text-2xl text-white bg-white/10 hover:bg-white/20 cursor-pointer'
                onClick={closeVideo}
            >
                x
            </button>
            <iframe
                id='messmer-iframe'
                className='fixed inset-0 m-auto size-full z-2'
                width="560" height="315"
                src="https://www.youtube.com/embed/M2cbBRxDSwg?si=Wtp64GP0nYmYEhIq?rel=0&autoplay=1"
                title="Messmer" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            >
            </iframe>
        </>
    );
}

export default Video;