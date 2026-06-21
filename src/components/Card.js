import React, {useEffect, useState, useRef}from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
import { useNavigate } from 'react-router-dom';

export default function Card(props) {
  let dispatch= useDispatchCart();
  let data =useCart()
  const navigate = useNavigate();
  const priceRef = useRef()
  let options =props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1)
  const [size, setSize] =useState("")

   const handleClick = () => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login")
    }
  }
  const handleQty = (e) => {
    setQty(e.target.value);
  }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }


  const handleAddToCart = async ()=>{
     let food = null
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food ) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }


    await dispatch({type: "ADD", id: props.foodItem._id,name:props.foodItem.name,price:finalPrice, qty:qty, size:size})
    

  }
  let finalPrice =qty* parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  }, [])

 

   

  return (
    <div>

      <div className="card food-card mt-4">
<img
  src={props.ImgSrc}
  className="card-img-top"
  style={{
    height: "180px",
    objectFit: "cover",
    borderRadius: "15px 15px 0 0"
  }}
/>

  <div className="card-body">
    <h4 className="card-title">{props.foodItem.name}</h4>

    <div className="d-flex align-items-center gap-3 mt-3">
    <select
  className="form-select bg-danger text-white qty-select"
  onChange={handleQty}
>
        {Array.from(Array(6), (e, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

     <select
  className="form-select bg-danger text-white size-select"
  ref={priceRef}
  onChange={handleOptions}
>
        {priceOptions.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>

      <div className='text-warning fw-bold fs-4'>
₹{finalPrice}
</div>
    </div>

    <button
      className="btn btn-danger w-100 rounded-pill mt-4"
      onClick={handleAddToCart}
    >
      Add To Cart 🛒
    </button>
  </div>
</div>
      </div>
    
  )
}