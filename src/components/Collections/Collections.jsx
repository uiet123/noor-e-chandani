import React from 'react'
import "./Collections.css"
import assests from '../../assets/assets'
const Collections = () => {
    const collectionItems = [
        {id: 1,
            name:"Dating",
            image: assests.dating_col
        },
        {id: 2,
            name:"Festival",
            image: assests.festival_col
        },
        {id: 3,
            name:"Wellness",
            image: assests.welness_col
        },
        {id: 4,
            name:"Everyday Comforts",
            image: assests.everyday_col
        },
        {id: 5,
            name:"Gift Sets",
            image: assests.giftset_col
        }

    ]
  return (
    <div className='collections'>
        <h2>Our Collections</h2>
        <div className='collections-items'>
            {collectionItems.map((item) => {
                return (
                    <div className='collections-item' key={item.id}>
                        <img height={300} width={250} src={item.image} alt="" />
                        <h3>{item.name}</h3>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Collections