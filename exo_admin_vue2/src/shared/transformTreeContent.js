import pathToId from "@/shared/pathToId";
import Str from "laravel-js-str";

export default function transformTreeContent(inTree, outTree = []) {
    if (inTree.directories) {
        inTree.directories.forEach(d => {
            let children = transformTreeContent(d);
            if (children.length) {
                outTree.push(
                    {
                        id: 'dir:' + pathToId(d.path),
                        name: '📁 ' + d.basename,
                        basename: d.basename,
                        children
                    }
                );
            }

        })
    }

    if (inTree.files) {
        inTree.files.forEach(f => {
            outTree.push({
                id: pathToId(f.path),
                name: Str.of(f.basename).before('.blade.php').toString()
            });
        })
    }
    return outTree
}
