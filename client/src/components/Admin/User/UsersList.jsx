import React, { useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../../layout/MetaData'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Sidebar from '../Dashboard/Sidebar'
import { deleteUser, getAllUser } from '../../../actions/userAction'
import { clearErrors } from '../../../actions/productAction'
import { DELETE_USER_RESET } from '../../../constants/userConstants'
export default function UsersList() {
  const dispatch = useDispatch()
  const alert = useAlert()

  const { users, error } = useSelector((state) => state.allUsers)

  const { error: deleteError, isDeleted } = useSelector((state) => state.profile)

  //Delete Product Function

  const deleteUsertHandler = (id) => {
    dispatch(deleteUser(id))
  }


  const columns = [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 200, flex: 0.5 },
    { field: "email", headerName: "Email", minWidth: 250, flex: 0.5 },
    {
      field: "role", headerName: "Role", minWidth: 100, flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === 'admin'
          ? 'greenColor'
          : 'redColor'
      }
    },
    {
      field: "action", headerName: "Actions", type: 'number', minWidth: 150, flex: 0.3, sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/user/${params.getValue(params.id, 'id')}`}> <EditIcon /></Link>
            <Button onClick={() => deleteUsertHandler(params.getValue(params.id, 'id'))} > <DeleteIcon /> </Button>
          </>
        )
      }

    },
  ];


  const rows = [];

  users && users.forEach((item, index) => {
    rows.push({
      id: item._id,
      role: item.role,
      email: item.email,
      name: item.name,
    })
  })



  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors())
    }
    if (isDeleted) {
      alert.success("User Deleted !")
      dispatch({ type: DELETE_USER_RESET })
    }
    dispatch(getAllUser())
  }, [dispatch, alert, error, isDeleted, deleteError])


  return (
    <>

      <MetaData title="All Users - Admin" />

      <div className="dashboard">
        <Sidebar />

        <div className="productListContainer">
          <h1 id='productListHeading'>ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className='productListTable'
          />
        </div>

      </div>
    </>
  )
}
