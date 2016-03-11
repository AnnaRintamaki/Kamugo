$(document).ready(function(){
       
  var total = 0;

// Формирование подзаголовка
  $.get('Data/Header.xml', function(data) {         
     numeral.language('ru'); 
     $(data).find('ROW').each(function() {              
       $('<h1>').insertBefore('h2').text($(this).find('dvsn_Name').text());
       $('<h3>').insertAfter('h2').text('Смена открыта : '+$(this).find('arch_DateOpen').text());
       $('<h3>').insertAfter('h2').text('Кассовая смена: '+$(this).find('arch_Name').text());        
       total = parseFloat($(this).find('orit_Price').text());                 
// Сумма реализации          
       var sumr = $(this).find('orit_Price').text();      
       if (parseFloat(sumr)=='NaN') sumr = '0';
       sumr = numeral(sumr).format($(this).find('CurrencyFormat').text().replace('руб','$'));
// Сумма по меню
       var summ = $(this).find('mitm_Price').text();      
       if (parseFloat(summ)=='NaN') summ = '0';
       summ = numeral(summ).format($(this).find('CurrencyFormat').text().replace('руб','$'));
// Сумма скидки
       var suml = $(this).find('orit_PriceDiscount').text();      
       if (parseFloat(suml)=='NaN') suml = '0';
       suml = numeral(suml).format($(this).find('CurrencyFormat').text().replace('руб','$'));
// Сумма наценки
       var sumh = $(this).find('orit_PriceMargin').text();      
       if (parseFloat(sumh)=='NaN') sumh = '0';
       sumh = numeral(sumh).format($(this).find('CurrencyFormat').text().replace('руб','$'));
      $('#tapfooter').append('<tr><td><p>ИТОГО:</p></td><td align="right"><p>'+suml+'</p></td><td align="right"><p>'+sumh+'</p></td><td align="right"><p>'+sumr+'</p></td><td align="right"><p>'+summ+'</p></td></tr>');      
// Здесь надо заполнить таблицу     
     });
  });

 

  $.get('Data/Details.xml', function(data) {
    var all_data = [];       
    var all_ticks = [];    
    var i = 0;
    numeral.language('ru'); 
    $(data).find('ROW').each(function() {                      
// Сумма реализации          
       var sumr = $(this).find('orit_Price').text();      
       if (parseFloat(sumr)=='NaN') sumr = '0';
       sumr = numeral(sumr).format($(this).find('CurrencyFormat').text().replace('руб','$'));
// Сумма по меню
       var summ = $(this).find('mitm_Price').text();      
       if (parseFloat(summ)=='NaN') summ = '0';
       summ = numeral(summ).format($(this).find('CurrencyFormat').text().replace('руб','$'));
// Сумма скидки
       var suml = $(this).find('orit_PriceDiscount').text();      
       if (parseFloat(suml)=='NaN') suml = '0';
       suml = numeral(suml).format($(this).find('CurrencyFormat').text().replace('руб','$'));
// Сумма наценки
       var sumh = $(this).find('orit_PriceMargin').text();      
       if (parseFloat(sumh)=='NaN') sumh = '0';
       sumh = numeral(sumh).format($(this).find('CurrencyFormat').text().replace('руб','$'));
// Запись сумм в таблицу      
      $('#tapfooter').prepend('<tr><td><p>'+$(this).find('sprv_Name').text()+'</p></td><td align="right"><p>'+suml+'</p></td><td align="right"><p>'+sumh+'</p></td><td align="right"><p>'+sumr+'</p></td><td align="right"><p>'+summ+'</p></td></tr>');
// Здесь надо заполнить таблицу
      all_data.push(parseFloat($(this).find('orit_Price').text())/total*100);                  
      all_ticks.push('<p align="right" vertical-align="top">'+$(this).find('sprv_Name').text().replace(' ','\xA0')+'\xA0'+'\xA0'+'</p>');
      ++i;
    }); 

    

    $('#placeholder').height(i*40);    

    var data = all_data.reverse();
    var ticks = all_ticks.reverse();

    plot = $.jqplot('placeholder', [data], {
        axesDefaults:{
        	tickRenderer: $.jqplot.AxisTickRenderer,
        	angle: -30,
        	tickOptions: {
        		color: "red",
        	}
        },
        seriesColor: ['#FF9933','#ADD05A','#42ABF4','#FD5A6E','#007882','#70B9BF','#FF00FF','#FF99CC','#6699FF','#66FFCC','#9900CC','#FF6600','#FF0066','#FF6699'],
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
                        fontSize: "10pt",
                        fontFamily: "Verdana",
                        alignTicks: "right", 
                        size: 300, 
                    },
                    showTicks: true,                    
                },
                xaxis:{
                    labelRenderer: $.jqplot.CanvasAxisLabelRenderer,                    
                    showTicks: false,

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