function startGraph(){
    graph=createGraph()
    enableSidePanel(graph)
    addStream(graph,'price','black')
    addStream(graph,'buy_tip','green')
    addStream(graph,'sell_tip','red')
    addStream(graph,'buy_weighted_avg','purple')
    addStream(graph,'sell_weighted_avg','orange')
    return graph
}

function startGraphDev(){
    graph=createGraph()
    enableSidePanel(graph)
    addStream(graph,'my_line','green')
    addStream(graph,'the_line','red')
    return graph
}

function updateGraph(graph,data){
    pushData(graph,{
        streamName: 'price',
        value: data.price
    })
    pushData(graph,{
        streamName:'buy_tip',
        value: data.cajaPuntas.buys[0].price
    })
    pushData(graph,{
        streamName:'sell_tip',
        value: data.cajaPuntas.sells[0].price
    })
    volumeTotals=getVolumeTotals(data.cajaPuntas)
    pushData(graph,{
        streamName:'buy_weighted_avg',
        value: getWeightedAverage(data.cajaPuntas.buys,volumeTotals.buy)
    })
    pushData(graph,{
        streamName:'sell_weighted_avg',
        value: getWeightedAverage(data.cajaPuntas.sells,volumeTotals.sell)
    })
    drawGraph(graph)
}