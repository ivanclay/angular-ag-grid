import { Component } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  StatusPanelDef,
} from 'ag-grid-community';
// import 'ag-grid-community/styles/ag-grid.min.css';
// import 'ag-grid-community/styles/agGridClassicFont.css';
import 'ag-grid-enterprise';
import '../styles.css';
import { ClickableStatusBarComponent } from './clickable-status-bar-component';

export interface IClickableStatusBar {
  setVisible(visible: boolean): void;
  isVisible(): boolean;
  refreshPaginationPaositionOnLoadNewData(): void;

}

@Component({
  selector: 'my-app',
  template: `<button
      (click)="toggleStatusBarComp()"
      style="margin-bottom: 10px"
    >
      Toggle Status Bar Component
    </button>
    <ag-grid-angular
      style="width: 100%; height: 90%;"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      [pagination]="true"
      [paginationPageSize]="5"
      [enableRangeSelection]="true"
      [rowSelection]="rowSelection"
      [suppressNoRowsOverlay]="true"
      [statusBar]="statusBar"
      [class]="themeClass"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular> `,
})

export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    {
      field: 'row',
    },
    {
      field: 'name',
    },
  ];
  public defaultColDef: ColDef = {
    editable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
  };
  public rowData: any[] | null = [];

  public rowsGridOne: any[] | null = [
    { row: 'Row 1', name: 'Michael Phelps' },
    { row: 'Row 2', name: 'Natalie Coughlin' },
    { row: 'Row 3', name: 'Aleksey Nemov' },
    { row: 'Row 4', name: 'Alicia Coutts' },
    { row: 'Row 5', name: 'Missy Franklin' },
    { row: 'Row 6', name: 'Ryan Lochte' },
    { row: 'Row 7', name: 'Allison Schmitt' },
    { row: 'Row 8', name: 'Natalie Coughlin' },
    { row: 'Row 9', name: 'Ian Thorpe' },
    { row: 'Row 10', name: 'Bob Mill' },
    { row: 'Row 11', name: 'Willy Walsh' },
    { row: 'Row 12', name: 'Sarah McCoy' },
    { row: 'Row 13', name: 'Jane Jack' },
    { row: 'Row 14', name: 'Tina Wills' },
  ];

  public rowsGridTwo: any[] | null = [
    { row: 'Row 1', name: 'Mitinick' },
    { row: 'Row 2', name: 'Yuval' },
    { row: 'Row 3', name: 'Montesquieu' },
    { row: 'Row 4', name: 'Ziblatt' },
    { row: 'Row 5', name: 'Santa A' },
    { row: 'Row 6', name: 'Santa B' },
    { row: 'Row 7', name: 'Santa C' },
    { row: 'Row 8', name: 'Natalie C' },
    { row: 'Row 9', name: 'Ian T' },
    { row: 'Row 10', name: 'Bob M' },
    { row: 'Row 11', name: 'Will W' },
    { row: 'Row 12', name: 'Sarah M' },
    { row: 'Row 13', name: 'Jane J' },
    { row: 'Row 14', name: 'Tina W' },
    { row: 'Row 15', name: 'Michael Phelps' },
    { row: 'Row 16', name: 'Natalie Coughlin' },
    { row: 'Row 17', name: 'Aleksey Nemov' },
    { row: 'Row 18', name: 'Alicia Coutts' },
    { row: 'Row 19', name: 'Missy Franklin' },
    { row: 'Row 20', name: 'Ryan Lochte' },
    { row: 'Row 21', name: 'Allison Schmitt' },
    { row: 'Row 22', name: 'Natalie 2' },
    { row: 'Row 23', name: 'Ian Tr' },
    { row: 'Row 24', name: 'Bob MM' },
    { row: 'Row 25', name: 'Willy WW' },
    { row: 'Row 26', name: 'Sarah MY' },
    { row: 'Row 27', name: 'Jane JJ' },
    { row: 'Row 28', name: 'Tina WW' },
  ];

  public rowSelection: 'single' | 'multiple' = 'multiple';

  public statusBar: {
    statusPanels: StatusPanelDef[];
  } = {
    statusPanels: [
      {
        statusPanel: ClickableStatusBarComponent,
        key: 'statusBarCompKey',
      },
      {
        statusPanel: 'agAggregationComponent',
        statusPanelParams: {
          aggFuncs: ['count', 'sum'],
        },
      },
    ],
  };

  public themeClass: string = "ag-theme-quartz";

  toggleStatusBarComp() {
    if(this.rowData?.length === this.rowsGridOne?.length){
      this.rowData = this.rowsGridTwo;
    }else{
      this.rowData = this.rowsGridOne;
    }

    const statusBarComponent = this.gridApi.getStatusPanel<IClickableStatusBar>(
      'statusBarCompKey'
    )!;
    // statusBarComponent.setVisible(!statusBarComponent.isVisible());
    statusBarComponent.refreshPaginationPaositionOnLoadNewData();

  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowData = this.rowsGridOne;
  }
}
