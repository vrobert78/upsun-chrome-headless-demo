var _inside=_inside||[];var _insideLoaded=_insideLoaded||false;var _insideTempCart=_insideTempCart||null;var _insideCount=_insideCount||0;var _insideJQ=_insideJQ||null;var _refreshInsideView=function(){};var _insideCookieDomain=window.location.hostname;(function(){try{if(window.navigator.userAgent.toLowerCase().indexOf("edge/16")!=-1){return;}}catch(tempex){}
if(_insideLoaded)
return;_insideLoaded=true;var accountKey="IN-1000306";var trackerURL="stp-tracker.inside-graph.com";var subsiteId="5";var _insideMembershipSkuBool=false;var _insideMembershipCount=0;var _insideFirstLoad=false;_inside.push({"action":"bind","name":"onload","callback":function(){_insideGraph.jQuery(document).on("click",".staples-bot-action-button",function(e){try{var post=JSON.parse(atob(_insideJQ(e.currentTarget).attr("data-post")));_insideGraph.jQuery.ajax({url:post.url,data:post.data,type:"POST",dataType:"json"});}
catch(ex){}});}});function processInside(tracker){function log(){if(typeof(console)!="undefined"&&typeof(console.log)!="undefined"){}}
var indexOf=[].indexOf||function(prop){for(var i=0;i<this.length;i++){if(this[i]===prop)
return i;}};var getElem=function(className,context){if(context.getElementsByClassName)
return context.getElementsByClassName(className);var elems=document.querySelectorAll?context.querySelectorAll("."+className):(function(){var all=context.getElementsByTagName("*"),elements=[],i=0;for(;i<all.length;i++){if(all[i].className&&(" "+all[i].className+" ").indexOf(" "+className+" ")>-1&&indexOf.call(elements,all[i])===-1)
elements.push(all[i]);}
return elements;})();return elems;};function isNumeric(n){try{return!isNaN(parseFloat(n))&&isFinite(n);}
catch(tempex){}
return false;}
function deferWait(callback,test){if(test()){callback();return;}
var _interval=10;var _spin=function(){if(test()){callback();}
else{_interval=_interval>=1000?1000:_interval*2;setTimeout(_spin,_interval);}};setTimeout(_spin,_interval);}
function myTrim(text){if(typeof(text)=="undefined"||text==null)
return "";return typeof(text.trim)==="function"?text.trim():text.replace(/^\s+|\s+$/gm,'');}
function getCookie(cname){var name=cname+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=myTrim(ca[i]);if(c.indexOf(name)==0)
return c.substring(name.length,c.length);}
return null;}
var staplesCart=getStaplesCart();var orderTotal=null;var _staplesCartCookie=staplesCart;var tempcurview=null;function getViewData(){try{var data={};data.action="trackView";data.tags="host:"+window.location.host;data.type="other";data.url=window.location.href;data.name="Unknown Page: "+window.location.href;var temp_loc=document.location.href.split("://")[1].split("/");var page="";var tempPageType=getPageType();for(var i=1;i<temp_loc.length;i++){if(temp_loc[i]!=null&&temp_loc[i].length>0)
page=temp_loc[i];}
var curpage=page.split("?")[0];if((curpage==""||curpage=="/"||curpage=="home"||tempPageType=="home")&&temp_loc.length<3){data.type="homepage";data.name="Home";}
else if(page.indexOf("easycheckoutorderconf")==0||data.url.indexOf("/confirmOrder")!=-1){data.type="orderconfirmed";data.name="Order Confirmed";}
else if(tempPageType=="login"||tempPageType=="registration"||tempPageType=="registrationconfirmation"||tempPageType=="loginusernameassist"||tempPageType=="loginassist"){data.type="login";data.name=curpage;}
else if(typeof(s)!="undefined"&&s!=null&&typeof(s.prop3)!="undefined"&&s.prop3=="Search"){data.type="search";data.name=document.title;if(data.name!=null&&data.name.length>0){if(data.name.indexOf("|")!=-1){data.name=data.name.split("|")[0];data.name=myTrim(data.name);}}
else{data.name=curpage.split("directory_")[1];if(data.name.substr(data.name.length-1)=="?"){data.name=data.name.substring(0,data.name.length-1);}
data.name=document.title;}
if(s.pageName=="Search Results:No Search Results"){data.tags=data.tags+",NoResults";}}
else if((typeof(s)!="undefined"&&s!=null&&typeof(s.prop3)!="undefined"&&s.prop3=="Collection")||tempPageType=="category"||tempPageType=="btstemplate"||tempPageType=="class"||page.indexOf("class.html")==0){data.type="productcategory";var tempPageName=getPageNameByPageType();if(tempPageName!=null&&tempPageName.length>0){data.name=tempPageName;}
if(typeof(s)!="undefined"&&s!=null&&typeof(s.prop3)!="undefined"&&s.prop3=="Collection"&&typeof(s.pageName)!="undefined"){tempPageName=s.pageName;if(tempPageName!=null&&tempPageName.length>0)
data.name=tempPageName;}}
else if((typeof(s)!="undefined"&&s!=null&&typeof(s.prop3)!="undefined"&&(s.prop3=="Product Detail"||s.prop3=="Sku Set"))||page.indexOf("product.html")==0||tempPageType=="skuskuset"||tempPageType=="odinsku"||(page.indexOf("product_")==0&&getProductImage()!=null)){data.type="product";data.img=getProductImage();var tempPageName=getPageName();if(tempPageName!=null&&tempPageName.length>0){data.name=tempPageName;}
tempPageName=getProductName();if(tempPageName!=null&&tempPageName.length>0){data.name=tempPageName;}
try{var price=0;var priceTag=_insideJQ("[ng-controller=\"prodInfo\"] .stp--price-discounted");if(priceTag.length>0)
price=parseFloat(_insideJQ(priceTag[0]).text().replace(/[^0-9\.\-\+]/g,''));if(price<=0){priceTag=_insideJQ("[ng-controller=\"prodInfo\"] .stp--price-original");if(priceTag.length>0)
price=parseFloat(_insideJQ(priceTag[0]).text().replace(/[^0-9\.\-\+]/g,''));}
if(price>0){data["price"]=price;}}
catch(priceError){}
try{data["sku"]=Analytics.tracking.item.sku;}
catch(skuError){}}
else if((typeof(s)!="undefined"&&s!=null&&s.prop3=="Checkout")||page.indexOf("cart.html")==0||tempPageType=="Your Cart"||page.indexOf("checkout")==0){data.type="checkout";data.name=tempPageType;}
else{data.type="article";var tempPageName=getPageName();if(tempPageName!=null&&tempPageName.length>0)
data.name=tempPageName;}
if(typeof(s)!="undefined"&&s!=null&&typeof(s.prop6)!="undefined"&&s.prop6!=null&&s.prop6.length>0){var tempsplit=s.prop6.split(":");for(var i=0;i<tempsplit.length;i++){var tempval=tempsplit[i];if(tempval!=null&&tempval.length>0){tempval=myTrim(tempval);}
if(i==0){data.tags=data.tags+",Supercategory:"+tempval;}
else if(i==1){data.tags=data.tags+",Category:"+tempval;}
else if(i==2){data.tags=data.tags+",Department:"+tempval;}
else if(i==3){data.tags=data.tags+",Class:"+tempval;}}}
var zipCode=getCookie("zipcode");if(typeof(zipCode)!="undefined"&&zipCode!=null&&zipCode!="")
data.tags+=",zip:"+zipCode;if(data.type=="checkout"){var shipToStore=false;var shipToStoreChk=document.getElementById("shipToStoreChk");if(shipToStoreChk!=null){if(shipToStoreChk.checked)
shipToStore=true;}
else{var cart_summary=getElem("order_cart_summary",document);if(cart_summary!=null&&cart_summary.length>0){var pickup_info=getElem("pickup_info",cart_summary[0]);if(pickup_info!=null&&pickup_info.length==1)
shipToStore=true;}}
if(shipToStore)
data.tags+=",shiptostore";}
return data;}
catch(ex){log("getViewData error: ",ex);return null;}}
function getPageName(){try{var content=document.getElementsByTagName("title");var tempnametype=getPageType();if(content!=null&&content.length>0){var result=content[0].textContent||content[0].innerText;if(typeof(result)!="undefined"&&result!=null&&result.length>0&&result.indexOf("It's easy to find the Office Supplies, Copy Paper, Furniture, Ink, Toner")==-1&&result.indexOf("Office Supplies, Technology, Ink & Much More")==-1){if(result.indexOf(" | Staples")!=-1)
result=result.split(" | Staples")[0];}
if(typeof(tempnametype)!="undefined"&&tempnametype!=null&&tempnametype.length>0)
return tempnametype;}}catch(tempex){}
try{if(_insideJQ!=null){var temph1=myTrim(_insideJQ("h1").first().text());if(temph1.length>0)
return temph1;}}
catch(ex){}
try{var temp_loc=window.location.pathname.split("/");var temppage="";for(var i=1;i<temp_loc.length;i++){if(temp_loc[i]!=null&&temp_loc[i].length>0)
temppage=temp_loc[i];}
var curpage=temppage.split("?")[0];return myTrim(curpage);}catch(tempex){}
return null;}
function getPageNameByPageType(){var content=document.getElementsByTagName("title");if(content!=null&&content.length>0){var result=content[0].textContent||content[0].innerText;if(typeof(result)!="undefined"&&result!=null&&result!=""){if(result.indexOf(" | Staples")!=-1)
result=result.split(" | Staples")[0];if(result.indexOf("It's easy to find the Office Supplies, Copy Paper, Furniture, Ink, Toner")!=0)
return result;else
return getPageType();}}
var pageType=getPageType();content=document.getElementsByTagName("input");if(content!=null&&content.length>0){for(var i=0;i<content.length;i++){if(content[i].getAttribute("type")=="hidden"&&content[i].getAttribute("var")==pageType)
return content[i].value;}}
return null;}
function getPageType(){var metaTags=document.getElementsByTagName("meta");var fbAppIdContent="";for(var i=0;i<metaTags.length;i++){if(metaTags[i].getAttribute("name")=="PageName"){fbAppIdContent=metaTags[i].getAttribute("content");return fbAppIdContent;}}
if(typeof(document.body.id)!="undefined"&&document.body.id!=null)
return document.body.id;if(_insideJQ!=null){try{return _insideJQ("h1").first().text();}
catch(ex){}}
return "";}
function getFacebookPageType(){var metaTags=document.getElementsByTagName("meta");var fbAppIdContent="";for(var i=0;i<metaTags.length;i++){if(metaTags[i].getAttribute("property")=="og:type"){fbAppIdContent=metaTags[i].getAttribute("content");return fbAppIdContent;}}
return "";}
function getProductName(){try{if(Analytics.tracking.item.name&&Analytics.tracking.item.name.length>0)
return Analytics.tracking.item.name;}catch(tempex){}}
function getProductImage(){try{var metaTags=document.getElementsByTagName("meta");var fbAppIdContent="";for(var i=0;i<metaTags.length;i++){if(metaTags[i].getAttribute("property")=="og:image"){fbAppIdContent=metaTags[i].getAttribute("content");if(fbAppIdContent.indexOf("home_logo.png")==-1)
return fbAppIdContent;}}
metaTags=document.getElementById("STP--Product-Image");fbAppIdContent="";if(metaTags!=null){metaTags=getElem("hero-image-container",metaTags);if(metaTags!=null&&metaTags.length>0){metaTags=metaTags[0].getElementsByTagName("img");if(metaTags!=null&&metaTags.length>0)
return metaTags[0].src;}
else{metaTags=document.getElementById("STP--Product-Image");metaTags=getElem("stp--sku-image",metaTags);if(metaTags!=null&&metaTags.length>0)
return metaTags[0].src;}}}
catch(tempex){}
return null;}
function updateCartData(cartData){try{var data=[];if(cartData!=null&&cartData.items.length>0){for(var i=0;i<cartData.items.length;i++){var detail=cartData.items[i];data.push({"action":"addItem","orderId":staplesCart.orderId,"name":detail.product.name,"price":detail.priceInfo.finalPricePerUnit,"sku":detail.product.partNumber,"img":detail.product.images.standard[0],"qty":detail.qty});}}
if(data.length>0){for(var i=0;i<data.length;i++)
_inside.push(data[i]);try{orderTotal=cartData.cartSummary.ordTotal;}
catch(ex2){}
_inside.push({"action":"trackOrder","orderId":staplesCart.orderId,"orderTotal":orderTotal});if(typeof(tempcurview)!="undefined"&&tempcurview!=null){tempcurview.orderId=staplesCart.orderId;tempcurview.orderTotal=orderTotal;_inside.push(tempcurview);}
sessionStorage.setItem("insideordertotal",orderTotal);}
else{_inside.push({"action":"trackOrder","orderId":"auto","orderTotal":0});}
insertInsideTag();}
catch(ex){log("updateCartData error. ",ex);return null;}}
function getOrderDataCheckout(){try{var data=[];var tempanalytics=null;var contents=getElem("cart-item",document);if(typeof(Analytics)!="undefined"&&Analytics!=null&&typeof(Analytics.global)!="undefined"&&Analytics.global!=null&&typeof(Analytics.global.cart)!="undefined"&&Analytics.global.cart!=null&&typeof(Analytics.global.cart.lines)!="undefined"&&Analytics.global.cart.lines!=null&&Analytics.global.cart.lines.length>0){tempanalytics=Analytics.global.cart.lines;}
if(contents!=null&&contents.length>0){for(var i=0;i<contents.length;i++){var coupons=getElem("skuCoupon",contents[i]);var qtys=getElem("item-quantity",contents[i]);var imgs=getElem("cartItem-image",contents[i]);if(imgs==null||imgs.length==0)
imgs=getElem("item-image",contents[i]);var prices=getElem("item-price",contents[i]);var items=getElem("title-margin",contents[i]);var itemname="";if(items!=null&&items.length>0)
itemname=items[0].getElementsByTagName("a")[0];else{items=getElem("item-desc",contents[i])
itemname=items[0].getElementsByTagName("p")[0];}
itemname=itemname.innerText||itemname.textContent;var price=1;var qty=1;if(tempanalytics!=null&&tempanalytics.length>i){price=tempanalytics[i].total/tempanalytics[i].qty;qty=tempanalytics[i].qty;}
price=prices[prices.length-1];price=price.innerText||price.textContent;price=parseFloat(price.replace(/[^0-9\.\+]/g,''));try{}
catch(couponex){}
if(qtys!=null&&qtys.length>0)
qty=qtys[0].getElementsByTagName("input")[0].value;else{qtys=getElem("item-qty",contents[i]);qty=qtys[0].innerText||qtys[0].textContent;}
qty=parseFloat(qty.replace(/[^0-9]/g,''));price=price/qty;var img=imgs[0].getElementsByTagName("img")[0].src;var sku=null;if(img!=null&&img.length>0){var tempsku=imgs[0].getElementsByTagName("img")[0].getAttribute("data-sku");if(tempsku!=null&&tempsku.length>0){sku=tempsku;}}
if(sku==null){if(tempanalytics!=null&&tempanalytics.length>i){sku=tempanalytics[i].sku;}}
if(sku!=null&&sku.length>0){data.push({"action":"addItem","orderId":staplesCart.orderId,"name":myTrim(itemname),"price":price,"sku":sku,"img":img,"qty":qty});}}}
else{contents=_insideJQ(".cart__animateDown .cart__item_border");if(contents!=null&&contents.length>0){for(var i=0;i<contents.length;i++){var tempdetail=_insideJQ(contents[i]);var tempitem={};tempitem.action="addItem";var tempimg=tempdetail.find(".product-tile__product_image:first");tempitem.img=tempimg.css("background-image").replace(/.*\s?url\([\'\"]?/,'').replace(/[\'\"]?\).*/,'');tempitem.name=tempimg.attr("title");tempitem.qty=tempdetail.find("input.cart__cart_item_qty_text:first").val();var temptotalprice=tempdetail.find(".product-tile__final_price:first").text();temptotalprice=parseFloat(temptotalprice.replace(/[^0-9\.\+]/g,""));tempitem.price=temptotalprice/tempitem.qty;var tempsku=tempdetail.find(".product-tile__product_tile_model:first").text();if(tempsku.indexOf("|")!=-1){tempsku=tempsku.split("|")[0];}
if(tempsku.indexOf(":")!=-1){tempsku=tempsku.split(":")[1];}
tempitem.sku=myTrim(tempsku);data.push(tempitem);}}
else{contents=_insideJQ(".cart__cart_items_wrapper .cart__cartRowWrapper");if(contents!=null&&contents.length>0){for(var i=0;i<contents.length;i++){var tempdetail=_insideJQ(contents[i]);var tempitem={};tempitem.action="addItem";var tempimg=tempdetail.find("img:first");tempitem.img=tempimg.get(0).src;tempitem.name=myTrim(tempdetail.find(".cart__productDescription:first").text());var tempqty=tempdetail.find(".cart__productPrice:first").text();if(tempqty.indexOf("@")!=-1){tempqty=tempqty.split("@")[0];tempitem.qty=parseFloat(tempqty.replace(/[^0-9\.\+]/g,""));}
var temptotalprice=tempdetail.find(".cart__prodFinalPricePad:first").text();temptotalprice=parseFloat(temptotalprice.replace(/[^0-9\.\+]/g,""));tempitem.price=temptotalprice/tempitem.qty;var tempsku=tempdetail.find(".cart__skuDetails:first").text();if(tempsku.indexOf("|")!=-1){tempsku=tempsku.split("|")[0];}
if(tempsku.indexOf(":")!=-1){tempsku=tempsku.split(":")[1];}
tempitem.sku=myTrim(tempsku);data.push(tempitem);}}}}
if(data.length>0){try{var temp=getElem("orderinfo-cell",document)[0].getElementsByTagName("tfoot")[0];orderTotal=parseFloat((temp.innerText||temp.textContent).replace(/[^0-9\.\+]/g,""));}
catch(ex2){}
try{var temp=getElem("remain-bal",document)[0];orderTotal=parseFloat((temp.innerText||temp.textContent).replace(/[^0-9\.\+]/g,""));}
catch(ex2){}
try{var temp=getElem("cart__total_price",document)[0];orderTotal=parseFloat((temp.innerText||temp.textContent).replace(/[^0-9\.\+]/g,""));}
catch(ex2){}
data.push({"action":"trackOrder","orderId":staplesCart.orderId,"orderTotal":orderTotal});sessionStorage.setItem("insideordertotal",orderTotal);return data;}}
catch(ex){log("getOrderDataCheckout error. ",ex);}
return null;}
function updateCheckoutCartData(){try{var data=getOrderDataCheckout();if(data.length>0){for(var i=0;i<data.length;i++)
_inside.push(data[i]);if(typeof(tempcurview)!="undefined"&&tempcurview!=null){tempcurview.orderId=staplesCart.orderId;tempcurview.orderTotal=orderTotal;_inside.push(tempcurview);}
sessionStorage.setItem("insideordertotal",orderTotal);}
insertInsideTag();}
catch(ex){log("updateCartData error. ",ex);return null;}}
function getOrderDataConfirmed(){try{var newOrderId=Analytics.tracking.orderconfirm.purchaseid;var orderId="";var orderTotal=0;var data=[];var tempdata=[];var temppurchasedata={};if(newOrderId!=null&&newOrderId!=""&&newOrderId!="0"){orderId="auto";try{var lastOrderID=sessionStorage.getItem("insidelastorderid");if(lastOrderID==newOrderId){return null;}}
catch(numex){}}
if(orderId!=""){try{orderTotal=Analytics.tracking.orderconfirm.orderrevenue;if(typeof(Analytics.tracking.orderconfirm.shipping)!="undefined"&&Analytics.tracking.orderconfirm.shipping!=null&&Analytics.tracking.orderconfirm.shipping>0){orderTotal=orderTotal+Analytics.tracking.orderconfirm.shipping;temppurchasedata.shipping=Analytics.tracking.orderconfirm.shipping;}
if(typeof(Analytics.tracking.orderconfirm.tax)!="undefined"&&Analytics.tracking.orderconfirm.tax!=null&&Analytics.tracking.orderconfirm.tax>0){orderTotal=orderTotal+Analytics.tracking.orderconfirm.tax;temppurchasedata.tax=Analytics.tracking.orderconfirm.tax;}
try{var temprows=[];var tempcontent=getElem("product-details-list",document);if(tempcontent!=null&&tempcontent.length>0){temprows=getElem("product-details",tempcontent[0]);}
if(typeof(Analytics.tracking.orderconfirm.items)!="undefined"&&Analytics.tracking.orderconfirm.items!=null&&Analytics.tracking.orderconfirm.items.length>0&&temprows.length==Analytics.tracking.orderconfirm.items.length){var details=Analytics.tracking.orderconfirm.items;for(var i=0;i<details.length;i++){var detail=details[i];var temprow=temprows[i];var names=getElem("product-name",temprow);var item_name=names[0].innerText||names[0].textContent;var img_link=temprow.getElementsByTagName("img")[0].src;var qty=detail.qty;var price=detail.total/qty;var item_sku=detail.sku;data.push({"action":"addItem","orderId":orderId,"name":myTrim(item_name),"price":price,"sku":myTrim(item_sku),"img":img_link,"qty":qty});tempdata.push({"action":"addItem","orderId":orderId,"name":myTrim(item_name),"price":price,"sku":myTrim(item_sku),"img":img_link,"qty":qty});}}}
catch(itemex){data=[];tempdata=[];}}
catch(ex2){data=[];tempdata=[];}}
if(orderId!=""){if(data.length>0&&tempdata.length>0){data.push({"action":"trackOrder","orderId":orderId,"data":temppurchasedata,"orderTotal":orderTotal});for(var i=0;i<tempdata.length;i++){data.push(tempdata[i]);}
data.push({"action":"trackOrder","orderId":orderId,"data":temppurchasedata,"newOrderId":newOrderId,"orderTotal":orderTotal,"complete":true});return data;}
else{return[{"action":"trackOrder","orderId":orderId,"newOrderId":newOrderId,"data":temppurchasedata,"orderTotal":orderTotal,"complete":true,"update":true}];}}
return null;}
catch(ex){log("getOrderDataConfirmed error. ",ex);return null;}}
function getUserId(){try{var user=getCookie("StaplesUser");if(typeof(user)!="undefined"&&user!=null){var arr=user.split(":");if(arr.length>0)
return arr[1];}}
catch(userex){}
return "";}
function getStaplesCart(){var orderId="0";var items=0;var total=0.00;try{var staplesCart=STAPLES.Main.parseCart('StaplesCart');orderId=staplesCart.OrderID;items=parseInt(staplesCart.Items.split(" ")[0]);total=parseFloat(staplesCart.Total.replace(/[^0-9\.\-\+]/g,""))}
catch(ex){}
try{var staplesCart=JSON.parse(localStorage.getItem('nc'));if(staplesCart!=null){orderId="auto";items=parseInt(staplesCart.numberOfItems);if(typeof(staplesCart.total)!="undefined"&&staplesCart.total!=null&&staplesCart.total.length>0){total=parseFloat(staplesCart.total.replace(/[^0-9\.\-\+]/g,""))}
else if(typeof(staplesCart.preTax)!="undefined"&&staplesCart.preTax!=null&&staplesCart.preTax.length>0){total=parseFloat(staplesCart.preTax.replace(/[^0-9\.\-\+]/g,""))}}}
catch(ex){}
try{if(window.location.href.indexOf("/checkout")!=-1){var temp=getElem("remain-bal",document);if(temp!=null&&temp.length>0){total=parseFloat((temp[0].innerText||temp[0].textContent).replace(/[^0-9\.\+]/g,""));}}}
catch(ex2){}
try{var temptotal=_insideJQ("#STP--Cart-NumberItems").text();if(temptotal!=null&&temptotal.length>0){orderId="auto";items=parseFloat(temptotal.replace(/[^0-9\.\-\+]/g,""));}}
catch(tempex){}
if(orderId==null||orderId==""||orderId=="0")
return null;return{"orderId":"auto","items":items,"total":total};}
var getCartOverlayItem=function(){var name="";var img="";try{var itemElem=getElem("cartOverlayProdImg",getElem("addtocart",document)[0])[0];name=itemElem.title;img=itemElem.src;}
catch(ex){}
if("sku"!=""&&name!="")
return{"name":myTrim(name),"img":img};return null;};var queue=[];var enqueue=function(func){queue.push(func);};var tick=function(){var _queue=queue||[];queue=[];for(var i=0;i<_queue.length;i++)
_queue[i]();setTimeout(tick,2000);};var _cartSummaryView=null;var _cartSummaryTimeout=10;function waitForCartSummary(){if(_cartSummaryView==null)
return;var orderTotal=null;try{var elem=document.getElementsByClassName("order_summary_group")[0].getElementsByClassName("order_grand_total")[0];orderTotal=(elem.innerText||elem.textContent).split(":")[1].replace(/[^0-9\.\-\+]/g,"");}
catch(ex){}
if(orderTotal!=null||_cartSummaryTimeout==0){if(staplesCart!=null){_cartSummaryView.orderId=staplesCart.orderId;_cartSummaryView.orderTotal=orderTotal!=null&&!isNaN(orderTotal)?orderTotal:staplesCart.total;}
_inside.push(_cartSummaryView);insertInsideTag();}
else{_cartSummaryTimeout--;enqueue(waitForCartSummary);}}
function handleCartUpdate(){try{var staplesCartCookie=getStaplesCart();if(typeof(staplesCartCookie)!="undefined"&&_staplesCartCookie.items!=staplesCartCookie.items){try{if(staplesCartCookie.items>0){var temporder=getOrderDataCheckout();if(temporder!=null&&temporder.length>0){updateCheckoutCartData();}
else{var tempprice=parseFloat(_insideJQ("#atcOverlay .stp--cart-item-mathstory").text().split(" ")[2].replace(/[^0-9\.\-\+]/g,""));var tempqty=parseInt(_insideJQ("#atcOverlay .stp--cart-item-mathstory").text().split(" ")[0]);var temptotal=staplesCart.total;if(typeof(temptotal)=="undefined"||temptotal==null||temptotal<=0)
temptotal=tempprice*tempqty;try{var tempinsidetotal=sessionStorage.getItem("insideordertotal");if(tempinsidetotal!=null){if((typeof tempinsidetotal==='string'||tempinsidetotal instanceof String)&&tempinsidetotal.length>0){temptotal=temptotal+parseFloat(tempinsidetotal);}
else if(typeof tempinsidetotal=="number"&&tempinsidetotal>0){temptotal=temptotal+tempinsidetotal;}}}
catch(tempex){}
_inside.push({"action":"addItem","orderId":"auto","name":_insideJQ(_insideJQ("#atcOverlay .stp--cart-item-info .cart-item-prod-name")[0]).text(),"img":fixImage(_insideJQ("#atcOverlay .stp--cart-item-info img")[0].src),"sku":_insideJQ("#atcOverlay .stp--cart-item-mathstory")[0].id,"qty":tempqty,"price":tempprice});_inside.push({"action":"trackOrder","orderId":"auto","orderTotal":temptotal,"update":true});sessionStorage.setItem("insideordertotal",temptotal);if(typeof(_insideGraph)!="undefined"&&_insideGraph!=null)
insertInsideTag();}}
else if(_staplesCartCookie!=null&&typeof(_staplesCartCookie.items)!="undefined"&&_staplesCartCookie.items!=null&&_staplesCartCookie.items>0){_inside.push({"action":"trackOrder","orderId":"auto","orderTotal":0});if(typeof(tempcurview.orderId)!="undefined")
delete(tempcurview.orderId);if(typeof(tempcurview.orderTotal)!="undefined")
delete(tempcurview.orderTotal);_inside.push(tempcurview);insertInsideTag();}}
catch(tempex){}
_staplesCartCookie=staplesCartCookie;}}
catch(ex){}
enqueue(handleCartUpdate);}
function fixImage(img){if(img!=""){if(img.indexOf("/")==0&&img.indexOf("//")!=0)
return "https://"+document.location.host+img;return img;}
return "";}
function insertInsideTag(){if(typeof(_insideGraph)!="undefined"&&_insideGraph!=null){_insideGraph.processQueue();}
else{var inside=document.createElement('script');inside.type='text/javascript';inside.async=true;inside.src=('https:'==document.location.protocol?'https://':'http://')+trackerURL+'/ig.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(inside,s);}}
function setVisitorData(tracker,key,value){if(typeof(value)==="undefined"||value==null||value==="")
return;if(typeof(tracker["visitorData"])==="undefined"||tracker["visitorData"]==null){tracker["visitorData"]={};}
tracker["visitorData"][key]=value;}
function setCustomerData(tracker){try{if(typeof(_insideData)!="undefined"&&_insideData!=null&&typeof(_insideData.customer)!="undefined"&&_insideData.customer!=null){for(var key in _insideData.customer){if(_insideData.customer.hasOwnProperty(key)){if(_insideData.customer[key]!=null){if(typeof _insideData.customer[key]==='string'||_insideData.customer[key]instanceof String){if(_insideData.customer[key].length>0)
setVisitorData(tracker,key,_insideData.customer[key]);}
else if(isNumeric(_insideData.customer[key])){setVisitorData(tracker,key,_insideData.customer[key]);}
else if(typeof(_insideData.customer[key])==typeof(true)){setVisitorData(tracker,key,_insideData.customer[key]);}
else if(_insideData.customer[key].constructor===Array&&_insideData.customer[key].length>0){setVisitorData(tracker,key,_insideData.customer[key]);}}}}}}
catch(tempex){}
return null;}
function setMembershipData(tracker){try{if(typeof(_insideData)!="undefined"&&_insideData!=null&&typeof(_insideData.membership)!="undefined"&&_insideData.membership!=null){for(var key in _insideData.membership){if(_insideData.membership.hasOwnProperty(key)){if(_insideData.membership[key]!=null){if(typeof _insideData.membership[key]==='string'||_insideData.membership[key]instanceof String){if(_insideData.membership[key].length>0)
setVisitorData(tracker,"membership_"+key,_insideData.membership[key]);}
else if(isNumeric(_insideData.membership[key])){setVisitorData(tracker,"membership_"+key,_insideData.membership[key]);}
else if(typeof(_insideData.membership[key])==typeof(true)){setVisitorData(tracker,"membership_"+key,_insideData.membership[key]);}
else if(_insideData.membership[key].constructor===Array&&_insideData.membership[key].length>0){setVisitorData(tracker,"membership_"+key,_insideData.membership[key]);}}}}}}
catch(tempex){}
return null;}
function updateMembershipData(){try{if(typeof(_insideData)!="undefined"&&_insideData!=null&&typeof(_insideData.membership)!="undefined"&&_insideData.membership!=null&&typeof(_insideData.membership.skus)!="undefined"&&_insideData.membership.skus!=null&&_insideData.membership.skus.length>0){setMembershipData(_insideGraph.current);_inside.push(tempcurview);insertInsideTag();}}catch(tempex){}}
function sendToInside(){var addToData=function(data,key,value){if(typeof(value)!="undefined"&&value!=null)
data[key]=value;};try{var view={"action":"trackView","name":"Page Data Missing","type":"other"};var order=null;var orderItems=[];var customTags=[];var heirarchybool=false;if(typeof _insideData!="undefined"&&_insideData!=null){if(typeof _insideData.customer!="undefined"&&typeof _insideData.customer.id!="undefined"&&_insideData.customer.id!=""){tracker["visitorId"]=_insideData.customer.id;tracker["visitorName"]=myTrim((_insideData.customer.firstName||"")+" "+(_insideData.customer.lastName||""));setCustomerData(tracker);}
if(typeof _insideData.page!="undefined"&&_insideData.page!=null){var temppagetype="other";if(typeof _insideData.page.type!="undefined"&&_insideData.page.type!=null){switch(_insideData.page.type.toLowerCase()){case "home":case "sahome":case "homepage":temppagetype="homepage";break;case "pmm1":case "category":case "class":case "dailydeals":temppagetype="productcategory";break;case "odinsku":temppagetype="product";break;case "searchresults":temppagetype="search";break;case "login":case "logon":case "registration":temppagetype="login";break;case "easycheckout":case "yourcart":case "checkout":case "cart":temppagetype="checkout";break;case "easycheckoutorderconf":case "ocppage":temppagetype="orderconfirmed";break;case "other":try{if(typeof(Analytics)!="undefined"&&Analytics!=null){if(typeof(Analytics.tracking)!="undefined"&&Analytics.tracking!=null&&typeof(Analytics.tracking.tier)!="undefined"&&Analytics.tracking.tier!=null&&Analytics.tracking.tier.length>0){if(Analytics.tracking.tier.toLowerCase().indexOf("super category")==0){temppagetype="productcategory";}}
if(typeof(Analytics.traffic)!="undefined"&&Analytics.traffic!=null&&typeof(Analytics.traffic.pagename)!="undefined"&&Analytics.traffic.pagename!=null&&Analytics.traffic.pagename.length>0){if(Analytics.traffic.pagename.toLowerCase().indexOf("pdp")==0){temppagetype="product";}}}}catch(otherex){}}}
else{if(window.location.href.indexOf("/confirmOrder")!=-1||_insideData.page.name=="orderconfirm"){temppagetype="orderconfirmed";}
else if(window.location.href.indexOf("/cart")!=-1){temppagetype="checkout";}}
view={"action":"trackView","name":_insideData.page.name,"type":temppagetype};try{if(view.name==null||view.name.length==0){var tempPageName=getPageName();if(tempPageName!=null&&tempPageName.length>0){view.name=tempPageName;}}
if(view.type=="search"&&view.name=="search"){var tempPageName=getPageName();if(tempPageName!=null&&tempPageName.length>0){view.name=tempPageName;}}
else if(view.type=="productcategory"&&view.name=="browse"){var tempPageName=getPageName();if(tempPageName!=null&&tempPageName.length>0){view.name=tempPageName;}}}
catch(tempex){}
if(window.location.href.indexOf("/registration")!=-1){view.type="login";view.name="Registration";}
else if(window.location.href.indexOf("/StaplesForgotCredentials")!=-1){view.type="login";view.name="Forgot Credentials";if(window.location.href.indexOf("action=fUname")!=-1){view.name="Forgot Username";}
else if(window.location.href.indexOf("action=fPwd")!=-1){view.name="Forgot Password";}}
if(temppagetype=="product"){if(typeof(_insideData.page.productName)!="undefined"&&_insideData.page.productName!=null&&_insideData.page.productName.length>0)
view.name=_insideData.page.productName;if(typeof(Analytics)!="undefined"&&Analytics!=null&&typeof(Analytics.tracking)!="undefined"&&Analytics.tracking!=null&&typeof(Analytics.tracking.item)!="undefined"&&Analytics.tracking.item!=null){if(typeof(Analytics.tracking.item.name)!="undefined"&&Analytics.tracking.item.name!=null&&Analytics.tracking.item.name.length>0)
view.name=Analytics.tracking.item.name;if(typeof(Analytics.tracking.item.sku)!="undefined"&&Analytics.tracking.item.sku!=null)
view.sku=Analytics.tracking.item.sku;if(typeof(Analytics.tracking.item.imageUrl)!="undefined"&&Analytics.tracking.item.imageUrl!=null&&Analytics.tracking.item.imageUrl.length>0)
view.img=Analytics.tracking.item.imageUrl;}}
var img=_insideData.page.img||"";if(img!=""){if(img.indexOf("home_logo.png")!=-1&&view.type=="product"){view["img"]=getProductImage();}
else
view["img"]=fixImage(img);}
addToData(view,"sku",_insideData.page.sku);addToData(view,"price",_insideData.page.price);if(typeof(_insideData.page.data)!="undefined"&&_insideData.page.data!=null){view["data"]=_insideData.page.data;}
if(typeof(view.data)=="undefined")
view.data={};var heirarchy=[];for(var i=1;i<=4;i++){var val=null;if(typeof(_insideData.page["L"+i])!="undefined"&&_insideData.page["L"+i]!=null&&typeof(_insideData.page["L"+i].value)!="undefined"&&_insideData.page["L"+i].value!=null)
var val=myTrim(_insideData.page["L"+i].value);else if(typeof(_insideData.page["L"+i])!="undefined"&&_insideData.page["L"+i]!=null)
var val=myTrim(_insideData.page["L"+i]);if(typeof(val)!="undefined"&&val!=null){view.data["L"+i]=val;heirarchy.push(val.replace(/\//g,"|"));if(i==1){customTags.push("Supercategory:"+val);}
else if(i==2){customTags.push("Category:"+val);}
else if(i==3){customTags.push("Department:"+val);}
else if(i==4){customTags.push("Class:"+val);}}}
if(heirarchy.length>0){if(heirarchy[heirarchy.length-1]==view.name)
heirarchy.splice(heirarchy.length-1,1);view["category"]=heirarchy.join(" / ");heirarchybool=true;}}
if(typeof _insideData.cart!="undefined"&&_insideData.cart!=null){if(typeof(_insideData.cart.total)=="undefined"){if(typeof(_insideData.cart.orderTotal)!="undefined"&&_insideData.cart.orderTotal>0)
_insideData.cart.total=_insideData.cart.orderTotal;}
if(_insideData.cart.total>0){order={"action":"trackOrder","orderId":"auto","orderTotal":_insideData.cart.total};if(view!=null&&!_insideData.cart.complete){view["orderId"]="auto";view["orderTotal"]=_insideData.cart.total;}
if(_insideData.cart.complete){order["complete"]=true;order["newOrderId"]=_insideData.cart.newOrderId;sessionStorage.removeItem("insideordertotal");}
if(typeof _insideData.cart.items!="undefined"&&_insideJQ.isArray(_insideData.cart.items)){for(var i=0;i<_insideData.cart.items.length;i++){var item=_insideData.cart.items[i];orderItems.push({"action":"addItem","orderId":"auto","name":item.name,"sku":item.sku,"img":fixImage(item.img||""),"qty":item.qty,"price":item.price});}}
else{order["update"]=true;}}}}
else{var visitorName="";var visitorId=getUserId();if(visitorId!=null&&visitorId.length>0){tracker.visitorId=visitorId;}
view=getViewData();if(view!=null){if(typeof(window.pageId)!="undefined"&&window.pageId=="easycheckout"){_cartSummaryView=view;waitForCartSummary();}
else{if(view.type=="checkout"){var orderData=getOrderDataCheckout();if(orderData!=null&&orderData.length>0){for(var i=0;i<orderData.length;i++){_inside.push(orderData[i]);if(orderData[i].action=="trackOrder"){view.orderId=orderData[i].orderId;view.orderTotal=orderData[i].orderTotal;}}}}
else if(staplesCart!=null&&staplesCart.items!=null&&staplesCart.items>0){if(typeof(staplesCart.total)!="undefined"&&staplesCart.total!=null&&staplesCart.total>0){view["orderId"]=staplesCart.orderId;view["orderTotal"]=staplesCart.total;}
else{var tempordertotal=sessionStorage.getItem("insideordertotal");if(tempordertotal!=null){view["orderId"]=staplesCart.orderId;view["orderTotal"]=tempordertotal;}}}}}}
if(typeof(s)!="undefined"&&s!=null&&typeof(s.prop6)!="undefined"&&s.prop6!=null&&s.prop6.length>0&&!heirarchybool){var tempsplit=s.prop6.split(":");var heirarchy=[];if(tempsplit.length>0&&typeof(view.data)=="undefined")
view["data"]={};for(var i=0;i<tempsplit.length;i++){var val=typeof(_insideData)!="undefined"&&typeof(_insideData.page["L"+(i+1)])!="undefined"?_insideData.page["L"
+(i+1)]:tempsplit[i];if(val!=null&&val.length>0)
val=myTrim(val);if(val!=null&&val.length>0){if(typeof(_insideData)!="undefined"&&typeof(_insideData.page["L"+(i+1)])=="undefined")
view.data["L"+(i+1)]=val;heirarchy.push(val.replace(/\//g,"|"));}
if(i==0){customTags.push("Supercategory:"+val);}
else if(i==1){customTags.push("Category:"+val);}
else if(i==2){customTags.push("Department:"+val);}
else if(i==3){customTags.push("Class:"+val);}}
if(heirarchy.length>0){if(heirarchy[heirarchy.length-1]==view.name)
heirarchy.splice(heirarchy.length-1,1);view["category"]=heirarchy.join(" / ");}}
var zipCode=getCookie("zipcode");if(typeof(zipCode)!="undefined"&&zipCode!=null&&zipCode!=""){customTags.push("zip:"+zipCode);if(typeof(tracker.visitorData)=="undefined"||tracker.visitorData==null)
tracker["visitorData"]={};tracker.visitorData["zipCode"]=zipCode;}
if(view.type=="search"&&typeof(Analytics)!="undefined"&&Analytics!=null&&typeof(Analytics.tracking)!="undefined"&&Analytics.tracking!=null&&Analytics.tracking.numResults==0)
customTags.push("NoResults");if(view.type=="checkout"){var shipToStore=false;var shipToStoreChk=document.getElementById("shipToStoreChk");if(shipToStoreChk!=null){if(shipToStoreChk.checked)
shipToStore=true;}
else{var cart_summary=getElem("cart-page",document);if(cart_summary!=null&&cart_summary.length>0){var pickup_info=getElem("pickup-info",cart_summary[0]);if(pickup_info!=null&&pickup_info.length>0)
shipToStore=true;}
else{cart_summary=getElem("pickup-collapsed",document);if(cart_summary!=null&&cart_summary.length>0){var pickup_info=getElem("pickup-store",cart_summary[0]);if(pickup_info!=null&&pickup_info.length>0)
shipToStore=true;}}}
if(shipToStore)
customTags.push("shiptostore");}
if(customTags.length>0)
view["tags"]=customTags.join(",");if(typeof(_insideData)=="undefined"||typeof(_insideData.customer)=="undefined"||typeof(_insideData.customer.tier)=="undefined"){try{var customerTier=getCookie("customerTier");if(customerTier!=null&&customerTier!=""){customerTier=JSON.parse(customerTier.replace(/({|,)(?:\s*)(?:')?([A-Za-z_$\.][A-Za-z0-9_ \-\.$]*)(?:')?(?:\s*):/g,"$1\"$2\":"));if(typeof(customerTier.tier)!="undefined"){if(typeof(tracker.visitorData)=="undefined"||tracker.visitorData==null)
tracker["visitorData"]={};tracker.visitorData["tier"]=customerTier.tier;}}}
catch(ctEx){}}
if(typeof(_insideData)=="undefined"||typeof(_insideData.customer)=="undefined"||typeof(_insideData.customer.rewards)=="undefined"){try{var customerRewardsNumber=getCookie("StaplesRewardsInfo");if(typeof customerRewardsNumber!='undefined'&&customerRewardsNumber!=null&&customerRewardsNumber.indexOf(",")>-1&&customerRewardsNumber.split(',').length>1){customerRewardsNumber=customerRewardsNumber.split(',')[1];if(typeof customerRewardsNumber!='undefined'&&customerRewardsNumber.indexOf(":")>-1&&customerRewardsNumber.split(':').length>1){customerRewardsNumber=customerRewardsNumber.split(':')[1];customerRewardsNumber=customerRewardsNumber.replace(/(}")|(}$)/g,"");customerRewardsNumber=customerRewardsNumber.replace(/(^")|("$)/g,'');if(typeof(tracker.visitorData)=="undefined"||tracker.visitorData==null)
tracker["visitorData"]={};tracker.visitorData["rewards"]=customerRewardsNumber;}}}
catch(crEx){}}
if(typeof(isTargetType)!="undefined"&&isTargetType!=null){if(typeof(tracker.visitorData)=="undefined"||tracker.visitorData==null)
tracker["visitorData"]={};tracker.visitorData["isTargetType"]=isTargetType;}
if(order!=null&&order.complete){for(var i=0;i<orderItems.length;i++)
_inside.push(orderItems[i]);_inside.push(order);_inside.push(view);}
else if(view.type=="orderconfirmed"){var orderDataConfirm=getOrderDataConfirmed();if(orderDataConfirm!=null){for(var i=0;i<orderDataConfirm.length;i++){_inside.push(orderDataConfirm[i]);try{if(orderDataConfirm[i].action=="trackOrder")
sessionStorage.setItem("insidelastorderid",orderDataConfirm[i].newOrderId);}
catch(tempex){}}}
_inside.push(view);sessionStorage.removeItem("insideordertotal");}
else{_inside.push(view);if(order!=null&&orderItems.length>0){for(var i=0;i<orderItems.length;i++)
_inside.push(orderItems[i]);_inside.push(order);}
else{if(staplesCart!=null&&staplesCart.items!=null&&staplesCart.items>0){if(typeof(staplesCart.total)!="undefined"&&staplesCart.total!=null&&staplesCart.total>0){view["orderTotal"]=staplesCart.total;view["orderId"]=staplesCart.orderId;}
else{var tempordertotal=sessionStorage.getItem("insideordertotal");if(tempordertotal!=null){view["orderTotal"]=tempordertotal;view["orderId"]=staplesCart.orderId;}}}
if(view.type=="checkout"){var orderData=getOrderDataCheckout();if(orderData!=null&&orderData.length>0){for(var i=0;i<orderData.length;i++){_inside.push(orderData[i]);if(orderData[i].action=="trackOrder"){view.orderId=orderData[i].orderId;view.orderTotal=orderData[i].orderTotal;}}}}}}
try{setVisitorData(tracker,"JSESSIONID",getCookie("JSESSIONID"));setVisitorData(tracker,"SMSESSION",getCookie("SMSESSION"));setVisitorData(tracker,"dcsso",getCookie("dcsso"));if(typeof(_insideData)!="undefined"&&_insideData!=null&&typeof(_insideData.membership)!="undefined"&&_insideData.membership!=null&&typeof(_insideData.membership.skus)!="undefined"&&_insideData.membership.skus!=null&&_insideData.membership.skus.length>0){_insideMembershipSkuBool=true;}
setMembershipData(tracker);}
catch(tempex){}
log(_inside);tempcurview=view;insertInsideTag();enqueue(handleCartUpdate);tick();if(!_insideMembershipSkuBool){deferWait(updateMembershipData,function(){_insideMembershipCount=_insideMembershipCount+1;if(_insideMembershipCount>20)
return true;if(typeof(_insideData)!="undefined"&&_insideData!=null&&typeof(_insideData.membership)!="undefined"&&_insideData.membership!=null&&typeof(_insideData.membership.skus)!="undefined"&&_insideData.membership.skus!=null&&_insideData.membership.skus.length>0&&typeof(insideFrontInterface)!="undefined"&&insideFrontInterface!=null){_insideMembershipSkuBool=true;return true;}
return false;});}}
catch(error){_inside=[];_inside.push({"action":"trackView","type":"other","name":"Check: "+window.location.href,"data":{"error":error}});log(error);insertInsideTag();}}
_refreshInsideView=sendToInside;deferWait(sendToInside,function(){var tempurl=window.location.href;if(tempurl.indexOf("easycheckoutorderconf")!=-1||tempurl.indexOf("confirmOrder")!=-1){var temporderdata=getOrderDataConfirmed();if((temporderdata!=null&&temporderdata.length>0)||(typeof(_insideData)!="undefined"&&_insideData!=null&&typeof(_insideData.cart)!="undefined"&&_insideData.cart!=null&&typeof(_insideData.cart.newOrderId)!="undefined"&&_insideData.cart.newOrderId!=null))
return true;}
if(document.readyState!='loading'&&document.readyState!='interactive'){try{var tempview=getViewData();_insideCount=_insideCount+1;if(tempurl.indexOf("easycheckoutorderconf")!=-1||tempurl.indexOf("confirmOrder")!=-1){if(_insideCount<20)
return false;}
else if(tempview.type=="checkout"){var temporder=getOrderDataCheckout();if(temporder!=null&&temporder.length>0){return true;}
else{deferWait(updateCheckoutCartData,function(){var temporder=getOrderDataCheckout();return(temporder!=null&&temporder.length>0)});}}
else if(tempview.type=="product"||tempview.type=="productcategory"||(typeof(_insideData)!="undefined"&&_insideData!=null&&typeof(_insideData.page)!="undefined"&&_insideData.page!=null&&_insideData!=null&&typeof(_insideData.page.type)!="undefined"&&_insideData.page.type!=null&&_insideData.page.type.length>0&&_insideData.page.type=="odinsku"||_insideData.page.type=="class"||_insideData.page.type=="category")){if(typeof(s)=="undefined"||s==null||typeof(s.prop6)=="undefined"||s.prop6==null){if(_insideCount<15)
return false;}}
else{if(typeof(Analytics)!="undefined"&&Analytics!=null){return true;}
else if(_insideCount<7)
return false;}}
catch(tempex){}
return true;}});}
if(window.location.href.indexOf("no_insidechat=true")!=-1){return;}
else{if(typeof(_insideGraph)!="undefined"&&_insideGraph!=null&&typeof(_insideGraph.current)!="undefined"&&_insideGraph.current!=null){processInside(_insideGraph.current)}
else{var insideTracker={"action":"getTracker","crossDomain":false,"account":accountKey};if(typeof(subsiteId)!="undefined"&&subsiteId!=null)
insideTracker["subsiteId"]=subsiteId;_inside.push(insideTracker);_inside.push({"action":"bind","name":"onload","callback":function(tracker){if(_insideFirstLoad)
return;_insideJQ=_insideGraph.jQuery;processInside(tracker)}});(function(w,d,s,u){a=d.createElement(s),m=d.getElementsByTagName(s)[0];a.async=1;a.src=u;m.parentNode.insertBefore(a,m);})(window,document,"script","//"+trackerURL+"/ig.js");}}})();