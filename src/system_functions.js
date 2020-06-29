const font_size=(vh, value, flag=null)=>{
    if (vh>=920){
        return String(value)+'vh'
    }
    if (vh<920 && flag==null){
      return String(9.2*value)+'px'
    }
    if (vh<920 && flag=='text'){
      return String(9.2*value)*0.8+'px'
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

