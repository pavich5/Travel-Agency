import { Button } from 'antd';
import styles from '../../page.module.css';

const TravelGuideSection = () => {
    return (
        <div className={styles.travelGuidesSection}>
            <h2>Explore Our Travel Guides</h2>
            <div className={styles.travelGuides}>
                <div className={styles.travelGuide}>
                    <img src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/04/10/13/tokyo-main.jpg" alt="Travel Guide 1" />
                    <div className={styles.travelGuideContent}>
                        <h3>City Breaks: Top Destinations for Weekend Getaways</h3>
                        <p>Embark on thrilling adventures and adrenaline-pumping activities.</p>
                        <Button type='primary'>Read Guide</Button>
                    </div>
                </div>
                <div className={styles.travelGuide}>
                    <img src="https://cdn.cheapoguides.com/wp-content/uploads/sites/2/2022/05/chureito-pagoda-fuji-GettyImages-901228728-1024x600.jpg" alt="Travel Guide 2" />
                    <div className={styles.travelGuideContent}>
                        <h3>Adventure Travel: Thrilling Experiences for Adrenaline</h3>
                        <p>Embark on thrilling adventures and adrenaline-pumping activities.</p>
                        <Button type='primary'>Read Guide</Button>
                    </div>
                </div>
                <div className={styles.travelGuide}>
                    <img src="https://media-server.clubmed.com/image/jpeg/1024/auto/crop/center/70/https%3A%2F%2Fns.clubmed.com%2FFEAM%2FMarketing%2FOmnichannel%2FSEO%2FLPOTHERS%2FQFAT-1353%2FGettyImages-1083328636.jpg" alt="Travel Guide 3" />
                    <div className={styles.travelGuideContent}>
                        <h3>Adventure Travel: Thrilling Experiences for Adrenaline</h3>
                        <p>Embark on thrilling adventures and adrenaline-pumping activities.</p>
                        <Button type='primary'>Read Guide</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TravelGuideSection;
