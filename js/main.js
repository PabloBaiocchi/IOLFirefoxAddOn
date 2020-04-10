//RUN

console.log('STARTING...')
// table=getTable()
// document.body.append(table)
// window.setInterval(()=>{
//     data=getData()
//     fillTable(table,data)
// },1000)

graph=createGraph()
pushData(graph,{
    streamName: 'my_line',
    value: 2
})
pushData(graph,{
    streamName: 'my_line',
    value: 6
})
console.log(graph)