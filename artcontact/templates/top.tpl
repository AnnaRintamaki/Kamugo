<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
{if $baseurl}<BASE href="http://artcontract.ru/">{/if}
<meta http-equiv="Content-Type" content="text/html; charset=windows-1251" />
{if $alt_meta_keywords}
<meta name="keywords" content="{$alt_meta_keywords}" />
{else}
<meta content="{$meta_keywords}" name="keywords" />
{/if}
{if $alt_meta_description}
<meta name="description" content="{$alt_meta_description}" />
<meta property="og:description" content="{$alt_meta_description}" />
{else}
<meta content="{$meta_description}" name="description" />
<meta property="og:description" content="{$meta_description}" />
{/if}
<meta name="title" content="{if $meta_title}{$meta_title}{else}Артконтракт{/if}" />
<title>{if $meta_title}{$meta_title}{else}Артконтракт{/if}</title>
<meta property="og:title" content="{if $meta_title}{$meta_title}{else}Артконтракт{/if}" />
<link rel="image_src" href="http://{php}print $_SERVER['HTTP_HOST'];{/php}{if $meta_image}{$meta_image}{else}/images/logo2.png{/if}" />
<meta property="og:url" content="http://{php}print $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];{/php}" />
<meta property="og:image" content="http://{php}print $_SERVER['HTTP_HOST'];{/php}{if $meta_image}{$meta_image}{else}/images/logo2.png{/if}" />
<link rel="stylesheet" type="text/css" href="/css/style.css" />
<link rel="stylesheet" type="text/css" href="/css/stylish-select.css" />
<script src="/js/browsers.js" type="text/javascript"></script>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>

<script type="text/javascript" src="/js/jquery.autocomplete.js"></script>

<script src="/js/jquery.stylish-select.js" type="text/javascript"></script>
<script language="javascript" type="text/javascript" src="/js/vtip.js"></script>

<link rel="stylesheet" type="text/css" media="all" href="/jscalendar/skins/aqua/theme.css" title="win2k-cold-1" />
<script type="text/javascript" src="/jscalendar/calendar.js"></script>
<script type="text/javascript" src="/jscalendar/lang/calendar-ru_win_.js"></script>
<script type="text/javascript" src="/jscalendar/calendar-setup.js"></script>

<script type="text/javascript" src="/simple.js"></script>

<script type="text/javascript" src="/js/MYselect.js"></script>

<!-- галерея -->
<script type="text/javascript" src="/js/jquery.lightbox-0.5.js"></script>
<script type="text/javascript">
{literal}
        $(function(){
                $('#gallery a.test').lightBox();
        });
{/literal}
</script>
<link rel="stylesheet" type="text/css" href="/css/jquery.lightbox-0.5.css" media="screen" />

<link rel="icon" type="image/x-icon" href="/favicon.ico"/>
<!-- /галерея -->

							<script type="text/javascript" src="/js/masonry.pkgd.min.js"></script>	   
							
						

</head>
<body>

        <!-- site container -->
        <div class="container">
          <!-- head -->
          <div class="head">
                    <div class="head_block">

                              <!-- top_block -->
                              <div class="top_block">

                                        <!-- menu_block -->
                                        <div class="menu_block">
                                                  <ul>
                                                            <li><a href="/" class="blueLink">ГЛАВНАЯ</a></li>
                                                            <li><a href="/list/News" class="blueLink">НОВОСТИ</a></li>
                                                            <!--
                                                            <li><a href="/" class="active">Главная</a></li>
                                                            <li><a href="/types/authors">Авторам</a></li>
                                                            <li><a href="/types/customers">Заказчикам</a></li>
                                                            <li><a href="/types/buyers">Покупателям</a></li>
                                                            <li><a href="/types/artdealers">Арт-дилерам</a></li>
                                                            <li><a href="/types/organization_of_exhibitions">Организация художественных выставок</a></li>
                                                            <li><a href="/types/partner">Партнеры</a></li>
                                                            -->
                                                  </ul>

                                                                                               <!--   <div id="langselect">
                                                                                                          <a href="/change.php?lang=ru">RUS</a>
                                                                                                        <a href="/change.php?lang=en">ENG</a>
                                                                                                  </div>    -->

                                                  <div style="clear:both"></div>
                                        </div>
                                        <!-- end menu_block -->                                       
                                        
                                        {if $user_enter}                                        
                                        <a href="/private/exit.php" class="help blueLink noBackground">ВЫЙТИ ({$user_name})</a>
                                        <a href="/private/" class="help blueLink noBackground">ЛИЧНЫЙ КАБИНЕТ</a>
                                        {else}
                                        <a href="/reg/start.php" class="help blueLink noBackground">ЗАРЕГИСТРИРОВАТЬСЯ</a>
                                        <a href="/private/enterform.php" class="help blueLink noBackground">ВОЙТИ</a>
                                        {/if}

                                        <a href="/faq.php" class="help blueLink">ОТВЕТЫ НА ЧАСТЫЕ ВОПРОСЫ</a>

                                        
                                        
                                        
                                        <div style="clear:both"></div>
                              </div>
                              <!-- end top_block -->

                              <!-- bottom_block -->
                              <div class="bottom_block">

                                        <!-- logo -->
                                        <div class="logo">
                                                  <a href="/"><img src="../images/logo2.png" alt="" /></a>
                                        </div>
                                        <!-- end logo -->

                                        <!-- express_block --
                                        <div class="express_block">
                                                  <div class="left_box">
                                                            <span class="big_gray">Хотите заказать <span class="red">картину</span>, <span class="red">скульптуру</span>, <span class="red">дизайн</span>, но не знаете что именно?</span>
                                                            <br />Мы можем вам помочь, для этого необходимо сделать...
                                                  </div>
                                                  <div class="right_box">
                                                            <a href="/reg/start.php" class="express">Экспресс- заказ</a>
                                                  </div>
                                                  <div style="clear:both"></div>
                                        </div>
                                        -- end express_block -->
                                                                               <div class="express_block" style="padding:0; float:right;">
                                                                                   


<script type='text/javascript'><!--//<![CDATA[
   var m3_u = (location.protocol=='https:'?'https://artcontract.ru/openx/www/delivery/ajs.php':'http://artcontract.ru/openx/www/delivery/ajs.php');
   var m3_r = Math.floor(Math.random()*99999999999);
   if (!document.MAX_used) document.MAX_used = ',';
   document.write ("<scr"+"ipt type='text/javascript' src='"+m3_u);
   document.write ("?zoneid=2");
   document.write ('&amp;cb=' + m3_r);
   if (document.MAX_used != ',') document.write ("&amp;exclude=" + document.MAX_used);
   document.write (document.charset ? '&amp;charset='+document.charset : (document.characterSet ? '&amp;charset='+document.characterSet : ''));
   document.write ("&amp;loc=" + escape(window.location));
   if (document.referrer) document.write ("&amp;referer=" + escape(document.referrer));
   if (document.context) document.write ("&context=" + escape(document.context));
   if (document.mmm_fo) document.write ("&amp;mmm_fo=1");
   document.write ("'><\/scr"+"ipt>");
//]]>--></script><noscript><a href='http://artcontract.ru/openx/www/delivery/ck.php?n=a7686064&amp;cb=INSERT_RANDOM_NUMBER_HERE' target='_blank'><img src='http://artcontract.ru/openx/www/delivery/avw.php?zoneid=2&amp;cb=INSERT_RANDOM_NUMBER_HERE&amp;n=a7686064' border='0' alt='' /></a></noscript>


                                                                                        {php}
                                                                                        //include_once(MAIN_DIR."/banner/banner_functions.php");
                                                                                        //print show_banner(20,0);
                                                                                        {/php}
                                                                                </div>

                                        <div style="clear:both"></div>
                              </div>
                              <!-- end bottom_block -->

                    </div>
<script type='text/javascript'>
	document.writeln('<center>');
	document.writeln('<div class="catalog_menu">');

	document.writeln('<a href="/profile/search_images.php?start=1"');
	if (document.URL.indexOf('/profile/search_images.php') > -1)
		document.write(' class="active"');
	document.write('>Произведения</a>');

	document.writeln('<a href="/profile/search_users.php?start=1&actype=100"');
	if ((document.URL.indexOf('/profile/search_users.php') > -1) && (document.URL.indexOf('actype=100') > -1))
		document.write(' class="active"');
	document.write('>Авторы</a>');

	document.writeln('<a href="/profile/search_users.php?start=1&actype=101"');
	if ((document.URL.indexOf('/profile/search_users.php') > -1) && (document.URL.indexOf('actype=101') > -1))
		document.write(' class="active"');
	document.write('>Мастера</a>'); 
 
	document.writeln('<a href="/profile/search_users.php?actype=102"');
	if ((document.URL.indexOf('/profile/search_users.php') > -1) && (document.URL.indexOf('actype=102') > -1))
		document.write(' class="active"');
	document.write('>Артдилеры</a>');

	document.writeln('<a href="/job/order_list.php?ext_search=1"');
	if (document.URL.indexOf('/job/order_list.php') > -1)
		document.write(' class="active"');
	document.write('>Артконтракты</a>');

	document.writeln('<a href="/profile/search_users.php?actype=103"');
	if ((document.URL.indexOf('/profile/search_users.php') > -1) && (document.URL.indexOf('actype=103') > -1))
		document.write(' class="active"');
	document.write('>Работодатели</a>');

	document.writeln('<a href="/profile/search_users.php?start=1&actype=104"');
	if ((document.URL.indexOf('/profile/search_users.php') > -1) && (document.URL.indexOf('actype=104') > -1))
		document.write(' class="active"');
	document.write('>Организации</a>');

	document.writeln('<a href="/profile/exhibitions.php"');
	if (document.URL.indexOf('/profile/exhibitions.php') > -1)
		document.write(' class="active"');
	document.write('>Выставки</a>');

	document.writeln('</div>');
	document.writeln('</center>');
</script>

          
          </div>
          <!-- end head -->

          <!-- cont -->
          <div class="cont">

                    <!-- left_col -->
                    <div class="left_col{if $modWidth} mod_left_col{/if}">

                    {include file='searchInput.tpl'}

