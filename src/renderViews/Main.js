import React, { useState, useEffect } from "react";
// components
import Card from '../components/Card';
import SearchInput from '../components/SearchInput';
import LoaderSpinner from "../components/LoaderSpinner";
// scss
import '../sass/main.css';

const Main = ({ workers, setLoading, loading, setPageNumber, pageNumber }) => {

  // set state search user
  const [userDataSearch, setDataSearch] = useState({
    search: [],
  });
  
  /// extrae search 
  const { search } = userDataSearch;

  /// set state diferente para el loader bottom
  const [loadingBottom, setLoadingBottom] = useState(false);

  // set state searching user, help to know when is typing
  const [searching, setSearching] = useState(false);

  /// handle input fields change
  const handleChange = e => {

    setLoadingBottom(false);
    
    /// set searching to true
    setSearching(true);

    /// set userDataSearch typing
    setDataSearch({
      ...userDataSearch,
      [e.target.name]: e.target.value.toLowerCase(),
    });

  };

  useEffect( () => {
    // if the user search  is "" set searching to false
    if (search  === "") setSearching(false); 
  }, [search, searching])

  /// const para filtrar los workers onKeyDown
  const workersCardsList = workers
  .filter(worker => {        
        const firstAndLastName = `${worker.first_name} ${worker.last_name}`;
        return firstAndLastName.toLowerCase().search(userDataSearch.search) !== -1 || //// toLowerCase()
               worker.profession.toLowerCase().search(userDataSearch.search) !== -1;  //// toLowerCase()
  })
  .map((worker, index, arrayWorkers) => (
      /// se crean los componentes card con los datos que se le pasan
      <Card key={worker.id}
            dataWorker={worker}
            index={index}
            arrayWorkers={arrayWorkers}
            setLoading={setLoading}
            loading={loading}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
            searching={searching}
            loadingBottom={loadingBottom}
            setLoadingBottom={setLoadingBottom}
      />
  ));

  return (
    <React.Fragment>
      <section className="home">
        <div className="home__search-box">
          <div className="form__search">
            <SearchInput handleChange={handleChange} search={search} />
          </div>
        </div>
        <div className="home__heading">
          <h1 className="heading-big">Find your Oompa Loompa</h1>
          <h4 className="heading-medium">There are more than 100k</h4>
        </div>
        <div className="home__list-items">
          {loading && <LoaderSpinner />} 
          {workersCardsList}
          {loadingBottom && <LoaderSpinner />}
        </div>
      </section>
      <div className="test__responsive">test__responsive</div>
    </React.Fragment>
  );
}

export default Main;