import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

@Component({
    selector    : 'app-tree',
    templateUrl : './tree.component.html',
    styleUrls   : ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {

    public treeControl? : FlatTreeControl<any>;
    public dataSource?  : MatTreeFlatDataSource<any, any>;
    
    @Input()
    public data: any[] = [];
    
    @Input()
    public itemLabelField: string = 'name';
    
    @Input()
    public itemChildrenField: string = 'children';

    @Output()
    public nodeClick: EventEmitter<any> = new EventEmitter<any>();

    public ngOnInit(): void {
        console.log('ngOnInit data', this.data);
        this.treeControl = new FlatTreeControl<any>(node => node.level, node => node.expandable);
        let treeFlattener = new MatTreeFlattener((node: any, level: number) => {
            return {
                expandable : !!node[this.itemChildrenField] && node[this.itemChildrenField].length > 0,
                name       : node[this.itemLabelField],
                level      : level,
                data       : node,
            }}, 
            node => node.level, 
            node => node.expandable, 
            node => node[this.itemChildrenField]
        );

        this.dataSource = new MatTreeFlatDataSource(this.treeControl, treeFlattener);
        this.dataSource.data = this.data;
    }

    public hasChild(_: number, node: any) {
        return node.expandable;
    }

    public onNodeClick(node: any) {
        this.nodeClick.emit(node);
        setTimeout(() => {
            this.treeControl?.collapseAll();
        }, 800);
        
    }
}
