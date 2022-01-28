import { useEffect, useRef, useState } from 'react';

function App() {
  /* Ref objects */
  const canvasRef = useRef(null)
  const contextRef = useRef(null)

  /* React Hook */
  const [isDrawing, setIsDrawing] = useState(false)

  const startDrawing = ({nativeEvent}) => {
    /* Get co-ordinate from native mousedown event */
    const {offsetx, offsety} = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetx, offsety)

    setIsDrawing(true)
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = ({nativeEvent}) => {
    /* Check for isDrawing to be true */
    if(!isDrawing){ return }

    const {offsetx, offsety} = nativeEvent
    contextRef.current.lineTo(offsetx, offsety)
    contextRef.current.stroke()
  }

  useEffect(() => {
    /* Modify screen pixel density */
    const canvas = canvasRef.current
    canvas.width = window.innerWidth * 2
    canvas.height = window.innerHeight * 2
    canvas.style.width = `${window.innerWidth}`
    canvas.style.height = `${window.innerHeight}`

    /* Scale and configure brush */
    const context = canvas.getContext("2d")
    context.scale(2,2)
    context.lineCap = "round"
    context.strokeStyle = "black"
    context.lineWidth = 5
    contextRef.current = context


  },[])


  return (
    <div>
    <h1>Hello world</h1>
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef} 
    />
    </div>
  );
}

export default App;