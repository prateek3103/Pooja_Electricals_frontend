import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
// import AdminMenu from "./../../components/Layout/AdminMenu";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate(); 
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);       
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }           
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);      
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error); 
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {           
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);
  useEffect(()=> {
    if (checked.length || radio.length) filterProduct();
  },[checked, radio]);
  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);   
    }
  };
  const images = [
    'https://lumprodblobcdn.azureedge.net/Banners/b2b12b3b-b88e-4105-8717-15b37e82d7f6_Summer-Sale.jpg',
    'https://sriraghvendra.com/wp-content/uploads/2018/05/a7e05e30376b4dddd16a54932c478d7c.png',
    'https://cdn11.bigcommerce.com/s-unnwlv5df8/images/stencil/original/image-manager/inverter-page-banner.jpg?t=1698657015'
    // Add more images as needed
  ];
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {   
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 2000); // Change image every 2 seconds
      return () => clearInterval(interval);
    }, []);
    const nextSlide = () => {
      setCurrentIndex((currentIndex + 1) % images.length);
    };
    const prevSlide = () => {
      setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };
    const setSlide = (index) => {
      setCurrentIndex(index);   
    };
  return (
    <Layout title={"ALl Products - Best offers "}>
      {/* banner image */}
      <div className="slideshow-container">      
      {images.map((image, index) => (
        <div className={`mySlides ${index === currentIndex ? 'active' : ''}`} key={index}>
          {index === currentIndex && <img src={image} alt={`Slide ${index}`} style={{ width: '100%', height:'100%' }} />}
        </div>
      ))}
      <a className="prev" onClick={prevSlide}>&#10094;</a>
      <a className="next" onClick={nextSlide}>&#10095;</a>
      <div className="dots-container">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setSlide(index)}
          ></span>
        ))}
      </div>
    </div>    
      {/* <img
        src="https://lumprodblobcdn.azureedge.net/Banners/050e71be-2156-45bb-b15f-64794a9b0c51_Solar-campaign-offer-banner-Final.jpg" alt="Solar off grid age"
        className="banner-img" 
      
        width={"100%"}
      /> */}
      {/* banner image */}
      <h3 className="cate"> <center>Shop by Categories</center></h3> 
      {/* <div className="image"> 
  <img className="battery" src="https://lumprodsta.blob.core.windows.net/prodcontainer/Images/06528793-0fd9-4717-9f49-8416c62f8350_RC%2018000%20battery-1.png" />
  <img className="inverter" src="https://i.gadgets360cdn.com/products/power-sine-800-pure-sine-wave-inverter-large-105657-174175-1643967943-1.jpg" />
  <img className="panel" src="https://atlas-content-cdn.pixelsquid.com/stock-images/solar-panel-cell-lXNrGB6-600.jpg"/>
  <img className="Trolly" src='https://www.arewey.com/wp-content/uploads/2022/02/1bdfa758-8c83-4916-9fb3-0fb31d9aa2fa_ToughX-trolly-TX100S-2.webp'/>
  <img className="fan" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKCDVawDQR4jpqOcX_gFrvD5PIABjghQlAKw&s'/>
  <img className='ro' src="https://4.imimg.com/data4/VA/CW/MY-7147367/aqua-grand-plus-ro-water-purifier-500x500.jpg"/>
  
</div>       */}
<div className="container mt-12"> 
  <div className="row"> 
    <div className="col-1 category-icon" onClick={()=>navigate("/category/battery")}>
      <img src="https://lumprodsta.blob.core.windows.net/prodcontainer/Images/06528793-0fd9-4717-9f49-8416c62f8350_RC%2018000%20battery-1.png" />
      <span>Battery</span>
    </div>
    <div className="col-1 category-icon" onClick={()=>navigate("/category/inverter")}>  
      <img src="https://i.gadgets360cdn.com/products/power-sine-800-pure-sine-wave-inverter-large-105657-174175-1643967943-1.jpg" />
      <span>Inverter</span>
    </div>
    <div className="col-1 category-icon" onClick={()=>navigate("/category/solar panel")}>
      <img src="https://atlas-content-cdn.pixelsquid.com/stock-images/solar-panel-cell-lXNrGB6-600.jpg" />
      <span>Solar Panel</span>
    </div>
    <div className="col-1 category-icon" onClick={()=>navigate("/category/trolly")}>
      <img src="https://www.arewey.com/wp-content/uploads/2022/02/1bdfa758-8c83-4916-9fb3-0fb31d9aa2fa_ToughX-trolly-TX100S-2.webp'" />
      <span>Trolly</span>
    </div>
    <div className="col-1 category-icon" onClick={()=>navigate("/category/fan")}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKCDVawDQR4jpqOcX_gFrvD5PIABjghQlAKw&s" />
      <span>Fan</span>
    </div>
    <div className="col-1 category-icon" onClick={()=>navigate("/category/ro")}>
      <img src="https://jeiaquatech.in/wp-content/uploads/2023/11/Aqua-Phoenix-RO-Water-Purifier.jpg.webp" />
      <span>R.O.</span>
    </div>
    <div className="col-1 category-icon" onClick={()=>navigate("/category/stabilizer")}>
      <img src="https://m.media-amazon.com/images/I/61u+jpbLZlL.jpg" />
      <span>Stabilizer</span>
    </div>
  </div>
</div>

      <div className="container home-page">  
        {/* <div className="col-md-3 filters"> 
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">    
            {categories?.map((c) => (
              <Checkbox    
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          {/* <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div> 
          <div className="d-flex flex-column">     
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            > RESET FILTERS   
            </button>   
          </div>
        </div> */}
       
        <div className="col-md ">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-3" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"     
                  alt={p.name}    
                />        
                <div className="card-body">     
                  <div className="card-name-price">     
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR", 
                      })}   
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button     
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
