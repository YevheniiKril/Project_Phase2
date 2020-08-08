import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Index = function (user){

    const [resources,setResources] = useState([]);

    useEffect(() => {
        (async () => {
            await getResources();
        })();

    }, []);

    const getResources = async () => {
        const resourceResp = await Axios.get('/api/resources');
        if (resourceResp.status ===200) setResources(resourceResp.data);
    };

    const deleteResource = async resource => {
        try{
        const resp = await Axios.post('/api/resources/delete', {
            id: resource._id
        });
        if(resp.status === 200) toast("The story was deleted successfully" , {
            type: toast.TYPE.SUCCESS
        });
        getResources();
    }catch (error) {
        toast("There was an error deleting the story", {
            type: toast.TYPE.ERROR
        });
    }
    };

    return(
        <Container className="my-5">
            <header>
                <h1>
                    Archive
                </h1>
            </header>
            <hr/>

            <div className="content">
                {resources && resources.map((resource, i) => (
                    <div key ={i} className="card my-3">
                        <div className = "card-header clearfix">
                            <div className="float-left">
                                <h5 className="card-title">
                                    {resource.title}
                                </h5>  

                                {resource.user ? (
                                    <small>~{resource.user.fullname}</small>
                                ) : null}                      
                            </div>

                            <div className="float-right">
                                <small>{resource.updateAt}</small>
                            </div>
                        </div>


                        <div className="card-body">
                            <p className="card-text">
                                {resource.synopsis}
                            </p>
                        </div>

                        {user ? (
                            <div className="card-footer">
                                <Link to={{
                                    pathname: "/resources/edit",
                                    state: {
                                        id: resource._id
                                    }
                                }}>
                                    <i className="fa fa-edit"></i>
                                </Link>

                                <button type="button" onClick={() => 
                                deleteResource(resource)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>

                        ): null}
                    </div>
                ))}
            </div>
        </Container>

    );

};

export default Index;