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