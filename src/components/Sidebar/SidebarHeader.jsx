import React from 'react';
import styles from '../../styles/Sidebar.module.css';

const SidebarHeader = ({ onComposeClick }) => {
  return (
    <div className={styles.heading}>
      <div className={styles.headingContent}>
        <div className={styles.headingAvatar}>
          <img 
            src="https://bootdey.com/img/Content/avatar/avatar1.png" 
            alt="User Avatar"
            className={styles.avatarImage}
          />
        </div>
        
        <div className={styles.headingName}>
          <span className={styles.headingNameMeta}>John Doe</span>
        </div>
        
        <div className={styles.headingActions}>
          <button 
            className={styles.headingCompose}
            onClick={onComposeClick}
            aria-label="New message"
          >
            <i className="fa fa-comments fa-2x" aria-hidden="true"></i>
          </button>
          
          <button 
            className={styles.headingDot}
            aria-label="More options"
          >
            <i className="fa fa-ellipsis-v fa-2x" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;
