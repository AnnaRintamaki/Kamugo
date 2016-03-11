$(document).ready(function(){
       
  var totalSum = 0;
  var totalCount = 0;
  var totalDisciount = 0;
  
// Формирование подзаголовка
  $.get('Data/Header.xml', function(data) {         
     numeral.language('ru'); 
     $(data).find('ROW').each(function() {              
       $('<h3>').insertAfter('h2').text('Смена открыта : '+$(this).find('arch_DateOpen').text());
       $('<h3>').insertAfter('h2').text('Кассовая смена: '+$(this).find('arch_Name').text());        
       totalSum = parseFloat($(this).find('Revenue_Sum').text());
       totalCount = parseInt($(this).find('GuestTab_Count').text());      
       totalDiscount = parseFloat($(this).find('Discount_Sum').text());       
     });
  });


$.get('Data/Details.xml', function(data) {
    var dataSum = [];   
    var dataCount = [];
    var dataDiscount = [];    
    var i = 0; 
    var ticks = [];    
    var titul = '';
    numeral.language('ru'); 
    $(data).find('ROW').each(function() {    
// Суммы оплаты
      var rev = $(this).find('Revenue_Sum').text();      
      if (parseFloat(rev)=='NaN') rev = '0';
      var frev = numeral(rev).format($(this).find('CurrencyFormat').text().replace('руб','$'));  
      dataSum.push(rev/totalSum*100);
// Количество счетов          
      var amount = $(this).find('GuestTab_Count').text();      
      if (parseInt(amount)=='NaN') amount = '0';       
      dataCount.push(amount/totalCount*100);      
// Скидка         
      var dis = $(this).find('Discount_Sum').text();      
      if (parseFloat(dis)=='NaN') dis = '0';
      var fdis = numeral(dis).format($(this).find('CurrencyFormat').text().replace('руб','$'));              
      dataDiscount.push(dis/totalDiscount*100);    
// Заполняем строку таблицы
      $('.tapreport-table').append('<tr><td align="right"><p>'+i+'</p></td><td align="right"><p>'+frev+'</p></td><td align="right"><p>'+amount+'</p></td><td align="right"><p>'+fdis+'</p></td></tr>');                          
      ++i;
      ticks.push((24-i)+'\xA0');
    }); 

  var plotoptions = {
        seriesColorFull: ['#FF9933','#ADD05A','#42ABF4','#FD5A6E','#007882','#70B9BF','#FF00FF','#FF99CC','#6699FF','#66FFCC','#9900CC','#FF6600','#FF0066','#FF6699'],
        seriesColor: ['#F6E300','#FF9933','#FF0066'],

        title: {
          text: titul,
          show: true,
        },
        sortData: false,
        seriesDefaults: {
            renderer:$.jqplot.BarRenderer,    
            pointLabels: { 
                show: true, 
                location: 'e', 
                edgeTolerance: -100,                
                formatString: "\%'d\u0025"
            },
            shadowAngle: 135,
            rendererOptions: {
                barDirection: 'horizontal',
                barPadding: '0',
                barMargin: '1', 
                varyBarColor: true
            },
            lineWidth: 4,
            linePattern: "solid",
            shadow: false
            },
            axes: {
                yaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,   
                    ticks: ticks,                                    
                    tickOptions: {
                        fontSize: "12pt",
                        fontFamily: "Verdana",                        
                        alignTicks: "right",                                                
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
          };  

   var data = []
   data = dataSum.reverse();
   var plots = $.jqplot('plotSumma', [data], plotoptions);   
   data = dataCount.reverse();
   var plotc = $.jqplot('plotCount', [data], plotoptions);
   data = dataDiscount.reverse();
   var plotd = $.jqplot('plotDiscount', [data], plotoptions);

});

  
  
 
});