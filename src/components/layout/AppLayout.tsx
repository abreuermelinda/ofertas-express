import { Sidebar } from "./Sidebar";

import styles from "./AppLayout.module.css";

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={styles.content}>
      <div className={styles.sidebar}><Sidebar /></div>
      <main className={styles.main}>{children}</main>
    </div>
  );
}