function pushData(graph,data){
    for(i=0;i<graph.dataStreams.length;++i){
        if(graph.dataStreams[i].name==data.streamName){
            graph.dataStreams[i].data.push(data.value)
            return
        }
    }
}

function addStream(graph,name,color){
    graph.dataStreams.push({
        name: name,
        data:[],
        color:color
    })
}

function firstVal(streams){
    if(streams.length==0){
        return 
    }
    for(i=0;i<streams.length;++i){
        if(streams[i].data.length>0){
            return streams[i].data[0]
        }
    }
}

function setYAxis(graph){
    value=firstVal(graph.dataStreams)
    if(!value){
        return false
    }
    min=value
    max=value
    for(i=0;i<graph.dataStreams.length;++i){
        for(j=0;j<graph.dataStreams[i].data.length;++j){
            currentVal=graph.dataStreams[i].data[j]
            if(currentVal>max){
                max=currentVal
            } else if(currentVal<min){
                min=currentVal
            }
        }
    }
    range=max-min
    graph.yAxis={
        min: min-.1*range,
        max: max+.1*range
    }
    return true
}

function translateData(data,axisMin,axisMax,canvasHeight,xInterval){
    printData=[]
    for(k=0;k<data.length;++k){
        printData.push({
            x:k*xInterval,
            y:(1-(data[k]-axisMin)/(axisMax-axisMin))*canvasHeight
        })
    }
    return printData
}

function translateGraph(graph,xInterval){
    printStreams=[]
    for(i=0;i<graph.dataStreams.length;++i){
        printStreams.push({
            color:graph.dataStreams[i].color,
            data:translateData(graph.dataStreams[i].data,graph.yAxis.min,graph.yAxis.max,graph.canvas.height,xInterval)
        })
    }
    return printStreams
}

function getXInterval(graph){
    maxLength=0
    for(i=0;i<graph.dataStreams.length;++i){
        streamLength=graph.dataStreams[i].data.length
        if(streamLength>maxLength){
            maxLength=streamLength
        }
    }
    return graph.canvas.width/maxLength
}

function drawStream(stream,ctx){
    ctx.strokeStyle=stream.color
    ctx.beginPath()
    ctx.moveTo(stream.data[0].x,stream.data[0].y)
    for(j=1;j<stream.data.length;++j){
        ctx.lineTo(stream.data[j].x,stream.data[j].y)
    } 
    ctx.stroke()
}

function drawStreams(graph,printStreams){
    for(i=0;i<printStreams.length;++i){
        drawStream(printStreams[i],graph.ctx)
    }
}

function drawGraph(graph){
    if(setYAxis(graph)){
        graph.ctx.clearRect(0,0,graph.canvas.width,graph.canvas.height)
        xInterval=getXInterval(graph)
        printStreams=translateGraph(graph,xInterval)
        drawStreams(graph,printStreams)
    }
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