import React from "react";
import parse from 'html-react-parser';
/// sass
import "../sass/main.css";

const LoaderSpinner = () => {
  return (
    <React.Fragment> 
     { parse(`  <div class="home__list-loading">
                    <div class="sk-folding-cube">
                        <div class="sk-cube1 sk-cube"></div>
                        <div class="sk-cube2 sk-cube"></div>
                        <div class="sk-cube4 sk-cube"></div>
                        <div class="sk-cube3 sk-cube"></div>
                    </div>
                    <span> The Ommpa Lompa's are working...</span>
                </div>`
     )}
    </React.Fragment>
  );
};

export default LoaderSpinner;
