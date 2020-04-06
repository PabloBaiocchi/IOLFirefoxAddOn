//RUN

console.log('STARTING...')
table=getTable()
document.body.append(table)
window.setInterval(()=>{
    data=getData()
    fillTable(table,data)
},1000)

