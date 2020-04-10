function pushData(graph,data){
    for(i=0;i<graph.dataStreams.length;++i){
        if(graph.dataStreams[i].name==data.streamName){
            graph.dataStreams[i].data.push(data.value)
            return
        }
    }
    graph.dataStreams.push({
        name:data.streamName,
        data:[data.value]
    })
}

function createGraph(){
    canvas=document.createElement('canvas')
    canvas.setAttribute('id','graph')
    ctx=canvas.getContext('2d')
    document.body.append(this.canvas)
    return{
        canvas:canvas,
        ctx:ctx,
        dataStreams:[]
    }
}