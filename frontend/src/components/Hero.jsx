import React from 'react'
import { FaCircle } from "react-icons/fa6";

export const Hero = ({heroData,heroCount,setHeroCount}) => {
  return (
    <div>
        <div>
            <p>{heroData.text1}</p>\
            <p>{heroData.text2}</p>
        </div>
        <div>
            <FaCircle className={`w-[14px] ${heroCount===0 ?"fill-orange-400":"fill-white"}`} onClick={() => setHeroCount(0)} />
            <FaCircle className={`w-[14px] ${heroCount===1 ?"fill-orange-400":"fill-white"}`} onClick={() => setHeroCount(1)} />
            <FaCircle className={`w-[14px] ${heroCount===2 ?"fill-orange-400":"fill-white"}`} onClick={() => setHeroCount(2)} />
            <FaCircle className={`w-[14px] ${heroCount===3 ?"fill-orange-400":"fill-white"}`} onClick={() => setHeroCount(3)} />
        </div>
    
    </div>
  )
}
