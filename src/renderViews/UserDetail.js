import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';

// scss
import '../sass/main.css';

const UserDetail = ({ match }) => {

    /// worker Id pasado por props para la peticion API
    const { workerId } = match.params;
    
    /// set state worker detail 
    const [workerDetail, setworkerDetail] = useState([]);
    
    /// destructuring items detail
    const {
       first_name,
       last_name,
       gender,
       profession,
       description,
       email,
       image,
    } = workerDetail;

    /// data request API Ompa Loompa detail
    const resultAPIDetail = async (workerId) => {
        try {
            const res = await fetch(`https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas/${workerId}`);
            const workerDetail = await res.json();
            setworkerDetail(workerDetail);

        } catch (error) {
            console.log('error in API', error);
        }
    }
    
    useEffect( () => {
        resultAPIDetail(workerId);
    }, [workerId]);

    if (!workerDetail) {
          return (<React.Fragment></React.Fragment>);
    }

    // const worker = workers.filter(worker => worker.id == workerId  ).pop();
    // const ZZ =  Array.from(workerDetail);
    // console.log(workerDetail.length !== 0);



    /*
    const mapWorkerDetail = Object.values(workerDetail).map(function(detail, index) {
            // console.log('---1',detail)
           return detail === undefined ?  null : detail;
    });
    */
    
    return (
        <React.Fragment>    
                <section className="detail slide-top">
                    <figure className="detail__box-img"> 
                        <img src={image} alt={first_name} />
                    </figure>
                    <div className="detail__data"> 
                        <div className="detail__data-titles">
                            <p className="detail__data-name">{last_name}</p>
                            <p className="detail__data-gender">{gender === "F" ? "Woman" : "Man"}</p>
                            <p className="detail__data-gender">{email}</p>
                            <p className="detail__data-profession">{profession}</p>
                        </div>
                        <span className="detail__description">{parse(`${description}`)}</span>
                    </div>
                </section> 
        </React.Fragment>
    );
}

export default UserDetail;