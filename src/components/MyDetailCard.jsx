

const MyDetailCard = ({ item }) => {
  return (
    <div>
      <div className="container" style={{ width: "100%" }}>
        <div className="card mb-3 ms-md-5 ms-3  " id="myPagenationCard2">
          <div className="row g-0">
            <div className="col-md-4" id="myPagenationImgDiv">
              <img
                className="rounded-4"
                id="myPagenationImg2"
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                    : "/images/poster-notfound.jpg"
                }
                style={{ objectFit: "fill" }}
                width="100%"
                height="250"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Image"
                preserveAspectRatio="xMidYMid slice"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                {item.title ? (
                  <h1 title={item.title} className="card-title fs-2 fw-bold">
                    {item.title.length > 30
                      ? item.title.substring(0, 30) + "..."
                      : item.title}
                  </h1>
                ) : (
                  <h1 title={item.name} className="card-title fs-2 fw-bold">
                    {item.name.length > 30
                      ? item.name.substring(0, 30) + "..."
                      : item.name}
                  </h1>
                )}
                {item.title ? (
                  <h1 className="card-title fs-5 text-secondary">
                    {item.original_title.length > 50
                      ? item.original_title.substring(0, 50) + "..."
                      : item.original_title}
                  </h1>
                ) : (
                  <h1 className="card-title fs-5 text-secondary">
                    {item.original_name.length > 50
                      ? item.original_name.substring(0, 50) + "..."
                      : item.original_name}
                  </h1>
                )}
                <p className="card-text myCardText">
                  {item.genres && item.genres.length > 0
                    ? item.genres.map((genreId) => genreId.name).join(", ")
                    : "Tür Bulunamadı"}
                </p>
                <p className="card-text" title="Yayınlanma Tarihi">
                  <i className="bi bi-calendar"></i> {item.release_date}
                </p>

                <p className="card-text">{item.overview}</p>
                <div className="text-start">
                  {item.production_countries.map((data, i) => (
                    <p key={i}>
                      <span>
                        <i className="bi bi-flag"></i>
                        {data.iso_3166_1}
                      </span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDetailCard;
