Template.rateWidget.helpers({
	bestBuy: function() { return findBestRates().bestBuy },
	bestSell: function() { return findBestRates().bestSell }
});

function findBestRates() {
	var buy = Proposals.findOne({type:"buy", checked: {$ne: true}}, {sort: {rate: -1 }}) || {};
	var sell = Proposals.findOne({type:"sell", checked: {$ne: true}}, {sort: {rate: 1 }}) || {};
	var result = {
		bestBuy: buy.rate || "-",
		bestSell: sell.rate || "-"
	}
	return result;
}