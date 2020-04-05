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