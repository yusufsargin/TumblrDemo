import React from "react";
import "./PopUpStyle.css";

export default function Popup(props) {
  const { isOpen, blogTitle, blogContent, url, photo, closeEvent } = props;

  return (
    <div className={"popUp popUpWrapper " + (isOpen ? "open" : "close")}>
      <h1 className="blogTite">{blogTitle}</h1>
      <p>
        {" "}
        <p dangerouslySetInnerHTML={{ __html: blogContent }}></p>
      </p>

      {photo !== "" && <img src={photo} alt="fail" width="50%" />}
      <a
        className="readMore"
        href={url}
        target="_blank"
        onClick={() => {
          window.open(url, "_blank");
        }}
      >
        Read More
      </a>
      <img
        className="closeButton"
        onClick={closeEvent}
        src="https://lh3.googleusercontent.com/proxy/3AwP08iFnlVIWVHXuCzoNmFX00aiqP4JUuNyU9xw84okpKGBsY7EkyH4IvEURH1AvV-9Hf-yidiVAquEfMgQbxejwEVovqSq-0r-EreLHdBDEFQsnTV2RRQBJVOSOfmOcNG2jRQTmcbkZ_xwIxYk6xjKZBa_VOYxwkklQKRD"
      />
    </div>
  );
}
