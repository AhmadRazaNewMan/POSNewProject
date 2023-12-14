import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from "antd"
import ItemList from '../components/ItemList';
import { useDispatch } from 'react-redux';

import DefaultLayout from '../components/DefaultLayout'

function HomePage() {
  const [itemData, setItemData] = useState([]);
  const [selectCategory, setSelectCategory] = useState('drinks')
  const categories = [
    {
      name: "drinks",
      imageUrl: "Ahmad"
    },
    {
      name: "rice",
      imageUrl: "Ahmad"
    }, {
      name: "noodles",
      imageUrl: "Ahmad"
    },
  ]
  const dispatch = useDispatch()

  // use Effect hook
  useEffect(() => {
    const getAllItem = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",

        })
        // destructure the whole data
        const { data } = await axios.get("/api/items/get-item"); // Added 'await' here
        console.log(data); // Corrected this line
        setItemData(data);
        dispatch({
          type: "HIDE_LOADING",

        })
      } catch (error) {
        console.log(error);
      }
    };

    // Call the function
    getAllItem();
  }, [dispatch]); // Moved the closing bracket to the correct position

  return (
    <div>

      <DefaultLayout>
        <div className='d-flex'>
          {
            categories.map(category => (
              <div key={category.name} className={`d-flex category ${selectCategory === category.name && "category-active"}`} onClick={() => setSelectCategory(category.name)}>
                <h4>{category.name}</h4>
                <img src={category.imageUrl} alt={category.name} height={40} width={60} />
              </div>
            ))
          }



        </div>
        <Row>
          {
            itemData.filter((i)=>i.category===selectCategory).map(item => (
              <Col xs={24} lg={6} md={12} sm={6}>
                <ItemList key={item.id} item={item} />
              </Col>
            ))
          }
        </Row>
      </DefaultLayout>
    </div>
  )
}

export default HomePage
