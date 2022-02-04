const recursiveMethod = (array, field) =>{
  return array.flatMap((element) => {
    if (element[field])
      if (element[field]?.length)
        return recursiveMethod(element[field], field)
      else
        return element
    else
      return element
  })

}

export {recursiveMethod}