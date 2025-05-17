export const root = {
    name: 'Root',
    weight: 100,
    childs: [
        {
            name: 'React Course',
            weight: 93,
            childs: [
                {
                    name: 'Introduction',
                    weight: 6,
                    childs: [
                        {
                            name: 'How This Course Will Work',
                            weight: 2,
                        },
                        {
                            name: 'Introduction to React',
                            weight: 2,
                        },
                        {
                            name: 'Setting Up A React Environment',
                            weight: 2,
                        },
                    ],
                },
                {
                    name: 'Getting Started With React',
                    weight: 10,
                    childs: [
                        {
                            name: 'React Components',
                            weight: 2,
                        },
                        {
                            name: 'What is JSX',
                            weight: 2,
                        },
                        {
                            name: 'Rendering Techniques',
                            weight: 2,
                        },
                        {
                            name: 'Keys in React',
                            weight: 2,
                        },
                        {
                            name: 'Passing Data Between Components',
                            weight: 2,
                        },
                    ],
                },
                {
                    name: 'States And Effects',
                    weight: 32,
                    childs: [
                        {
                            name: 'Introduction To State',
                            weight: 2,
                        },
                        {
                            name: 'More On State',
                            weight: 2,
                        },
                        {
                            name: 'Project: CV Application',
                            weight: 15,
                        },
                        {
                            name: 'How To Deal With Side Effects',
                            weight: 3,
                        },
                        {
                            name: 'Project: Memory Card',
                            weight: 10,
                        },
                    ],
                },
                {
                    name: 'Class Components',
                    weight: 4,
                    childs: [
                        {
                            name: 'Class Based Components',
                            weight: 2,
                        },
                        {
                            name: 'Component Lifecycle Methods',
                            weight: 2,
                        },
                    ],
                },
                {
                    name: 'React Testing',
                    weight: 4,
                    childs: [
                        {
                            name: 'Introduction To React Testing',
                            weight: 2,
                        },
                        {
                            name: 'Mocking Callbacks and Components',
                            weight: 2,
                        },
                    ],
                },
                {
                    name: 'The React Ecosystem',
                    weight: 29,
                    childs: [
                        {
                            name: 'Type Checking With PropTypes',
                            weight: 2,
                        },
                        {
                            name: 'React Router',
                            weight: 3,
                        },
                        {
                            name: 'Fetching Data In React',
                            weight: 2,
                        },
                        {
                            name: 'Styling React Applications',
                            weight: 2,
                        },
                        {
                            name: 'Project: Shopping Cart',
                            weight: 20,
                        },
                    ],
                },
                {
                    name: 'More React Concepts',
                    weight: 7,
                    childs: [
                        {
                            name: 'Managing State With Context API',
                            weight: 3,
                        },
                        {
                            name: 'Reducing State',
                            weight: 2,
                        },
                        {
                            name: 'Refs and Memoization',
                            weight: 2,
                        },
                    ],
                },
                {
                    name: 'Conclusion',
                    weight: 1,
                    childs: [
                        {
                            name: 'Conclusion Lesson',
                            weight: 1,
                        },
                    ],
                },
            ],
        },
        {
            name: 'Elden Ring',
            weight: 7,
            childs: [
                {
                    name: 'Revise Interview Prep',
                    weight: 4,
                },
                {
                    name: 'Research Companies',
                    weight: 1,
                },
                {
                    name: 'Shortlist And Apply',
                    weight: 0.5,
                },
                {
                    name: 'Attend Interviews',
                    weight: 0.5,
                },
                {
                    name: 'Join A Company',
                    weight: 0.25,
                },
                {
                    name: 'First Salary',
                    weight: 0.25,
                },
                {
                    name: 'Buy a Gaming Laptop',
                    weight: 0.25,
                },
                {
                    name: 'Play Elden Ring DLC',
                    weight: 0.25,
                },
            ],
        },
    ]
};

export const nodeMap = new Map();

// adds each tree node to map, adds parent and status keys to each tree node
const processTree = (root) => {
    nodeMap.set(root.name, root);
    if(!root.childs) return;

    for(const child of root.childs) {
        child.parent = root;
        child.status = 'unchecked'; // status can be: checked, partial, unchecked
        processTree(child);
    }
}

processTree(root);

// update status of a tree node and all its parents
export const updateTree = (identifier, depth) => {
    let delta = 0; // weight sum that must be added to overall progress due to checking of nodes at depths 0<=depth (clicked node and its direct/indirect children who were converted to checked status as a result of the click)
    let name;
    let node;
    if(typeof(identifier) === 'string') {
        name = identifier;
    } else {
        node = identifier;
    }

    if(!node) node = nodeMap.get(name);
    if(node.name === 'Root') return delta;

    if(depth === 0) {
        // user clicked on this node's checkbox
        if(!node.childs) {
            // leaf node
            if(node.status === 'unchecked') delta += node.weight;
            node.status = node.status === 'checked' ? 'unchecked' : 'checked';
        } else {
            // mid or root node
            switch(node.status) {
                case 'unchecked':
                case 'partial': {
                    node.status = 'checked';
                    break;
                }
                case 'checked': node.status = 'unchecked';
            }
        }
    } else if(depth < 0) {
        // this node is being updated due to a change in its direct/indirect child
        let allChecked = true;
        let allUnchecked = true;
        for(const child of node.childs) {
            allChecked &&= child.status === 'checked';
            allUnchecked &&= child.status === 'unchecked';
        }

        if(allChecked) {
            node.status = 'checked';
        } else if(allUnchecked) {
            node.status = 'unchecked';
        } else {
            node.status = 'partial';
        }
    } else if(0 < depth) {
        // this node is being updated due to a change in its ancestor
        if(!node.childs && node.status === 'unchecked' && node.parent.status === 'checked') delta += node.weight;
        node.status = node.parent.status;
    }

    // upward journey
    if(depth <= 0) updateTree(node.parent, depth-1);

    // downward journey
    if(0 <= depth) {
        if(!node.childs) return delta;
        for(const child of node.childs) {
            delta += updateTree(child, depth+1);
        }
    }

    return delta;
}

const copyTreeRec = (root, parent) => {
    const rootCopy = {};

    rootCopy.name = root.name;
    rootCopy.weight = root.weight;
    rootCopy.parent = parent;
    rootCopy.status = root.status;
    nodeMap.set(rootCopy.name, rootCopy);

    if(!root.childs) return rootCopy;

    rootCopy.childs = [];
    for(const child of root.childs) {
        rootCopy.childs.push(copyTreeRec(child, rootCopy));
    }

    return rootCopy;
}

export const copyTree = (root) => {
    nodeMap.clear();
    return copyTreeRec(root, null);
}