import React, { useState } from 'react';
import styles from './index.less';
import { history } from 'umi';
import User from '../components/user'
interface IList {
  path: string,
  title: string
}
const list:IList[] = [
  {
    path: '/',
    title:'首页'
  },
  {
    path: '/favorites',
    title:'收藏夹'
  },
  {
    path: '/favorites',
    title:'退出'
  }
]
const BasicLayout: React.FC = props => {
  const [showMenu, setShowMenu] = useState(false)
  const [List, setList] = useState(list)
  const toHome = () => {
    history.push('/')
  }
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left} onClick={toHome}>
            zeam
          </div>
          <div className={styles.right} onClick={()=>setShowMenu(!showMenu)} onBlur={()=>{console.log(111)}}>
          <User showMenu={showMenu} list={ List }/>
          </div>
      </div>
      <div className={styles.children}>{ props.children }</div>
    </>
  );
};

export default BasicLayout;
