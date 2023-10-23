import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
let TreeComponent = class TreeComponent {
    constructor() {
        this.data = [];
        this.itemLabelField = 'name';
        this.itemChildrenField = 'children';
        this.nodeClick = new EventEmitter();
    }
    ngOnInit() {
        console.log('ngOnInit data', this.data);
        this.treeControl = new FlatTreeControl(node => node.level, node => node.expandable);
        let treeFlattener = new MatTreeFlattener((node, level) => {
            return {
                expandable: !!node[this.itemChildrenField] && node[this.itemChildrenField].length > 0,
                name: node[this.itemLabelField],
                level: level,
                data: node,
            };
        }, node => node.level, node => node.expandable, node => node[this.itemChildrenField]);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, treeFlattener);
        this.dataSource.data = this.data;
    }
    hasChild(_, node) {
        return node.expandable;
    }
    onNodeClick(node) {
        this.nodeClick.emit(node);
        setTimeout(() => {
            this.treeControl.collapseAll();
        }, 800);
    }
};
__decorate([
    Input()
], TreeComponent.prototype, "data", void 0);
__decorate([
    Input()
], TreeComponent.prototype, "itemLabelField", void 0);
__decorate([
    Input()
], TreeComponent.prototype, "itemChildrenField", void 0);
__decorate([
    Output()
], TreeComponent.prototype, "nodeClick", void 0);
TreeComponent = __decorate([
    Component({
        selector: 'app-tree',
        templateUrl: './tree.component.html',
        styleUrls: ['./tree.component.scss'],
    })
], TreeComponent);
export { TreeComponent };
//# sourceMappingURL=tree.component.js.map