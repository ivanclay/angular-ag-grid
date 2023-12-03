import { Component, AfterContentChecked } from '@angular/core';
import { IStatusPanelAngularComp } from 'ag-grid-angular';
import { IStatusPanelParams } from 'ag-grid-community';

@Component({
  selector: 'status-component',
  template: `
    <div class="container" *ngIf="visible">
      <div>
        <span class="component"
          >Status Bar Component
          <input type="button" (click)="onClick()" value="Click Me"
        /></span>

        <br>
        <input type="button" (click)="previousPage()" value="<"/>
        <span>{{ currentPage }} de {{ totalPages }}</span>
        <input type="button" (click)="nextPage()" value=">"/>
      </div>
    </div>
  `,
})
export class ClickableStatusBarComponent implements IStatusPanelAngularComp, AfterContentChecked {
  private params!: IStatusPanelParams;
  visible = true;
  currentPage = 0;
  totalPages = 0;

  ngAfterContentChecked(){
    console.log('ngAfterContentChecked');
    this.currentPage = this.params.api.paginationGetCurrentPage() + 1;
    this.totalPages = this.params.api.paginationGetTotalPages();
  }

  agInit(params: IStatusPanelParams): void {
    this.params = params;
  }

  previousPage(): void{
    this.params.api.paginationGoToPreviousPage();
    this.currentPage--;
  }

  nextPage(): void {
    this.params.api.paginationGoToNextPage();
    this.currentPage++;
  }

  onClick(): void {
    alert('Selected Row Count: ' + this.params.api.getSelectedRows().length);
  }

  setVisible(visible: boolean) {
    this.visible = visible;
  }

  isVisible(): boolean {
    return this.visible;
  }

  refreshPaginationPaositionOnLoadNewData(){
    this.params.api.paginationGoToFirstPage();
    //this.params.api.paginationGetCurrentPage();
  }
}
