// src/components/atoms/Header/Header.tsx
import React, { ReactNode } from "react";
import styles from "./header.module.css";

interface HeaderProps {
  title: string;
  endComponent?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, endComponent }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {endComponent && (
        <div className={styles.endComponent}>{endComponent}</div>
      )}
    </header>
  );
};

export default Header;