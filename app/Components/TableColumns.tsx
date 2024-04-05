import { Tooltip, Button, DatePicker, TableProps } from "antd";
import { StarOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useRouter } from "next/navigation"; 
interface Column {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: any, record: any) => JSX.Element;
  sorter?: any;
  sortDirections?: string[];
  filters?: { text: string; value: any }[];
  onFilter?: (value: any, record: any) => boolean;
  filterDropdown?: any;
}

const useTableColumns = (): TableProps<any>['columns'] => {
  const router = useRouter();

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Hotel',
      dataIndex: 'Hotel',
      key: 'Hotel',
      render: (text, record) => (
        <a href={`/hotel/${record.hotelName}`}>
          <Tooltip title="Click to see hotel details">
            <img style={{ width: '50px', height: '50px', borderRadius: '50px' }} src={text} alt="Hotel" />
          </Tooltip>
        </a>
      ),
    },
    {
      title: 'Hotel Name',
      dataIndex: 'HotelName',
      key: 'HotelName',
      render: (text) => <div style={{ width: '90px' }}>{text}</div>,
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'Price',
      sorter: (a, b) => a.Price - b.Price,
      sortDirections: ['ascend', 'descend'],
      render: (text) => <div>{text}$</div>,
      filters: [
        { text: '100', value: 100 },
        { text: '200', value: 200 },
        { text: '300', value: 300 },
        { text: '400', value: 400 },
        { text: '500', value: 500 },
        { text: '600', value: 600 },
        { text: '700', value: 700 },
        { text: '800', value: 800 },
        { text: '900', value: 900 },
        { text: '1000', value: 1000 },
        { text: '1000+', value: 1001 },
      ],
      onFilter: (value, record) => {
        if (value === 1001) {
          return record.Price >= 1000;
        } else {
          return record.Price === value;
        }
      },
    },

    {
      title: 'Stars',
      dataIndex: 'Stars',
      key: 'Stars',
      sorter: (a, b) => a.Stars - b.Stars,
      sortDirections: ['ascend', 'descend'],
      filters: [
        { text: '1 star', value: 1 },
        { text: '2 stars', value: 2 },
        { text: '3 stars', value: 3 },
        { text: '4 stars', value: 4 },
        { text: '5 stars', value: 5 },
      ],
      onFilter: (value, record) => {
        // @ts-ignore
        const numNights = parseInt(record.Nights.split(' ')[0]);
        return numNights === value;
      },
      render: (text) => (
        <p style={{ textAlign: 'center'}}>
          {text} <StarOutlined />
        </p>
      ),
    },
    {
      title: 'Nights',
      dataIndex: 'Nights',
      key: 'Nights',
      sorter: (a, b) => {
        // @ts-ignore
        const numA = parseInt(a.Nights.split(' ')[0]);
        // @ts-ignore
        const numB = parseInt(b.Nights.split(' ')[0]);
        return numA - numB;
      },
      sortDirections: ['ascend', 'descend'],
      render: (text) => <div style={{ width: '50px' }}>{text}</div>,
      filters: [
        { text: '1 night', value: 1 },
        { text: '2 nights', value: 2 },
        { text: '3 nights', value: 3 },
        { text: '4 nights', value: 4 },
        { text: '5 nights', value: 5 },
        { text: '6 nights', value: 6 },
        { text: '7+ nights', value: 7 },
      ],
      onFilter: (value, record) => {
        // @ts-ignore
        const numNights = parseInt(record.Nights.split(' ')[0]);
        if (value === 7) {
          return numNights >= value; // Filter for 7 or more nights
        } else {
          return numNights === value;
        }
      },
    },
    {
      title: 'Start',
      dataIndex: 'Start',
      key: 'Start',
      sorter: (a, b) => moment(a.Start, 'DD-MM-YYYY').valueOf() - moment(b.Start, 'DD-MM-YYYY').valueOf(),
      sortDirections: ['ascend', 'descend'],
      render: (text) => <div style={{ width: '100px' }}>{text}</div>,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <DatePicker
            // @ts-ignore
            value={selectedKeys && selectedKeys.length ? moment(selectedKeys[0], 'DD-MM-YYYY') : null}
            format="DD-MM-YYYY"
            onChange={(date) => setSelectedKeys(date ? [date.format('DD-MM-YYYY')] : [])}
            style={{ marginBottom: 8, display: 'block' }}
            readOnly
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            OK
          </Button>
          <Button onClick={() => clearFilters?.()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) => {
        // @ts-ignore
        const startDate = moment(value, 'DD-MM-YYYY');
        const recordDate = moment(record.Start, 'DD-MM-YYYY');
        return recordDate.isSame(startDate, 'day');
      },
    },

    {
      title: 'End',
      dataIndex: 'End',
      key: 'End',
      sorter: (a, b) => moment(a.End, 'DD-MM-YYYY').valueOf() - moment(b.End, 'DD-MM-YYYY').valueOf(),
      sortDirections: ['ascend', 'descend'],
      render: (text) => <div style={{ width: '100px' }}>{text}</div>,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <DatePicker
            // @ts-ignore
            value={selectedKeys && selectedKeys.length ? moment(selectedKeys[0], 'DD-MM-YYYY') : null}
            format="DD-MM-YYYY"
            onChange={(date) => setSelectedKeys(date ? [date.format('DD-MM-YYYY')] : [])}
            style={{ marginBottom: 8, display: 'block' }}
            readOnly
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            OK
          </Button>
          <Button onClick={() => clearFilters?.()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) => {
        // @ts-ignore
        const endDate = moment(value, 'DD-MM-YYYY');
        const recordDate = moment(record.End, 'DD-MM-YYYY');
        return recordDate.isSame(endDate, 'day');
      },
    },
    {
      title: 'Transportation',
      dataIndex: 'transportation',
      key: 'transportation',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Meal Plan',
      dataIndex: 'mealPlan',
      key: 'mealPlan',
      render: (text) => <div style={{ width: '65px' }}>{text}</div>,
    },
    {
      title: 'Room Type',
      dataIndex: 'roomType',
      key: 'roomType',
      render: (text) => <div style={{width: '105px'}}>{text}</div>,
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      render: (text, record) => (
        <Button type="primary" onClick={() => router.push(`/offer/${record.id}`)} >
          View Details
        </Button>
      ),
    },
  ];

  return columns;
};

export default useTableColumns;
