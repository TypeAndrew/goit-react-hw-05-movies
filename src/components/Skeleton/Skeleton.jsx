import classNames from 'classnames';

import styles from './Skeleton.module.css';

const Skeleton = ({ className, ...props }) => {
  return <div className={classNames(styles.skeleton, className)} {...props} />;
};

export default Skeleton;