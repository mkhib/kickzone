import { Chip } from '@mui/material';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

interface OrderStatusChipProps {
  status: KickzoneGraphqlTypes.OrderStatus | string;
  size?: 'small' | 'medium';
}

const getStatusColor = (
  status: string
):
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning' => {
  switch (status) {
    case 'PENDING':
      return 'warning';
    case 'CONFIRMED':
      return 'info';
    case 'PROCESSING':
      return 'primary';
    case 'SHIPPED':
      return 'secondary';
    case 'DELIVERED':
      return 'success';
    case 'CANCELLED':
      return 'error';
    case 'REFUNDED':
      return 'default';
    default:
      return 'default';
  }
};

export function OrderStatusChip({
  status,
  size = 'small',
}: OrderStatusChipProps) {
  const { LL } = useI18nContext();

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PENDING':
        return LL.orders.pending();
      case 'CONFIRMED':
        return LL.orders.confirmed();
      case 'PROCESSING':
        return LL.orders.processing();
      case 'SHIPPED':
        return LL.orders.shipped();
      case 'DELIVERED':
        return LL.orders.delivered();
      case 'CANCELLED':
        return LL.orders.cancelled();
      case 'REFUNDED':
        return LL.orders.refunded();
      default:
        return status;
    }
  };

  return (
    <Chip
      label={getStatusLabel(status)}
      color={getStatusColor(status)}
      size={size}
      sx={{
        maxWidth: '100%',
        '& .MuiChip-label': {
          whiteSpace: 'normal',
          overflow: 'visible',
        },
      }}
    />
  );
}

export default OrderStatusChip;
