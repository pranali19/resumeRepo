import React from "react";

export const isNull=(param)=>{
  if(param.length == 0){return true}
  return false
}
export const checkVal =(param)=>{
  if (0<= param && param <= 10){
       return true
  }
  return false
}
