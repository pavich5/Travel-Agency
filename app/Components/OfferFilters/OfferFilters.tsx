import { DatePicker, InputNumber, Select, Button } from "antd";
import styles from './OfferFilters.module.css'


interface FiltersProps {
    filters: any; 
    setFilters: (filters: any) => void;
    handleApplyFilters: () => void;
  }


  
const OfferFilters = ({ filters, setFilters, handleApplyFilters } : FiltersProps) => {
  return (
    <div className={styles.filters}>
    <span className="filter-label">Filter by Date:</span>
    <DatePicker.RangePicker
      style={{ marginRight: '20px' }}
      onChange={(dates, dateStrings) => setFilters({ ...filters, startDate: dateStrings[0], endDate: dateStrings[1] })}
    />
    <span className="filter-label">Min Price:</span>
    <InputNumber
      style={{ marginRight: '20px' }}
      placeholder="Min Price"
      onChange={(value) => setFilters({ ...filters, minPrice: value })}
    />
    <span className="filter-label">Max Price:</span>
    <InputNumber
      style={{ marginRight: '20px' }}
      placeholder="Max Price"
      onChange={(value) => setFilters({ ...filters, maxPrice: value })}
    />
    <span className="filter-label">Star Rating:</span>
    <Select
      mode="multiple"
      style={{ minWidth: '150px', marginRight: '20px' }}
      placeholder="Star Rating"
      onChange={(value: string[]) => setFilters({ ...filters, starRating: value })}
    >
      <Select.Option value="1">1 Star</Select.Option>
      <Select.Option value="2">2 Stars</Select.Option>
      <Select.Option value="3">3 Stars</Select.Option>
      <Select.Option value="4">4 Stars</Select.Option>
      <Select.Option value="5">5 Stars</Select.Option>
    </Select>
    <span className="filter-label">Nights:</span>
    <InputNumber
      style={{ marginRight: '20px' }}
      placeholder="Nights"
      onChange={(value) => setFilters({ ...filters, nights: value })}
    />
    <span className="filter-label">Meal Plan:</span>
    <Select
      mode="multiple"
      style={{ minWidth: '150px', marginRight: '20px' }}
      placeholder="Meal Plan"
      onChange={(value: string[]) => setFilters({ ...filters, mealPlan: value })}
    >
      <Select.Option value="Breakfast Included">Breakfast</Select.Option>
      <Select.Option value="Half Board">Half Board</Select.Option>
      <Select.Option value="Full Board">Full Board</Select.Option>
      <Select.Option value="All-Inclusive">All Inclusive</Select.Option>
    </Select>
    <span className="filter-label">Transportation:</span>
    <Select
      mode="multiple"
      style={{ minWidth: '150px', marginRight: '20px' }}
      placeholder="Transportation"
      onChange={(value: string[]) => setFilters({ ...filters, transportation: value })}
    >
      <Select.Option value="Private Chauffeur Service">Private Chauffeur Service</Select.Option>
      <Select.Option value="Complimentary Airport Transfers">Airplane</Select.Option>
      <Select.Option value="Private Car Transfer">Private Car Transfer</Select.Option>
      <Select.Option value="Limousine Service">Limousine Service</Select.Option>
    </Select>
    <span className="filter-label">Room Type:</span>
    <Select
      mode="multiple"
      style={{ minWidth: '150px', marginRight: '20px' }}
      placeholder="Room Type"
      onChange={(value: string[]) => setFilters({ ...filters, roomType: value })}
    >
      <Select.Option value="Deluxe Room">Deluxe Room</Select.Option>
      <Select.Option value="Executive Suite">Executive Suite</Select.Option>
      <Select.Option value="Standard Double Room">Standard Double Room</Select.Option>
      <Select.Option value="Ocean View Suite">Ocean View Suite</Select.Option>
    </Select>
    <Button type='primary' onClick={handleApplyFilters}>Apply</Button>
    <Button type='default' onClick={() => setFilters({})}>Reset</Button>
  </div>
  )
}

export default OfferFilters