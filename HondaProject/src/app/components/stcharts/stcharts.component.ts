import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {formatDate } from '@angular/common';
import { ConfigService } from '../../services/config.service';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import {Chart,ChartOptions}from 'chart.js'
import { concat } from 'rxjs';
import * as XLSX from 'xlsx';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ExportToCsv } from 'export-to-csv';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-stcharts',
  templateUrl: './stcharts.component.html',
  styleUrls: ['./stcharts.component.scss']
})
export class StchartsComponent {

  public Info:any ;
  public options = {
    scaleShowVerticalLines:false,
    responsive:true,
  };
  public type='line';
  public legend = true;
  
  public datasets = {
    dripfrl:
    [{data:[0.4,0.6,0.7,0.2,0.9,0.8,0.2,0.4,0.2,0.6,0.8,0.2,0.4,0.2,0.6,0.3,0.2,0.8,0.9,0.8], label:'DRIP_FR_L'

    }],
    dripfrr:
    [{data:[0.8,0.2,0.4,0.2,0.6,0.3,0.2,0.8,0.9,0.8,0.9,0.8,0.2,0.4,0.2,0.6,0.8,0.2,0.4,0.2], label:'DRIP_FR_R'

    }],
    driprel:
    [{data:[0.1,0.5,0.3,0.1,0.8,0.8,0.2,0.4,0.2,0.6,0.4,0.2,0.6,0.3,0.2,0.8,0.9,0.8,0.9,0.8], label:'DRIP_RE_L'

    }],
    driprer:
    [{data:[0.3,0.2,0.8,0.9,0.8,0.9,0.9,0.3,0.4,0.2,0.8,0.8,0.2,0.4,0.2,0.6,0.4,0.2,0.6,0.3], label:'DRIP_RE_R'

    }],
    dripsymfr:
    [{data:[-0.1,0.3,0.5,0.1,-0.2,-0.1,0,0.1,0.4,0.3,0.1,0.1,0.3,0.4,0.2,0.1,0.3,0.5,-0.2,0.1], label:'DRIPSYMMETRY_FR'

    }],
    dripsymre:
    [{data:[0.9,0.9,0.3,0.4,0.2,0.1,0.3,0.7,0.6,0.8,-0.2,-0.1,0,0.1,0.4,0.3,0.9,0.9,0.3,0.4], label:'DRIPSYMMETRY_RE'

    }],
    bpfr:
    [{data:[0.5,0.2,0.1,0.4,-0.3,0.5,0.3,0.2,0.2,-0.3,0.3,0.4,-0.2,0.1,0.3,0.7,0.6,0.8,-0.2,-0.1], label:'B-PITCH_FR'

    }],
    bpre:
    [{data:[0.5,0.3,0.7,0.2,0.3,0.5,0.3,0.1,0.3,0.3,0.4,-0.3,0.5,0.3,0.2,0.2,-0.3,0.3,0.4,-0.2], label:'B-PITCH_FR'

    }],
    rplfr:
    [{data:[0.1,0.1,0.1,0.3,0.1,0.5,0.1,0.3,0.4,0.1,0.4,-0.3,0.5,0.3,0.2,0.2,-0.3,0.3,0.4,-0.2], label:'RPL_FR'

    }],
    rplre:
    [{data:[0.5,0.3,0.1,0.3,0.3,0.1,0.1,0.1,0.3,0.1,0.4,-0.3,0.5,0.3,0.2,0.2,-0.3,0.3,0.4,-0.2], label:'RPL_RE'

    }]
    // dripfrl:
    // [0.4,0.6,0.7,0.2,0.9],
    // dripfrr:
    // [0.8,0.2,0.4,0.2,0.6],
    // driprel:
    // [0.1,0.5,0.3,0.1,0.8],
    // driprer:
    // [0.3,0.2,0.8,0.9,0.8],
    // dripsymfr:
    // [0.1,0.3,0.7,0.6,0.8],
    // dripsymre:
    // [0.9,0.9,0.3,0.4,0.2],
    // bpfr:
    // [0.5,0.9,0.1,0.4,0.3],
    // bpre:
    // [0.5,0.3,0.7,0.2,0.3],
    // rplfr:
    // [0.1,0.1,0.1,0.3,0.1],
    // rplre:
    // [0.5,0.3,0.1,0.3,0.3]
  
  };
    

    public chartlabels=[1585251031,1585251331,1585251531,1585252131,1585252331,1585252531,1585252731,1585253034,1585253174,1585253334,1585253534,1585253791,1585254091,1585254291,1585254601,1585254901,1585255201,1585255601,1585257601,1585259701];

    public CL:any[]=[];
    public drip_frl :any=[{data:[], label:'DRIP_FR_L',fill:false,showLine:true,pointBorderWidth:4,borderColor:'black',pointStyle:'crossRot',pointBorderColor:'black',pointRadius:5}];
    public drip_frr :any=[{data:[], label:'DRIP_FR_R',fill:false,showLine:false,pointBorderWidth:4,pointStyle:'crossRot',pointBorderColor:'black',pointRadius:5}];
    public drip_rel :any=[{data:[], label:'DRIP_RE_L',fill:false,showLine:false,pointBorderWidth:4,pointStyle:'crossRot',pointBorderColor:'black',pointRadius:5}];
    public drip_rer :any=[{data:[], label:'DRIP_RE_R',fill:false,showLine:false,pointBorderWidth:4,pointStyle:'crossRot',pointBorderColor:'black',pointRadius:5}];
    public dripsymmetry_fr :any=[{data:[], label:'DRIPSYMMETRY_FR',showLine:true,borderWidth:3,borderColor:'black',pointBorderWidth:4,pointStyle:'crossRot',pointBorderColor:'black',pointRadius:5}];
    public dripsymmetry_re :any=[{data:[], label:'DRIPSYMMETRY_RE',showLine:true,borderWidth:3,borderColor:'black',pointBorderWidth:4,pointStyle:'crossRot',pointBorderColor:'black',pointRadius:5}];
    public bpitch_fr :any=[{data:[], label:'B-PITCH_FR',showLine:true,borderWidth:3,borderColor:'black',pointBorderWidth:4,pointStyle:'crossRot',pointBorderColor:'black',pointRadius:5}];
    public bpitch_re :any=[{data:[], label:'B-PITCH_RE',showLine:true,borderWidth:3,borderColor:'black',pointBorderWidth:4,pointStyle:'crossRot',pointBorderColor:'black',pointRadius:5}];
    public roofpicklocation_fr :any=[{data:[], label:'RPL_FR',showLine:true,borderWidth:3,borderColor:'black',pointBorderWidth:4,pointStyle:'crossRot',pointBorderColor:'black',pointRadius:5}];
    public roofpicklocation_re :any=[{data:[], label:'RPL_RE',showLine:true,borderWidth:3,borderColor:'black',pointBorderWidth:4,pointStyle:'crossRot',pointBorderColor:'black',pointRadius:5}];
    public CL2:any = [{data:[]}]
    public mydata:any
    

    // public ChartDataLabels= {datalabels: {
    //     color: '#36A2EB',
    //     display:true
    //     }}
    public option1:any = {
    //   plugins:{
        
    //     datalabels: {
    //       font:{
    //         size:15,
    //         weight:'bold'
    //       },
    //       borderColor:'black',
    //       borderRadius:2,
    //       borderWidth:2,
    //       anchor:'end',
    //       clamp:true,
    //       align:'end',
    //       display: function(context) {
    //         return context.dataIndex % 2; // display labels with an odd index
    //     }
    //     }
    // },
    plugins:{
      datalabels:{
        display:false
      }
    },
      responsive: false,
      legend:{
        display:false
      },
      scales: {
        yAxes:[{
          ticks: {
            min: 0,
            max: 1
        },
        scaleLabel:{
          display:true,
          labelString:'Distance[mm]'
        }
        }]  ,
        xAxes:[{
          ticks:{
            maxTicksLimit:5,
            callback:function(value,index,values){
              return index+1
            }
          },
          scaleLabel:{
            display:true,
            labelString:'Point Number[#]'
          }
        }] 
      },
      annotation:{
        annotations:[
          {          
            type:'line',
            drawTime:'afterDatasetsDraw',
            id:'a-line-1',
            mode:'horizontal',
            scaleID:'y-axis-0',
            value:0.3,
            borderColor:'black',
            borderWidth:2,
            borderDash:[2,2],
            label:{
              backgroundColor:'rgba(0,0,0,0.8)',
              fontFamily:"sans-serif",
              fontSize:8,
              fontStyle:"bold",
              fontColor:"#fff",
              xPadding:6,
              yPadding:6,
              cornerRadius:6,
              position:"right",
              xAdjust:0,
              yAdjust:0,
              enabled:true,
              content:"Average:"
            },
            
          },
          {          
            type:'line',
            drawTime:'afterDatasetsDraw',
            id:'a-line-2',
            mode:'horizontal',
            scaleID:'y-axis-0',
            value:0.5,
            borderColor:'black',
            borderWidth:2,
            borderDash:[1,1],
            label:{
              backgroundColor:'rgba(0,0,0,0.8)',
              fontFamily:"sans-serif",
              fontSize:8,
              fontStyle:"bold",
              fontColor:"#fff",
              xPadding:6,
              yPadding:6,
              cornerRadius:6,
              position:"right",
              xAdjust:0,
              yAdjust:0,
              enabled:true,
              content:"Nominal"
            }
          },
          {          
            type:'box',
            drawTime:'beforeDatasetsDraw',
            id:'a-box-1',
            xScaleID:'x-axis-0',
            yScaleID:'y-axis-0',
            yMin:0.2,
            yMax:0.8,
  
            borderColor:'green',
            borderWidth:2,
            backgroundColor:'green',
          },
          {          
            type:'box',
            drawTime:'beforeDatasetsDraw',
            id:'a-box-2',
            xScaleID:'x-axis-0',
            yScaleID:'y-axis-0',
            yMin:0.1,
            yMax:0.2,
  
            borderColor:'yellow',
            borderWidth:2,
            backgroundColor:'yellow',
          },
          {          
            type:'box',
            drawTime:'beforeDatasetsDraw',
            id:'a-box-3',
            xScaleID:'x-axis-0',
            yScaleID:'y-axis-0',
            yMin:0.8,
            yMax:0.9,
  
            borderColor:'yellow',
            borderWidth:2,
            backgroundColor:'yellow',
          },
          {          
            type:'box',
            drawTime:'beforeDatasetsDraw',
            id:'a-box-4',
            xScaleID:'x-axis-0',
            yScaleID:'y-axis-0',
            yMin:0.9,
            yMax:1,
  
            borderColor:'red',
            borderWidth:2,
            backgroundColor:'red',
          },
          {          
            type:'box',
            drawTime:'beforeDatasetsDraw',
            id:'a-box-5',
            xScaleID:'x-axis-0',
            yScaleID:'y-axis-0',
            yMin:0,
            yMax:0.1,
  
            borderColor:'red',
            borderWidth:2,
            backgroundColor:'red',
          }
        ]


      }

  }



  public option2:any = {
    
    plugins:{
      datalabels:{
        display:false
      }
    },
    responsive: false,
    legend:{
      display:false
    },
    scales: {
      xAxes:[{
        ticks: {
          min: -0.5,
          max: 0.5
      },
      scaleLabel:{
        display:true,
        labelString:'Distance[mm]'
      }
      }] ,
      yAxes:[{  
          ticks:{
            maxTicksLimit:10,
            callback:function(value,index,values){
              return value
            }
          },
        // type:'time',
        // time:{
        //   unit:"second",
        //   distribution: 'series',
        //   displayFormats:{
        //     second:"MMM D YYYY, h:mm:ss a"
        //   }
        // },
        scaleLabel:{
            display:true,
            labelString:'Point Number[#]'
          }
      }]  
    },
    annotation:{
      annotations:[
        {          
          type:'line',
          drawTime:'afterDatasetsDraw',
          id:'a-line-3',
          mode:'vertical',
          scaleID:'x-axis-1',
          value:0.1,
          borderColor:'black',
          borderWidth:2,
          borderDash:[2,2],
          label:{
            backgroundColor:'rgba(0,0,0,0.8)',
            fontFamily:"sans-serif",
            fontSize:8,
            fontStyle:"bold",
            fontColor:"#fff",
            xPadding:6,
            yPadding:6,
            cornerRadius:6,
            position:"right",
            xAdjust:0,
            yAdjust:50,
            enabled:true,
            content:"Average"
          }
        },
        {          
          type:'line',
          drawTime:'afterDatasetsDraw',
          id:'a-line-4',
          mode:'vertical',
          scaleID:'x-axis-1',
          value:0,
          borderColor:'black',
          borderWidth:2,
          borderDash:[1,1],
          label:{
            backgroundColor:'rgba(0,0,0,0.8)',
            fontFamily:"sans-serif",
            fontSize:8,
            fontStyle:"bold",
            fontColor:"#fff",
            xPadding:6,
            yPadding:6,
            cornerRadius:6,
            position:"right",
            xAdjust:0,
            yAdjust:0,
            enabled:true,
            content:"Norminal"
          }
        },
        {          
          type:'box',
          drawTime:'beforeDatasetsDraw',
          id:'a-box-1-ver',
          xScaleID:'x-axis-1',
          yScaleID:'y-axis-1',
          xMin:-0.3,
          xMax:0.3,

          borderColor:'green',
          borderWidth:2,
          backgroundColor:'green',
        },
        {          
          type:'box',
          drawTime:'beforeDatasetsDraw',
          id:'a-box-2-ver',
          xScaleID:'x-axis-1',
          yScaleID:'y-axis-1',
          xMin:0.3,
          xMax:0.4,

          borderColor:'yellow',
          borderWidth:2,
          backgroundColor:'yellow',
        },
        {          
          type:'box',
          drawTime:'beforeDatasetsDraw',
          id:'a-box-3-ver',
          xScaleID:'x-axis-1',
          yScaleID:'y-axis-1',
          xMin:-0.4,
          xMax:-0.3,

          borderColor:'yellow',
          borderWidth:2,
          backgroundColor:'yellow',
        },
        {          
          type:'box',
          drawTime:'beforeDatasetsDraw',
          id:'a-box-4-ver',
          xScaleID:'x-axis-1',
          yScaleID:'y-axis-1',
          xMin:0.4,
          xMax:0.5,

          borderColor:'red',
          borderWidth:2,
          backgroundColor:'red',
        },
        {          
          type:'box',
          drawTime:'beforeDatasetsDraw',
          id:'a-box-5-ver',
          xScaleID:'x-axis-1',
          yScaleID:'y-axis-1',
          xMin:-0.5,
          xMax:-0.4,

          borderColor:'red',
          borderWidth:2,
          backgroundColor:'red',
        }
      ]


    }

}


public alldata:any=[{}]
public datatext:any
public data_dripfrl:any

  constructor(public router:ActivatedRoute,public config:ConfigService) {
 
    this.config.getConfig().subscribe(data => {
      this.datatext = data
      this.data_dripfrl = this.datatext.split("\r\n")[0].split(" ").map(Number)
      console.log(this.data_dripfrl)
  
    })
  
  }
  public ave1:any
  public ave2:any
  public ave3:any
  public ave4:any
  public ave5:any
  public ave6:any
  public ave7:any
  public ave8:any
  public ave9:any
  public ave0:any
  ngOnInit(): void {
   
   
 this.router.queryParams.subscribe((data)=>{
      this.Info = data
      console.log(this.Info)
    })

    
    

    for(var i=0;i<this.chartlabels.length;i++){
        if(Number(this.Info.startdate)<=this.chartlabels[i] && Number(this.Info.enddate)>this.chartlabels[i]){
          this.CL.push(formatDate(new Date(this.chartlabels[i]*1000),'dd-MM-yyyy hh:mm:ss a','en-US'))
          this.drip_frl[0].data.push(this.datasets.dripfrl[0].data[i])
          this.drip_frr[0].data.push(this.datasets.dripfrr[0].data[i])
          this.drip_rel[0].data.push(this.datasets.driprel[0].data[i])
          this.drip_rer[0].data.push(this.datasets.driprer[0].data[i])
          this.dripsymmetry_fr[0].data.push({x:this.datasets.dripsymfr[0].data[i],y:new Date(this.chartlabels[i]*1000)})
          this.dripsymmetry_re[0].data.push({x:this.datasets.dripsymre[0].data[i],y:new Date(this.chartlabels[i]*1000)})
          this.bpitch_fr[0].data.push({x:this.datasets.bpfr[0].data[i],y:new Date(this.chartlabels[i]*1000)})
          this.bpitch_re[0].data.push({x:this.datasets.bpre[0].data[i],y:new Date(this.chartlabels[i]*1000)})
          this.roofpicklocation_fr[0].data.push({x:this.datasets.rplfr[0].data[i],y:new Date(this.chartlabels[i]*1000)})
          this.roofpicklocation_re[0].data.push({x:this.datasets.rplre[0].data[i],y:new Date(this.chartlabels[i]*1000)})
          // this.alldata[i].datetime.push(this.CL[i])
          // this.alldata[i].drip_frl.push(this.datasets.dripfrl[0].data[i])
          let DD = {datetime:this.CL[i],drip_frl:this.datasets.dripfrl[0].data[i],drip_frr:this.datasets.dripfrr[0].data[i],drip_rel:this.datasets.driprel[0].data[i],drip_rer:this.datasets.driprer[0].data[i],
                    dripsymmetry_fr:this.datasets.dripsymfr[0].data[i],dripsymmetry_re:this.datasets.dripsymre[0].data[i],
                    bpitch_fr:this.datasets.bpfr[0].data[i],bpitch_re:this.datasets.bpre[0].data[i],
                    roofpicklocation_fr:this.datasets.rplfr[0].data[i],roofpicklocation_re:this.datasets.rplre[0].data[i]
                    }
          this.alldata.push(DD)
        }
        }


        this.CL2[0].data = this.CL
        this.alldata.shift()
    console.log(this.dripsymmetry_fr[0].data)
    
   

    
    
  }

  canvas_DFL:any;
  ctx_DFL:any;
  canvas_DFR:any;
  ctx_DFR:any;
  canvas_DRL:any;
  ctx_DRL:any;
  canvas_DRR:any;
  ctx_DRR:any;
  canvas_DSF:any;
  ctx_DSF:any;
  canvas_DSR:any;
  ctx_DSR:any;
  canvas_BPF:any;
  ctx_BPF:any;
  canvas_BPR:any;
  ctx_BPR:any;
  canvas_RPLF:any;
  ctx_RPLF:any;
  canvas_RPLR:any;
  ctx_RPLR:any;
  numid:any=[];

   
 ngAfterViewInit(){

  // var total1 = 0;
  // for(var i = 0; i <= this.drip_frl[0].data.length; i++) {
  //     total1 += this.drip_frl[0].data[i];
  // }
  // var avg1 = total1 / this.drip_frl[0].data.length;
  // this.option1.annotation.annotations[0].value = avg1r
  
  
  let value1 = this.drip_frl[0].data;
  let count = value1.length;
  for(i=0;i<count;i++){
    this.numid.push(i+1)
    this.dripsymmetry_fr[0].data[i].y = i+1
  }
  console.log(this.numid)

  //Drip_fr_l
  if(this.Info.DRIP_FR_L=='true'){ 
  value1 = value1.reduce((previous,current)=>current+=previous);
  value1/=count;
  this.ave1 = value1.toFixed(2)
  this.option1.annotation.annotations[0].value = value1;
  this.option1.annotation.annotations[0].label.content = "Average:"+value1.toFixed(2).toString();
  this.canvas_DFL = document.getElementById('DRIPFRL'); 
  this.ctx_DFL = this.canvas_DFL.getContext('2d');
  let mychart = new Chart(this.ctx_DFL, {
    type: 'line',
    data: {
        labels:this.CL,
        datasets: this.drip_frl,
        
    },
    options: this.option1 as ChartOptions,
    plugins:[ChartAnnotation,ChartDataLabels]
    
  });}
  
// Drip_fr_r
if(this.Info.DRIP_FR_R=='true'){
  let value2 = this.drip_frr[0].data;
  value2 = value2.reduce((previous,current)=>current+=previous);
  value2/=count;
  this.ave2 = value2.toFixed(2)
  this.option1.annotation.annotations[0].value = value2;
  this.option1.annotation.annotations[0].label.content = "Average:"+value2.toFixed(2).toString();

  this.canvas_DFR = document.getElementById('DRIPFRR');
  this.ctx_DFR = this.canvas_DFR.getContext('2d');
  console.log(this.ctx_DFR)
  let mychart2 = new Chart(this.ctx_DFR, {
    type: 'line',

    data: {
        labels:this.CL,
        datasets: this.drip_frr,
        
    },
    options: this.option1 as ChartOptions,
    plugins:[ChartAnnotation]
    
  });}

  //Drip_re_l
  if(this.Info.DRIP_RE_L=='true'){
    let value3 = this.drip_rel[0].data;
    value3 = value3.reduce((previous,current)=>current+=previous);
    value3/=count;
    this.ave3 = value3.toFixed(2)
    this.option1.annotation.annotations[0].value = value3;
    this.option1.annotation.annotations[0].label.content = "Average:"+value3.toFixed(2).toString();
  
    this.canvas_DRL = document.getElementById('DRIPREL');
    this.ctx_DRL = this.canvas_DRL.getContext('2d');
    console.log(this.ctx_DRL)
    let mychart3 = new Chart(this.ctx_DRL, {
      type: 'line',
  
      data: {
          labels:this.CL,
          datasets: this.drip_rel,
          
      },
      options: this.option1 as ChartOptions,
      plugins:[ChartAnnotation]
      
    });}
      //Drip_re_r
  if(this.Info.DRIP_RE_R=='true'){
    let value4 = this.drip_rer[0].data;
    value4 = value4.reduce((previous,current)=>current+=previous);
    value4/=count;
    this.ave4 = value4.toFixed(2)
    this.option1.annotation.annotations[0].value = value4;
    this.option1.annotation.annotations[0].label.content = "Average:"+value4.toFixed(2).toString();
  
    this.canvas_DRR = document.getElementById('DRIPRER');
    this.ctx_DRR= this.canvas_DRR.getContext('2d');
    console.log(this.ctx_DRR)
    let mychart4 = new Chart(this.ctx_DRR, {
      type: 'line',
  
      data: {
          labels:this.CL,
          datasets: this.drip_rer,
          
      },
      options: this.option1 as ChartOptions,
      plugins:[ChartAnnotation]
      
    });}

//Drip_sym_fr
if(this.Info.DRIP_SYMMATRY_FR=='true'){
let value5=0;
for(var i=0;i<count;i++){
  value5=value5+this.dripsymmetry_fr[0].data[i].x
}
  value5/=count;
  this.ave5 = value5.toFixed(2)
  this.option2.annotation.annotations[0].value = value5;
  this.option2.annotation.annotations[0].label.content = "Average:"+value5.toFixed(2).toString();
      this.canvas_DSF = document.getElementById('DRIP_SYMMATRY_FR');
      this.ctx_DSF = this.canvas_DSF.getContext('2d');
      let myChart5 = new Chart(this.ctx_DSF, {
        type: 'scatter',

        data: {
            
            datasets: this.dripsymmetry_fr,
            
        },
        options: this.option2 as ChartOptions,
        plugins:[ChartAnnotation]
        
      });
      
}

//Drip_sym_re
if(this.Info.DRIP_SYMMATRY_RE=='true'){
  let value6=0;
  for(var i=0;i<count;i++){
    value6=value6+this.dripsymmetry_re[0].data[i].x
  }
    value6/=count;
    this.ave6 = value6.toFixed(2)
    this.option2.annotation.annotations[0].value = value6;
    this.option2.annotation.annotations[0].label.content = "Average:"+value6.toFixed(2).toString();
        this.canvas_DSR = document.getElementById('DRIP_SYMMATRY_RE');
        this.ctx_DSR = this.canvas_DSR.getContext('2d');
        let myChart6 = new Chart(this.ctx_DSR, {
          type: 'scatter',
  
          data: {
              
              datasets: this.dripsymmetry_re,
              
          },
          options: this.option2 as ChartOptions,
          plugins:[ChartAnnotation]
          
        });
        
  }


  //B-Pitch_fr
if(this.Info.B_PITCH_FR=='true'){
  let value7=0;
  for(var i=0;i<count;i++){
    value7=value7+this.bpitch_fr[0].data[i].x
  }
    value7/=count;
    this.ave7 = value7.toFixed(2)
    this.option2.annotation.annotations[0].value = value7;
    this.option2.annotation.annotations[0].label.content = "Average:"+value7.toFixed(2).toString();
        this.canvas_BPF = document.getElementById('B_PITCH_FR');
        this.ctx_BPF = this.canvas_BPF.getContext('2d');
        let myChart7 = new Chart(this.ctx_BPF, {
          type: 'scatter',
  
          data: {
              
              datasets: this.bpitch_fr,
              
          },
          options: this.option2 as ChartOptions,
          plugins:[ChartAnnotation]
          
        });
        
  }

  //B-Pitch_re
  if(this.Info.B_PITCH_RE=='true'){
    let value8=0;
    for(var i=0;i<count;i++){
      value8=value8+this.bpitch_re[0].data[i].x
    }
      value8/=count;
      this.ave8 = value8.toFixed(2)
      this.option2.annotation.annotations[0].value = value8;
      this.option2.annotation.annotations[0].label.content = "Average:"+value8.toFixed(2).toString();
          this.canvas_BPR = document.getElementById('B_PITCH_RE');
          this.ctx_BPR = this.canvas_BPR.getContext('2d');
          let myChart8 = new Chart(this.ctx_BPR, {
            type: 'scatter',
    
            data: {
                
                datasets: this.bpitch_re,
                
            },
            options: this.option2 as ChartOptions,
            plugins:[ChartAnnotation]
            
          });
          
    }

      //RoofPickLocation_FR
  if(this.Info.ROOF_PICK_LOCATION_FR=='true'){
    let value9=0;
    for(var i=0;i<count;i++){
      value9=value9+this.roofpicklocation_fr[0].data[i].x
    }
      value9/=count;
      this.ave9 = value9.toFixed(2)
      this.option2.annotation.annotations[0].value = value9;
      this.option2.annotation.annotations[0].label.content = "Average:"+value9.toFixed(2).toString();
          this.canvas_RPLF = document.getElementById('ROOF_PICK_LOCATION_FR');
          this.ctx_RPLF = this.canvas_RPLF.getContext('2d');
          let myChart9 = new Chart(this.ctx_RPLF, {
            type: 'scatter',
    
            data: {
                
                datasets: this.roofpicklocation_fr,
                
            },
            options: this.option2 as ChartOptions,
            plugins:[ChartAnnotation]
            
          });
          
    }

     //RoofPickLocation_RE
  if(this.Info.ROOF_PICK_LOCATION_RE=='true'){
    let value0=0;
    for(var i=0;i<count;i++){
      value0=value0+this.roofpicklocation_re[0].data[i].x
    }
      value0/=count;
      this.ave0 = value0.toFixed(2)
      this.option2.annotation.annotations[0].value = value0;
      this.option2.annotation.annotations[0].label.content = "Average:"+value0.toFixed(2).toString();
          this.canvas_RPLR = document.getElementById('ROOF_PICK_LOCATION_RE');
          this.ctx_RPLR = this.canvas_RPLR.getContext('2d');
          let myChart0 = new Chart(this.ctx_RPLR, {
            type: 'scatter',
    
            data: {
                
                datasets: this.roofpicklocation_re,
                
            },
            options: this.option2 as ChartOptions,
            plugins:[ChartAnnotation]
            
          });
          
    }
  

}



ngAfterViewChecked(){
  
}




public fileName = "DataSheet.xlsx"
public format:any=[".csv",".txt",".xlsx"]
public chosenformat:any=".csv"


download(){
  if(this.chosenformat==".xlsx"){
    this.exportexcel()
  }
  else if(this.chosenformat==".csv"){
    const options = { 
      fieldSeparator: ' ',
      quoteStrings: '',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: false,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename:'DataSheet'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(options);
 
    csvExporter.generateCsv(this.alldata);
  }
  else{
    const options = { 
      fieldSeparator: ' ',
      quoteStrings: '',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: false,
      useTextFile: true,
      useBom: true,
      useKeysAsHeaders: true,
      filename:'DataSheet'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(options);
 
    csvExporter.generateCsv(this.alldata);
  }
}

exportexcel(): void 
    {
      
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }

}
