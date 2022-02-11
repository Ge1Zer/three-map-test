import React, {useEffect, useRef} from 'react';
import MenuLayout from "../../layout/MenuLayout";
import * as PIXI from "pixi.js";
import st from './style.scss';

const Holst = () => {
  
  let holstOne = useRef(null)
  let holstTwo = useRef(null)
  
  useEffect(() => {
    
    const app = new PIXI.Application({
      width: 200,
      height: 200,
      backgroundColor: 0xfdb7b7
    });
    
    holstOne.current.appendChild(app.view);
    
    const basicText = new PIXI.Text('Hello');
    basicText.anchor.x = 0.5
    basicText.x = app.view.width / 2;
    
    basicText.anchor.y = 0.5
    basicText.y = app.view.height / 2;
    
    basicText.style = {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: "black",
      align: 'center'
    }
    
    app.stage.addChild(basicText);
    
  }, [])
  
  
  // useEffect(() => {
  //
  //   let renderer = PIXI.autoDetectRenderer(10, 10);
  //   holstTwo.current.appendChild(renderer.view);
  //   let container = new PIXI.Container();
  //   const basicText = new PIXI.Text('Hello');
  //   container.addChild(basicText);
  //
  //   renderer.render(container);
  //
  // }, [])
  
  return (
    <MenuLayout>
      <div className={"holst__one"} ref={holstOne}/>
      <div className={"holst__two"} ref={holstTwo}/>
    </MenuLayout>
  )
}
export default Holst;