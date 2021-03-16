import * as React from 'react';
import { connect } from 'react-redux';

const Home = () => (
  <div>
    <h1>Welcome!</h1>
    <p>Welcome to movie Project</p>
    <ul>
            <li><a href='https://localhost:44386/swagger'>Click</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'></a> To view a list of the available endpoint</li>
     
    </ul>
   
  </div>
);

export default connect()(Home);
