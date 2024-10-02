import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

const SearchField = () => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if(keyword.trim()) {
navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  return (
    <div className='top-0 z-10 w-full h-screen absolute bg-bgColor'>
        <form onSubmit={searchSubmitHandler} className='relative w-full h-full flex items-center justify-center'>
        <input className=' py-3 px-8 border text-xl outline-none rounded-full w-[50%] h-[8%]' type="text" placeholder='Search Products'
        onChange={(e) => setKeyword(e.target.value)}/>
        <button type='submit' className='text-gray-400 text-3xl right-16 relative'><IoSearch /></button>
        </form>
    </div>
  )
}

export default SearchField