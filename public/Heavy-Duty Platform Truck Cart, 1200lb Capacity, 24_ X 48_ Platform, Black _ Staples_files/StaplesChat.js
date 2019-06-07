var _insideData = {};
var productName = "";
var pageName = "";
var pageType = "other";
var superCategory = "";
var categoryName = "";
var departmentName = "";
var className = "";
var currentSKUNbr = "";
var productPrice = 0;
var pdctImage = "";
var userType = "";
var custId = "";
var customerRewardsNumber = "";
var custTier = "";
var custEmail = "";
var items = "";
var unitPrice = "";
var quantity = "";
var orderId = null;
var ordTotal = 0;
var confirmOrderId = "";
var orderConfirmed = false;
var isMidMarket = "";
var isTargetType = "";
var langId="";
var domainChat = location.hostname;
var index1 = domainChat.indexOf("staples.com");
var index3 = domainChat.indexOf("localhost");
var waitInterval = 0;
var STAPLES = window.STAPLES || {};
var searchPhrase = "";
// var _insideFirstCheck  = true;
// var _inside = _inside || [];
// _inside.push({
//   action: "bind",
//   name: "chatavailable",
//   callback: function(available) {
//     if (_insideFirstCheck) {
//       _insideFirstCheck = false;
//       setTimeout(function() {
//         if (insideFrontInterface.chat.data) {
//           var messages = insideFrontInterface.chat.data.chats;
//           if (messages && messages.length > 0) {
//             for (var i = 0; i < messages.length; i++) {
//               if (messages[i].fromid.indexOf("user:") == 0 && messages[i].text !== "/closechat")
// {                 insideFrontInterface.openChatPane(true);                 break;               }
//             }
//           }
//         }
//       }, 0);
//     }
//   }
// });


//This function will return customer information and also populate customer information in insideData object.
function getLocalStorage() {
	if (typeof window.localStorage !== 'undefined') {
		return window.localStorage;
	} else {
		return {
			removeItem: function removeItem(key) {
				return undefined;
			},
			getItem: function getItem(key) {
				return undefined;
			},
			setItem: function setItem(key, data) {
				return undefined;
			}
		};
	}
}

function updateCustomerInformation() {
	if(STAPLES.Cookies) {
			custId = STAPLES.Cookies.getCookie("StaplesUser");
	    customerRewardsNumber = STAPLES.Cookies.getCookie("StaplesRewardsInfo");
	    custTier = STAPLES.Cookies.getCookie("customerTier");
	    custEmail = STAPLES.Cookies.getCookie("customerEmailAddress");
	}
	else{
		custId = getCookie("StaplesUser");
		customerRewardsNumber = getCookie("StaplesRewardsInfo");
		custTier = getCookie("customerTier");
		custEmail = getCookie("customerEmailAddress");
	}
	if (typeof customerRewardsNumber != "undefined" && customerRewardsNumber != '' && customerRewardsNumber != null && customerRewardsNumber.indexOf(",") > -1 && customerRewardsNumber.split(",").length > 1) {
			customerRewardsNumber = customerRewardsNumber.split(",")[1];
			if (typeof customerRewardsNumber != "undefined" && customerRewardsNumber.indexOf(":") > -1 && customerRewardsNumber.split(":").length > 1) {
					customerRewardsNumber = customerRewardsNumber.split(":")[1];
					customerRewardsNumber = customerRewardsNumber.replace(/(}")|(}$)/g, "");
					customerRewardsNumber = customerRewardsNumber.replace(/(^")|("$)/g, "")
			}
	}
	if(customerRewardsNumber == undefined){
		customerRewardsNumber = "";
	}

	if (typeof custId != "undefined" && custId != null && custId != "" && custId.indexOf(":") != -1) {
	    custId = custId.split(":")[1]
	} else {
	    custId = ""
	}
	if (typeof custTier != "undefined" && custTier != null && custTier != "") {
	    var tempCustTier = custTier.split(",");
	    if (tempCustTier.length > 1) {
	        /*tempCustTier = tempCustTier[1].split(":");
	        if (tempCustTier.length > 0) {
	            custTier = tempCustTier[1].replace(/(^")|("$)/g, "")
	        }*/
					for (var key in tempCustTier) {
            var tempTier = tempCustTier[key].split(":");
            if ((tempTier.length > 0) && (tempTier[0] == "tier")) {
                custTier = tempTier[1].replace(/(^")|("$)/g, "");
                break;
            }
            else{
              custTier = "";
            }
          }
	    }
	} else {
	    custTier = ""
	}
	if (typeof custEmail != "undefined" && custEmail != null && custEmail != "") {
	    custEmail = custEmail
	} else {
	    custEmail = ""
	}

	var customer = {
			id: custId,
			rewards: customerRewardsNumber,
			tier: custTier,
			email: custEmail,
			isMidMarket: isMidMarket,
			isTargetType: isTargetType
	};
	_insideData.customer = getCustomerInformation(customer);
	//_insideData.customer.rewards = 1989124613;
	return customer;
}

//this function is used to fetch service Data and call staplesChat code
function fetchServiceData() {
	var session = getCookie("SMSESSION");
	if ((location.href).indexOf("staplesadvantage") == -1) {
		//var triggerChat = function() {
    updateCustomerInformation();
//};
// var interval_analytics = 10;
// var analytics = function () {
// 	if (window.ae && window.ae.EventManager) {
// 	    var regPgLoadHandler = {
// 	        handle: function(annotations) {
// 	            if (window.Analytics && window.Analytics.traffic) {
// 	                triggerChat();
// 	            }
// 	        },
// 	        getAction: function() {
// 	            return window.ae.EventType.VIEWLOADED;
// 	        }
// 	    };
// 	    window.ae.EventManager.registerHandler(regPgLoadHandler);
// 	}
// 	else {
// 		interval_analytics = interval_analytics >= 1000 ? 1000 : interval_analytics * 2;
// 		setTimeout(analytics, interval_analytics);
// 	}
// };
// setTimeout(analytics, interval_analytics);



	}
	let serviceUrl = '/sdc/ptd/api/rewardsUser/getRewards'
		var isDesign = (window.location.href).indexOf("design");
		var url =(location.href).indexOf("rewards.staples.com");
		if(isDesign == -1 && session != null && session != "" && session != "LOGGEDOFF" && url == -1) {
			var xmlhttp = new XMLHttpRequest();

	    xmlhttp.onreadystatechange = function() {
	        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
	           if (xmlhttp.status == 200) {
	               var memberData = xmlhttp.response;
					 				if(memberData == ""){
					 					var cisInfo = getLocalStorage().getItem("cisInfo");
					 					if(cisInfo != "" && cisInfo != null){
					 						cisInfo = JSON.parse(cisInfo);
					 						if(cisInfo.cisData && cisInfo.cisData.membershipData)	{
					 							cisInfo = cisInfo.cisData.membershipData;
					 							populatemembershipData(cisInfo);
					 						}
					 					}
					 				}else{
										memberData = JSON.parse(memberData);
		 							 populatemembershipData(memberData);
									}
					 				staplesChatCode();
	           }
	           else if (xmlhttp.status == 400) {
							 var cisInfo = getLocalStorage().getItem("cisInfo");
							 if(cisInfo != "" && cisInfo != null){
								 cisInfo = JSON.parse(cisInfo);
								 if(cisInfo.cisData && cisInfo.cisData.orchidData)	{
									 cisInfo = cisInfo.cisData.orchidData;
									 populatemembershipData(cisInfo);
								 }
							 }
							 staplesChatCode();
	           }
	           else {
	               console.log('something else other than 200 was returned');
	           }
	        }
	    };

	    xmlhttp.open("GET", serviceUrl, true);
	    xmlhttp.send();
	} else {
		if(_insideData.customer != undefined){
			_insideData.customer.rewards = ""; //reset Rewards number to empty if session expires or logged off
		}

			staplesChatCode();
	}
}

//This function populates membership data based on membership response
function populatemembershipData(memberData) {
	//Analytics.global.visitor.kyd.CISResponse.membershipData
	if(memberData) {
			_insideData.membership = _insideData.membership || {};

			var currentDate = new Date();
			if(memberData.expirationDate && memberData.expirationDate != ""){
				var expiryDate = memberData.expirationDate;
				expiryDate = new Date(expiryDate);

				if(expiryDate > currentDate){
		  		if(memberData.membershipId) {
		  			_insideData.membership.membershipId = memberData.membershipId;
		  		}
		  		if(memberData.skus) {
		  			_insideData.membership.skus = memberData.skus;
		  		}
		  		if(memberData.expirationDate) {
		  			_insideData.membership.expirationDate = memberData.expirationDate;
		  		}
					if(memberData.autoRenewIndicator != undefined) {
		  			_insideData.membership.autoRenewIndicator = memberData.autoRenewIndicator;
		  		}
					if(memberData.memberSinceDate) {
		  			_insideData.membership.memberSinceDate = memberData.memberSinceDate;
		  		}
					if(memberData.skuCount != undefined) {
		  			_insideData.membership.skuCount = memberData.skuCount;
		  		}
					if(memberData.skuInfo) {
						_insideData.membership.skuInfo = memberData.skuInfo;
					}
					if(memberData.skuSwapable != undefined) {
						_insideData.membership.skuSwapable = memberData.skuSwapable;
					}
				}
				// else{
				// 	_insideData.membership.membershipExpired = true;
				// }
			}
  }
}

function myTrim(text) {
	 if (typeof (text) == "undefined" || text == null)
			 return "";
	 return typeof (text.trim) === "function" ? text.trim() : text.replace(/^\s+|\s+$/gm, '');
}

function getCookie(cname) {
		var name = cname + "=";
		if(document.cookie) {
				var ca = document.cookie.split(';');
				for (var i = 0; i < ca.length; i++) {
						var c = myTrim(ca[i]);
						if (c.indexOf(name) == 0){
							var result = c.substring(name.length, c.length);
							result = decodeURIComponent(result);
							return result
						}
				}
		}
		return null;
}

function getSearchPhrase() {
    var meta = document.getElementsByTagName("meta");
    var search_Phrase = "";
    for (var c = 0; c < meta.length; c++) {
      	if (meta[c].getAttribute("name") == "description") {
            search_Phrase = meta[c].getAttribute("content");
            return search_Phrase
        }
    }
		//sba
		if((document.querySelector('#searchInput') !== null)){
			searchPhrase = document.querySelector('#searchInput').value;
		}
		//sbawai
}
function getPageType() {
    var d = document.getElementsByTagName("meta");
    var a = "";
    for (var c = 0; c < d.length; c++) {
			if(d[c].getAttribute("name") != null){
				if ((d[c].getAttribute("name")).toLowerCase() == "pagename") {
					a = d[c].getAttribute("content");
				}
			}
    }
		if((a == "" || a == null) && (document.querySelector('.page-header-message') !== null)){
				a = (document.querySelector('.page-header-message').innerHTML).trim();
		}
		var pName = document.getElementById("pageName");
    if(a == "" || a == null){
			if (pName != null && pName != ""){
	         a= pName.value;
	    }
			else {
				a = "other"
			}
		}
		return a
}

function getPageName() {
		// will check in analytics to see whether pagename is available, else it will read from Dom.
		if(window.Analytics && window.Analytics.traffic && window.Analytics.traffic.pagename) {
			return window.Analytics.traffic.pagename;
		}else{
					var c = document.getElementsByTagName("title");
					if (c != null && c.length > 0) {
							var a = c[0].textContent || c[0].innerText;
							if (typeof(a) == "undefined" || a == null || a == "") {
								return getPageType()
							}
							if (a.indexOf(" | Staples") != -1) {
								a = a.split(" | Staples")[0]
							}
							if (a.indexOf("It's easy to find the Office Supplies, Copy Paper, Furniture, Ink, Toner") != 0 && a.indexOf("Office Supplies, Technology, Ink & Much More") != 0) {
								return a
							} else {
								return getPageType()
							}
					}
				}
}

function getProductImage() {
		// will check in analytics to see whether imageUrl is available, else it will read from Dom.
		if(window.Analytics && window.Analytics.tracking && window.Analytics.tracking.item &&  window.Analytics.tracking.item.imageUrl) {
			return window.Analytics.tracking.item.imageUrl;
		}
		var b = document.getElementsByTagName("meta");
		var c = "";
		for (var a = 0; a < b.length; a++) {
			if (b[a].getAttribute("property") == "og:image") {
				c = b[a].getAttribute("content");
				return c
			}
		}
		c = "";
		if (b != null && b.length > 0) {
			c = b[0].getAttribute("src");
			return c
		}
		return ""
}


function openPFReactiveChat() {
    if (typeof insideFrontInterface != "undefined" && insideFrontInterface != null && insideFrontInterface != "") {
        insideFrontInterface.openChatPane()
    }
}

function getProductPrice() {
		if(window.Analytics && window.Analytics.tracking && window.Analytics.tracking.items && window.Analytics.tracking.items.pdhero_2411692 && window.Analytics.tracking.items.pdhero_2411692.lp) {
			return window.Analytics.tracking.items.pdhero_2411692.lp;
		} else {
			return null;
		}
}

function loadPowerFront(url) {
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.async = true;
    a.src = ("https:" == document.location.protocol ? "https://" : "http://") + url;
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b)
}

//return category from Analytics if available, else return existing
function getPageCategory(category , defaultParam) {
		if(window.Analytics && window.Analytics.tracking && window.Analytics.tracking.item && window.Analytics.tracking.item.producthierarchy && window.Analytics.tracking.item.producthierarchy[category]) {
				return window.Analytics.tracking.item.producthierarchy[category];
		} else {
				return defaultParam;
		}
}

//return skunumber from Analytics if available, else return existing
function getSkuNumber(defaultParam) {
		if(window.Analytics && window.Analytics.tracking && window.Analytics.tracking.item && window.Analytics.tracking.item.sku) {
				return window.Analytics.tracking.item.sku;
		} else {
				return defaultParam;
		}
}

//get customer information
function getCustomerInformation(defaultCustomer) {
	if ((location.href).indexOf("staplesadvantage") == -1) {
		var cisInfo = getLocalStorage().getItem("cisInfo")
		var cisInfoObject, custTier = '', customerRewardsNumber = '', custEmail = '', custId = '', isMidMarket = '', isTargetType = '', kydObject = null, customerSegment = '',
				dcnStatus = '', programskuSelection = '', programskuCount = '', businessSize = '', newCustomer = '', industryVertical ='', priceTier = '', zoneId = '',
				suffixCode = '', device = '', language = '',   shipTo = '',  group = '', division = '', phone = '' , domain = '',
				server = '', jsessionid = ''

		if(cisInfo) {
			cisInfoObject = JSON.parse(cisInfo)
		}

		if(window.Analytics && window.Analytics.global && window.Analytics.global['visitor'] && window.Analytics.global['visitor']['kyd']) {
				kydObject = window.Analytics.global['visitor']['kyd']
		}

		if(kydObject) {
				if(kydObject['rewardstier']) {
						custTier = kydObject['rewardstier']
				}

				if(kydObject['rewardsno']) {
						customerRewardsNumber = kydObject['rewardsno']
				} else if (kydObject['dcn']) {
						customerRewardsNumber = kydObject['dcn']
				}

				if(kydObject['customersegment']) {
						customerSegment = kydObject['customersegment']
				}

				if(kydObject['dcnstatus']) {
						dcnStatus = kydObject['dcnstatus']
				}

				if(kydObject['programskuselection']) {
						programskuSelection = kydObject['programskuselection']
				}

				if(kydObject['programskucount']) {
						programskuCount = kydObject['programskucount']
				}

				if(kydObject['businesssize']) {
						businessSize = kydObject['businesssize']
				}

				if(kydObject['newcustomer']) {
						newCustomer = kydObject['newcustomer']
				}

				if(kydObject['industryvertical']) {
						industryVertical = kydObject['industryvertical']
				}

				if(kydObject['pricetier']) {
						priceTier = kydObject['pricetier']
				}

				if(kydObject['zoneid']) {
						zoneId = kydObject['zoneid']
				}

				if(kydObject['suffixcode']) {
						suffixCode = kydObject['suffixcode']
				}

		} else if(window.Analytics && window.Analytics.global && window.Analytics.global['visitor']) {
				if(window.Analytics.global['visitor']['rewardsTier']) {
						custTier = window.Analytics.global['visitor']['rewardsTier']
				}
				if(window.Analytics.global['visitor']['dcn']) {
						customerRewardsNumber = window.Analytics.global['visitor']['dcn']
				} else if(window.Analytics.global['visitor']['rewards']) {
						customerRewardsNumber = window.Analytics.global['visitor']['rewards'];
				}
		}  else if (cisInfoObject && cisInfoObject.cisData && cisInfoObject.cisData.orchidData) {
					custTier = cisInfoObject.cisData.orchidData.tierSegment;
					customerRewardsNumber = cisInfoObject.cisData.orchidData.rewardsNo;
		}

		if(window.Analytics && window.Analytics.global && window.Analytics.global.visitor && window.Analytics.global.visitor.kyd && window.Analytics.global.visitor.kyd.CISResponse && window.Analytics.global.visitor.kyd.CISResponse.orchidData) {
				if(window.Analytics.global.visitor.kyd.CISResponse.orchidData.email) {
						custEmail = window.Analytics.global.visitor.kyd.CISResponse.orchidData.email
				}

				if(window.Analytics.global['visitor']['language']) {
						language = window.Analytics.global['visitor']['language']
				}

				if(window.Analytics.global['visitor']['shipto']) {
						shipTo = window.Analytics.global['visitor']['shipto']
				}

				if(window.Analytics.global['visitor']['group']) {
						group = window.Analytics.global['visitor']['group']
				}

				if(window.Analytics.global['visitor']['div']) {
						division = window.Analytics.global['visitor']['div']
				}

				if(window.Analytics.global['visitor']['phone']) {
						phone = window.Analytics.global['visitor']['phone']
				}

		} else {
				if(cisInfoObject && cisInfoObject.cisData  && cisInfoObject.cisData.orchidData) {
					custEmail = cisInfoObject.cisData.orchidData.email
				}
		}

		if(cisInfoObject && cisInfoObject.cisData && cisInfoObject.cisData.membershipData && cisInfoObject.cisData.membershipData.membershipId) {
				custId = cisInfoObject.cisData.membershipData.membershipId
		} else if(defaultCustomer){
				custId = defaultCustomer.id
		}

		if(window.Analytics && window.Analytics.global && window.Analytics.global['visit']) {
			if(window.Analytics.global['visit']['device']) {
				device = window.Analytics.global['visit']['device'];
			}
				domain =  window.Analytics.global['visit']['domain'];
			if(window.Analytics.global['visit']['server']) {
				server = window.Analytics.global['visit']['server'];
			}
				jsessionid = window.Analytics.global['visit']['jsessionid'];
				if(jsessionid == null){
					jsessionid = getCookie("JSESSIONID");
					if(jsessionid == null || jsessionid == undefined){
						jsessionid = "";
					}
				}
		}

		var zipCode = getCookie("zipcode")

		zipCode = zipCode || ''

		if(customerRewardsNumber) {
				try {
						var customerRewardsArray = JSON.parse(customerRewardsNumber);
						if(customerRewardsArray[0]) {
								customerRewardsNumber = customerRewardsArray[0];
						}
				} catch(ex) {

				}
		}

		if(custTier || customerRewardsNumber || custEmail) {
			return {
				 id: custId,
				 rewards: customerRewardsNumber,
				 tier: custTier,
				 email: custEmail,
				 isMidMarket: isMidMarket,
				 isTargetType: isTargetType,
				 zipCode: zipCode,
				 customerSegment:  customerSegment,
				 dcnStatus: dcnStatus,
				 programskuSelection: programskuSelection,
				 programskuCount: programskuCount,
				 businessSize: businessSize,
				 newCustomer: newCustomer,
				 industryVertical: industryVertical,
				 priceTier: priceTier,
				 zoneId: zoneId,
		 		 suffixCode: suffixCode,
				 device: device,
				 language: language,
				 shipTo: shipTo,
				 group: group,
				 division: division,
				 phone: phone,
				 domain: domain,
				 server: server,
				 jsessionid: jsessionid
			 }
		} else {
			if(defaultCustomer){
				defaultCustomer.zipCode = zipCode;
				defaultCustomer.device = device;
				defaultCustomer.server = server;
				defaultCustomer.jsessionid = jsessionid;
			}
			return defaultCustomer;
		}
	}
	}

function parseCartItems(c) {
    var b = [];
		if (typeof _insideData != "undefined" && (typeof _insideData.cart == "undefined" || typeof _insideData.cart == undefined)) {
			 _insideData.cart = {};
		}
    if (typeof _insideData != "undefined" && typeof _insideData.cart != "undefined") {
        for (var d = 0; d < c.length; d++) {
            var a = c[d];
            if (typeof a == "object") {
                var e = a.price;
                e = parsePrice(e.toString());
                b.push({
                    name: a.name,
                    sku: a.sku,
                    img: a.img,
                    qty: parseInt(a.qty),
                    price: parseFloat(e)
                })
            }
        }
        _insideData.cart.items = b;
        /*if (typeof STAPLES != "undefined" && typeof STAPLES.Main != "undefined" && typeof STAPLES.Main.parseCart("StaplesCart") != "undefined" && typeof STAPLES.Main.parseCart("StaplesCart").Total != "undefined") {
            var f = parsePrice(STAPLES.Main.parseCart("StaplesCart").Total);
            _insideData.cart.total = parseFloat(f)
        }*/ //Commenting out as Total is always 0 in (STAPLES.Main.parseCart("StaplesCart").Total)
        _insideData.updateCart()
    }
}

function parsePrice(a) {
    if (typeof a != "undefined" && a != "") {
        a = a.replace(/[^0-9\.\-\+]/g, "")
    } else {
        a = 0
    }
    return a
}

function noDisplayElement(b) {
    var a = document.getElementById(b);
    if (typeof(a) != "undefined" && a != null) {
        a.style.display = "none"
    }
}

function hideElement(a) {
    var b = document.getElementById(a);
    if (typeof(b) != "undefined" && b != null) {
        b.style.visibility = "hidden"
    }
}

//This function accepts two functions stapleschatcode and wait condition
//wait condition speicifies whether the system is ready or not
function waitUntilPageLoads(fetchServiceData, waitCondition) {

	var _interval = 10;
	var _spin = function () {
		if (waitCondition()) {
			fetchServiceData();
		}
		else {
			_interval = _interval >= 1000 ? 1000 : _interval * 2;
			setTimeout(_spin, _interval);
		}
	};
	setTimeout(_spin, _interval);
}

function getStaplesCart() {
        var orderId = "0";
        var items = 0;
        var total = 0.00;
        try {
            var staplesCart = STAPLES.Main.parseCart('StaplesCart');
            orderId = staplesCart.OrderID;
            items = parseInt(staplesCart.Items.split(" ")[0]);
            total = staplesCart.preTax;
        } catch (ex) {}
        try {
            var staplesCart = JSON.parse(getLocalStorage().getItem('nc'));
            orderId = staplesCart.cartdId;
            items = parseInt(staplesCart.numberOfItems);
            total = staplesCart.preTax;
						//total = "$"+(total.toLocaleString());
						if(staplesCart.total){
							total = staplesCart.total;
						}
        } catch (ex) {}
        try {
            if (window.location.href.indexOf("/checkout") != -1) {
                var temp = getElem("remain-bal", document);
                if (temp != null && temp.length > 0) {
                    total = parseFloat((temp[0].innerText || temp[0].textContent).replace(/[^0-9\.\+]/g, ""));
                }
            }
        } catch (ex2) {}
        try {
            var temptotal =  document.querySelector('#STP--Cart-NumberItems').innerHTML;
            if (temptotal != null && temptotal.length > 0) {
                orderId = "auto";
                items = parseFloat(temptotal.replace(/[^0-9\.\-\+]/g, ""));
								if(total == undefined){
									total = 0;
								}

            }
        } catch (tempex) {}
        if (orderId == null || orderId == "" || orderId == "0")
            return null;
        return {
            "orderId": "auto",
            "items": items,
            "total": total
        };
}

function getElem(className, context) {
      if (context.getElementsByClassName)
          return context.getElementsByClassName(className);
      var elems = document.querySelectorAll ? context.querySelectorAll("." + className) : (function() {
          var all = context.getElementsByTagName("*")
            , elements = []
            , i = 0;
          for (; i < all.length; i++) {
              if (all[i].className && (" " + all[i].className + " ").indexOf(" " + className + " ") > -1 && indexOf.call(elements, all[i]) === -1)
                  elements.push(all[i]);
          }
          return elements;
      }
      )();
      return elems;
};

function getOrderDataCheckout() {
    try {
        var data = [];
        var tempanalytics = null;
        var contents = getElem("cart-item", document);
        if (typeof (window.Analytics) != "undefined" && window.Analytics != null && typeof (window.Analytics.tracking) != "undefined" && window.Analytics.tracking != null && typeof (window.Analytics.tracking.cart) != "undefined" && window.Analytics.tracking.cart != null && typeof (window.Analytics.tracking.cart.cartitems) != "undefined" && window.Analytics.tracking.cart.cartitems != null && window.Analytics.tracking.cart.cartitems.length > 0) {
            tempanalytics = window.Analytics.tracking.cart.cartitems;
        }
        if (contents != null && contents.length > 0) {
            for (var i = 0; i < contents.length; i++) {
                var coupons = getElem("skuCoupon", contents[i]);
                var qtys = getElem("item-quantity", contents[i]);
                var imgs = getElem("cartItem-image", contents[i]);
                if (imgs == null || imgs.length == 0)
                    imgs = getElem("item-image", contents[i]);
                var prices = getElem("item-price", contents[i]);
                var items = getElem("title-margin", contents[i]);
                var itemname = "";
                if (items != null && items.length > 0)
                    itemname = items[0].getElementsByTagName("a")[0];
                else {
                    items = getElem("item-desc", contents[i])
                    itemname = items[0].getElementsByTagName("p")[0];
                }
                itemname = itemname.innerText || itemname.textContent;
                var price = 1;
                var qty = 1;
                if (tempanalytics != null && tempanalytics.length > i) {
                    price = tempanalytics[i].total / tempanalytics[i].qty;
                    qty = tempanalytics[i].qty;
                }
                price = prices[prices.length - 1];
                price = price.innerText || price.textContent;
                price = parseFloat(price.replace(/[^0-9\.\+]/g, ''));
                try {
                    if (coupons != null && coupons.length > 0) {
                        var coupon = coupons[0].getElementsByTagName("b")[0].innerText || coupons[0].getElementsByTagName("b")[0].textContent;
                        coupon = parseFloat(coupon.replace(/[^0-9\.\+]/g, ''));
                        price = price - coupon;
                    }
                } catch (couponex) {}
                if (qtys != null && qtys.length > 0)
                    qty = qtys[0].getElementsByTagName("input")[0].value;
                else {
                    qtys = getElem("item-qty", contents[i]);
                    qty = qtys[0].innerText || qtys[0].textContent;
                }
                qty = parseFloat(qty.replace(/[^0-9]/g, ''));
                price = price / qty;
                var img = imgs[0].getElementsByTagName("img")[0].src;
                var sku = null;
                if (img != null && img.length > 0) {
                    var tempsku = imgs[0].getElementsByTagName("img")[0].getAttribute("data-sku");
                    if (tempsku != null && tempsku.length > 0) {
                        sku = tempsku;
                    }
                }
                if (sku == null) {
                    if (tempanalytics != null && tempanalytics.length > i) {
                        sku = tempanalytics[i].sku;
                    }
                }
                if (sku != null && sku.length > 0) {
                    data.push({
                        "action": "addItem",
                        "orderId": _insideData.cart.orderId,
                        "name": myTrim(itemname),
                        "price": price,
                        "sku": sku,
                        "img": img,
                        "qty": qty
                    });
                }
            }
        }
        if (data.length > 0) {
            try {
                var temp = getElem("orderinfo-cell", document)[0].getElementsByTagName("tfoot")[0];
                orderTotal = (temp.textContent).split(":").pop();
            } catch (ex2) {}
            try {
                var temp = getElem("remain-bal", document)[0];
                orderTotal = (temp.textContent).split(":").pop();
            } catch (ex2) {}
            data.push({
                "action": "trackOrder",
                "orderId": _insideData.cart.orderId,
                "orderTotal": orderTotal
            });
						_insideData.orderTotal = orderTotal
            //sessionStorage.setItem("insideordertotal", orderTotal);
            return data;
        }
    } catch (ex) {
        //console.log("getOrderDataCheckout error. ", ex);
    }
    return null;
}

function getOrderDataConfirmed() {
      try {
          var newOrderId;
          var orderId = "";
          var orderTotal = 0;
          var temppurchasedata = {};
					if(window.Analytics && window.Analytics.tracking && window.Analytics.tracking.orderconfirm && window.Analytics.tracking.orderconfirm.purchaseid)
							newOrderId = window.Analytics.tracking.orderconfirm.purchaseid;

          if (newOrderId != null && newOrderId != "" && newOrderId != "0") {
              orderId = "auto";
              var lastOrderID = "";
              try {
                  lastOrderID = sessionStorage.getItem("insidelastorderid");
                  if (lastOrderID == newOrderId) {
                      return null;
                  }
              } catch (numex) {}
          }
          if (orderId != "") {
              try {
									if(window.Analytics && window.Analytics.tracking && window.Analytics.tracking.orderconfirm) {
											orderTotal = window.Analytics.tracking.orderconfirm.orderrevenue;
		                  if (typeof (window.Analytics.tracking.orderconfirm.shipping) != "undefined" && window.Analytics.tracking.orderconfirm.shipping != null && window.Analytics.tracking.orderconfirm.shipping > 0) {
		                      orderTotal = orderTotal + window.Analytics.tracking.orderconfirm.shipping;
		                      temppurchasedata.shipping = window.Analytics.tracking.orderconfirm.shipping;
		                  }
		                  if (typeof (window.Analytics.tracking.orderconfirm.tax) != "undefined" && window.Analytics.tracking.orderconfirm.tax != null && window.Analytics.tracking.orderconfirm.tax > 0) {
		                      orderTotal = orderTotal + window.Analytics.tracking.orderconfirm.tax;
		                      temppurchasedata.tax = window.Analytics.tracking.orderconfirm.tax;
		                  }
									}
              } catch (ex2) {}
              return [{
                  "action": "trackOrder",
                  "orderId": orderId,
                  "newOrderId": newOrderId,
                  "data": temppurchasedata,
                  "orderTotal": orderTotal,
                  "complete": true,
                  "update": true
              }];
          }
          return null;
      } catch (ex) {
          //console.log("getOrderDataConfirmed error. ", ex);
          return null;
      }
  }

//wait condition
function waitCondition() {
	var tempurl = window.location.href;
  if (tempurl.indexOf("easycheckoutorderconf") != -1 || tempurl.indexOf("confirmOrder") != -1) {
      var temporderdata = getOrderDataConfirmed();//This can be replaced
      if ((temporderdata != null && temporderdata.length > 0) || (typeof (_insideData) != "undefined" && _insideData != null && typeof (_insideData.cart) != "undefined" && _insideData.cart != null && typeof (_insideData.cart.confirmationId) != "undefined" && _insideData.cart.confirmationId != null))
          return true;
  }
  if (document.readyState != 'loading' && document.readyState != 'interactive') {
      try {
          var tempview = getViewData();
          _insideCount = _insideCount + 1;
          if (tempurl.indexOf("easycheckoutorderconf") != -1 || tempurl.indexOf("confirmOrder") != -1) {
              if (_insideCount < 20)
                  return false;
          } else if (tempview.type == "checkout") {
              var temporder = getOrderDataCheckout();
              if (temporder != null && temporder.length > 0) {
                  return true;
              } else {
                  deferWait(updateCheckoutCartData, function() {
                      var temporder = getOrderDataCheckout();//This can be replaced
                      return (temporder != null && temporder.length > 0)
                  });
              }
          } else if (tempview.type == "product" || tempview.type == "productcategory" || (typeof (_insideData) != "undefined" && _insideData != null && typeof (_insideData.page) != "undefined" && _insideData.page != null && _insideData != null && typeof (_insideData.page.type) != "undefined" && _insideData.page.type != null && _insideData.page.type.length > 0 && _insideData.page.type == "odinsku" || _insideData.page.type == "class" || _insideData.page.type == "category")) {
              if (typeof (s) == "undefined" || s == null || typeof (s.prop6) == "undefined" || s.prop6 == null) {
                  if (_insideCount < 15)
                      return false;
              }
          } else {
              if (typeof (window.Analytics) != "undefined" && window.Analytics != null) {
                  return true;
              } else if (_insideCount < 7)
                  return false;
          }
      } catch (tempex) {}
      return true;
  }
}

//code to be executed after wait and fetch service response.
function staplesChatCode() {

	if (typeof STAPLES != "undefined" && typeof STAPLES.Cookies != "undefined") {
		// if(index1>-1){
		// 	 langId = 1;
		// }else if(index2>-1){
		// 	langId = 1;
		// }else if(index3>-1){
		// 	langId = 1;
		// }
		if((document.querySelector('#seoLangId') !== null)){
				langId = document.getElementById('seoLangId').value;
		}
		if (langId == 2) {
				document.getElementsByTagName("HTML")[0].setAttribute("lang", "fr-CA")
		} else {
				document.getElementsByTagName("HTML")[0].setAttribute("lang", "en")
		}

	    confirmOrderId = STAPLES.Cookies.getCookie("foresee_order_number");
	    isMidMarket = STAPLES.Cookies.getCookie("MM");
	    if (null == isMidMarket || typeof isMidMarket == "undefined") {
	        isMidMarket = "N";
	        isTargetType = "N"
	    } else {
	        if ("YT" == isMidMarket) {
	            isMidMarket = "Y";
	            isTargetType = "Y"
	        } else {
	            if ("T" == isMidMarket) {
	                isTargetType = "Y";
	                isMidMarket = "N"
	            } else {
	                if ("Y" == isMidMarket) {
	                    isTargetType = "N"
	                }
	            }
	        }
	    }
	}
if ((location.href).indexOf("staplesadvantage") == -1) {
	pageType = getPageType();
	pageName = getPageName();
	if((pageName == "search") || (pageType == "searchresults") ){
			searchPhrase = getSearchPhrase();
	}
	pdctImage = getProductImage();
	var breadCrumbDetails = document.getElementsByClassName('breadcrumbs__breadcrumb_link');
		if (breadCrumbDetails.length > 0) {
		    for (i = 0; i < breadCrumbDetails.length; i++) {
		        var tempVal = breadCrumbDetails[i];
		        var catAttr = tempVal.getAttribute("href");
						var catValue = catAttr.substring(1 , catAttr.lastIndexOf("/"));
						var catType =  catAttr.substring(catAttr.indexOf("_")+1,catAttr.indexOf("_") +3);
		        //if()
		        // if (null != catType) {
		        //     catType = catType.substr(0, 2)
		        // }
		        if (catType == "SC") {
		            superCategory = catValue;
		        }
		        if (catType == "CG") {
		            categoryName = catValue;
		        }
		        if (catType == "DP") {
		            departmentName = catValue;
		        }
		        if (catType == "CL") {
		            className = catValue;
		        }
		    }
		}


	if (typeof confirmOrderId != "undefined" && confirmOrderId != null && confirmOrderId != "") {
	    confirmOrderId = confirmOrderId;
	    orderConfirmed = true
	} else {
	    confirmOrderId = ""
	}
	if ((document.querySelector("span[itemprop='sku']") !== null) && typeof((document.querySelector("span[itemprop='sku']"))[0]) != "undefined") {
	    currentSKUNbr = (document.querySelector("span[itemprop='sku']")[0]).innerHTML;
	} else {
	    if (typeof window.Analytics != "undefined" && typeof window.Analytics.tracking != "undefined" && typeof window.Analytics.tracking.item != "undefined") {
	        currentSKUNbr = window.Analytics.tracking.item.sku;
	    }
	}
	if ((document.querySelector("span[itemprop='price']") !== null ) && typeof((document.querySelector("span[itemprop='price']"))[0]) != "undefined") {
				var tempProductPrice = (((document.querySelector("span[itemprop='price']"))[0]).value).replace(/[^0-9\.\-\+]/g, "");
	    productPrice = parseFloat(tempProductPrice);
	} else {
	    if (typeof window.Analytics != "undefined" && typeof window.Analytics.tracking != "undefined" && typeof window.Analytics.tracking.item != "undefined") {
	        productPrice = window.Analytics.tracking.item.displayprice;
	        if (typeof(productPrice) != "undefined") {
	            productPrice = parseFloat(productPrice.replace(/[^0-9\.\-\+]/g, ""))
	        }
	    }
	}
if (typeof window.Analytics != "undefined" && typeof window.Analytics.tracking != "undefined" && typeof window.Analytics.tracking.item != "undefined" && typeof window.Analytics.tracking.item.name != "undefined") {
	productName = window.Analytics.tracking.item.name;
}
else if (document.querySelector('.product-info__product_title') !== null) {
	productName = document.getElementsByClassName("product-info__product_title")[0].innerHTML;
}
if((typeof(pageName) != "undefined") && (pageName.length > 300)){
	 pageName =  (pageName).slice(0,299);
}
	_insideData.page = {
	    type: pageType,
	    name: pageName,
			searchPhrase: searchPhrase,
			productName :productName
	};
	superCategory = getPageCategory('sc',superCategory)
	if (typeof(superCategory) != "undefined" && superCategory != null && superCategory != "null" && superCategory != "") {
	    _insideData.page.L1 = superCategory;
			if (typeof(superCategory.value) != "undefined"){
				if(!(superCategory.value.length > 300)){
					 _insideData.page.L1.value =  (_insideData.page.L1.value).slice(0,299);
				}
			}
	}
	categoryName = getPageCategory('cg',categoryName)
	if (typeof(categoryName) != "undefined" && categoryName != null && categoryName != "null" && categoryName != "") {
	    _insideData.page.L2 = categoryName
			if (typeof(categoryName.value) != "undefined"){
				if(!(categoryName.value.length > 300)){
					 _insideData.page.L2.value = (_insideData.page.L2.value).slice(0,299);
				}
			}
	}
	departmentName = getPageCategory('dp',departmentName)
	if (typeof(departmentName) != "undefined" && departmentName != null && departmentName != "null" && departmentName != "") {
	    _insideData.page.L3 = departmentName
	}
	className = getPageCategory('cl',className)
	if (typeof(className) != "undefined" && className != null && className != "null" && className != "") {
	    _insideData.page.L4 = className
	}
	currentSKUNbr = getSkuNumber(currentSKUNbr)
	if (typeof(currentSKUNbr) != "undefined" && currentSKUNbr != null && currentSKUNbr != "") {
	    _insideData.page.sku = currentSKUNbr
	}
	productPrice = getProductPrice() || productPrice
	if (productPrice > 0) {
	    _insideData.page.price = productPrice
	}
	if (pdctImage != "" && pdctImage != null) {
	    _insideData.page.img = pdctImage
	}
}
	if (orderId != null && orderId != "0") {
	    _insideData.cart = {
	        id: orderId,
	        total: ordTotal
	    };
	    if (typeof pageId != "undefined") {
	        if (pageName == "easycheckoutorderconf" || (pageId != null && pageId == "easycheckoutorderconf")) {
	            _insideData.cart.confirmed = orderConfirmed;
	            _insideData.cart.confirmationId = confirmOrderId;
	            if ((document.querySelector('#easyorderConfContent') !== null) && document.querySelector("#easyorderConfContent").querySelectorAll('.total') && document.querySelector("#easyorderConfContent").querySelector('.total .td').length == 2) {
	                if (langId == 2) {
	                    _insideData.cart.orderTotal = parseFloat((document.querySelector("#easyorderConfContent").querySelector('.total .td'))[1].innerHTML.replace(/[^0-9\.,\-\+]/g, "").replace(/[,]/, "."))
	                } else {
	                    _insideData.cart.orderTotal = parseFloat((document.querySelector("#easyorderConfContent").querySelector('.total .td'))[1].innerHTML.replace(/[^0-9\.\-\+]/g, ""))
	                }
	            }
	        }
	    }
	    items = document.getElementById('cartCollect').innerHTML;
	    if (items != "null" && items != null) {
	        items = JSON.parse(items).products;
	        var cartItems = [];
	        var itemImage = "";
	        var itemName = "";
	        for (var i = 0; i < items.length; i++) {
	            var item = items[i];
	            if ((document.querySelector('#myCartItems') !== null) && (document.querySelector("#myCartItems").querySelectorAll('.cart-row')) && (document.querySelector("#myCartItems").querySelector('.cart-row .pro-div')) && typeof((document.querySelector("#myCartItems").querySelector('.cart-row .pro-div'))[i]) != "undefined" && typeof(((document.querySelector("#myCartItems").querySelector('.cart-row .pro-div'))[i]).getElementsByTagName("img")[0]) != "undefined") {
	                itemImage = (((document.querySelector("#myCartItems").querySelector('.cart-row .pro-div'))[i]).getElementsByTagName("img")[0]).src;
	                if (((document.querySelector("#myCartItems").querySelector('.cart-row .pro-div .pro-desc'))).length > 0 && typeof(((document.querySelector("#myCartItems").querySelector('.cart-row .pro-div .pro-desc')))[i]) != "undefined" && typeof(((document.querySelector("#myCartItems").querySelector('.cart-row .pro-div .pro-desc')))[i].getElementsByTagName("a")[0]) != "undefined") {
	                    itemName = ((document.querySelector("#myCartItems").querySelector('.cart-row .pro-div .pro-desc')))[i].getElementsByTagName("a")[0].innerHTML.trim();
	                }
	            }
	            if (typeof item == "object") {
	                cartItems.push({
	                    name: itemName,
	                    sku: item.partNumber,
	                    img: itemImage,
	                    qty: parseInt(item.productQuantity),
	                    price: parseFloat(item.productPrice)
	                })
	            }
	        }
	        _insideData.cart.items = cartItems
	    }
	} else {
	    if (typeof pageId != "undefined") {
	        if (pageName == "easycheckoutorderconf" || (pageId != null && pageId == "easycheckoutorderconf")) {
	            _insideData.cart = {
	                confirmed: orderConfirmed,
	                confirmationId: confirmOrderId
	            };
	            if ((document.querySelector('#easyorderConfContent') !== null) && (document.querySelector('#easyorderConfContent .total') !== null) && (document.querySelector('#easyorderConfContent .total .td').length == 2)) {
	                if (langId == 2) {
	                    _insideData.cart.orderTotal = parseFloat(document.querySelector('#easyorderConfContent .total .td')[1].innerHTML.replace(/[^0-9\.,\-\+]/g, "").replace(/[,]/, "."))
	                } else {
	                    _insideData.cart.orderTotal = parseFloat(document.querySelector('#easyorderConfContent .total .td')[1].innerHTML.replace(/[^0-9\.\-\+]/g, ""))
	                }
	            }
	        }
	    }
	}

	//The below code is moved from inside.js to staplesChat.js
	var cartInfo = getStaplesCart();

	if(cartInfo) {
		if(!(_insideData.cart)) {
				_insideData.cart = {};
		}
		_insideData.cart.orderId = cartInfo.orderId;
		// added if condition as this is overriding the item list mnapping from parseCartItems function
		if( _insideData && _insideData.cart && _insideData.cart.items == undefined){
			_insideData.cart.items = cartInfo.items
		}
		else if( _insideData && _insideData.cart && _insideData.cart.items && _insideData.cart.items.length == undefined){
			_insideData.cart.items = cartInfo.items
		}
		_insideData.cart.total = cartInfo.total
	}

	var orderDataCheckOut = getOrderDataCheckout();
	if(orderDataCheckOut) {
			if(!(_insideData.cart)) {
					_insideData.cart = {};
			}
			populateOrderCheckoutData(orderDataCheckOut)
	}

	var orderDataConfirmed = getOrderDataConfirmed();
	if(orderDataConfirmed) {
		if(!(_insideData.cart)) {
				_insideData.cart = {};
		}
		populateOrderDataConfirmed(orderDataConfirmed)
	}

	(function () {
		var domain = location.hostname;
		var page_url = location.href;
		var url = "us-sandbox-track.inside-graph.com/gtm/IN-1000307-2/include.js";
		var index1 = domain.match(/^((http[s]?):\/)?\/?(www\.)?(staples.com)/);
		var index3 = domain.match(/^((http[s]?):\/)?\/?(www\.)?(staplesadvantage.com)/);

		if((page_url.indexOf("qa") == -1) && (index1 || ((((domain.indexOf("login")) > -1) && ((domain.indexOf("staples.com")) > -1 ))) || (domain.indexOf("stores.staples.com") > -1) || (domain.indexOf("preview.staples.com") > -1) || (page_url.indexOf("rewards.staples.com") > -1))){
			url="stp-tracker.inside-graph.com/gtm/IN-1000306/include.js";
		}
		if(index3 || ((domain.indexOf("preview.staplesadvantage.com")) > -1)){
			url="stpa-tracker.inside-graph.com/gtm/IN-1000369/include.js";
		}
		// if(index3 && () > -1)){
		// 	url="stpa-tracker.inside-graph.com/gtm/IN-1000369-NEW/include.js";
		// }
		if(((domain.indexOf("cs")) > -1) && ((domain.indexOf("staples.com")) > -1 )){
			url="stpa-tracker.inside-graph.com/gtm/IN-1000369-CS/include.js";
		}
		if(((domain.indexOf("design.staples.com")) > -1) || ((domain.indexOf("printingservices.staples.com")) > -1) || ((page_url.indexOf("staples.com/services/printing/")) > -1)|| ((page_url.indexOf("staples.com/sbd/content/copyandprint/")) > -1)){
			 url = "stp-tracker.inside-graph.com/gtm/IN-1000306-DESIGN/include.js";
		}
		if(((domain.indexOf("qa")) > -1) && ((domain.indexOf("staples.com")) > -1 ) ||  ((domain.indexOf("stores.staples.com.yextpages.net")) > -1)){
			 url = "us-sandbox-track.inside-graph.com/gtm/IN-1000307-2/include.js";
		}
		if(((domain.indexOf("qa")) > -1) && ((domain.indexOf("staplesadvantage.com")) > -1)) {
			 url = "us-sandbox-track.inside-graph.com/gtm/IN-1000369/include.js";
		}
		if(((domain.indexOf("qa")) > -1) && (((domain.indexOf("design.staples.com")) > -1) || ((domain.indexOf("printingservices.staples.com.yextpages.net")) > -1)|| ((page_url.indexOf("staples.com/services/printing/")) > -1)|| ((page_url.indexOf("staples.com/sbd/content/copyandprint/")) > -1))){
			 url = "us-sandbox-track.inside-graph.com/gtm/IN-1000307-2-DESIGN/include.js";
		}
		if(((domain.indexOf("csuat")) > -1) && ((domain.indexOf("staples.com")) > -1)){
			 url = "stpa-tracker.inside-graph.com/gtm/IN-1000369-CS/include.js";
		}
		if(((domain.indexOf("csdev")) > -1) && ((domain.indexOf("staples.com")) > -1)){
			 url = "us-sandbox-track.inside-graph.com/gtm/IN-1000369-CS/include.js";
		}

		//****************KM pages**************************//

	var script_tags = document.getElementsByTagName("script");
	if((page_url.indexOf("cs.staples.com") > -1) || (page_url.indexOf("csdev.staples.com") > -1)|| (page_url.indexOf("csuat.staples.com") > -1)){
	var _interval = 10;

	var _checkCsDropDown = function () {
		var dropDown = document.getElementsByClassName("portaldrop")[0];
		var dropDown_value = dropDown.options[dropDown.selectedIndex].text;
		if (dropDown_value != undefined && dropDown_value != ""){
		alert = function() {};

			function getInstance(dropDown_value) {

					if(sessionStorage.getItem("Url") != null){
						dropDown_value = sessionStorage.getItem("Url");
					}
					console.log(dropDown_value);

					if (dropDown_value == "DotCom"){
						url = "us-sandbox-track.inside-graph.com/gtm/IN-1000369-CS/include.js"
						console.log(dropDown_value+"....."+url);
						sessionStorage.setItem("Url", dropDown_value);
					}
					if (dropDown_value == "SBA US"){
						url = "us-sandbox-track.inside-graph.com/gtm/IN-1000369/include.js"
						console.log(dropDown_value+"....."+url);
						sessionStorage.setItem("Url", dropDown_value);
					}
					if (dropDown_value == "Quill"){
						url = "us-sandbox-track.inside-graph.com/gtm/IN-1000369-CS/include.js"
						console.log(dropDown_value+"....."+url);
						sessionStorage.setItem("Url", dropDown_value);
					}
					if (dropDown_value == "SBA CA"){
						url = "us-sandbox-track.inside-graph.com/gtm/IN-1000369-CS/include.js"
						console.log(dropDown_value+"....."+url);
						sessionStorage.setItem("Url", dropDown_value);
					}
					loadPowerFront(url);//load inside for chat
					//checkChatTabStatus();//load this method for chat tagging
			}
			var option;
			if (dropDown != undefined){
				for (var i=0; i<dropDown.options.length; i++) {
				  option = dropDown.options[i];
				  if (option.text == sessionStorage.getItem("Url")) {
						option.setAttribute('selected', true);
				  }
				}
				getInstance(dropDown_value);
				dropDown.addEventListener('change', function() {
					sessionStorage.setItem("Url", dropDown.options[dropDown.selectedIndex].text);
					location.reload();
				}, false);
			}
		}
		else{
			_interval = _interval >= 1000 ? 1000 : _interval * 2;
			setTimeout(_checkCsDropDown, _interval);
		}
		}
		setTimeout(_checkCsDropDown, _interval);
	}
//****************KM pages*************************//
else{
		loadPowerFront(url);//load inside for chat
		//checkChatTabStatus();//load this method for chat tagging
	}
	})()
}

function populateOrderCheckoutData(orderDataCheckOut) {
	for(var i=0; i < orderDataCheckOut.length; i++) {
			if(orderDataCheckOut[i].action == 'trackOrder') {
					_insideData.cart.orderId = orderDataCheckOut[i].orderId
					_insideData.cart.total = orderDataCheckOut[i].orderTotal
					_insideData.cart.complete = false
			} else {

					if(_insideData.cart.items && _insideData.cart.items > 0) {
							_insideData.cart.items.push(orderDataCheckOut[i])
					} else if(_insideData.cart.items && _insideData.cart.items.length == 0) {
							_insideData.cart.items = []
							_insideData.cart.items.push(orderDataCheckOut[i])
					}
			}
	}
}

function populateOrderDataConfirmed(orderDataConfirmed) {
	for(var j=0; j < orderDataConfirmed.length; j++) {
			if(orderDataConfirmed[j].action == 'trackOrder') {
					_insideData.cart.orderId = orderDataConfirmed[j].orderId
					_insideData.cart.total = orderDataConfirmed[j].orderTotal
					_insideData.cart.complete = true
					_insideData.cart.newOrderId = orderDataConfirmed[j].newOrderId
			}
	}
}

function refreshPageName(){
var page = "";
	if(window.Analytics && window.Analytics.traffic && window.Analytics.traffic.pagename) {
		page = window.Analytics.traffic.pagename;
		if((typeof(page) != "undefined") && (page.length > 300)){
			 page =  (page).slice(0,299);
		}
	}
	if((_insideData != null) && (typeof (_insideData.page) != "undefined")){
		_insideData.page.name = page;
	}
	if((typeof(_refreshInsideView) != "undefined") && (_refreshInsideView != null) && (typeof(_refreshInsideView) === 'function')){
		window._refreshInsideView();
	}
	return page
}

waitUntilPageLoads(fetchServiceData, waitCondition); //starting point of the code
if ((location.href).indexOf("staplesadvantage") !== -1) {
	if(_insideData.customer == undefined){
		_insideData.customer = {};
	}
	if(window.__PRELOADED_STATE__ && window.__PRELOADED_STATE__.headerState && window.__PRELOADED_STATE__.headerState.userInfo && _insideData.customer){
		_insideData.customer = {
			accountId : window.__PRELOADED_STATE__.headerState.userInfo.accountNumber,
			billTo : window.__PRELOADED_STATE__.headerState.userInfo.defaultBillToId,
			division : window.__PRELOADED_STATE__.headerState.userInfo.division,
			id : window.__PRELOADED_STATE__.headerState.userInfo.masterAccountNumber,
			lifeTimeSavings : "0",
			premiumContract : "",
			premiumFlag : window.__PRELOADED_STATE__.headerState.userInfo.onlineBillPayAuth,
			shipTo : window.__PRELOADED_STATE__.headerState.userInfo.defaultShipToId,
			userGroup : window.__PRELOADED_STATE__.headerState.userInfo.userType,
			userId : __PRELOADED_STATE__.headerState.userInfo.username,
			userType : window.__PRELOADED_STATE__.headerState.userInfo.userType
		}
	}
	if(window.__PRELOADED_STATE__ && window.__PRELOADED_STATE__.headerState && window.__PRELOADED_STATE__.headerState.JWT && window.__PRELOADED_STATE__.headerState.JWT.sessionIPA && window.__PRELOADED_STATE__.headerState.JWT.sessionIPA.membershipDetail && window.__PRELOADED_STATE__.headerState.JWT.sessionIPA.membershipDetail.membershipProgram && _insideData.customer){
		_insideData.customer.premiumSubscriptionType = window.__PRELOADED_STATE__.headerState.JWT.sessionIPA.membershipDetail.membershipSubscription;
		_insideData.customer.customerSubType = window.__PRELOADED_STATE__.headerState.JWT.sessionIPA.membershipDetail.membershipProgram;
	}
		if(window.__PRELOADED_STATE__ && window.__PRELOADED_STATE__.headerState && window.__PRELOADED_STATE__.headerState.userInfo && window.__PRELOADED_STATE__.headerState.userInfo.contact && _insideData.customer){
			_insideData.customer.firstName = window.__PRELOADED_STATE__.headerState.userInfo.contact.firstName;
			_insideData.customer.lastName = window.__PRELOADED_STATE__.headerState.userInfo.contact.lastName;
			_insideData.customer.phone = window.__PRELOADED_STATE__.headerState.userInfo.contact.phone;
			_insideData.customer.email = window.__PRELOADED_STATE__.headerState.userInfo.contact.email;
		}
	// if(window.Analytics && window.Analytics.global && window.Analytics.global.visitor){
	// 	_insideData.customer.userGroup = window.Analytics.global.visitor.group;
	// }
	//Removing Customer if it is empty
	if((getCookie("SASESSION") == null) || (getCookie("SASESSION") == "LOGGEDOFF")){
		delete _insideData.customer;
	}
	//Removing Customer if it is empty
	//Get pageName and pageType from URL
	var url_sba = location.href;
	var pageName_sba = url_sba.lastIndexOf("/");
	pageName_sba = url_sba.slice(pageName_sba+1);
	if(_insideData.page == undefined){
		_insideData.page = {};
	}
//	if(_insideData.page.name != "" && _insideData.page.name != "other" && _insideData.page.name != null){
		pageName_sba = document.getElementsByTagName("title")[0].innerText;
	//}
	if((pageName_sba.indexOf("/") != -1)){
		pageName_sba = pageName_sba.slice(0,(pageName_sba.indexOf("/")));
	}
	if(pageName_sba.indexOf("_") != -1){
		pageName_sba = pageName_sba.slice(0,(pageName_sba.indexOf("_")));
	}
	if(pageName_sba.indexOf("?") != -1){
		pageName_sba = pageName_sba.slice(0,(pageName_sba.indexOf("?")));
	}
	if(pageName_sba.indexOf("-") != -1){
		pageName_sba = pageName_sba.slice(0,(pageName_sba.indexOf("-")));
	}
	//Get pageName and pageType from URL
	if(window.__PRELOADED_STATE__ && window.__PRELOADED_STATE__.SBASkuState && window.__PRELOADED_STATE__.SBASkuState.activeProduct && _insideData.page){
		_insideData.page = {
			name : pageName_sba,
			price: window.__PRELOADED_STATE__.SBASkuState.activeProduct.price,
			type: pageName_sba,
			L4: window.__PRELOADED_STATE__.SBASkuState.activeProduct.name,
			productName: window.__PRELOADED_STATE__.SBASkuState.activeProduct.name,
			img : window.__PRELOADED_STATE__.SBASkuState.activeProduct.image[0]
		}
	}
	else{
		_insideData.page = {
			name : pageName_sba,
			type: pageName_sba
		}
	}
	if(window.__PRELOADED_STATE__ && window.__PRELOADED_STATE__.SBASkuState && window.__PRELOADED_STATE__.SBASkuState.skuData && window.__PRELOADED_STATE__.SBASkuState.skuData.items && window.__PRELOADED_STATE__.SBASkuState.skuData.items[0] && window.__PRELOADED_STATE__.SBASkuState.skuData.items[0].product && window.__PRELOADED_STATE__.SBASkuState.skuData.items[0].product.breadcrumb && _insideData.page){
		 _insideData.page.sku = window.__PRELOADED_STATE__.SBASkuState.skuData.items[0].itemID;
		 if((window.__PRELOADED_STATE__.SBASkuState.skuData.items[0].itemID) == undefined || (window.__PRELOADED_STATE__.SBASkuState.skuData.items[0].itemID) == ""){
			 _insideData.page.sku = window.__PRELOADED_STATE__.SBASkuState.skuData.items[0].CIN;
		 }
		 if(window.__PRELOADED_STATE__.SBASkuState.skuData.items[0].product.breadcrumb[1]) {
			 _insideData.page.L2 = window.__PRELOADED_STATE__.SBASkuState.skuData.items[0].product.breadcrumb[1].displayName;
			 if( _insideData.page.name == "product" ||  _insideData.page.name == "ITEM" ||  _insideData.page.name == "browse" || _insideData.page.name == "other" || _insideData.page.name == "Office Supplies, Technology, Ink & Much More | Staples® Business Advantage"){
				 _insideData.page.name = window.__PRELOADED_STATE__.SBASkuState.skuData.items[0].product.breadcrumb[1].displayName;
			 }
		 }
		 if(window.__PRELOADED_STATE__.SBASkuState.skuData.items[0].product.breadcrumb[0]) {
			 _insideData.page.L1 = window.__PRELOADED_STATE__.SBASkuState.skuData.items[0].product.breadcrumb[0].displayName;
			  if( _insideData.page.name == "product" ||  _insideData.page.name == "ITEM" ||  _insideData.page.name == "browse" || _insideData.page.name == "other" || _insideData.page.name == "Office Supplies, Technology, Ink & Much More | Staples® Business Advantage"){
				_insideData.page.name = window.__PRELOADED_STATE__.SBASkuState.skuData.items[0].product.breadcrumb[0].displayName;
			}
		 }
		 if(window.__PRELOADED_STATE__.SBASkuState.skuData.items[0].product.breadcrumb[2]) {
			 _insideData.page.L3 = window.__PRELOADED_STATE__.SBASkuState.skuData.items[0].product.breadcrumb[2].displayName;
		 }
 }
 if(window.__PRELOADED_STATE__ && window.__PRELOADED_STATE__.pageState && _insideData.page){
 	_insideData.page.searchPhrase = window.__PRELOADED_STATE__.pageState.searchTerm;
 }
 var _interval_cart = 10;
 var itemDetails = {};
 var updateCart = function () {
	 if(window.Analytics && window.Analytics.global && window.Analytics.global.cart && (_insideData.page.name != "Order Confirmation") && (window.Analytics.global.cart.cartId != undefined) && (window.Analytics.global.cart.cartValue != undefined)){
		 updateCartDetails(itemDetails);
	 }
	 else {
		 _interval_cart = _interval_cart >= 1000 ? 1000 : _interval_cart * 2;
		 setTimeout(updateCart, _interval_cart);
	 }
 };
 setTimeout(updateCart, _interval_cart);
 //

}
function updateCartDetails(itemDetails){
 if(window.Analytics && window.Analytics.global && window.Analytics.global.cart && (_insideData.page.name != "Order Confirmation") && (window.Analytics.global.cart.cartId != undefined) && (window.Analytics.global.cart.cartValue != undefined)){
		 _insideData.cart = {
			 id: window.Analytics.global.cart.cartId,
			 confirmed: window.Analytics.global.cart.cartInit,
			 total: window.Analytics.global.cart.cartValue,
			 items: window.Analytics.global.cart.lines
		 }
	 }
	 	if((typeof(updateCartValue) != "undefined") && (typeof(updateCartValue) === 'function')){
	 		window.updateCartValue();
		}
}
