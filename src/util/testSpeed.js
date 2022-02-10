const testSpeed = (hocFunction) =>{
  
  const start = new Date()
  
  const result = hocFunction()
  
  const end = new Date()
  
  console.log((end - start)/1000)
  return result
  
}

export {testSpeed}