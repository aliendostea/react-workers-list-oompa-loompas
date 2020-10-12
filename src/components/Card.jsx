import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import parse from 'html-react-parser';
/// sass
import '../sass/main.css';


const Card = ({dataWorker, arrayWorkers, index, setLoading, loading, setPageNumber, pageNumber, searching, loadingBottom,setLoadingBottom}) => {
    // extrae los props de dataWorker con destructuring
    const {
      id,
      first_name,
      last_name,
      gender,
      profession,
      image,
    } = dataWorker;

    /// use ref para el elemento observer. El Ref se le añade al ultimo nodo del API workers
    const observer = useRef();

    /// esta function se llama cuando el ultimo nodo (worker) de la lista apararece en el observer
    const lastNodeWorkerRef = useCallback( node => {
      /// si esta cargargo los componenten nuevos devuelve return
      if (loading) return;
      console.log(loading);

      /// si el node current observado fue observado, se desconecta el oberser
      if (observer.current) observer.current.disconnect();
      
      /// si el node current observado fue observado, se desconecta el oberser
      observer.current = new IntersectionObserver(entries =>{
        
            if (entries[0].isIntersecting) {
              
              if (searching) return;

              /// añade el spinner       
              setLoadingBottom(true);

              /// añade un setTimeout de 2 segundos para una mejor UX al cargar
              setTimeout(function(){
                
                //// se suma +1 al pagenumber de la ruta de la API para que cargue otra 
                setPageNumber(prevPageNumber => prevPageNumber + 1);

                /// remueve el spinner 
                setLoadingBottom(false);
              }, 5000);

              return;
            }

         });

      if (node) observer.current.observe(node);

    }, [pageNumber, loading, searching, loadingBottom]);

    const classSlidetop =  pageNumber === 1 ? "slide-top" : "";

    //// parse para el if. jsx para el if del useRef
    let workerNodeElement;
    let htmlInsideLink =
      parse(`<figure class="card__image">
              <img src=${image} alt=${first_name} />
            </figure>
            <p class="card__name">
              ${first_name} ${last_name}
            </p>
            <p class="card__gender">${gender === "F" ? "Woman" : "Man"}</p>
            <p class="card__profession">${profession}</p>`
           );

    //// si es el ultimo nodo de la lista le añade una function callback para crear el observer que llama al API
    if(arrayWorkers.length === index + 1) {
        workerNodeElement = 
        <Link to={`/detail/${id}`}  ref={lastNodeWorkerRef} className={`card ${classSlidetop}`} id={id}>
           {htmlInsideLink}
       </Link>;
    } else {
        workerNodeElement = 
        <Link to={`/detail/${id}`} className={`card ${classSlidetop}`} id={id}>
            {htmlInsideLink}          
       </Link>;
    }
  
    return (
      <>
        {workerNodeElement}
      </>
    );
}

Card.prototype = {
    className: PropTypes.string,
    value: PropTypes.string.isRequired
};

Card.defaultPropos = {
    className: 'card'
};

export default Card;
