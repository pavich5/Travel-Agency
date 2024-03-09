import { Divider } from 'antd';
import styles from './page.module.css';

const PriceDetail = ({ title, value }: { title: string; value: string }) => (
  <>
    <Divider className={styles.divider} />
    <div className={styles.priceDetail}>
      <p>{title}</p>
      <p>{value}</p>
    </div>
  </>
);

export default PriceDetail;