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

function firstVal(graph){
    if(graph.dataStreams.length==0){
        return 
    }
    for(i=0;i<graph.dataStreams.length;++i){
        if(graph.dataStreams[i].data.length>0){
            if(graph.dataStreams[i].data.length>graph.xMax){
                return graph.dataStreams[i].data[graph.dataStreams[i].data.length-graph.xMax]
            }
            return graph.dataStreams[i].data[0]
        }
    }
}

function setYAxis(graph){
    value=firstVal(graph)
    if(!value){
        return false
    }
    min=value
    max=value
    for(i=0;i<graph.dataStreams.length;++i){
        startIndex=0
        if(graph.dataStreams[i].data.length>graph.xMax){
            startIndex=graph.dataStreams[i].data.length-graph.xMax
        }
        for(j=startIndex;j<graph.dataStreams[i].data.length;++j){
            currentVal=graph.dataStreams[i].data[j]
            if(currentVal>max){
                max=currentVal
            } else if(currentVal<min){
                min=currentVal
            }
        }
    }
    range=max-min
    min=min-.1*range
    max=max+.1*range
    range=max-min
    graph.yAxis={
        q0: min,
        q1:min+range*1/4,
        q2:min+range/2,
        q3:min+range*3/4,
        q4: max
    }
    return true
}

function translateData(data,yMin,yMax,canvasHeight,xInterval,xMax){
    printData=[]
    startIndex=0
    if(data.length>xMax){
        startIndex=data.length-xMax
    }
    counter=0
    for(k=startIndex;k<data.length;++k){
        printData.push({
            x:counter*xInterval,
            y:(1-(data[k]-yMin)/(yMax-yMin))*canvasHeight
        })
        counter=counter+1
    }
    return printData
}

function translateGraph(graph,xInterval){
    printStreams=[]
    for(i=0;i<graph.dataStreams.length;++i){
        printStreams.push({
            color:graph.dataStreams[i].color,
            data:translateData(graph.dataStreams[i].data,graph.yAxis.q0,graph.yAxis.q4,graph.canvas.height,xInterval,graph.xMax)
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
    if(maxLength<graph.xMax){
        return graph.canvas.width/maxLength
    } else {
        return graph.canvas.width/graph.xMax
    }
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

function drawYAxisDashes(graph,dashLength){
    graph.ctx.strokeStyle='black'
    for(i=1;i<4;++i){
        graph.ctx.beginPath()
        graph.ctx.moveTo(graph.canvas.width,graph.canvas.height*i/4)
        graph.ctx.lineTo(graph.canvas.width-dashLength,graph.canvas.height*i/4)
        graph.ctx.stroke()
    }
}

function drawGraph(graph){
    if(setYAxis(graph)){
        updateYLabels(graph) 
        graph.ctx.clearRect(0,0,graph.canvas.width,graph.canvas.height)
        drawYAxisDashes(graph,5)
        xInterval=getXInterval(graph) 
        printStreams=translateGraph(graph,xInterval) 
        drawStreams(graph,printStreams) 
    }
}

function addYLabels(container,canvasHeight){
    q4=document.createElement('div')
    q4.setAttribute('id','q4')
    q4.classList.add('y_label')
    q4.innerText='q4'
    q4.style.top='-2px'

    q3=document.createElement('div')
    q3.setAttribute('id','q3')
    q3.classList.add('y_label')
    q3.innerText='q3'
    q3.style.top=-2+canvasHeight/4+'px'

    q2=document.createElement('div')
    q2.setAttribute('id','q2')
    q2.classList.add('y_label')
    q2.innerText='q2'
    q2.style.top=-2+canvasHeight/4*2+'px'

    q1=document.createElement('div')
    q1.setAttribute('id','q1')
    q1.classList.add('y_label')
    q1.innerText='q1'
    q1.style.top=-2+canvasHeight/4*3+'px'
    

    q0=document.createElement('div')
    q0.setAttribute('id','q0')
    q0.classList.add('y_label')
    q0.innerText='q0'
    q0.style.top=-2+canvasHeight+'px'

    container.appendChild(q0)
    container.appendChild(q1)
    container.appendChild(q2)
    container.appendChild(q3)
    container.appendChild(q4)
}

function updateYLabels(graph){
    q4=document.getElementById('q4')
    q4.innerText=graph.yAxis.q4.toFixed(2)

    q3=document.getElementById('q3')
    q3.innerText=graph.yAxis.q3.toFixed(2)

    q2=document.getElementById('q2')
    q2.innerText=graph.yAxis.q2.toFixed(2)

    q1=document.getElementById('q1')
    q1.innerText=graph.yAxis.q1.toFixed(2)

    q0=document.getElementById('q0')
    q0.innerText=graph.yAxis.q0.toFixed(2)
}

function createGraph(){
    canvas=document.createElement('canvas')
    canvas.setAttribute('id','graph')
    ctx=canvas.getContext('2d')
    container=document.createElement('div')
    container.setAttribute('id','graph_container')
    container.appendChild(canvas)
    document.body.append(container)
    addYLabels(container,canvas.clientHeight)
    return{
        canvas:canvas,
        ctx:ctx,
        dataStreams:[], 
        xMax: 5
    }
}