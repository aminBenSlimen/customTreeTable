import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core/';

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss'],
})
export class TreeTableComponent implements OnInit {
  @Input('configs') configs = {
    allowMultipleExpands: false,
    tableClass: 'min-w-max w-full table-auto',
    headerClass: 'bg-gray-200 text-gray-600 uppercase text-sm leading-normal',
    RowClass: 'border-b border-gray-200 hover:bg-gray-100',
    parentHeadersClass:
      'rounded-xl border  px-10 cursor-pointer font-bold py-4 text-lg capitalize',
    parentHeadersClassSelected: 'bg-red-500 text-white',
  };

  @Input('level') level;
  // DATA COMMING FROM THE PARENT COMPONENT
  @Input('level1') level1;
  @Input('level2') level2;
  @Input('level3') level3;
  @Input('level4') level4;
  @Input('dataSource') dataSource;

  // DATA THAT WILL CHANGE BASED ON CONFIG LEVEL
  _level1;
  _level2;
  _level3;

  // EVENTS

  @Output('levelChange') levelChange: EventEmitter<number> = new EventEmitter();
  constructor() {}

  getChildClassStyles(i, childClass, isExpanded) {
    let c = i % 2 ? 'bg-gray-50 ' : 'bg-white';
    c += ' ' + childClass + ' ' + this.configs.RowClass;
    c += ' ' + (isExpanded ? '' : '');
    return c;
  }
  expandCollapse(state) {
    const isCollapsed = state;
    if (!this.configs.allowMultipleExpands)
      this.dataSource.forEach((row) => (row.expanded = false));
    return !isCollapsed;
  }
  selectParentHeader(parentHeader) {
    this._level2.forEach((parentHeader_) => {
      parentHeader_.selected = false;
    });
    parentHeader.selected = true;
  }
  incrementLevel(champ) {
    if (this.level == 4) return;
    this.level++;
    this.setupLevel();
    this.level2.forEach((element) => {
      element.selected = false;
      if (element.title == champ) element.selected = true;
    });
  }
  decrementLevel(champ) {
    console.log(champ);

    if (this.level == 0) return;
    this.level--;
    this.setupLevel();
  }
  getSelected(level) {
    return level.find((e) => e.selected) || { title: '' };
  }
  ngOnInit(): void {
    this.setupLevel();
  }
  setupLevel() {
    switch (this.level) {
      case 0:
        this._level1 = [];
        this._level2 = [];
        this._level3 = this.level1;
        break;
      case 1:
        this._level1 = [];
        this._level2 = this.level1;
        this._level3 = this.level2;
        break;
      case 2:
        this._level1 = this.level1;
        this._level2 = this.level2;
        this._level3 = this.level3;
        break;
      case 3:
        this._level1 = this.level2;
        this._level2 = this.level3;
        this._level3 = this.level4;
        break;

      default:
        break;
    }
    this.levelChange.emit(this.level);
  }
}
