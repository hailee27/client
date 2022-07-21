import React, { useRef, useState } from "react";

import styles from "@/styles/pages/card.module.scss";
import QRCode from "react-qr-code";
import images from "@/assets/images";
import listImage from "@/listImage";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function PdfCard({ file, name, editName, size, checked }) {
  const link = `${process.env.REACT_APP_BASE_URL}/${name}`;
  const [coverImage, setCoverImage] = useState(images.image5);
  const [fileImageCover, setFileImageCover] = useState(null);

  const input = useRef();
  const outputPdf = () => {
    html2canvas(input.current).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 110, 5, 90, 55);
      pdf.addImage(imgData, "PNG", 10, 5, 90, 55);
      pdf.save("File.pdf");
    });
  };
  const handleChange = (image) => {
    setFileImageCover(null);
    setCoverImage(image);
  };
  console.log(link);
  return (
    <div className={styles.wrapperCard}>
      <div className={styles.card} ref={input}>
        {fileImageCover ? (
          <img src={URL.createObjectURL(fileImageCover)} alt="" />
        ) : (
          <img src={coverImage} alt="" />
        )}

        <div className={styles.content}>
          {file ? (
            <div className={styles.avatar}>
              <img
                style={{ display: checked ? "none" : "" }}
                src={URL.createObjectURL(file)}
                alt=""
              />
            </div>
          ) : (
            <div className={styles.avatar}>
              <img
                style={{ display: checked ? "none" : "" }}
                src={images.logoPPG}
                alt=""
              />
            </div>
          )}

          <div className={styles.qrCode}>
            <QRCode size={150} level={"L"} value={link} />
          </div>
          <h1
            className={styles.name}
            type="text"
            style={{ fontSize: `${size + "rem"}` }}
          >
            {editName || name}
          </h1>
        </div>
      </div>

      <ul className={styles.listImage}>
        {listImage.map((image, index) => (
          <li key={index} onClick={() => handleChange(image.src)}>
            <img className={styles.itemImage} src={image.src} alt="" />
          </li>
        ))}
      </ul>
      <div className={styles.wrapperBottom}>
        <h1>Export</h1>
        <button className={styles.btnPDF} onClick={outputPdf}>
          PDF
        </button>
        <h2>Change image background</h2>
        <label htmlFor="inputCoverImage">
          <i className="fa-solid fa-panorama"></i>
        </label>
        <input
          style={{ display: "none" }}
          id="inputCoverImage"
          type="file"
          accept="image/*"
          onChange={(e) => setFileImageCover(e.target.files[0])}
        />
      </div>
    </div>
  );
}
