class Node {
    constructor () {
        this.value = null,
        this.leftNode = null,
        this.rightNode = null
    }
}

function arrayFixer (array) {
    const dupe = [...array];
    dupe.sort((a,b) => {
        if (a-b > 0) {
            return 1;
        } else {
            return -1;
        }
    });
    let i = 0;
    while (i < dupe.length) {
        if (dupe[i] === dupe[i+1]) {
            dupe.splice(i+1,1);
        } else {
            i += 1;
        }
    }
    return dupe;
}

function buildTree (array,sorted) {
    if (array.length === 0) {
        return null;
    }

    let dupe = [...array];
    if (sorted === false) {
        dupe = arrayFixer(dupe);
    }
    
    const mid = Math.floor(dupe.length/2);
    const root = new Node();

    if (dupe.length === 1) {
        root.value = dupe[mid];
    } else {
        root.value = dupe[mid];
        root.leftNode = buildTree(dupe.slice(0,mid),true);
        root.rightNode = buildTree(dupe.slice(mid+1),true);
    }
    return root;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.rightNode !== null) {
      prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.leftNode !== null) {
      prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

function childrenToArray (root, arr = []) {
    if (root.leftNode !== null) {
        arr.push(root.leftNode.value);
        childrenToArray(root.leftNode,arr);
    }
    if (root.rightNode !== null) {
        arr.push(root.rightNode.value);
        childrenToArray(root.rightNode,arr);
    }
}

class balancedBST {
    constructor (array) {
        this.root = buildTree(array,false);
    }
    insert (value) {
        let temp = this.root;
        let prev = null;
        let dir = null;
        let bool = true;
        while (bool) {
            if (value === temp.value) {
                return;
            } else if (value < temp.value) {
                dir = -1;
                prev = temp;
                temp = temp.leftNode;
            } else if (value > temp.value) {
                dir = 1;
                prev = temp;
                temp = temp.rightNode;
            }
            if (temp === null) {
                bool = false;
            }
        }
        if (dir === -1) {
            prev.leftNode = new Node();
            prev.leftNode.value = value;
        }
        if (dir === 1) {
            prev.rightNode = new Node();
            prev.rightNode.value = value;
        }
    }
    delete (value) {
        let temp = this.root;
        let prev = null;
        let bool = true;
        let moved = null;
        while (bool) {
            if (temp.value === value || temp === null) {
                bool = false;
            } else {
                if (value < temp.value) {
                    prev = temp;
                    temp = temp.leftNode;
                    moved = "leftNode";
                } else if (value > temp.value) {
                    prev = temp;
                    temp = temp.rightNode;
                    moved = "rightNode";
                }
            }
        }
        if (temp === null) {
            console.log("node not in tree");
            return;
        } else {
            const arr = [];
            childrenToArray(temp,arr);
            const newRoot = buildTree(arr,false);
            temp.leftNode = null;
            temp.rightNode = null;
            if (moved !== null) {
                prev[moved] = newRoot;
            } else {
                this.root = newRoot;
            }
        }
    }
    find (value) {
        let temp = this.root;
        while (temp !== null) {
            if (temp.value === value) {
                return temp;
            } else if (temp.value > value) {
                temp = temp.leftNode;
            } else if (temp.value < value) {
                temp = temp.rightNode;
            }
        }
    }
    levelOrder (func = (value,arr) => {
        arr.push(value);
    }) {
        const arr = [];
        const queue = [this.root];
        while (queue.length !== 0) {
            const node = queue.shift();
            if (node !== null) {
                func(node.value,arr);
                queue.push(node.leftNode);
                queue.push(node.rightNode);
            }
        }
        if (arr.length > 0) {
            return arr;
        }
    }
    inorder (func = (value,array) => {
        array.push(value);
    },root = this.root,arr = []) {
        if (root.leftNode !== null) {
            this.inorder(func,root.leftNode,arr);
        }
        func(root.value,arr);
        if (root.rightNode !== null) {
            this.inorder(func,root.rightNode,arr);
        }
        if (arr.length > 0) {
            return arr;
        }
    }
    preorder (func = (value,array) => {
        array.push(value);
    },root = this.root,arr = []) {
        func(root.value,arr);
        if (root.leftNode !== null) {
            this.preorder(func,root.leftNode,arr);
        }
        if (root.rightNode !== null) {
            this.preorder(func,root.rightNode,arr);
        }
        if (arr.length > 0) {
            return arr;
        }
    }
    postorder (func = (value,array) => {
        array.push(value);
    },root = this.root,arr = []) {
        if (root.leftNode !== null) {
            this.postorder(func,root.leftNode,arr);
        }
        if (root.rightNode !== null) {
            this.postorder(func,root.rightNode,arr);
        }
        func(root.value,arr);
        if (arr.length > 0) {
            return arr;
        }
    }
    height (node,temp = 0) {
        let a = 0;
        let b = 0;
        if (node.leftNode !== null) {
            a = this.height (node.leftNode,temp);
            a+=1;
        }
        if (node.rightNode !== null) {
            b = this.height (node.rightNode,temp);
            b+=1
        }
        if (a >= b) {
            return a;
        } else {
            return b;
        }
    }
    depth (node,root = this.root) {
        if (node.value < root.value) {
            return 1 + this.depth (node,root.leftNode);
        }
        if (node.value === root.value) {
            return 0;
        }
        if (node.value > root.value) {
            return 1 + this.depth(node,root.rightNode);
        }
    }
    isBalanced (root = this.root) {
        if (root.leftNode !== null && root.rightNode !== null) {
            if (this.isBalanced(root.leftNode) && this.isBalanced(root.rightNode)) {
                const left = this.height(root.leftNode);
                const right = this.height(root.rightNode);
                if (Math.abs(left-right) <= 1) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
    rebalance () {
        const array = this.inorder();
        let newRoot = buildTree(array,true);
        this.root = newRoot;
    }
}

export default balancedBST;