import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { GridApi, GridOptions, IGetRowsParams } from 'ag-grid-community';
import { UserDetailsDialogComponent } from '../user-details-dialog/user-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-aggridserver',
  templateUrl: './aggridserver.component.html',
  styleUrl: './aggridserver.component.css'
})
export class AggridserverComponent {
  columnDefs = [
    { field: 'name', headerName: 'Username', flex: 1, cellClass: 'hover-underline', 
      onCellClicked: (event: any) => this.openUserDetails(event.data) 
    },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'company', headerName: 'Company', flex: 1 },
    { field: 'jobTitle', headerName: 'Job Title', flex: 1 },
    { field: 'salary', headerName: 'Salary (£)', flex: 1 },
    { field: 'createdAt', headerName: 'Created At', flex: 1, valueFormatter: params => new Date(params.value).toLocaleString() },
    { field: 'lastLogin', headerName: 'Last Login', flex: 1, valueFormatter: params => new Date(params.value).toLocaleString() }
  ];
  

  rowData: any[] = [];
  gridOptions: GridOptions = {
    paginationPageSize: 10
  };

  searchQuery: string = '';
  gridApi!: GridApi; // Store Grid API reference

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  // Store Grid API reference when grid is ready
  onGridReady(params: any) {
    this.gridApi = params.api; // ✅ Store Grid API reference
    this.gridApi.setDatasource(this.createDataSource(this.searchQuery)); // ✅ Call with initial search
  }

  // Function to create the datasource
  createDataSource(search: string) {
    return {
      getRows: (params: IGetRowsParams) => {
        const page = params.startRow / 10 + 1;
        const pageSize = 10;

        this.http.get(`http://localhost:3000/users?page=${page}&size=${pageSize}&search=${search}`)
          .subscribe((data: any) => {
            if (params.successCallback) {
              params.successCallback(data.records, data.total);
            }
          }, error => {
            if (params.failCallback) {
              params.failCallback();
            }
          });
      }
    };
  }

  // Search function to update datasource
  onSearchClick() {
    if (!this.gridApi) {
      console.error("Grid API is not ready yet.");
      return;
    }

    // ✅ Set new data source for search query
    this.gridApi.setDatasource(this.createDataSource(this.searchQuery));
  }

  openUserDetails(user: any) {
    this.dialog.open(UserDetailsDialogComponent, {
      width: '400px',
      data: user
    });
  }
}
