import { Image } from 'antd';
import styles from './page.module.css';

const AboutMe = () => {
  return (
    <div className={styles.container}>
      <div className={styles.aboutSection}>
        <div className={styles.imageContainer}>
          <Image src='https://dailywildlifephoto.nathab.com/photography-guide/wp-content/uploads/2023/09/groupphoto1.jpg' alt="About Me" className={styles.image} />
        </div>
        <div className={styles.content}>
          <p className={styles.kicker}>About us</p>
          <h1 className={styles.title}>A travel agency rebuilt for how people plan trips now.</h1>
          <p className={styles.description}>
            Globetrotter helps travelers compare seasonal offers, understand what is actually included, and move from inspiration to booking with less friction.
          </p>
          <p className={styles.description}>
            We focus on destination quality, useful details, and a calmer planning experience across city stays, beach escapes, and mountain retreats.
          </p>
        </div>
      </div>
      <div className={styles.teamSection}>
        <h2 className={styles.teamTitle}>Meet Our Team</h2>
        <div className={styles.teamMembers}>
          <div className={styles.teamMember}>
            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbthSMwjfBnT4OA3CKIY2AKfZ2UsYZdut3JqPp_R7VrA&s" alt="Team Member 1" width={200} height={200} />
            <h3 className={styles.memberName}>Elena Petrov</h3>
            <p className={styles.memberRole}>Founder & Creative Director</p>
          </div>
          <div className={styles.teamMember}>
            <Image src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg" alt="Team Member 2" width={200} height={200} />
            <h3 className={styles.memberName}>Daniel Moore</h3>
            <p className={styles.memberRole}>Lead Travel Specialist</p>
          </div>
          <div className={styles.teamMember}>
            <Image src="https://media.istockphoto.com/id/1335941248/photo/shot-of-a-handsome-young-man-standing-against-a-grey-background.jpg?s=612x612&w=0&k=20&c=JSBpwVFm8vz23PZ44Rjn728NwmMtBa_DYL7qxrEWr38=" alt="Team Member 3" width={200} height={200} />
            <h3 className={styles.memberName}>Sara Lindholm</h3>
            <p className={styles.memberRole}>Customer Experience Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
