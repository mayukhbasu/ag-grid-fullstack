import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-user-details-dialog',
  templateUrl: './user-details-dialog.component.html',
  styleUrl: './user-details-dialog.component.css'
})
export class UserDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UserDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: any
  ) {}

  printUserDetails() {
    const printContent = document.getElementById('print-area')?.innerHTML;
    if (printContent) {
      const printWindow = window.open('', '', 'width=800,height=600');
      printWindow?.document.write('<html><head><title>Print User Details</title></head><body>');
      printWindow?.document.write(printContent);
      printWindow?.document.write('</body></html>');
      printWindow?.document.close();
      printWindow?.print();
    }
  }
}
