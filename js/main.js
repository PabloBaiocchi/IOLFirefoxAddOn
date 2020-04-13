//RUN

function runDev(){
    graph=startGraphDev()
    global.val1=Math.random()*10
    global.val2=Math.random()*10

    window.setInterval(()=>{
        global.val1=global.val1+Math.random()-.5
        global.val2=global.val2+Math.random()-.5
        
        pushData(graph,{
            streamName: 'my_line',
            value: global.val1
        })
        pushData(graph,{
            streamName: 'the_line',
            value: global.val2
        })
        drawGraph(graph)
    },1000)
}

function runProd(){
    table=getTable()
    document.body.append(table)
    graph=startGraph()
    window.setInterval(()=>{
        data=getData()
        fillTable(table,data)
        updateGraph(graph,data)
},1000)
}

console.log('STARTING...')
global={}
// runDev()
runProd()