import { storage } from "@/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function upload(
  file,
  setFile,
  setPerc,
  setIsLoading,
  api,
  dispatch,
  data,
  user
) {
  const name = new Date().getTime() + file.name;
  const storageRef = ref(storage, name);
  setFile(() => "");
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setPerc(progress);
      setIsLoading(true);
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
        const link = { ...data, thumbnail: URL };
        api(dispatch, user._id, link);
        setIsLoading(false);
      });
    }
  );
}
