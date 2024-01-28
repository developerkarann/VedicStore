import React from 'react';
import './css/sidebar.css'
import logo from '../../../assets/image/logo.png'
import { Link } from 'react-router-dom'
import { TreeView, TreeItem } from '@material-ui/lab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PostAddIcon from '@material-ui/icons/PostAdd'
import AddIcon from '@material-ui/icons/Add'
import ImportExporIcont from '@material-ui/icons/ImportExport'
import ListAltIcon from '@material-ui/icons/ListAlt'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PeopleIcon from '@material-ui/icons/People'
import RateReviewIcon from '@material-ui/icons/RateReview'
import { } from '@material-ui/icons/Dashboard'

export default function Sidebar() {
    return (
        <>
            <div className="sidebar">
                <Link to='/'> <img src={logo} alt="ECommerce" /></Link>
                <Link to='/admin/dashboard' >
                    <p><DashboardIcon /> Deshboard</p>
                </Link>

                <Link>
                    <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ImportExporIcont />}>
                        <TreeItem  nodeId="1" label="Products">
                            <Link to='/admin/products'>
                                <TreeItem nodeId='2' label="All" icon={<PostAddIcon />}> </TreeItem>
                            </Link>

                            <Link to='/admin/product/new'>
                                <TreeItem nodeId='3' label="Create" icon={<AddIcon />}> </TreeItem>
                            </Link>

                        </TreeItem>
                    </TreeView>
                </Link>

                <Link to='/admin/orders'>
                    <p><ListAltIcon /> Orders</p>
                </Link>

                <Link to='/admin/users'>
                    <p><PeopleIcon /> Users</p>
                </Link>

                <Link to='/admin/reviews'>
                    <p><RateReviewIcon />Reviews</p>
                </Link>

            </div>
        </>
    )
}
