import React from "react";
import "./sideBar.css";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { SimpleTreeView } from "@mui/x-tree-view";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div>
      <Link to="/">
        <img src={logo} alt="Shoocart Enterprises" />
      </Link>
      </div>
      <div>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      </div>
      
        {/* defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ImportExportIcon />} */}
        <div>
        <SimpleTreeView className="smpTree">
          <TreeItem nodeId="1" label="Products" className="treeItem">
            <Link to="/admin/products">
              <TreeItem
                itemId="all"
                label={<div className="itemTree-div"><PostAddIcon/> All</div>}
              
              />
            </Link>

            <Link to="/admin/product">
              <TreeItem itemId="create" label={<div className="itemTree-div"><AddIcon/> Create</div>} />
            </Link>
          </TreeItem>
        </SimpleTreeView>
        </div>
      <div>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      </div>
     <div>
     <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
     </div>
     <div>
     <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
     </div>
    </div>
  );
};

export default SideBar;
