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
        buys: buys,
        sells: sells
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
            return parseFloat(spans[i].innerText)
        }
    }
}

function getSiteLocation(){
    currentUrl=window.location.href.toString()

    if(currentUrl.includes('www.invertironline.com/titulo')){
        console.log('hello')
        return 'TITULO'
    }
    if(currentUrl.includes('www.invertironline.com/Operar')){
        console.log('here')
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