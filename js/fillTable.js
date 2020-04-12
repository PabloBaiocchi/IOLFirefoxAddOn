//FILL TABLE 


function colorIndicator(element){
    if(element.innerHTML.includes('-')){
        element.style.color='red'
    } else if(element.innerHTML=='0'){
        element.style.color='black'
    } else {
        element.style.color='green'
    }
}

function fillTable(table,data){
    volumeTotals=getVolumeTotals(data.cajaPuntas)
    
    totalBuy=document.getElementById('total_buy_volume')
    totalBuy.innerHTML=volumeTotals.buy

    totalSell=document.getElementById('total_sell_volume')
    totalSell.innerHTML=volumeTotals.sell
    
    demandIndicator=document.getElementById('demand_indicator')
    demandIndicator.innerHTML=getDemandIndicator(volumeTotals).toFixed(3)
    colorIndicator(demandIndicator)

    wAvgBuyElement=document.getElementById('weighted_avg_buy')
    wAvgBuyValue=getWeightedAverage(data.cajaPuntas.buys,volumeTotals.buy)
    wAvgBuyElement.innerHTML=wAvgBuyValue.toFixed(3)

    wAvgSellElement=document.getElementById('weighted_avg_sell')
    wAvgSellValue=getWeightedAverage(data.cajaPuntas.sells,volumeTotals.sell)
    wAvgSellElement.innerHTML=wAvgSellValue.toFixed(3)

    priceStength=document.getElementById('price_strength')
    priceStength.innerHTML=getPriceStrength(wAvgBuyValue,wAvgSellValue,data.price).toFixed(3)
    colorIndicator(priceStength)
}