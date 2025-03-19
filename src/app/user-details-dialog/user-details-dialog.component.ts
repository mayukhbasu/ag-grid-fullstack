import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-details-dialog',
  templateUrl: './user-details-dialog.component.html',
  styleUrls: ['./user-details-dialog.component.css']
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
      printWindow?.document.write(`
        <html>
          <head>
            <title>Print User Details</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .print-header { text-align: center; font-size: 22px; margin-bottom: 20px; font-weight: bold; }
              .detail-item { font-size: 16px; padding: 8px 0; border-bottom: 1px solid #eee; }
              .detail-item strong { color: #00A878; }
            </style>
          </head>
          <body>
            <div class="print-header">User Details</div>
            ${printContent}
          </body>
        </html>
      `);
      printWindow?.document.close();
      printWindow?.print();
    }
  }
}
