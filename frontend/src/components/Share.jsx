import React, { useState } from "react";
import Modal from "react-modal";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from "react-share";
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin, FaShareAlt } from "react-icons/fa";

Modal.setAppElement("#root");

const Share = ({ itemId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  // Generate a default share URL using itemId

  const getValidShareUrl = () => {
    return fileUrl || `http://localhost:5173/${itemId}`;
  };

  console.log(itemId);
  

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       const url = URL.createObjectURL(selectedFile);
//       setFile(selectedFile);
//       setFileUrl(url);
//     }
//   };

  const shareUrl = getValidShareUrl();

  return (
    <div className="relative">
      <button
        onClick={() => setModalIsOpen(true)}
        className="text-white  hover:text-gray-300"
      >
        <FaShareAlt size={24} />
      </button>

      {/* Share Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white text-black p-6 rounded-lg shadow-lg w-80 text-center mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-lg font-semibold mb-4">Share on Social Media</h2>
        <div className="flex justify-center gap-4 mb-4">
          <FacebookShareButton url={shareUrl}><FaFacebook size={30} className="text-blue-600" /></FacebookShareButton>
          <TwitterShareButton url={shareUrl}><FaTwitter size={30} className="text-blue-400" /></TwitterShareButton>
          <WhatsappShareButton url={shareUrl}><FaWhatsapp size={30} className="text-green-500" /></WhatsappShareButton>
          <LinkedinShareButton url={shareUrl}><FaLinkedin size={30} className="text-blue-700" /></LinkedinShareButton>
        </div>
        
        {/* Optional File Input */}
        {/* <div className="mb-4">
          <input type="file" onChange={handleFileChange} />
        </div> */}

        <button
          onClick={() => setModalIsOpen(false)}
          className="bg-black text-white py-2 px-4 rounded-lg w-full"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Share;
