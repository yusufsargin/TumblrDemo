import React, { useState } from "react";
import "./App.css";
import Post from "./Components/Post";
import Popup from "./Components/Popup";

function App() {
  const appData = require("./Data/siteData.json");
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [popUpData, setPopUpData] = useState({
    title: "",
    content: "",
    photo: "",
    url: "",
  });

  function closePopUp() {
    setPopUpVisible(false);
  }

  function popUpToggle(id) {
    setPopUpVisible(!popUpVisible);
    appData.posts.map((item) => {
      if (item.id === id) {
        let popUpData = {
          title: item["quote-text"] || item["regular-title"] || "",
          content:
            item["quote-source"] ||
            item["photo-caption"] ||
            item["regular-body"],
          photo: "",
          url: item.url,
        };

        if (item["photo-url-1280"] !== "") {
          popUpData.photo = item["photo-url-1280"] || "";
        }

        setPopUpData(popUpData);
      }
    });
  }

  return (
    <div className="App">
      <header>
        <h1>
          <a className="mainTitle">{appData.tumblelog.title}</a>
          <a className="btn btn-blue rssBtn" href="https://demo.tumblr.com/rss">
            <img
              src="https://static.tumblr.com/vr9xgox/oiLnf8zpv/rss.gif"
              id="rss"
              alt="RSS"
            />
          </a>
        </h1>
      </header>
      <div className="modal">
        {popUpVisible && (
          <Popup
            closeEvent={closePopUp}
            isOpen={true}
            blogTitle={popUpData.title}
            blogContent={popUpData.content}
            photo={popUpData.photo}
            url={popUpData.url}
          />
        )}
      </div>
      <div className="content wrapper">
        <div className="posts">
          {appData.posts.map((post, index) => {
            const prevDate = (
              ((appData.posts || [])[index - 1] || "").date || ""
            )
              .split(" ")
              .slice(0, -1)
              .join(" ");
            const currentMount = (post.date || "")
              .split(" ")
              .slice(0, -1)
              .join(" ");

            const isVisible = prevDate !== currentMount ? true : false;

            return (
              <Post
                key={index}
                url={post.url}
                id={post.id}
                type={post.type}
                date={post.date}
                quoteText={post["quote-text"]}
                quoteSource={post["quote-source"]}
                isDateVisible={isVisible}
                photo={post["photo-url-1280"]}
                caption={post["photo-caption"] || post["audio-caption"]}
                description={post["link-description"]}
                linkText={post["link-text"]}
                conversations={post.conversation}
                regularTitle={post["regular-title"]}
                regularBody={post["regular-body"]}
                popUpHandler={popUpToggle}
              />
            );
          })}
        </div>
        <div className="sideBar">
          <div id="search">
            <input />
            <button>Search</button>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat
          </p>
          <a href="/archive"> Archive</a>
        </div>
      </div>
      <footer>
        <p>Powered by Tumblr</p>
      </footer>
    </div>
  );
}

export default App;
