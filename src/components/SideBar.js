import React from 'react'

const SideBar = ({ handleSidebar, openSidebar }) => {
  return (
    <div className={openSidebar ? 'sidebar' : 'sidebar active'}>
      <button class="close-sidebar" onClick={handleSidebar}>Filteri bağla</button>

      <div className='sidebar-inner'>
        <div className='filter-row'>
          <h4>Model</h4>
          <ul className='filter-list'>
            <li className='filter-item'>
              <label>128 GB</label>
              <input type='checkbox' />
            </li>
            <li className='filter-item'>
              <label>128 GB</label>
              <input type='checkbox' />
            </li>
          </ul>
        </div>
        <div className='filter-row'>
          <h4>Daxili yaddaş</h4>
          <ul className='filter-list'>
            <li className='filter-item'>
              <label>128 GB</label>
              <input type='checkbox' />
            </li>
            <li className='filter-item'>
              <label>128 GB</label>
              <input type='checkbox' />
            </li>
          </ul>
        </div>
        <div className='filter-row'>
          <h4>Operativ yaddaş</h4>
          <ul className='filter-list'>
            <li className='filter-item'>
              <label>1 GB</label>
              <input type='checkbox' />
            </li>
            <li className='filter-item'>
              <label>2 GB</label>
              <input type='checkbox' />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideBar