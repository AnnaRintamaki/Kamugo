$(document).ready(function(){
       
  var total = 0;
  
// Формирование подзаголовка
  $.get('Data/Header.xml', function(data) {         
     numeral.language('ru'); 
     $(data).find('ROW').each(function() {              
       $('<h3>').insertAfter('h2').text('Смена открыта : '+$(this).find('arch_DateOpen').text());
       $('<h3>').insertAfter('h2').text('Кассовая смена: '+$(this).find('arch_Name').text());        
       total = parseFloat($(this).find('Payed_Sum').text());
     });
  });

  $.get('Data/Details.xml', function(data) {
    var all_datum = [];       
    var all_ticks = [];    
    var i = 0;
    numeral.language('ru'); 
    $(data).find('ROW').each(function() {           
      var summ = $(this).find('chpy_Sum').text();      
      var paytype = $(this).find('pytp_Name').text();
      if (parseFloat(summ)=='NaN') summ = '0';
      summ = numeral(summ).format($(this).find('CurrencyFormat').text().replace('руб','$'));      
      $('#tapreport-table').append('<tr><td><p>'+paytype+'</p></td><td><p class="argent">'+summ+'</p></td></tr>');      
// Здесь надо заполнить таблицу
      all_datum.push(parseFloat($(this).find('chpy_Sum').text())/total*100);                  
      all_ticks.push('<p class="tptick" text-align="right" vertical-align="top">'+paytype.replace(' ','\xA0')+'\xA0'+'\xA0'+'</p>');     
      ++i;
    }); 
    
   var all_data = all_datum.reverse();
   var tickum = all_ticks.reverse();


    $('#placeholder').height(i*50);
    
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

  //  all_data.reverse();

    plot = $.jqplot('placeholder', [all_datum], {   
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
                    ticks: all_ticks,                                    
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
    });
 
       

});