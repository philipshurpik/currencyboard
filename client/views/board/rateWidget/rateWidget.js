Template.rateWidget.helpers({
	bestBuy: function() { return findBestRates().bestBuy },
	bestSell: function() { return findBestRates().bestSell }
});

function findBestRates() {
	var buy = Orders.findOne({type:"buy", checked: {$ne: true}}, {sort: {rate: -1 }}) || {};
	var sell = Orders.findOne({type:"sell", checked: {$ne: true}}, {sort: {rate: 1 }}) || {};
	var result = {
		bestBuy: buy.rate || "-",
		bestSell: sell.rate || "-"
	}
	return result;
}