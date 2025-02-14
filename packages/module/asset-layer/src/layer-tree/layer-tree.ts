import type { TreeDataProps } from 'cosmic-vue';
import { DocumentNode, ChildrenMixin, hasMixin } from '@cosmic/core/parts';
import type { PageNode, SceneNode } from '@cosmic/core/parts';
type Node = DocumentNode | SceneNode | PageNode;

export interface LayerTreeData extends TreeDataProps {
    children?: LayerTreeData[];
    type: Node['type'];
}

export function nodeToTree(node: Node) {
    const tree: LayerTreeData[] = [];
    if (hasMixin(node, ChildrenMixin) || node instanceof DocumentNode) {
        node.children.forEach(n => {
            tree.push({
                id: n.id,
                label: n.name,
                children: nodeToTree(n),
                type: n.type,
            });
        });
        return tree as LayerTreeData[];
    }
    return [];
}

export function updateSelection(data: LayerTreeData[], selection: Node[]) {
    changeData(data, '', 'selected', '');
    selection.forEach(node => {
        changeData(data, node.id, 'selected', '1');
    });
    return data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function changeData(arr: LayerTreeData[], id: string, key: any, value: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    arr.forEach((obj: any) => {
        if(obj.id === id || id == '') {
            obj[key] = value;
        }
        if(obj.children && obj.children.length) {
            obj.children = changeData(obj.children, id, key, value);
        }
    });
    return arr;
}