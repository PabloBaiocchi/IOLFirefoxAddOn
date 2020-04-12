//GET INFOR FROM CAJA DE PUNTAS

function parseTableRows(tableRows){
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
        'buys': buys,
        'sells': sells
    }
}

function trimTableRows(rows){
    newrows=[]
    for(i=1;i<rows.length;++i){
        newrows.push(rows[i])
    }
    return newrows
}

function cleanPrice(priceText){
    index=0
    for(j=0;j<priceText.length;++j){
        char=priceText.charAt(j)
        if(char>='0' && char<='9'){
            index=j
            break
        }
    }
    return priceText.substring(index)
}

function parseTableRowsPostMarket(rows){
    rows=trimTableRows(rows)
    buys=[]
    sells=[]
    for(i=0;i<rows.length;++i){
        cells=rows[i].children
        buys.push({
            'volume':parseInt(cells[0].innerText.replace('.','')),
            'price':parseFloat(cleanPrice(cells[1].innerText).replace(',','.'))
        })
        sells.push({
            'volume':parseInt(cells[3].innerText.replace('.','')),
            'price':parseFloat(cleanPrice(cells[2].innerText).replace(',','.'))
        })
    }
    return {
        'buys': buys,
        'sells': sells
    }
}

function getCajaPuntasOperar(){
    puntasTable=document.getElementsByClassName('tableListaPuntas')
    tableBody=puntasTable[0].children[1]
    tableRows=tableBody.children
    return parseTableRows(tableRows)
}

function getCajaPuntasTitulo(){
    puntasDiv=document.getElementById('puntas-cotizacion-titulo')
    tableBody=puntasDiv.getElementsByTagName('tbody')
    tableRows=tableBody[0].getElementsByTagName('tr')
    if(tableRows.length>5){
        // console.log(parseTableRowsPostMarket(tableRows))
        return parseTableRowsPostMarket(tableRows)
    }
    return parseTableRows(tableRows)
}

function getCajaPuntas(siteLocation){
    if(siteLocation=='OPERAR'){
        return getCajaPuntasOperar()
    }
    if(siteLocation=='TITULO'){
        return getCajaPuntasTitulo()
    }
}

function getPrice(){
    spans=document.getElementsByTagName('span')
    for(i=0;i<spans.length;++i){
        if(spans[i].getAttribute('data-field')=='UltimoPrecio'){
            return parseFloat(spans[i].innerText.replace(',','.'))
        }
    }
}

function getSiteLocation(){
    currentUrl=window.location.href.toString()

    if(currentUrl.includes('www.invertironline.com/titulo')){
        return 'TITULO'
    }
    if(currentUrl.includes('www.invertironline.com/Operar')){
        return 'OPERAR'
    }
}

function getData(){
    siteLocation=getSiteLocation()

    return {
        cajaPuntas: getCajaPuntas(siteLocation),
        price: getPrice()
    }
}