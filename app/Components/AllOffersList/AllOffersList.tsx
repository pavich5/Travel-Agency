import { useRouter } from 'next/navigation';
import styles from '../../vacation/list/[type]/page.module.css';

interface AllOffersListProps {
    vacationType: any;
    filteredVacations: any;
    priceFilter?: number;
    cityFilter?: string;
}

const AllOffersList = ({ vacationType, filteredVacations, priceFilter, cityFilter }: AllOffersListProps) => {
    const router = useRouter()
    return (
        <div className={styles.allOfferList}>
            {vacationType &&
                filteredVacations.map((vacation: any, vacationIndex: number) =>
                    vacation.offers.map((offer: any, offerIndex: number) => {
                        const isPriceFiltered = priceFilter === undefined || offer.totalCost <= priceFilter;
                        const isCityFiltered = cityFilter === undefined || offer.hotelCity === cityFilter;
                        const isOfferVisible = isPriceFiltered && isCityFiltered;

                        return isOfferVisible && (
                            <div
                                // @ts-ignore
                                onClick={() => router.push(`/offer/${offer.id}`, { shallow: true })}
                                className={styles.oneOfferCard}
                                key={offerIndex}
                                style={{ backgroundImage: `url(${offer.offerImage})` }}
                            >
                                <div>
                                    <p className={styles.offerName}>{offer.hotelName}</p>
                                    <p style={{ fontSize: '15px', marginTop: '10px', fontWeight: 600 }}>
                                        Price: ${offer.totalCost}
                                    </p>
                                    <p style={{ fontSize: '15px', marginTop: '2px', fontWeight: 600 }}>
                                        City: {offer.hotelCity}
                                    </p>
                                    <button className={styles.viewOfferButton}>View Offer</button>
                                </div>
                            </div>
                        );
                    })
                )}
        </div>
    );
};

export default AllOffersList;
