import Modal from "react-bootstrap/Modal";

const MyAccordionModal = ({ onSubmit, onChange, value, toggle, setToggle }) => {
  return (
    
      <Modal show={toggle} onHide={() => {setToggle(false)}}  className="fade" tabIndex="-1" id="myAccordionModal">
       
          
            <Modal.Header >
              <Modal.Title >Resim URL`si giriniz</Modal.Title>
              <button
                type="button"
                className="btn-close"
                onClick={() => {setToggle(false)}}
                aria-label="Close"
              ></button>
            </Modal.Header>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {setToggle(false)}}
              >
                Kapat
              </button>
            </Modal.Footer>
         
        
      </Modal>
    
  );
};

export default MyAccordionModal;
