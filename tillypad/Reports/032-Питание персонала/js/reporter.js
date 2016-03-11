// проверка на четность
function isEven(value) {
  return (value % 2 == 0) ? true : false;
};

// название валюты из формата валюты
function getCurrencyName() {
	return CurrencyFormat[0].CurrencyFormat.replace(/[0-9.#]/gim, '');
}

// параметры медиа запросов
function getMedia(m_1024, m_1280, xData, yData) {
	var result;
	var barChart;
	
	/* gridPadding подобран опытным путем как половина от barMargin */
	if (m_1024.matches) {
		result = {barWidth: 23, barMargin: 12, fontSize: 12, gridPadding: -6};
	}
	else {
		if (m_1280.matches) {
			result = {barWidth: 28, barMargin: 15, fontSize: 15, gridPadding: -7};
		}
		else {
			result = {barWidth: 42, barMargin: 22, fontSize: 22, gridPadding: -11};
		}
	}

	var barChartHeight = ClientGroups.length * result.barWidth + (ClientGroups.length - 1) * result.barMargin;
	
	$(".report__barchart").css({
		'height': barChartHeight
	});
	
  barChart = $.jqplot('report__barchart', [xData], {   
		seriesColors: ['#FF0066', '#FF9933', '#F6E300'],
		sortData: false,
		seriesDefaults: {
			renderer: $.jqplot.BarRenderer,  
			rendererOptions: {
				barDirection: 'horizontal',
				barPadding: 0, 
				barMargin: result.barMargin,
				barWidth: result.barWidth,
				varyBarColor: true,
				highlightMouseOver: false
			},
			pointLabels: { 
				show: true, 
				location: 'e', 
				edgeTolerance: -100,                         
				formatString: "\%'d\u0025",
			},
			shadowAngle: 0,
			lineWidth: 4,
			linePattern: "solid",
			shadow: false
		},
		gridPadding: { /* убираем отступы от границы до собственно диаграммы */
			top: result.gridPadding,
			bottom: result.gridPadding
    },
		axes: {
			yaxis: {
				renderer: $.jqplot.CategoryAxisRenderer,
				ticks: yData, 
				tickOptions: {
					fontSize: result.fontSize + "pt",
					fontFamily: '"Verdana", sans-serif',
					alignTicks: "right",                         
					textColor: "black",
					escapeHTML: false
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
				gridLineColor: "#FFFFFF",
				gridLineWidth: 0,
				backgroundColor: "#FFFFFF",
				borderColor: "#FFFFFF",
				borderWidth: 0,
				shadow: false
		}
  });

	return result;
}

function VolumeIsVisible(mitm_micl_ID, mitm_Volume, mspr_VolumeEditVisible) {
	var menuPurse = 4; // денежные средства					
	
	// Объем отображается для всех классов ЭП, кроме денежных средств. 
	// Отображается, если <> 1, или если по параметрам продажи его можно изменять
	
	if ((mitm_micl_ID != menuPurse) && ((mitm_Volume > 1) || (mspr_VolumeEditVisible))) {
		return 1;
	}
	else {
		return 0;
	}
}

$(document).ready(function() {
	var totalSum = 0;
	var groupSums = [];
	var groupNames = [];
	
	// язык форматирования
  numeral.language('ru');

	// группы
  for (i in ClientGroups) { 
		var groupSum = 0;
		var clgr_ID = ClientGroups[i].clgr_ID;
		
		$('#report__data').append('<div class="group clearfix" id="clgr_' + clgr_ID + '"></div>');
		
    $('#clgr_' + clgr_ID).append('<div class="group__header clearfix"><div class="roll"></div><div class="group__name">' + ClientGroups[i].clgr_Name + '</div></div>');
		
		$('#clgr_' + clgr_ID).append('<div class="group__body hidden"></div>');

		$('#clgr_' + clgr_ID + '>.group__body').append('<div class="items" id="items_left_' + clgr_ID + '"></div><div class="items items_right" id="items_right_' + clgr_ID + '"></div>');
		
		// общее количество элементов в группе
		var clientsInGroup = 0;
		
		for (j in Clients) {
			var clnt_clgr_ID = Clients[j].clnt_clgr_ID;
			
			if (clnt_clgr_ID === clgr_ID) {
				clientsInGroup = clientsInGroup + 1;
			}
		}
		
		// распределение элементов в две колонки
		var clientsInColumn = Math.round(clientsInGroup / 2);
		var k = 0;
		
		for (j in Clients) {
			var clnt_ID = Clients[j].clnt_ID;
			var clnt_clgr_ID = Clients[j].clnt_clgr_ID;
			
			if (clnt_clgr_ID === clgr_ID) {
				k = k + 1;
				
				if (k <= clientsInColumn) {
					$('#items_left_' + clgr_ID).append('<div class="item" id="clnt_' + clnt_ID + '"></div>');
				}
				else {
					$('#items_right_' + clgr_ID).append('<div class="item" id="clnt_' + clnt_ID + '"></div>'); 
				}
				
				var max = 3;
				var num = k.toString();

				while(num.length < max ) {
					num = '0' + num;
				}

				$('#clnt_' + clnt_ID).append('<div class="item__header clearfix"><div class="roll"></div><div class="item__number">' + num + '</div><div class="item__name">' + Clients[j].clnt_Name + '</div></div>');
				
				$('#clnt_' + clnt_ID).append('<table class="item__table hidden" id="table_' + clnt_ID + '"><tr><th class="table__name">Блюдо, объем</th><th class="table__sum">Кол-во x Цена</th></tr></table');
				
				var itemSum = 0;
				var str;
				
				for (l in MenuItems) {
					var mitm_clnt_ID = MenuItems[l].mitm_clnt_ID;
			
					if (mitm_clnt_ID === clnt_ID) {
						str = '<tr>';
						str = str + '<td class="table__name">' + MenuItems[l].mitm_Name + ', ';

						if (VolumeIsVisible(MenuItems[l].mitm_micl_ID, MenuItems[l].mitm_Volume, MenuItems[l].mspr_VolumeEditVisible) === 1) {
							str = str + MenuItems[l].mitm_Volume + ' ';
						}
								
						str = str	+ MenuItems[l].mvtp_Name + '</td>';
								
						str = str + '<td class="table__sum">' + MenuItems[l].mitm_Count + ' x ' + numeral(MenuItems[l].mitm_Price).format(CurrencyFormat[0].CurrencyFormat.replace(/[^0-9.#]/gim,'')) + getCurrencyName() + '</td>';
						
						str = str + '</tr>';
						
						$('#table_' + clnt_ID).append(str);
						
						itemSum = itemSum + MenuItems[l].mitm_Count * MenuItems[l].mitm_Price;
					}
				}
				
				$('#table_' + clnt_ID).append('<tr><td class="table__name table__total">Итого:</td><td class="table__sum table__total">' + numeral(itemSum).format(CurrencyFormat[0].CurrencyFormat.replace(/[^0-9.#]/gim,'')) + getCurrencyName() + '</td></tr>');
				
				$('#clnt_' + clnt_ID + ">.item__header").append('<div class="item__sum">'+ numeral(itemSum).format(CurrencyFormat[0].CurrencyFormat.replace(/[^0-9.#]/gim,'')) + getCurrencyName() + '</div>');
				
				groupSum = groupSum + itemSum;
			}
		}
			
		// сумма по группе
		$('#clgr_' + clgr_ID + ">.group__header").append('<div class="group__sum">'+ numeral(groupSum).format(CurrencyFormat[0].CurrencyFormat.replace(/[^0-9.#]/gim,'')) + getCurrencyName() + '</div>');
		
		totalSum = totalSum + groupSum;
		groupSums.push(groupSum);
		groupNames.push(ClientGroups[i].clgr_Name);
	}
	
	// обработчик раскрытия группы
	$('.group__header').each(function() {
		$(this).click(function() { 
			// сменить маркер 
			$(this).children('.roll').toggleClass('roll_opened');

			// сменить цвет 
			$(this).toggleClass('group__header_opened');
			
			// показать / скрыть элементы
			$(this).parent().children('.group__body').toggleClass('hidden');
		});
	});
	
	// обработчик раскрытия элементов
	$('.item__header').each(function() {
		$(this).click(function() { 
			// сменить маркер 
			$(this).children('.roll').toggleClass('roll_opened');		
			
			// сменить цвет 
			$(this).toggleClass('item__header_opened');
			
			// показать / скрыть таблицу
			$(this).parent().children('.item__table').toggleClass('hidden');
		});
	});
	
	// данные по группам в процентах
	for (i in groupSums) { 
		groupSums[i] = groupSums[i] / totalSum * 100;
	}
		
	groupSums.reverse();
	groupNames.reverse();
	
	// Диаграмма
	var media_1280 = window.matchMedia( "(max-width: 1280px)" );
	var media_1024 = window.matchMedia( "(max-width: 1024px)" );
	var media;
	
	/*media_1280.addListener(getMedia);*/
	media_1024.addListener(getMedia); 
 	media = getMedia(media_1280, media_1024, groupSums, groupNames);
});


