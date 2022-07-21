import styles from "@/styles/pages/admin.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { createCard } from "@/redux/api";
import { CircularProgress } from "@mui/material";
import { storage } from "@/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function NewCard() {
  const [file, setFile] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [per, setPerc] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const { isFetching } = useSelector((state) => state.card);

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      username: user.username,
      [e.target.name]: value,
    });
  };

  const handleCreateCard = (e) => {
    e.preventDefault();
    setFile(() => "");
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPerc(progress);
        setIsLoading(true);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
          const link = { ...data, thumbnail: URL };
          createCard(dispatch, user._id, link);
          setIsLoading(false);
        });
      }
    );
    e.target.reset();
  };

  return (
    <div className={styles.edit}>
      <form className={styles.formInput} onSubmit={handleCreateCard}>
        <label htmlFor="inputPic" className={styles.thumbnail}>
          {file ? (
            <img src={URL.createObjectURL(file)} alt="" />
          ) : (
            <img
              src="https://user-images.githubusercontent.com/101482/29592647-40da86ca-875a-11e7-8bc3-941700b0a323.png"
              alt=""
            />
          )}
        </label>
        <input
          id="inputPic"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className={styles.inputArea}>
          <div className={styles.title}>
            <i className="fa-solid fa-address-card"></i>
            <input
              type="text"
              placeholder="Title here ..."
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className={styles.url}>
            <i className="fa-solid fa-link"></i>
            <input
              type="text"
              placeholder="url here ..."
              name="url"
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit">
          {isFetching || isLoading ? (
            <CircularProgress size={15} color="error" />
          ) : (
            "Add"
          )}
        </button>
      </form>
      {isLoading && (
        <CircularProgress
          variant="determinate"
          value={per}
          sx={{ position: "absolute", right: "0" }}
        />
      )}
    </div>
  );
}
