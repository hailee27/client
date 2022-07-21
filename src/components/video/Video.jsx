import styles from "@/styles/components/video.module.scss";
import "aos/dist/aos.css";

export default function Video() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.video}>
        <div className={styles.left} data-aos="zoom-out-right">
          <video
            muted
            autoPlay={"autoplay"}
            loop
            src="./assets/video/link_to_anywhere.mp4"
          />
          <span>ppg.com/yourname</span>
        </div>
        <div className={styles.right} data-aos="fade-left">
          <h1> Use it anywhere</h1>
          <p>
            Take your PPG Link wherever your audience is, to help them to
            discover all your important content.
          </p>
        </div>
      </div>
      <div className={styles.video}>
        <div className={styles.left} data-aos="fade-right">
          <h1> Easily managed</h1>
          <p>
            Creating a PPG Link takes seconds. Use our simple drag-and-drop
            editor to effortlessly manage your content.
          </p>
        </div>
        <div className={styles.right} data-aos="zoom-out-left">
          <video
            muted
            autoPlay={"autoplay"}
            loop
            src="https://videos.ctfassets.net/lbsm39fugycf/4jcMGgBbI0ZkJxn9Wqy3DK/61f26c5d0e317799c58e48cd484ce1e6/linktree-causes-landing-page-hero-1.mp4"
          />
        </div>
      </div>
    </div>
  );
}
