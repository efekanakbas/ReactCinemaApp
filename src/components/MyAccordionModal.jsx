

const MyAccordionModal = ({onSubmit, onChange, value}) => {
  return (
    <div>
      <div className="modal fade" tabIndex="-1" id="myAccordionModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Resim URL`si giriniz</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form onSubmit={onSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="myPicture"
                      name="myUrl"
                      placeholder="name"
                      value={value}
                      onChange={onChange}
                    />
                    <label htmlFor="myPicture">Resmin URL`si</label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mt-3 float-end"
                  >
                    Değiştir
                  </button>
            </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccordionModal;
