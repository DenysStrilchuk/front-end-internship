import React from 'react';
import {CircularProgress} from '@mui/material';

import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <CircularProgress/>
    </div>
  );
};

export {Loader}
