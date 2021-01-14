import React from "react";
import classNames from "classnames/bind";
//Style
import "./style.scss";;

function SearchComponent(props: any) {
    const {setSearchInputValue, setActiveSearchBtn, activeSearchBtn} = props;
  return (
      <div className="search-bar">
        <input
          className="search-bar__input"
          placeholder="type to search"
          onChange={(e) => {
            setSearchInputValue(e.target.value);
          }}
        />
        <div className="search-bar__buttons">
          <div
            className={classNames({ active: activeSearchBtn === "all" })}
            onClick={() => {
              setActiveSearchBtn("all");
            }}
          >
            All
          </div>
          <div
            className={classNames({ active: activeSearchBtn === "active" })}
            onClick={(): void => {
              setActiveSearchBtn("active");
            }}
          >
            Active
          </div>
          <div
            className={classNames({ active: activeSearchBtn === "done" })}
            onClick={(): void => {
              setActiveSearchBtn("done");
            }}
          >
            Done
          </div>
        </div>
      </div>
  );
}

export default SearchComponent;
