import { Card, Image } from "antd";
import styles from '../offer/[id]/page.module.css';
import { ReactElement } from "react";

interface TabItem {
  key: string;
  label: string;
  content: ReactElement;
}

const offerDetailsTabs = (offerDetails: {
  roomImage?: string;
  roomType?: string;
  mealPlan?: string;
  activities?: any[];
  transportation?: string;
}): TabItem[] => {
  const items: TabItem[] = [
    {
      key: '1',
      label: 'Room Type',
      content: (
        <Card title="Room Type" className={styles.card}>
          <div className={styles.roomType}>
            <div>
              <Image src={offerDetails?.roomImage} alt="roomImage"  width={350} />
            </div>
            <div>
              <h3>{offerDetails?.roomType}</h3>
              <p>A cozy and spacious room with modern amenities.</p>
            </div>
          </div>
        </Card>
      ),
    },
    {
      key: '2',
      label: 'Meal Plan',
      content: (
        <Card title="Meal Plan" className={styles.card}>
          <p>{offerDetails?.mealPlan}</p>
        </Card>
      ),
    },
    {
      key: '3',
      label: 'Activities',
      content: (
        <Card title="Activities" className={styles.card}>
          <ul>
            {offerDetails?.activities?.map((activity: any) => (
              <li key={activity.name} className={styles.activity}>
                <p>{activity.name}</p>
                <p>{activity.description}</p>
              </li>
            ))}
          </ul>
        </Card>
      ),
    },
    {
      key: '4',
      label: 'Transportation',
      content: (
        <Card title="Transportation" className={styles.card}>
          <p>{offerDetails?.transportation}</p>
        </Card>
      ),
    },
    {
      key: '5',
      label: 'Trip Details',
      content: (
        <Card title="Trip Details" className={styles.card}>
          <p>We will meet at the hotel lobby at 9:00 AM on the first day of the trip.</p>
          <p>The trip will officially start with a walking tour of the city's historic landmarks.</p>
          <p>Transportation will be provided for all group activities and excursions.</p>
          <p>Please ensure you have comfortable walking shoes and a reusable water bottle.</p>
        </Card>
      ),
    }
  ];

  return items;
};

export default offerDetailsTabs;
