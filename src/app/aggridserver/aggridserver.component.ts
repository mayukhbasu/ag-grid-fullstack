import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { GridOptions, IGetRowsParams } from 'ag-grid-community';
import { UserDetailsDialogComponent } from '../user-details-dialog/user-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-aggridserver',
  templateUrl: './aggridserver.component.html',
  styleUrl: './aggridserver.component.css'
})
export class AggridserverComponent {
  columnDefs = [
    { 
      field: 'name', 
      headerName: 'Username', 
      flex: 1, 
      cellClass: 'hover-underline', 
      onCellClicked: (event: any) => this.openUserDetails(event.data) // Open modal on click
    }
  ];

  rowData: any[] = [];
  gridOptions: GridOptions = {
    paginationPageSize: 10,
    enableCellTextSelection: true
  };

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  onGridReady(params: any) {
    params.api.setDatasource({
      getRows: (params: IGetRowsParams) => {
        const page = params.startRow / 10 + 1;
        const pageSize = 10;

        this.http.get(`http://localhost:3000/users?page=${page}&size=${pageSize}`)
          .subscribe((data: any) => {
            params.successCallback(data.records, data.total);
          }, error => {
            params.failCallback();
          });
      }
    });
  }

  openUserDetails(user: any) {
    this.dialog.open(UserDetailsDialogComponent, {
      width: '400px',
      data: user
    });
  }
}
