let draggable={
    intervalId:-1,
    pointer:{
        x: -1,
        y: -1,
        xDistToElementCorner:-1,
        yDistoToElementCorner:-1
    },
    element:undefined
}

function getDistanceToPointer(pointerX,pointerY){
    elementPosition=draggable.element.getBoundingClientRect()
    draggable.pointer.xDistToElementCorner=pointerX-elementPosition.left
    draggable.pointer.yDistoToElementCorner=pointerY-elementPosition.top
}

function whileMouseDown(){
    draggable.element.style.top=draggable.pointer.y-draggable.pointer.yDistoToElementCorner+'px'
    draggable.element.style.left=draggable.pointer.x-draggable.pointer.xDistToElementCorner+'px'
}

function onMouseMove(e){
    draggable.pointer.x=e.clientX
    draggable.pointer.y=e.clientY
}

function onMouseDown(e){
    if(draggable.intervalId==-1){
        document.addEventListener('mousemove',onMouseMove,true)
        getDistanceToPointer(e.clientX,e.clientY)
        draggable.intervalId=setInterval(()=>{
            whileMouseDown()
        },100)
    }
}

function onMouseUp(){
    if(draggable.intervalId!=-1){
        document.removeEventListener('mousemove',onMouseMove,true)
        clearInterval(draggable.intervalId)
        draggable.intervalId=-1
    }
}

function setDraggable(_element){
    draggable.element=_element
    draggable.element.addEventListener('mousedown',onMouseDown)
    document.addEventListener('mouseup',onMouseUp)
    draggable.element.style.cursor='pointer'
}
