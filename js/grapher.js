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
        return graph.canvas.width/(maxLength-1)
    } else {
        return graph.canvas.width/(graph.xMax-1)
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

function drawAxisDashes(graph,dashLength){
    graph.ctx.strokeStyle='black'
    for(i=1;i<4;++i){
        graph.ctx.beginPath()
        graph.ctx.moveTo(graph.canvas.width,graph.canvas.height*i/4)
        graph.ctx.lineTo(graph.canvas.width-dashLength,graph.canvas.height*i/4)
        graph.ctx.stroke()
    }
    for(i=1;i<4;++i){
        graph.ctx.beginPath()
        graph.ctx.moveTo(graph.canvas.width*i/4,graph.canvas.height)
        graph.ctx.lineTo(graph.canvas.width*i/4,graph.canvas.height-dashLength)
        graph.ctx.stroke()
    }
}

function updateXLabels(graph){
    dataPoints=0
    for(i=0;i<graph.dataStreams.length;++i){
        if(graph.dataStreams[i].data.length>dataPoints){
            dataPoints=graph.dataStreams[i].data.length
        }
    }
    if(dataPoints>graph.xMax){
        dataPoints=graph.xMax
    }

    xq1=document.getElementById('xq1')
    xq1.innerText=(dataPoints-1)/4

    xq2=document.getElementById('xq2')
    xq2.innerText=(dataPoints-1)/2

    xq3=document.getElementById('xq3')
    xq3.innerText=(dataPoints-1)/4*3

    xq4=document.getElementById('xq4')
    xq4.innerText=(dataPoints-1)
}

function drawGraph(graph){
    if(setYAxis(graph)){
        updateYLabels(graph) 
        updateXLabels(graph)
        graph.ctx.clearRect(0,0,graph.canvas.width,graph.canvas.height)
        drawAxisDashes(graph,5)
        xInterval=getXInterval(graph) 
        printStreams=translateGraph(graph,xInterval) 
        drawStreams(graph,printStreams) 
    }
}

function addLabels(container,canvasHeight,canvasWidth){
    yq4=document.createElement('div')
    yq4.setAttribute('id','yq4')
    yq4.classList.add('y_label')
    yq4.innerText='yq4'
    yq4.style.top='-2px'

    yq3=document.createElement('div')
    yq3.setAttribute('id','yq3')
    yq3.classList.add('y_label')
    yq3.innerText='yq3'
    yq3.style.top=-2+canvasHeight/4+'px'

    yq2=document.createElement('div')
    yq2.setAttribute('id','yq2')
    yq2.classList.add('y_label')
    yq2.innerText='yq2'
    yq2.style.top=-2+canvasHeight/4*2+'px'

    yq1=document.createElement('div')
    yq1.setAttribute('id','yq1')
    yq1.classList.add('y_label')
    yq1.innerText='yq1'
    yq1.style.top=-2+canvasHeight/4*3+'px'
    

    yq0=document.createElement('div')
    yq0.setAttribute('id','yq0')
    yq0.classList.add('y_label')
    yq0.innerText='yq0'
    yq0.style.top=-2+canvasHeight+'px'

    xq4=document.createElement('div')
    xq4.setAttribute('id','xq4')
    xq4.classList.add('x_label')
    xq4.innerText='xq4'
    xq4.style.left='2px'

    xq3=document.createElement('div')
    xq3.setAttribute('id','xq3')
    xq3.classList.add('x_label')
    xq3.innerText='xq3'
    xq3.style.left=2+canvasWidth/4+'px'

    xq2=document.createElement('div')
    xq2.setAttribute('id','xq2')
    xq2.classList.add('x_label')
    xq2.innerText='xq2'
    xq2.style.left=2+canvasWidth/2+'px'

    xq1=document.createElement('div')
    xq1.setAttribute('id','xq1')
    xq1.classList.add('x_label')
    xq1.innerText='xq1'
    xq1.style.left=2+canvasWidth/4*3+'px'

    xq0=document.createElement('div')
    xq0.setAttribute('id','xq0')
    xq0.classList.add('x_label')
    xq0.innerText='0'
    xq0.style.left=canvasWidth+'px'

    container.appendChild(yq0)
    container.appendChild(yq1)
    container.appendChild(yq2)
    container.appendChild(yq3)
    container.appendChild(yq4)
    container.appendChild(xq4)
    container.appendChild(xq3)
    container.appendChild(xq2)
    container.appendChild(xq1)
    container.appendChild(xq0)
}

function updateYLabels(graph){
    yq4=document.getElementById('yq4')
    yq4.innerText=graph.yAxis.q4.toFixed(2)

    yq3=document.getElementById('yq3')
    yq3.innerText=graph.yAxis.q3.toFixed(2)

    yq2=document.getElementById('yq2')
    yq2.innerText=graph.yAxis.q2.toFixed(2)

    yq1=document.getElementById('yq1')
    yq1.innerText=graph.yAxis.q1.toFixed(2)

    yq0=document.getElementById('yq0')
    yq0.innerText=graph.yAxis.q0.toFixed(2)
}

function createGraph(){
    canvas=document.createElement('canvas')
    canvas.setAttribute('id','graph')
    ctx=canvas.getContext('2d')
    container=document.createElement('div')
    container.setAttribute('id','graph_container')
    container.appendChild(canvas)
    document.body.append(container)
    addLabels(container,canvas.clientHeight,canvas.clientWidth)
    return{
        canvas:canvas,
        ctx:ctx,
        dataStreams:[], 
        xMax: 20
    }
}