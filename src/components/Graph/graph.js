import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Graph = ({inUse, available, onAlert, underMaintenance}) => {

    console.log(inUse);
    
    const options = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
        text: 'Ativos'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
            enabled: false
            },
            showInLegend: true
          }
        },
        series: [{
          name: 'Quantidade',
          colorByPoint: true,
          data: [{
              name: 'Em uso',
              y: inUse,
          },{
              name: 'Em manutenção',
              y: underMaintenance,
          },{
             name: 'Disponíveis',
             y: available,
          },{
              name: 'Em alerta',
              y: onAlert,
          }
        ],
        }]
      };
    
    return(
        <p>
            <HighchartsReact options={options} Highcharts={Highcharts}/>
        </p>
    )
}

export default Graph;