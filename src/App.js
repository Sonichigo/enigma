import React, { Component } from 'react';
import Navbar from './component/Navbar';
import Quests from './component/Daily';
import SideBar from './component/Sidebar';
import Thougts from './component/Thougts';
import Grid from "@react-css/grid";

class App extends Component {

  render() {
    return (
      <div>
        <Navbar/>
          <br />
          <Grid columns="20% 55% 20%" gap="1em">
            <SideBar />
            <div/>
            <Thougts />
         </Grid>
      </div>
    );
  }
}

export default App;