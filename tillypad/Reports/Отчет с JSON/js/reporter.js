$(document).ready(function(){
       
  var total = 0;
  var all_data = [];
  var all_ticks = [];
// Задаем язык для форматирования
  numeral.language('ru');

  $('<h3>').insertAfter('h2').text('Смена открыта : '+getDateTimeString(Header[0].arch_DateOpen));
  $('<h3>').insertAfter('h2').text('Кассовая смена: '+Header[0].arch_Name); 
  total = Header[0].Payed_Sum;    

// Собираем данные
  for (i in Details) {
    $('#tapreport-table').append('<tr><td><p>'+Details[i].pytp_Name+'</p></td><td><p class="argent">'+numeral(Details[i].chpy_Sum).format(Details[i].CurrencyFormat.replace('р','$'))+'</p></td></tr>'); 
    all_data.push(Details[i].chpy_Sum/total*100);
    all_ticks.push(Details[i].pytp_Name);
  };  
    
// Оформление
  $('#placeholder').height(Details.length*50);
  
  var lleft = -($("#tableset").width()/2);  
  var ltop = -($("#tableset").height()/2);    
  
  $("#tableset").css({
      'margin-left' : lleft,
      'margin-top'  : ltop
    });

  var rleft = -($("#placeholder").width()/2);  
  var rtop = -($("#placeholder").height()/2);    
   
  $("#placeholder").css({
      'margin-left' : rleft,
      'margin-top'  : rtop
    });

  var tickum = all_ticks.reverse();
  var datum = all_data.reverse();

  plot = $.jqplot('placeholder', [datum], {   
        seriesColor: ['#FF9933','#ADD05A','#42ABF4','#FD5A6E','#007882','#70B9BF','#FF00FF','#FF99CC','#6699FF','#66FFCC','#9900CC','#FF6600','#FF0066','#FF6699'],
        sortData: false,
        seriesDefaults: {
            renderer:$.jqplot.BarRenderer,    
            pointLabels: { 
                show: true, 
                location: 'e', 
                edgeTolerance: -100,                         
                formatString: "\%'d\u0025",
            },
            shadowAngle: 135,
            rendererOptions: {
                barDirection: 'horizontal',
                barPadding: 0,
                barMargin: 1, 
                varyBarColor: true
            },
            lineWidth: 4,
            linePattern: "solid",
            shadow: false
            },
            axes: {
                yaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,   
                    ticks: tickum,                                    
                    tickOptions: {
                        fontSize: "12pt",
                        fontFamily: "Verdana",
                        alignTicks: "right",                         
                        textColor: "black",
                        escapeHTML: false,
                    },
                    showTicks: true,                    
                },
                xaxis:{
                    labelRenderer: $.jqplot.CanvasAxisLabelRenderer,                    
                    showTicks: false
                }, 
            },
            grid: {
                drawGridlines: false,
                gridLineColor: "#FFF",
                gridLineWidth: 0,
                backgroundColor: "#FFF",
                borderColor: "#FFF",
                borderWidth: 0,
                shadow: false
            },
        }); 

function getDateTimeString (date) {
  var dtstring = date.toLocaleDateString()+' '+date.toLocaleTimeString();
  return dtstring;
}

});


