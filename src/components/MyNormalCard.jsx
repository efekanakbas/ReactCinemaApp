

const MyNormalCard = ({ item, genres }) => {
  return (
    <div>
      <div className="card mb-3 " id="myPagenationCard">
        <div className="row g-0">
          <div className="col-md-4" id="myPagenationImgDiv">
            <img
              className="rounded-4"
              id="myPagenationImg"
              src={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                  : "/images/poster-notfound.jpg"
              }
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
                  {item.title.length > 25
                    ? item.title.substring(0, 25) + "..."
                    : item.title}
                </h1>
              ) : (
                <h1 title={item.name} className="card-title fs-2 fw-bold">
                  {item.name.length > 25
                    ? item.name.substring(0, 25) + "..."
                    : item.name}
                </h1>
              )}
              <h1 className="card-title fs-5 text-secondary">
                {item.original_title} {item.original_name}
              </h1>
              <p className="card-text myCardText">
                {item.genre_ids && item.genre_ids.length > 0
                  ? item.genre_ids
                      .map((genreId) => {
                        const matchedGenre = genres.find(
                          (genre) => genre.id === genreId
                        );
                        return matchedGenre
                          ? matchedGenre.name
                          : "Tür Bulunamadı";
                      })
                      .filter(Boolean)
                      .join(", ")
                  : "Tür Bulunamadı"}
              </p>
              <p className="card-text" title="Yayınlanma Tarihi">
                <i className="bi bi-calendar"></i> {item.release_date}
              </p>

              <p className="card-text">
                {item.overview.length > 350
                  ? item.overview.substring(0, 350) + "..."
                  : item.overview}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNormalCard;
