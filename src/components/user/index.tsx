// import { router } from "dva";
import React from "react";
import styles from './index.less';
import { history } from 'umi';
type props<T> = {
  showMenu: boolean
  list:Array<T>
}
interface listItem {
  path: string,
  title: string
}
function user({ showMenu, list }: props<listItem>) {
  const toPage = (path: string) => {
    if(!path) return
    history.push(path)
  }
  return (
    <>
      <div className={styles.userBox}>
        {
          showMenu ? (
            <>
              <div className={styles.triangle}></div>
              <ul className={styles.userList}>
                {
                  list.map(item => (
                    <li onClick={()=>toPage(item.path)} key={item.title}>{item.title}</li>
                  ))
                }
              </ul>
            </>
          ) : null
        }
      </div>
    </>
  )
}

export default user