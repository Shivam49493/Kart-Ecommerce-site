import React, { useEffect } from 'react'
import { useState,useContext } from 'react'
import Title from '../components/Title'
import {shopDataContext} from '../context/ShopContext'  
import Card from '../components/Card'

function Collection() {
  let [showFilter,setShowFilter] = useState(false)
  let {products,search,setSearch} = useContext(shopDataContext)
  let [filterProducts,setFilterProducts] = useState([])
  let [category,setCategory]= useState([])
  let [subCategory,setSubCategory]= useState([])
  let [sortType,setSortType] = useState('relevant')


  const toggleCategory=(e)=>{
    if (category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item=>item!=e.target.value))
      
    }else{
      setCategory(prev=>[...prev,e.target.value])
    }

  }
  
  

  const toggleSubCategory=(e)=>{
    if (subCategory.includes(e.target.value)){
      setSubCategory(subCategory.filter((item)=>item!==e.target.value))
    }else{
      setSubCategory([...subCategory,e.target.value])
    }
  }

  const sortProduct=()=>{
    let fbcopy=filterProducts.slice()
    switch(sortType){
      case 'lth':
        setFilterProducts(fbcopy.sort((a,b)=>a.price-b.price))
        break
      case 'htl':
        setFilterProducts(fbcopy.sort((a,b)=>b.price-a.price))
        break
      default:
        applyFilter()
      
    }
  }
  useEffect(()=>{
    sortProduct()
  },[sortType])
  

  const applyFilter = ()=>{
    let productCopy=products.slice()

    if (setSearch&& search){
      productCopy=productCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()));
    }



    if(category.length>0){
      productCopy=productCopy.filter((item)=>category.includes(item.category))
    }
    if(subCategory.length>0){
      productCopy=productCopy.filter((item)=>subCategory.includes(item.subCategory))
    }
    setFilterProducts(productCopy)
  }

  useEffect(()=>{ 
    setFilterProducts(products)
  },[products])
  useEffect(()=>{
    applyFilter()
  },[category,subCategory,setSearch,search])

  return (
    <div>
      <div>
        <p onClick={()=>setShowFilter(!showFilter)}>Filter</p>
        <div className={showFilter?'block':'hidden'}>
          <p>Category</p>
          <div>
            <p><input type="checkbox" onChange={toggleCategory} value={'Men'}/> Men</p>
            <p><input type="checkbox" onChange={toggleCategory} value={'Women'}/> Women</p>
            <p><input type="checkbox" onChange={toggleCategory} value={'Kids'}/> Kids</p>
          </div>

        </div>
        <div className={showFilter?'block':'hidden'}>
          <p>Subcategory</p>
          <div>
            <p><input type="checkbox" onChange={toggleSubCategory} value={'topwear'}/> Topwear</p>
            <p><input type="checkbox" onChange={toggleSubCategory} value={'bottomwear'}/> Bottomwear</p>
            <p><input type="checkbox" onChange={toggleSubCategory} value={'winterwear'}/> Winterwear</p>
          </div>
        </div>
        <div>
          {
            filterProducts.map((item,index)=>(<Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price} />
            ))
          }
        </div>
        <div>
          <Title  text1={'Shop'} text2={'Collection'}/>
          <select name="" id="" onChange={(e)=>setSortType(e.target.value)}>
            <option value="relevant">Sort by relevance</option>
            <option value="htl">Price: High to Low</option>
            <option value="lth">Price: Low to High</option>
            
          </select>
        </div>
      </div>
    </div>
  )
}

export default Collection