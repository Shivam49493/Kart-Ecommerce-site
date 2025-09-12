import React from 'react'
import Background from '../components/Background'
import { Hero } from '../components/Hero'
import {useEffect } from 'react'
import LatestCollection from '../components/LatestCollection'
import Bestseller from '../components/Bestseller'

function Home() {
  let heroData = [{text1:"30% off on all products!",text2:"Limited time offer!"},
    {text1:"Free shipping on orders over $50",text2:"Shop now and save!"},
    {text1:"New arrivals every week",text2:"Don't miss out!"},
    {text1:"Exclusive deals for members",text2:"Join today!"}
  ]
  let [heroCount, setHeroCount] = React.useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prevCount) => (prevCount + 1) % heroData.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroData.length])
  return (
    <div >
        <Background heroCount={heroCount} />
        <Hero heroCount={heroCount} setHeroCount={setHeroCount} heroData={heroData[heroCount]}/>
        <div><h3>HOME</h3></div>
        <LatestCollection/>
        <Bestseller/>
    </div>
  )
}

export default Home