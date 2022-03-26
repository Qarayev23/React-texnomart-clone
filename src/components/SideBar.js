import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
//import Nouislider from "nouislider-react"
import "nouislider/distribute/nouislider.css"

const SideBar = ({ handleSidebar, openSidebar, limit }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const filterProducts = (e) => {
    if (!e.target.checked) {
      searchParams.delete(e.target.name)
      setSearchParams(searchParams)
    } else {
      searchParams.set("_page", 1)
      searchParams.set("_limit", limit)
      searchParams.set(e.target.name, e.target.value)
      setSearchParams(searchParams)
    }
  }

  useEffect(() => {
    document.querySelectorAll(".nese").forEach((item, i) => {
      let keys = []
      for (const entry of searchParams.entries()) {
        const [param, value] = entry;
        keys.push(param)

        document.querySelectorAll(".nese").forEach((item, i) => {
          if (item.name === param && item.value === value) {
            item.checked = true
          }
        })
      }
    })
  }, [])

  // const minPrice = 0
  // const maxPrice = 5000
  // const [startPrice, setStartPrice] = useState(minPrice)
  // const [endPrice, setendPrice] = useState(maxPrice)

  // const onSlide = (value) => {
  //   setStartPrice(value[0])
  //   setendPrice(value[1])
  // };

  return (
    <div className={openSidebar ? 'sidebar' : 'sidebar active'}>
      <button className="close-sidebar" onClick={handleSidebar}>Filteri bağla</button>

      <div className='sidebar-inner'>
        {/* <div className='filter-row'>
          <h4>Qiymət</h4>
          <div className='range-slide'>
            <div className='range-slide-inputs'>
              <input type='number' value={startPrice} onChange={(e) => setStartPrice(e.target.value)} />
              <span>-</span>
              <input type='number' value={endPrice} onChange={(e) => setendPrice(e.target.value)}/>
            </div>

            <Nouislider
              connect
              start={[minPrice, maxPrice]}
              range={{
                min: [minPrice],
                max: [maxPrice]
              }}
              onSlide={onSlide}
            />
          </div>
        </div> */}

        <div className='filter-row'>
          <h4>Model</h4>
          <ul className='filter-list'>
            <li className='filter-item'>
              <label>Samsung</label>
              <input type='checkbox' className='nese'
                name='brand'
                value="samsung"
                onChange={filterProducts}
              />
            </li>
            <li className='filter-item'>
              <label>Xiaomi</label>
              <input type='checkbox'
                className='nese'
                name='brand'
                value="xiaomi"
                onChange={filterProducts} />
            </li>
          </ul>
        </div>

        <div className='filter-row'>
          <h4>Daxili yaddaş</h4>
          <ul className='filter-list'>

            <li className='filter-item'>
              <label>8 GB</label>
              <input type='checkbox'
                className='nese'
                name='memory'
                value="8"
                onChange={filterProducts} />
            </li>
            <li className='filter-item'>
              <label>16 GB</label>
              <input type='checkbox'
                className='nese'
                name='memory'
                value="16"
                onChange={filterProducts} />
            </li>
            <li className='filter-item'>
              <label>32 GB</label>
              <input type='checkbox'
                className='nese'
                name='memory'
                value="32"
                onChange={filterProducts} />
            </li>
            <li className='filter-item'>
              <label>64 GB</label>
              <input type='checkbox'
                className='nese'
                name='memory'
                value="64"
                onChange={filterProducts} />
            </li>
            <li className='filter-item'>
              <label>128 GB</label>
              <input type='checkbox'
                className='nese'
                name='memory'
                value="128"
                onChange={filterProducts} />
            </li>
            <li className='filter-item'>
              <label>256 GB</label>
              <input type='checkbox'
                className='nese'
                name='memory'
                value="256"
                onChange={filterProducts} />
            </li>
          </ul>
        </div>

        <div className='filter-row'>
          <h4>Operativ yaddaş</h4>
          <ul className='filter-list'>
            <li className='filter-item'>
              <label>1.5 GB</label>
              <input type='checkbox'
                className='nese'
                name='ram'
                value="1.5"
                onChange={filterProducts} />
            </li>
            <li className='filter-item'>
              <label>3 GB</label>
              <input type='checkbox'
                className='nese'
                name='ram'
                value="3"
                onChange={filterProducts} />
            </li>
            <li className='filter-item'>
              <label>4 GB</label>
              <input type='checkbox'
                className='nese'
                name='ram'
                value="4"
                onChange={filterProducts} />
            </li>
            <li className='filter-item'>
              <label>8 GB</label>
              <input type='checkbox'
                className='nese'
                name='ram'
                value="8"
                onChange={filterProducts} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideBar