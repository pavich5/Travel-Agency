import { Button, Select } from 'antd';
import styles from '../../page.module.css';
import { useRouter } from 'next/navigation';

interface HotelItem {
    id: string | number;
    hotelName: string;
    location: string;
    duration: string;
    totalCost: number;
    image: string;
  }
  

interface LandingSectionProps {
  handleInputChange: (value: string) => void;
  filteredData: HotelItem[];
  searchValue: string;
}

const LandingSection: React.FC<LandingSectionProps> = ({ handleInputChange, filteredData, searchValue }) => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.textTitle}>
        <h1>Discover the world with Globetrotter</h1>
      </div>
      <div className={styles.inputWrapper}>
        <Select
          mode="tags"
          placeholder="Search for destination or trips"
          style={{ width: '100%', height: '37px' }}
          onSearch={handleInputChange}
          tokenSeparators={[',']}
          options={filteredData.map((item: HotelItem) => ({
            value: item.hotelName,
            label: (
              <div
                onClick={() => router.push(`/offer/${item.id}`)}
                className={styles.searchItem}
                key={`${item.hotelName}-${item.id}`}
              >
                <img src={item.image} alt="" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                <div className={styles.searchItemInfo}>
                  <span>{item.hotelName}</span>
                  <span>{item.location}</span>
                  <small>Duration: {item.duration}</small>
                  <small>Price: {item.totalCost}$</small>
                </div>
              </div>
            ),
          }))}
          suffixIcon={<Button onClick={() => router.push(`/search?searchValue=${searchValue}`)} type="primary">Search</Button>}
        />
      </div>
    </div>
  );
};

export default LandingSection;
