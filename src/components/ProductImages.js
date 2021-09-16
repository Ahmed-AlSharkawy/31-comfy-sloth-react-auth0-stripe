import React, { useState } from 'react'
import styled from 'styled-components'

const ProductImages = ({ images }) => {
  const [mainImage, setMainImage] = useState(images && images[0])
  const [hoverImage, setHoverImage] = useState(null)

  if (!images) return <></>

  return (
    <Wrapper>
      <img
        className='main'
        src={hoverImage ? hoverImage.url : mainImage.url}
        alt={mainImage.filename}
      />

      <div className='gallery' onMouseLeave={() => setHoverImage(null)}>
        {images.map((image) => {
          return (
            <img
              src={image.url}
              alt={image.filename}
              key={image.id}
              onClick={() => setMainImage(image)}
              onMouseEnter={() => setHoverImage(image)}
              className={mainImage === image ? 'active' : null}
            />
          )
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 3px var(--clr-primary-2);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`

export default ProductImages
