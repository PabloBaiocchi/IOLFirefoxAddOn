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