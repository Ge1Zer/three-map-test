const testSpeed = (hocFunction, name = 'speed') =>{
  
  const start = performance.now()
  
  const result = hocFunction()
  
  const end = performance.now()
  
  console.log(name, ((end - start)/1000).toFixed(4))
  return result
  
  
  // const start = new Date()
  //
  // const result = hocFunction()
  //
  // const end = new Date()
  //
  // console.log(name, (end - start)/1000)
  // return result
  
}

export {testSpeed}