var gtcdata=[4.14, 4.68, 5.59,5.86 , 6.53, 6.68, 7.34, 7.79, 7.79, 8.93,9.84,10.34];
var ppmdata=[316.91, 320.04,325.68,331.08,338.68,346.04,354.35,360.80,369.52,379.80,389.85,399.40]
var cdata=[13.98,13.89,13.92,13.92,14.05,14.08,14.19,14.24,14.40,14.47,14.45,14.65]
var yearlist=[1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995,2000,2005,2010,2015]

var options = {
  chart: {
    height: 650,
    width: 1700,
    type: "line",
    stacked: false,
    toolbar:{
      show: false
    },
    margin: 20,
    tooltip: {
      enabled: true,
      shared: false,
      intersect: true,
      x: {
        show: false
      }
    },
    dropShadow: {
      enabled: true,
      color: '#000',
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2
    },
  },
  annotations: {
  yaxis: [
    {
      y: 15.8,
      borderColor: '#00E396',
      label: {
        position: 'left',
        offsetX: 230,
        borderColor: '#00E396',
        style: {
          color: '#fff',
          background: '#00E396'
        },
        text: 'Recommended Temperature Limit'
      }
    }
  ]
  },
  title: {
    text: 'Mouse over labels to highlight, click to hide',
    align: 'left'
    },
  dataLabels: {
    enabled: true,
  },
  markers: {
    size: 6,
  },
  legend: {
    position: "top",
    horizontalAlign: "center",
    verticalAlign: "top",
    fontSize: '24px',
    fontWeight: 400,
    containerMargin: {
      left: 35,
      right: 60,
      top: 20,
    },
    offsetX: 0
  },
  dataLabels: {
    enabled: false
  },
  colors: ["#FF0000","#dfa90f", "#247BA0"],
  series: [
    {
      name: "Temperature",
      data: cdata,
    },
    {
      name: "Emission Rate",
      data: gtcdata
    },
    {
      name: "CO2 Concentration",
      data: ppmdata
    },
    
  ],
  stroke: {
    width: [4, 4,4]
  },
  plotOptions: {
    bar: {
      columnWidth: "20%"
    }
  },
  xaxis: {
    categories: yearlist
  },
  yaxis: [
    {
      max: 25,
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
        color: "#FF0000"
      },
      labels: {
        style: {
          colors: "#FF0000"
        }
      },
      title: {
        text: "C",
        style: {
          color: "#FF0000"
        }
      }
    },
    {
      max: 32,
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
        color: "#dfa90f"
      },
      labels: {
        style: {
          colors: "#dfa90f"
        }
      },
      title: {
        text: "GtC",
        style: {
          color: "#dfa90f"
        }
      }
    },
    {
      max: 1000,
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
        color: "#247BA0"
      },
      labels: {
        style: {
          colors: "#247BA0"
        }
      },
      title: {
        text: "ppm",
        style: {
          color: "#247BA0"
        }
      }
    },
    
  ],


  
};

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();


function runsim(){
function appendToGraph(){
    curryear=yearlist[yearlist.length-1];
    if(curryear<2100)
    {
      yearlist.push(curryear+5);
      s=parseFloat(document.getElementById('sensi').value);
      newgtc=parseFloat(document.getElementById('gcrange').value);
      newtemp=(cdata[cdata.length-1]+s*Math.log2((ppmdata[ppmdata.length-1]+newgtc)/ppmdata[ppmdata.length-1])).toFixed(2);
      cdata.push(parseFloat(newtemp));
      gtcdata.push(parseFloat(document.getElementById('gcrange').value));
      var last = ppmdata[ppmdata.length - 1];
      newppm=last+parseFloat(document.getElementById('gcrange').value);
      ppmdata.push(newppm);
      console.log(cdata);
      console.log(ppmdata);
      console.log(gtcdata);
    
      chart.appendData([
      {
          data: 0,
      }
    ])
    }
    else{
       clearInterval(timerId);
    }
  }
      let timerId=setInterval(appendToGraph,2000); 

}

function advancefive(){
  curryear=yearlist[yearlist.length-1];
    if(curryear<2100)
    {
      yearlist.push(curryear+5);
      s=parseFloat(document.getElementById('sensi').value);
      newgtc=parseFloat(document.getElementById('gcrange').value);
      newtemp=(cdata[cdata.length-1]+s*Math.log2((ppmdata[ppmdata.length-1]+newgtc)/ppmdata[ppmdata.length-1])).toFixed(2);
      cdata.push(parseFloat(newtemp));
      gtcdata.push(parseFloat(document.getElementById('gcrange').value));
      var last = ppmdata[ppmdata.length - 1];
      newppm=last+parseFloat(document.getElementById('gcrange').value);
      ppmdata.push(newppm);
      console.log(cdata);
      console.log(ppmdata);
      console.log(gtcdata);
    
      chart.appendData([
      {
          data: 0,
      }
    ])
    }
    else{
       console.log("year reached");
    }
}

