//RUN

console.log('STARTING...')
// table=getTable()
// document.body.append(table)
// window.setInterval(()=>{
//     data=getData()
//     fillTable(table,data)
// },1000)

graph=createGraph()
addStream(graph,'my_line','green')
addStream(graph,'the_line','red')
pushData(graph,{
    streamName: 'my_line',
    value: 2
})
pushData(graph,{
    streamName: 'my_line',
    value: 6
})
pushData(graph,{
    streamName: 'the_line',
    value: 3
})
pushData(graph,{
    streamName: 'my_line',
    value: 7
})
pushData(graph,{
    streamName: 'the_line',
    value: 4
})
pushData(graph,{
    streamName: 'my_line',
    value: 0
})
drawGraph(graph)

