import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {copyTree, nodeMap, persistTree, root, updateTree} from "../utils/tree.js";
import {Checkbox} from "@/components/ui/checkbox";

function Items({ tree, setTree, progress, setProgress, appState, setAppState }) {
    const rootStyle = 'bg-gray-900/75 mx-8 md:mx-12 lg:mx-16 mt-4 md:mt-6 lg:mt-8 mb-8 md:mb-12 lg:mb-16 p-12 rounded-2xl';

    const getCheckedValue = (name) => {
        const node = nodeMap.get(name);
        if(node.status === 'checked') {
            return true;
        } else if(node.status === 'unchecked') {
            return false;
        } else {
            return 'indeterminate';
        }
    }

    const onStatusChange = (name) => {
        const newTree = copyTree(tree); // copyTree function clears nodeMap then fills it with new tree nodes
        const node = nodeMap.get(name); // nodeMap contains most current tree nodes thanks to copyTree function
        const oldStatus = node.status;

        if(oldStatus === 'unchecked') {
            // will be marked checked
            setProgress(progress => progress + node.weight);
            if(appState === 'start' && progress + node.weight === 100) setAppState('video');
        } else if(oldStatus === 'checked') {
            // will be marked unchecked
            setProgress(progress => progress - node.weight);
        }

        const delta = updateTree(node, 0);
        if(oldStatus === 'partial') setProgress(progress => progress + delta);
        setTree(newTree);

        persistTree(newTree);
    }

    const makeAccordion = (items, depth) => {
        if(!items) return null;

        return (
            <Accordion type={depth === 0 ? 'single' : 'multiple'} defaultValue='0-0' className={`${depth === 0 ? rootStyle : ''} p-[1em] md:p-[2.5em] text-gray-400`}>
                {
                    items.map((item, itemIdx) => {
                        const key = `${depth}-${itemIdx}`;

                        if(!item.childs) {
                            return <div key={key} className='text-[0.75rem] md:text-lg lg:text-xl mb-[1em] pl-[1em] flex justify-between'>
                                <div>{item.name}</div>
                                <Checkbox checked={getCheckedValue(item.name)} onCheckedChange={() => onStatusChange(item.name)} />
                            </div>;
                        }

                        return (
                            <AccordionItem key={key} value={key} className='border-b-0'>
                                <AccordionTrigger className='text-[0.75rem] md:text-lg lg:text-xl px-[1em] rounded-sm hover:no-underline hover:bg-gray-800 data-[state=open]:bg-gray-800 data-[state=open]:text-gray-100 data-[state=open]:font-semibold flex items-center'>
                                    <div className='mr-auto'>{item.name}</div>
                                    <Checkbox checked={getCheckedValue(item.name)} onCheckedChange={() => onStatusChange(item.name)} onClick={e => e.stopPropagation()} />
                                </AccordionTrigger>
                                <AccordionContent>{makeAccordion(item.childs, depth+1)}</AccordionContent>
                            </AccordionItem>
                        );
                    })
                }
            </Accordion>
        );
    }

    return makeAccordion(root.childs, 0);
}

export default Items;