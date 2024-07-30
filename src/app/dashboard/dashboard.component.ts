import { Component } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  activeChart: string | null = null; // Variable para controlar qué gráfico mostrar

  pieChartOption: echarts.EChartsOption = {
    title: {
      text: 'Distribución de Tipos de Activos',
      left: 'center',
      top: '10px'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Tipo de Activo',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 335, name: 'Edificios' },
          { value: 310, name: 'Parques' },
          { value: 234, name: 'Vehículos' },
          { value: 135, name: 'Maquinaria' },
          { value: 1548, name: 'Otros' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  barChartOption: echarts.EChartsOption = {
    title: {
      text: 'Activos Registrados por Año',
      left: 'center',
      top: '10px'
    },
    tooltip: {},
    legend: {
      data: ['Activos']
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['2018', '2019', '2020', '2021', '2022'],
      name: 'Año'
    },
    yAxis: {
      type: 'value',
      name: 'Cantidad'
    },
    series: [
      {
        name: 'Activos',
        type: 'bar',
        data: [120, 200, 150, 80, 70]
      }
    ]
  };

  lineChartOption: echarts.EChartsOption = {
    title: {
      text: 'Tendencia de Activos a lo Largo del Tiempo',
      left: 'center',
      top: '10px'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Activos Totales']
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      name: 'Mes'
    },
    yAxis: {
      type: 'value',
      name: 'Cantidad'
    },
    series: [
      {
        name: 'Activos Totales',
        type: 'line',
        data: [10, 22, 28, 43, 49, 62],
        areaStyle: {}
      }
    ]
  };

  toggleChart(chart: string) {
    this.activeChart = this.activeChart === chart ? null : chart;
  }
}
