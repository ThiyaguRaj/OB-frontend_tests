import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from '@material-ui/icons/Home';
import { Link, withRouter, Route } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import PageviewIcon from '@material-ui/icons/Pageview';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Listp from '../Product/ProductList';
import AddProduct from '../Product/AddProduct';
import Welcome from './Welcome';
import Trash from '../Product/Trash'
import View from '../Product/ViewProduct';
import Update from '../Product/UpdateProduct';
import Remove from '../Product/RemoveProduct';
import Plan from '../Product/AddPlan';
import PlanUpdate from '../Plan/UpdatePlan'
import AddCharge from '../PlanDetail/AddCharge';
import AddDetail from '../PlanDetail/AddDetail';
import AddOverdue from '../PlanDetail/AddOverdue';
import UpdateCharge from '../PlanDetail/UpdateCharge';
import UpdateDetail from '../PlanDetail/UpdateDetail';
import UpdateOverdue from '../PlanDetail/UpdateOverdue';
import ViewPlanDetail from '../PlanDetail/ViewPlanDetail';
import Display from '../PlanDetail/DisplayDetails';
import AllDetail from '../PlanDetail/AddAllPlanDetails';
import AllPlan from '../Plan/AllPlans'
import './wel.css'

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#3f51b5'
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function SideNav(props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Link exact to="/">
          <Toolbar>
            <Typography variant="h6" noWrap>
              <span className="com">biller</span>
            </Typography>
          </Toolbar></Link>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer} id="lists">
          <List className="topli">
            <Link to="/products">
              <ListItem button key="Products" className="items">
                <ListItemIcon><PageviewIcon /></ListItemIcon>
                <ListItemText primary="Product" />
              </ListItem>
            </Link>
            <Link to="/product">
              <ListItem button key="Product" className="items">
                <ListItemIcon><AddCircleOutlineIcon /></ListItemIcon>
                <ListItemText primary="Add Product" />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <Link to="/allplans">
              <ListItem button key="Plan" className="items">
                <ListItemIcon><SearchIcon /></ListItemIcon>
                <ListItemText primary="Plan" />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
          <Link to="/trash">
              <ListItem button key="Trash" className="items">
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Trash" />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <Link to="/">
              <ListItem button key="home" className="items">
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <button className="back" onClick={props.history.goBack}>
              <ListItem button key="Product" className="items">
                <ListItemIcon><ArrowBackIcon /></ListItemIcon>
                <ListItemText primary="Back" />
              </ListItem>
            </button>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Typography paragraph>
          <Route exact path="/" component={Welcome} />
          <Route path="/view" component={View} />
          <Route path="/product" component={AddProduct} />
          <Route path="/update" component={Update} />
          <Route path="/remove" component={Remove} />
          <Route path="/products" component={Listp} />
          <Route path="/plan" component={Plan} />
          <Route path="/updateplan" component={PlanUpdate} />
          <Route path="/addcharge" component={AddCharge} />
          <Route path="/adddetail" component={AddDetail} />
          <Route path="/addoverdue" component={AddOverdue} />
          <Route path="/updatecharge" component={UpdateCharge} />
          <Route path="/updatedetail" component={UpdateDetail} />
          <Route path="/updateoverdue" component={UpdateOverdue} />
          <Route path="/detail" component={ViewPlanDetail} />
          <Route path="/details" component={Display} />
          <Route path="/adddetails" component={AllDetail} />
          <Route path="/allplans" component={AllPlan} />
          <Route path="/trash" component={Trash} />
        </Typography>
      </main>
    </div>
  );
}

export default withRouter(SideNav);