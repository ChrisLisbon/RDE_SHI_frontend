const font_size=(vh, value)=>{
    if (vh>=920){
        return String(value)+'vh'
    }
    if (vh<920){
      return String(9.2*value)+'px'
    }
  }

const map_height=(vh)=>{
  if (vh>=920){
    return '93vh'
  }
  if (vh<920){    
    return String(vh-64.4)+'px'
  }
}
export {font_size, map_height}

