import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();

 const handleLogout = () => {
  localStorage.removeItem("authToken");
  navigate("/login");
}

  const loadCart = () => {
    setCartView(true);
  }

  const items = useCart();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">FastFeast</Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              {localStorage.getItem("authToken") ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">
                    My Orders
                  </Link>
                </li>
                : ""}
            </ul>

            {!localStorage.getItem("authToken") ?
              <div className='d-flex'>
                <Link className="btn bg-white text-danger mx-1" to="/login">
                  Login
                </Link>

               <Link className="btn bg-white text-danger mx-1" to="/signup">
  SignUp
</Link>
              </div>

              :

              <div className='d-flex align-items-center'>

                <div className='btn bg-white mx-2' onClick={loadCart}>
                  <Badge badgeContent={items.length} color="error">
                    <ShoppingCartIcon sx={{ color: "red" }} />
                  </Badge>
                </div>

                {cartView ?
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                  : ""}

                <div
                  className='btn bg-white text-danger mx-2'
                  onClick={handleLogout}
                >
                  Logout
                </div>

              </div>
            }

          </div>
        </div>
      </nav>
    </div>
  )
}