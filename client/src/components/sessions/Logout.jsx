import React, { useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';

const Logout = ({setUser}) => {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
    (async () => {
        try{
            const resp = await Axios.get('/api/logout');

            if (resp.status === 200) {
                setUser(false);
                toast("You have successfully loged out", {
                    type: toast.TYPE.SUCCESS
                });
                setRedirect(true);
            }
        }catch (error) {
            toast("There was an arror while attempting to log out" , {
                type: toast.TYPE.ERROR
            });
        }
    })();

    }, []);
    if (redirect) return (<Redirect to="/resources"/>);
  return null;
};

export default Logout;