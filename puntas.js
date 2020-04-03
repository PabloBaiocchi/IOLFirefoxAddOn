//BUILD THE TABLE

function totalVolumeRow(){
    row=document.createElement('tr')
    labelCell=document.createElement('td')
    buyCell=document.createElement('td')
    sellCell=document.createElement('td')

    labelCell.appendChild(document.createTextNode('Total volume'))

    buyCell.setAttribute('id','total_buy_volume')
    sellCell.setAttribute('id','total_sell_volume')

    row.appendChild(labelCell)
    row.appendChild(buyCell)
    row.appendChild(sellCell)

    return row
}

function demandIndicatorRow(){
    row=document.createElement('tr')
    labelCell=document.createElement('td')
    numberCell=document.createElement('td')

    labelCell.appendChild(document.createTextNode('Demand indicator'))

    numberCell.setAttribute('id','demand_indicator')
    numberCell.setAttribute('class','two_column')

    row.appendChild(labelCell)
    row.appendChild(numberCell)

    return row
}

function weightedAvgRow(){
    row=document.createElement('tr')
    labelCell=document.createElement('td')
    buyCell=document.createElement('td')
    sellCell=document.createElement('td')

    labelCell.appendChild(document.createTextNode('Weighted avg'))

    buyCell.setAttribute('id','weighted_avg_buy')
    sellCell.setAttribute('id','weighted_avg_sell')

    row.appendChild(labelCell)
    row.appendChild(buyCell)
    row.appendChild(sellCell)

    return row
}

function priceStrengthRow(){
    row=document.createElement('tr')
    labelCell=document.createElement('td')
    numberCell=document.createElement('td')

    labelCell.appendChild(document.createTextNode('Price Strength'))

    numberCell.setAttribute('id','price_strength')
    numberCell.setAttribute('class','two_column')

    row.appendChild(labelCell)
    row.appendChild(numberCell)

    return row
}

function styleTable(table){
    table.style.width='250px'
    table.style.height='100px'
    table.style.position='fixed'
    table.style.top='150px'
    table.style.right='100px'
    table.style.backgroundColor='white'

    tds=table.getElementsByTagName('td')
    for(i=0;i<tds.length;++i){
        tds[i].style.border='1px solid black'
    }

    wideCells=table.getElementsByClassName('two_column')
    for(i=0;i<wideCells.length;++i){
        wideCells[i].setAttribute('colspan',2)
    }
}

function getTable(){
    table=document.createElement('table')
    body=document.createElement('tbody')
    body.appendChild(totalVolumeRow())
    body.appendChild(demandIndicatorRow())
    body.appendChild(weightedAvgRow())
    body.appendChild(priceStrengthRow())
    table.appendChild(body)
    styleTable(table)
    return table
}

//GET INFOR FROM CAJA DE PUNTAS

function getCajaPuntas(){
    puntasTable=document.getElementsByClassName('tableListaPuntas')
    tableBody=puntasTable[0].children[1]
    tableRows=tableBody.children
    buys=[]
    sells=[]
    for(i=0;i<tableRows.length;++i){
        cells=tableRows[i].children
        buys.push({
            'volume':parseInt(cells[0].innerText.replace('.','')),
            'price':parseFloat(cells[1].innerText.replace(',','.'))
        })
        sells.push({
            'volume':parseInt(cells[3].innerText.replace('.','')),
            'price':parseFloat(cells[2].innerText.replace(',','.'))
        })
    }
    return {
        buys: buys,
        sells: sells
    }
}

function getPrice(){
    spans=document.getElementsByTagName('span')
    for(i=0;i<spans.length;++i){
        if(spans[i].getAttribute('data-field')=='UltimoPrecio'){
            return parseFloat(spans[i].innerText)
        }
    }
}

function getData(){
    return {
        cajaPuntas: getCajaPuntas(),
        price: getPrice()
    }
}

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

function fillTable(table,data){
    volumeTotals=getVolumeTotals(data.cajaPuntas)
    
    totalBuy=document.getElementById('total_buy_volume')
    totalBuy.innerHTML=volumeTotals.buy

    totalSell=document.getElementById('total_sell_volume')
    totalSell.innerHTML=volumeTotals.sell
    
    volumeRatio=document.getElementById('demand_indicator')
    volumeRatio.innerHTML=getDemandIndicator(volumeTotals)

    wAvgBuyElement=document.getElementById('weighted_avg_buy')
    wAvgBuyValue=getWeightedAverage(data.cajaPuntas.buys,volumeTotals.buy)
    wAvgBuyElement.innerHTML=wAvgBuyValue

    wAvgSellElement=document.getElementById('weighted_avg_sell')
    wAvgSellValue=getWeightedAverage(data.cajaPuntas.sells,volumeTotals.sell)
    wAvgSellElement.innerHTML=wAvgSellValue

    priceStength=document.getElementById('price_strength')
    priceStength.innerHTML=getPriceStrength(wAvgBuyValue,wAvgSellValue,data.price)
}

//RUN

console.log('STARTING...')
table=getTable()
document.body.append(table)
window.setInterval(()=>{
    data=getData()
    fillTable(table,data)
},1000)
