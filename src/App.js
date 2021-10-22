import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./App.css";
import AppBar from "./widgets/Appbar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [artWork, setArtwork] = useState({});
  const [open, setOpen] = useState(false);
  let [id, setId] = useState(100);
  const [status, setStatus] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function fetchData() {
    setStatus("Loading...");
    try {
      const response = await axios.get(`https://art-theo.herokuapp.com/api?id=${id}`);
      if (response.status === 200) {
        setArtwork(response.data);
        setId(id++);
      }
    } catch (error) {
      setStatus("An error was encountered");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      fetchData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AppBar />
      <div className="container">
        {artWork && artWork.primaryImage ? (
          <div className="main">
            <img src={artWork.primaryImage} alt="art work" onClick={handleOpen} />
            <h4>Name: {artWork.objectName}</h4>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div>
                  <p>Credit: {artWork.creditLine}</p>
                  <p>Country: {artWork.country}</p>
                  <p>Dimensions: {artWork.dimensions}</p>
                  <p>Culture: {artWork.culture}</p>
                  <p>Department: {artWork.department}</p>
                  <p>Repository: {artWork.repository}</p>
                </div>
              </Box>
            </Modal>
          </div>
        ) : (
          <h1>{status}</h1>
        )}
      </div>
    </>
  );
}

export default App;
