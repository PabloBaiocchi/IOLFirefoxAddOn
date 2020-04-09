//FILL TABLE 

function getVolumeTotals(puntas){
    buyTotal=0
    for(i=0;i<puntas.buys.length;++i){
        buyTotal=buyTotal+puntas.buys[i].volume
    }

    sellTotal=0
    for(i=0;i<puntas.sells.length;++i){
        sellTotal=sellTotal+puntas.sells[i].volume
    }

    return {
        buy: buyTotal,
        sell: sellTotal
    }
}

function getWeightedAverage(array,volumeTotal){
    volumePrice=0
    for(i=0;i<array.length;++i){
        volumePrice=volumePrice+array[i].volume*array[i].price
    }

    return volumePrice/volumeTotal 
}

function getDemandIndicator(volumeTotals){
    if(volumeTotals.buy>volumeTotals.sell){
        return volumeTotals.buy/volumeTotals.sell
    }
    if(volumeTotals.buy<volumeTotals.sell){
        return -1*volumeTotals.sell/volumeTotals.buy
    }
    return 0
}

function getPriceStrength(wAvgBuy,wAvgSell,price){
    buyDiff=price-wAvgBuy
    sellDiff=wAvgSell-price

    if(buyDiff>sellDiff){
        return -1*buyDiff/sellDiff
    }
    if(sellDiff>buyDiff){
        return sellDiff/buyDiff
    }
    return 0
}

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