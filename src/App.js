import './App.css';
import {Component} from "react";
import {Route} from "react-router-dom";
import {Routes} from "react-router";
import Checkout from "./containers/Checkout/Checkout";
import Layout from "./hoc/Layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Orders from "./containers/Orders/Orders";

class App extends Component {
    // state={
    //     show:true
    // }
    // componentDidMount() {
    //     setTimeout(()=>{
    //         this.setState({show:false})
    //     },5000)
    // }

    render() {
        return (
            <div>
                <Layout>
                    {/*{this.state.show?<BurgerBuilder/>:null}*/}
                    {/*<Routes>*/}
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/orders" component={Orders}/>
                    <Route path="/" exact component={BurgerBuilder}/>
                    {/*</Routes>*/}
                </Layout>
            </div>
        );
    }

}

export default App;
