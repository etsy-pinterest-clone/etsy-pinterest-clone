import React, { useState, useEffect } from 'react'
import {getUser, updateUser} from '../redux/userReducer';
import {connect} from 'react-redux';
import axios from 'axios';

function VisitorView(props) {
    const [userId, setUserId] = useState(null);

    useEffect(()=> {

    },[])

    const showUserPage = () => {
      
      return(<div>

      </div>)
      }


    return (
      <div className="visitorView">

      </div>
    );
  }

  const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, {getUser, updateUser})(VisitorView);