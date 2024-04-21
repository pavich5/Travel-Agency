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
          <h1 className={styles.title}>Welcome to Globetrotter</h1>
          <p className={styles.description}>
            At Globetrotter, we're passionate about travel and exploration. Our mission is to help you discover
            the world's most incredible destinations, create unforgettable experiences, and make memories that last a lifetime.
          </p>
          <p className={styles.description}>
            Whether you're dreaming of a relaxing beach vacation, an adventurous trek through the mountains,
            or a cultural immersion in a vibrant city, we're here to turn your travel dreams into reality.
          </p>
        </div>
      </div>
      <div className={styles.teamSection}>
        <h2 className={styles.teamTitle}>Meet Our Team</h2>
        <div className={styles.teamMembers}>
          <div className={styles.teamMember}>
            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbthSMwjfBnT4OA3CKIY2AKfZ2UsYZdut3JqPp_R7VrA&s" alt="Team Member 1" width={200} height={200} />
            <h3 className={styles.memberName}>John Doe</h3>
            <p className={styles.memberRole}>Founder & CEO</p>
          </div>
          <div className={styles.teamMember}>
            <Image src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg" alt="Team Member 2" width={200} height={200} />
            <h3 className={styles.memberName}>Jane Smith</h3>
            <p className={styles.memberRole}>Travel Specialist</p>
          </div>
          <div className={styles.teamMember}>
            <Image src="https://media.istockphoto.com/id/1335941248/photo/shot-of-a-handsome-young-man-standing-against-a-grey-background.jpg?s=612x612&w=0&k=20&c=JSBpwVFm8vz23PZ44Rjn728NwmMtBa_DYL7qxrEWr38=" alt="Team Member 3" width={200} height={200} />
            <h3 className={styles.memberName}>Mike Johnson</h3>
            <p className={styles.memberRole}>Customer Experience Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
