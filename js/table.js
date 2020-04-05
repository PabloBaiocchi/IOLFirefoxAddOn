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
    numberCell.setAttribute('colspan','2')

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
    numberCell.setAttribute('colspan','2')

    row.appendChild(labelCell)
    row.appendChild(numberCell)

    return row
}

function getTable(){
    table=document.createElement('table')
    table.setAttribute('id','custom_table')
    body=document.createElement('tbody')
    body.appendChild(totalVolumeRow())
    body.appendChild(demandIndicatorRow())
    body.appendChild(weightedAvgRow())
    body.appendChild(priceStrengthRow())
    table.appendChild(body)
    return table
}