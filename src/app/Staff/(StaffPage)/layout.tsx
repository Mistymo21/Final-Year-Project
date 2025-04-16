import {Sidebar} from '@/components/ui/sidebar/sidebar'
import React from 'react'
import styles from './page.module.css'


const Layout = ({children}) => {
    return (
      <div className={styles.container}>
          <div className={styles.menu}>
              <Sidebar/>
          </div>
          <div className={styles.contact}>
         
              {children}
            
          </div>
  
      </div>
    )
  }
  
  export default Layout
  

