import { useRouter } from 'next/navigation';
import styles from '../../page.module.css';

interface Vacation {
  countryName: string;
  image: string;
  description: string;
}

const TravelDestinationList = ({ currentItems }: { currentItems: Vacation[] }): JSX.Element => {
  const router = useRouter();
  return (
    <div className={styles.availableVacationsWrapper}>
      <h2>Travel Destinations</h2>
      <div className={styles.availableList}>
        {currentItems.map((vacation: Vacation, index: number) => (
          <div onClick={() => router.push(`vacation/${vacation.countryName}`)} key={index} className={styles.oneVacationCard} style={{ backgroundImage: `url(${vacation.image})` }}>
            <p className={styles.vacationName}>{vacation.countryName}</p>
            <p>{vacation.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TravelDestinationList;
