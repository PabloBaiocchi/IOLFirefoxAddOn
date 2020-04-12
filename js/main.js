//RUN

console.log('STARTING...')
// table=getTable()
// document.body.append(table)
// window.setInterval(()=>{
//     data=getData()
//     fillTable(table,data)
// },1000)

graph=createGraph()
enableSidePanel(graph)
addStream(graph,'my_line','green')
addStream(graph,'the_line','red')

val1=Math.random()*10
val2=Math.random()*10


window.setInterval(()=>{
    val1=val1+Math.random()-.5
    val2=val2+Math.random()-.5
    
    pushData(graph,{
        streamName: 'my_line',
        value: val1
    })
    pushData(graph,{
        streamName: 'the_line',
        value: val2
    })
    drawGraph(graph)
},1000)