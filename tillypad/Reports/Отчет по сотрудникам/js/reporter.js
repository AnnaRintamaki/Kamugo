$(document).ready(function(){
       
  var total = 0;

// Формирование подзаголовка
  $.get('Data/Header.xml', function(data) {         
     numeral.language('ru'); 
     $(data).find('ROW').each(function() {              
       $('<h1>').insertBefore('h2').text($(this).find('dvsn_Name').text());
       $('<h3>').insertAfter('h2').text('Смена открыта : '+$(this).find('arch_DateOpen').text());
       $('<h3>').insertAfter('h2').text('Кассовая смена: '+$(this).find('arch_Name').text());        
       total = parseFloat($(this).find('prch_Sum').text());
// Количество счетов          
		var amount = GetIntValue($(this),'prch_Count');     
// Средний чек                    
		var avg = GetFloatValue($(this),'Average_prch_Sum','CurrencyFormat','руб');
// Сумма реализации          
		var sumr = GetFloatValue($(this),'prch_Sum','CurrencyFormat','руб');
// Сумма по меню
		var summ = GetFloatValue($(this),'mitm_Sum','CurrencyFormat','руб');
// Сумма скидки
		var suml = GetFloatValue($(this),'pcit_PriceDiscount','CurrencyFormat','руб');
// Сумма наценки
		var sumh = GetFloatValue($(this),'pcit_PriceMargin','CurrencyFormat','руб');  
       
      $('#tapfooter').append('<tr><td><p>ИТОГО:</p></td><td align="right"><p>'+amount+'</p></td><td align="right"><p>'+avg+'</p></td><td align="right"><p>'+summ+'</p></td><td align="right"><p>'+suml+'</p></td><td align="right"><p>'+sumh+'</p></td><td align="right"><p>'+sumr+'</p></td></tr>');      
// Здесь надо заполнить таблицу     
     });
  });

  $.get('Data/Details.xml', function(data) {
    var all_data = [];       
    var all_ticks = [];    
    var i = 0;
    numeral.language('ru'); 
    $(data).find('ROW').each(function() {             
// Количество счетов          
		var amount = GetIntValue($(this),'prch_Count');     
// Средний чек                    
		var avg = GetFloatValue($(this),'Average_prch_Sum','CurrencyFormat','руб');
// Сумма реализации          
		var sumr = GetFloatValue($(this),'prch_Sum','CurrencyFormat','руб');
// Сумма по меню
		var summ = GetFloatValue($(this),'mitm_Sum','CurrencyFormat','руб');
// Сумма скидки
		var suml = GetFloatValue($(this),'pcit_PriceDiscount','CurrencyFormat','руб');
// Сумма наценки
		var sumh = GetFloatValue($(this),'pcit_PriceMargin','CurrencyFormat','руб');  
// Запись сумм в таблицу      
      $('#tapfooter').prepend('<tr><td><p>'+$(this).find('usr_Name').text()+'</p></td><td align="right"><p>'+amount+'</p></td><td align="right"><p>'+avg+'</p></td><td align="right"><p>'+summ+'</p></td><td align="right"><p>'+suml+'</p></td><td align="right"><p>'+sumh+'</p></td><td align="right"><p>'+sumr+'</p></td></tr>');
// Здесь надо заполнить таблицу
      all_data.push(parseFloat($(this).find('prch_Sum').text())/total*100);                  
      all_ticks.push('<p align="right" vertical-align="top">'+$(this).find('usr_Name').text().replace(' ','\xA0')+'\xA0'+'\xA0'+'</p>');
      ++i;
    }); 

    

    $('#placeholder').height(i*40);

    all_data.reverse();

    plot = $.jqplot('placeholder', [all_data], {
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
                    ticks: all_ticks,                                    
                    tickOptions: {
                        fontSize: "12pt",
                        fontFamily: "Verdana",
                        alignTicks: "right"                         
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
 
          
function GetIntValue (sourcer,field) {
    var amount = sourcer.find(field).text();      
    if (parseInt(amount)=='NaN') amount = '0';  
    return amount;
}    

function GetFloatValue (sourcer,field,formatfield,suffix) {
	var sum = sourcer.find(field).text();      
    if (parseFloat(sum)=='NaN') sum = '0';    
    sum = numeral(sum).format(sourcer.find(formatfield).text().replace(suffix,'$'));    
    return sum;
}  


});