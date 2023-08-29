import balancedBST from "./balanced-bst.mjs";

const array = (() => {
    const result = [];
    for (let i = 0; i < 10; i++) {
        result.push(Math.round(Math.random()*100));
    }
    return result;
})()

const tree = new balancedBST(array);
console.log(tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.preorder());
console.log(tree.inorder());
console.log(tree.postorder());
tree.insert(101);
tree.insert(102);
tree.insert(103);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.preorder());
console.log(tree.inorder());
console.log(tree.postorder());
