import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Header } from "../../components";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        name: 'Uang Masuk',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 119]
      }, {
        name: 'Uang Keluar',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 150]
      }, {
        name: 'Total Kas',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 20]
      }],
      options: {
        chart: {
          type: 'bar',
          height: "350px",
          toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
              customIcons: []
            },
            export: {
              csv: {
                filename: undefined,
                columnDelimiter: ',',
                headerCategory: 'category',
                headerValue: 'value',
                dateFormatter(timestamp) {
                  return new Date(timestamp).toDateString()
                }
              },
              svg: {
                filename: undefined,
              },
              png: {
                filename: undefined,
              }
            },
            autoSelected: 'zoom' 
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
        },
        title: {
          text: 'Grafik',
          style: {
            fontSize:  '20px',
            fontWeight:  'bold',
          },
        },
        fill: {
          opacity: 1
        },
        y: {
          formatter: function (val) {
            return "Rp " + val + " K"
          }
        },
        // tooltip: {
          
        // }
      },
    };

    this.state2 = {
          
      series: [25, 15, 44, 55, 41, 17],
      options: {
        chart: {
          width: '100%',
          type: 'pie',
        },
        labels: ["Pendaftaran", "Sarana prasarana", "Kegiatan 1 tahun", "Seragam", "Buku", "Infak bulanan"],
        theme: {
          monochrome: {
            enabled: true
          }
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -5
            }
          }
        },
        title: {
          text: ""
        },
        dataLabels: {
          formatter(val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex]
            return [name, val.toFixed(1) + '%']
          }
        },
        legend: {
          show: false
        }
      },
    };
  }

  render() {
    return (
    <>
      <Header category="Dashboard" title="Keuangan" />

      <div style={{display : "flex", marginTop : "250px", marginLeft : "33px" }}>

          <div style={{alignContent : "center", padding : "20px", width : "705px", border : "3px solid grey", borderRadius : "25px"}}>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
            />
          </div>

          <div style={{alignContent : "center", width : "290px", border : "3px solid grey", marginBottom : "auto", marginLeft : "30px", borderRadius : "25px"}}>
            <Chart
              options={this.state2.options}
              series={this.state2.series}
              type="pie"
            />
          </div>
      </div>
    </>
    );
  }
}

export default Dashboard;
