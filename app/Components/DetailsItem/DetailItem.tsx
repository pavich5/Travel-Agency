import { Divider } from 'antd';
import styles from './page.module.css';

const DetailItem = ({ title, value }: { title: string; value: string }) => (
  <>
    <Divider className={styles.divider} />
    <div className={styles.detailItem}>
      <p>{title}</p>
      <p>{value}</p>
    </div>
  </>
);

export default DetailItem;