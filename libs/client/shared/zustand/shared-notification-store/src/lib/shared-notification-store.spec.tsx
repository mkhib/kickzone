import { render } from '@testing-library/react';

import SharedNotificationStore from './shared-notification-store';

describe('SharedNotificationStore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedNotificationStore />);
    expect(baseElement).toBeTruthy();
  });
});
