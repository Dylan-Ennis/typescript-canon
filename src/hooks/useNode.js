const useNode = () => {
    const insertNode = function (tree, commentID, item) {
        if (tree.id === commentID) {
            tree.items.push({
            id: new Date().getTime(),
            name: item,
            items: [],
            });

            return tree;
        }

        let latestNode = [];
        latestNode = tree.items.map((ob) => {
            return insertNode(ob, commentID, item);
        });

        return { ...tree, items: latestNode };
    };

    const editNode = (tree, commentID, value) => {
        if (tree.id === commentID){
            tree.name = value;
            return tree;
        }

        tree.items.map((ob) => {
            return editNode(ob, commentID, value);
        });

        return { ...tree };
    };

    const deleteNode = (tree, id) => {
        for (let i = 0; i < tree.items.length; i++) {
            const currentItem = tree.items[i];
            if (currentItem.id === id) {
                tree.items.splice(i, 1);
                return tree;
            } else{
              deleteNode(currentItem, id);  
            }
        }
        return tree;
    };

    return { insertNode, editNode, deleteNode };
};

export default useNode;