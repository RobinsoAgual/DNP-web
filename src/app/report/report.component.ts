import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Asegúrate de importar el módulo

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  data: any[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.reportService.getData().subscribe((data: any[]) => {
      this.data = data;
    });
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, 'Report.xlsx');
  }

  exportToPDF(): void {
    const doc = new jsPDF();

    // Configuración para autoTable
    (doc as any).autoTable({
      head: [Object.keys(this.data[0])], // Encabezado de la tabla
      body: this.data.map(item => Object.values(item)), // Cuerpo de la tabla
      startY: 20, // Iniciar la tabla a 20mm del borde superior
      margin: { horizontal: 10 }, // Márgenes horizontales de 10mm
      theme: 'striped', // Añadir estilo de rayas
      headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontSize: 12 },
      bodyStyles: { fontSize: 10 },
      columnStyles: { text: { fontSize: 10 }, number: { halign: 'right' } }
    });

    doc.save('Report.pdf');
  }
}
