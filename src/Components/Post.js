import React from "react";

export default function Post(props) {
  const {
    id,
    url,
    type,
    date,
    quoteText,
    quoteSource,
    isDateVisible,
    photo,
    caption,
    linkText,
    description,
    conversations,
    regularTitle,
    regularBody,
    popUpHandler,
  } = props;
  const postDate = new Date(date);
  const day = postDate.getDate();
  const mountName = (date || "").split(" ")[2] || "";
  const dayName = date.split(" ")[0] || "";

  function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }

  const postContent = () => {
    switch (type) {
      case "quote":
        return (
          <div className="quote">
            <div className="quote_text">
              <span className="short">{quoteText} </span>
            </div>
            —{" "}
            {quoteSource && (
              <span
                className="source"
                dangerouslySetInnerHTML={{ __html: quoteSource }}
              ></span>
            )}
          </div>
        );
      case "photo":
        return (
          <div className="photo">
            <a
              href={url}
              onClick={() => {
                window.open(url, "_blank");
              }}
            >
              <img src={photo} width="100%" alt="test" />
            </a>
            <div className="caption">
              <div dangerouslySetInnerHTML={{ __html: caption }}></div>
            </div>
          </div>
        );
      case "link":
        return (
          <div className="link">
            <a
              className="link"
              href={url}
              onClick={() => {
                window.open(url, "_blank");
              }}
            >
              {linkText}
            </a>
            <div className="description">
              <span dangerouslySetInnerHTML={{ __html: description }}></span>{" "}
            </div>
          </div>
        );
      case "conversation":
        return (
          <div className="conversation">
            <ul>
              {(conversations || []).map((text, index) => {
                return (
                  <li className={index % 2 === 0 ? "even" : "odd"} key={index}>
                    <span className="label user">{text.label}</span>{" "}
                    {text.phrase}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      case "audio":
        return (
          <div className="audio">
            <div className="caption">
              <div dangerouslySetInnerHTML={{ __html: caption }}></div>
            </div>
          </div>
        );
      case "regular":
        return (
          <div className="regular">
            {regularTitle !== "" && <h2>{regularTitle}</h2>}
            <p dangerouslySetInnerHTML={{ __html: regularBody }}></p>
          </div>
        );
      default:
        return (
          <div
            className="regular"
            dangerouslySetInnerHTML={{ __html: regularBody }}
          ></div>
        );
    }
  };

  return (
    <div className="post">
      <p className="postDate">{getFormattedDate(new Date(date))}</p>
      {isDateVisible && (
        <div className="date">
          <div className="date_brick">
            {mountName} <br /> {day}{" "}
          </div>
          {dayName}
        </div>
      )}
      <a
        href={url}
        onClick={() => {
          window.open(url, "_blank");
        }}
      >
        <img
          className="permalink"
          alt="fail"
          src="https://static.tumblr.com/vr9xgox/NoWnf8zop/permalink.gif"
        />
      </a>
      {postContent()}
      {url !== "" && (
        <a
          className="btn openPopUp"
          onClick={() => {
            popUpHandler(id);
          }}
        >
          Read More
        </a>
      )}
    </div>
  );
}
