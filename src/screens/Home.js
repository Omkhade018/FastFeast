import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
// import Carousal from "../components/Carousal";
export default function Home() {
  const [search, setSearch]= useState('');
  const[foodCat, setFoodCat]= useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
  let response = await fetch(
    "https://fastfeast-backend.onrender.com/api/foodData",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  response = await response.json();

  setFoodItem(response[0]);
  setFoodCat(response[1]);





   

    // console.log(response[0],response[1]);
  }

  useEffect(()=>{
    loadData()
  },[])


  const images = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200",
  "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200"
];

const randomImages = [...images].sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <>
      <div>
        
        <Navbar />
      </div>
      <div>
  

   <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"cover !important"}}>
  <div className="carousel-inner"  id='carousal'>
    <div className="carousel-caption"  style={{zIndex:"10"}}>
    <div className="d-flex" justify-content-centre>
   <div className="carousel-caption hero-content">
  <h1 className="hero-title">
  Fast Delivery 
</h1>

<p className="hero-subtitle">
  Fresh • Tasty • Delivered in Minutes
</p>

  <div className="d-flex justify-content-center">
    <input
      className="search-bar"
      type="search"
      placeholder="🔍 Search Food..."
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
    />
  </div>
</div>
    </div>
    </div>
  

 
<div className="carousel-inner">
  {randomImages.map((image, index) => (
    <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
      <img src={image} className="d-block w-100" alt="Food" />
    </div>
  ))}
</div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" style={{filter:"invert(1) brightness(300%)"}}></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" style={{filter:"invert(1) brightness(300%)"}}></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
        
    </div>
    
  
  
  
<div className="container">
  {
    foodCat.length !== 0 ?
      foodCat.map((data) => {
        return (
          <div key={data._id}>
            <h2 className="text-danger fw-bold mt-5 mb-3">
🍽 {data.CategoryName}
</h2>

            <hr />

            <div className="row">
              {
                foodItem.length !== 0 ?
                  foodItem
                    .filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                    .map((filterItems) => {
                      
                      return (
                        <div className="col-12 col-md-6 col-lg-3" key={filterItems._id}>
                         <Card
  foodItem={filterItems}
  options={filterItems.options[0]}
  ImgSrc={filterItems.img}
  foodName={filterItems.name}
></Card>
                          
                         
                        </div>
                      );
                    })
                  :
                  <div>No such Data Found</div>
              }
            </div>
          </div>
        );
      })
      :
      <div>Loading...</div>
  }
</div>

<div>
  <Footer />
</div>

</>
);
}