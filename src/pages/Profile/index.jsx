import React, { useEffect } from "react";
import styles from "@/styles/pages/profile.module.scss";
import images from "@/assets/images";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCard, getProfile } from "@/redux/api";

export default function Profile() {
  const location = useLocation();
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.card.currentCards);
  const profile = useSelector((state) => state.profile.profileCurrent);
  const username = location.pathname.split("/")[1];
  console.log(username);

  useEffect(() => {
    getCard(dispatch, username);
    getProfile(dispatch, username);
  }, [dispatch, username]);
  return (
    <div className={styles.wrapper}>
      {profile ? (
        <>
          {profile.coverPicture ? (
            <img
              className={styles.coverPicture}
              src={profile.coverPicture}
              alt=""
            />
          ) : (
            <img className={styles.coverPicture} src={images.imgBg} alt="" />
          )}
          <div className={styles.container}>
            <div className={styles.top}>
              <div className={styles.avatar}>
                {profile.profilePicture ? (
                  <img src={profile?.profilePicture} alt="" />
                ) : (
                  <img src={images.user} alt="" />
                )}
              </div>
              <div className={styles.name}>@{profile.username}</div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.dashboard}>
                {cards.map((card, index) => (
                  <a
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                    key={index}
                  >
                    <div className={styles.thumbnail}>
                      <img src={card.thumbnail} alt="" />
                    </div>
                    <span className={styles.title}>{card.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        "404"
      )}
    </div>
  );
}
