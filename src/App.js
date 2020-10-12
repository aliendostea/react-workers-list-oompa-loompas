import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// views
import Main from './renderViews/Main';
import UserDetail from './renderViews/UserDetail';
// components
import Header from './components/Header';
// scss
import './sass/main.css';

function App() {
  /// routes
  const routes = ["/", "/detail"];

  /// state workers  
  const [workerData, setWorkerData] = useState([]);
  /// state pagination  
  const [pageNumber, setPageNumber] = useState(1);
  
  /// state of loading...
  const [loading, setLoading] = useState(true);

  /// state of new workers onScroll  
  // const [hasMoreWorkers, setHasMoreWorkers] = useState(false);
  
  useEffect( () => {
    /// data request API Ompa Loompa
    const resultAPI = async (pageNumber) => {
      const abortController = new AbortController();
      const signal = abortController.signal;
      
      try {
        setLoading(true);
        const res = await fetch(`https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=${pageNumber}`,
                          {signal: signal}
        );
        const resJSON = await res.json();
        setLoading(false);
        /// call function set state workers
        setWorkerData( prevResultWorkers => {
           return  [...prevResultWorkers, ...resJSON.results]
          }  
        ); 

        return function cancel() {
            abortController.abort()
        }
      } catch (error) {
         console.log('error in API', error);
      }
  
    }


    // setPageNumber(pageNumber);
    resultAPI(pageNumber);
  }, [pageNumber]);

 
  //// data structure for localstorage
  /*
  pages = [{
      "numeroPagina": 1,
      "timestamp": "1233124234",
      "workers": ["worker1", "worker2", "worker3"]
    },
    {
      "numeroPagina": 2,
      "timestamp": "1233124234",
      "workers": ["worker1", "worker2", "worker3"]
    }]

    workers = [{
      "numeroPagina": 1,
      "timestamp": "1233124234",
      "worker": {"worker1"}
  }]
  */

  return (
    <BrowserRouter>
      <main className="content">
        <Header />
        <Route
          exact
          path={routes[0]}
          component={() => (
            <Main 
              workers={workerData}
              setLoading={setLoading}
              loading={loading}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
          )}
        />
        <Route
          exact
          path={`${routes[1]}/:workerId`}
          render={(routeProps) => <UserDetail workers={workerData} {...routeProps} />}
        />
      </main>
    </BrowserRouter>
  );
}

export default App;
