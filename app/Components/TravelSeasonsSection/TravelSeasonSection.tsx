import { useRouter } from 'next/navigation';
import styles from '../../page.module.css';

interface VacationCategory {
  name: string;
  image: string;
}

interface TravelSeasonSectionProps {
  vacationsCategories: {
    categories: VacationCategory[];
  };
}

const TravelSeasonSection: React.FC<TravelSeasonSectionProps> = ({ vacationsCategories }) => {
  const router = useRouter();

  return (
    <div className={styles.vaicationsWrapper}>
      <div className={styles.vaicationButtons}>
        {vacationsCategories.categories.map((vacation: VacationCategory, index: number) => (
          <button onClick={() => router.push(`vacation/list/${vacation.name.split(' ')[0]}`)} key={index}>
            {vacation.name}
          </button>
        ))}
      </div>
      <h2 className={styles.travelSeasonsTitle}>Travel Seasons</h2>
      <div className={styles.vacationCardsWrapper}>
        {vacationsCategories.categories.map((category: VacationCategory, index: number) => (
          <div
            onClick={() => {
              router.push(`vacation/list/${category.name.split(' ')[0]}`);
            }}
            key={index}
            className={styles.oneCategoryCard}
            style={{ backgroundImage: `url(${category.image})` }}
          >
            <p className={styles.categoryName}>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelSeasonSection;
