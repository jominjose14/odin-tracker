import {useEffect, useState} from "react";
import './App.css';
import Header from "./components/Header.jsx";
import ProgressBar from './components/ProgressBar';
import Items from "./components/Items";
import {calcProgress, fetchTree, root} from './utils/tree.js';
import Video from './components/Video';
import Reward from "./components/Reward";

function App() {
    const [progress, setProgress] = useState(0);
    const [tree, setTree] = useState(root);
    const [appState, setAppState] = useState('start'); // start, video, reward, end

    useEffect(() => {
        fetchTree().then((fetchedTree) => {
            if(fetchedTree === null) {
                console.error("Fetched tree was null, falling back to default tree");
                return;
            }

            setProgress(calcProgress(fetchedTree));
            setTree(fetchedTree);
        });
    }, []);

    return (
        <>
            <Header progress={progress} />
            <ProgressBar progress={progress} />
            <Items tree={tree} setTree={setTree} progress={progress} setProgress={setProgress} appState={appState} setAppState={setAppState} />
            {appState === 'video' && <Video setAppState={setAppState} />}
            {appState === 'reward' && <Reward setAppState={setAppState} />}
        </>
    );
}

export default App;
