
import React from 'react'
import styles from './layout.module.css'
import {StudentSidebar} from '@/components/ui/sidebar/sidebar'

const Layout = ({children}) => {
    return (
      <div className={styles.container}>
          <div className={styles.menu}>
              <StudentSidebar/>
          </div>
          <div className={styles.contact}>
         
              {children}
            
          </div>
  
      </div>
    )
  }
  
  export default Layout
  

