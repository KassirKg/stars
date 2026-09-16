import { type ReactNode } from 'react';

import styles from './layout.module.scss';

const LegalLayout = ({ children }: { children: ReactNode }) => (
  <div className={styles.root}>{children}</div>
);

export default LegalLayout;
