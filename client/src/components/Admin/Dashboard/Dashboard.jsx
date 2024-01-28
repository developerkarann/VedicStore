import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import './css/dashboard.css'
import { Typography } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
import { Doughnut, Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../layout/loader/Loader'
import { getAdminProducts } from '../../../actions/productAction'
import { getAllOrders } from '../../../actions/orderAction'
import { getAllUser } from '../../../actions/userAction'

export default function Dashboard() {

  const dispatch = useDispatch();

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  const { orders } = useSelector((state) => state.allOrders);

  const { products } = useSelector((state) => state.products)

  const { users } = useSelector((state) => state.allUsers)




  let outOfStock = 0;

  products && products.forEach((item) => {
    if (item.stock === 0) {
      outOfStock += 1;
    }
  })

  const navigate = useNavigate();

  Chart.register(...registerables);

  const lineState = {
    labels: ["Intial Amount", "Amount Earned"],
    datasets: [
      {
        label: 'TOTAL AMOUNT',
        backgroundColor: ['tomato'],
        hoverBackgroundColor: ['rgba(197,72,49'],
        data: [0, 4000],
      }
    ]
  }
  const doughnutState = {
    labels: ["Out Of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ['#00A68A', '#6800B4'],
        hoverBackgroundColor: ['#4B5000', '#35014F'],
        // data: [2, 10],
        data: [outOfStock, products.length - outOfStock],
      }
    ]
  }

  useEffect(() => {
    if (user && user.role === 'user') {
      navigate('/login')
    }
    if (isAuthenticated === false) {
      navigate('/login')
    }
    dispatch(getAdminProducts())
    dispatch(getAllOrders())
    dispatch(getAllUser())

  }, [navigate, isAuthenticated, dispatch])

  return (

    <>
      {loading ? <Loader /> :
        <>
          <div className="dashboard">
            <Sidebar />
            {/* Deshboard */}

            <div className="dashboardContainer">
              <Typography component="h1" >Dashboard</Typography>
              <div className="dashboardSummary">
                <div>
                  <p>Total Amount <br /> 2000</p>
                </div>

                <div className="dashboardSummaryBox2">
                  <Link to="/admin/products">
                    <p>Product</p>
                    <p>{ products && products.length}</p>
                  </Link>

                  <Link to="/admin/orders">
                    <p>Order</p>
                    <p>{orders && orders.length}</p>
                  </Link>

                  <Link to="/admin/users">
                    <p>User</p>
                    <p>{users && users.length}</p>
                  </Link>
                </div>
              </div>


              <div className="lineChart">
                <div className="chart">
                  <Line datasetIdKey='id' data={lineState} />
                </div>
              </div>

              <div className="dounhnutChart">
                <Doughnut data={doughnutState} />

              </div>


            </div>
          </div>
        </>
      }
    </>
  )
}
