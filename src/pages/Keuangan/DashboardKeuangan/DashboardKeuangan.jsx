import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Header } from "../../../components";

class DashboardKeuangan extends Component {

  // handleClick = (e) => {
  //   console.log("element clicked");
  // }

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
          width: '100%',
          toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: '<i class="fa fa-download" aria-hidden="true" width="30"></i>',
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
            columnWidth: '100%',
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
        legend: {
          show: true,
          showForSingleSeries: false,
          showForNullSeries: true,
          showForZeroSeries: true,
          position: 'bottom',
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial',
          fontWeight: 400,
          formatter: undefined,
          inverseOrder: false,
          width: undefined,
          height: undefined,
          tooltipHoverFormatter: undefined,
          customLegendItems: [],
          offsetX: 0,
          offsetY: 45,
          labels: {
              colors: undefined,
              useSeriesColors: false
          },
          markers: {
              width: 12,
              height: 12,
              strokeWidth: 0,
              strokeColor: '#fff',
              fillColors: undefined,
              radius: 12,
              customHTML: undefined,
              onClick: undefined,
              offsetX: 0,
              offsetY: 0
          },
          itemMargin: {
              horizontal: 5,
              vertical: 0
          },
          onItemClick: {
              toggleDataSeries: true
          },
          onItemHover: {
              highlightDataSeries: true
          },
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
      }
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
        <Header category="Admin Keuangan / Dashboard" title="Keuangan" />
    
        <div style={{display : "flex", marginTop : "35px"}}>
          <div style={{textAlign : "center", paddingTop : "7px", paddingBottom : "0px", paddingLeft : "0px", paddingRight : "0px", width : "100%", borderRadius : "10px ", backgroundColor : "#CC3506D9"}}>
            <p style={{ color : "white" }}>800.000</p>
            <p style={{ color : "white" }}>Uang Masuk</p>
            <div style={{textAlign : "center", width : "100%", backgroundColor : "#CC3506D9", borderRadius : "0px 0px 10px 10px", marginTop : "11px"}}>
            <p><button style={{ color : "white", fontSize : "13px" }} onClick={this.handleClick} target="_blank">Lihat Laporan</button></p>
            </div>
          </div>
          <div style={{textAlign : "center", paddingTop : "7px", paddingBottom : "0px", paddingLeft : "0px", paddingRight : "0px", width : "100%", borderRadius : "10px ", backgroundColor : "#E4A11ED9", marginLeft : "15px"}}>
            <p style={{ color : "white" }}>1.000.000</p>
            <p style={{ color : "white" }}>Uang Keluar</p>
            <div style={{textAlign : "center", width : "100%", backgroundColor : "#E4A11ED9", borderRadius : "0px 0px 10px 10px", marginTop : "11px"}}>
            <p><button style={{ color : "white", fontSize : "13px" }} onClick={this.handleClick} target="_blank">Lihat Laporan</button></p>            </div>
          </div>
          <div style={{textAlign : "center", paddingTop : "7px", paddingBottom : "0px", paddingLeft : "0px", paddingRight : "0px", width : "100%", borderRadius : "10px ", backgroundColor : "#1E53B9D9", marginLeft : "15px"}}>
            <p style={{ color : "white" }}>10.000.000</p>
            <p style={{ color : "white" }}>Total Kas</p>
            <div style={{textAlign : "center", width : "100%", backgroundColor : "#1E53B9D9", borderRadius : "0px 0px 10px 10px", marginTop : "11px"}}>
            <p><button style={{ color : "white", fontSize : "13px" }} onClick={this.handleClick} target="_blank">Lihat Laporan</button></p>
            </div>
          </div>
        </div>
    
      <div style={{display : "flex", marginTop : "70px"}}>
          <div style={{alignContent : "center", padding : "20px", width : "100%", border : "3px solid grey", borderRadius : "25px"}}>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
            />
          </div>
  
          <div style={{alignContent : "center", width : "100%", border : "3px solid grey", marginBottom : "auto", marginLeft : "30px", borderRadius : "25px"}}>
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
export default DashboardKeuangan;
