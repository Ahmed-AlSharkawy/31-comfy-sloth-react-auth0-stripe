import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'
import Loading from './Loading'

const Filters = () => {
  const {
    isLoading,
    products,
    filtered,
    filters: {
      text,
      company,
      category,
      color,
      price: { price, minPrice, maxPrice },
      shipping,
    },
    updateFilters,
    clearFilters,
  } = useFilterContext()

  // if (!isLoading) console.log(price, minPrice, maxPrice)

  const companies = getUniqueValues(products, 'company')
  const categories = getUniqueValues(products, 'category')
  const colors = getUniqueValues(products, 'colors')

  return (
    <Wrapper>
      <div className='content'>
        {!isLoading && (
          <>
            <form onSubmit={(e) => e.preventDefault()}>
              {/* text filter */}
              <div className='form-control'>
                <input
                  type='text'
                  name='text'
                  id='text'
                  placeholder='search'
                  className='search-input'
                  value={text}
                  onChange={updateFilters}
                />
              </div>
              {/* end of text filter */}
              {/* category filter */}
              <div className='form-control'>
                <h5>Category</h5>

                <div>
                  {categories.map((cat, index) => {
                    return (
                      <button
                        key={index}
                        type='button'
                        name='category'
                        className={
                          category === cat.toLowerCase() ? 'active' : null
                        }
                        onClick={updateFilters}
                      >
                        {cat}
                      </button>
                    )
                  })}
                </div>
              </div>
              {/* end of category filter */}
              {/* company filter */}
              <div className='form-control'>
                <h5>company</h5>
                <select
                  name='company'
                  className='company'
                  value={company}
                  onChange={updateFilters}
                >
                  {companies.map((company, index) => {
                    return (
                      <option key={index} value={company}>
                        {company}
                      </option>
                    )
                  })}
                </select>
              </div>
              {/* end of company filter */}
              {/* colors filter */}
              <div className='form-control'>
                <h5>colors</h5>
                <div className='colors'>
                  {colors.map((theColor, index) => {
                    const isAll = theColor === 'all'
                    return (
                      <button
                        key={index}
                        name='color'
                        style={{ background: !isAll && theColor }}
                        className={`${isAll ? 'all-btn' : 'color-btn'} ${
                          color === theColor ? 'active' : ''
                        }`}
                        data-color={isAll ? 'all' : theColor}
                        onClick={updateFilters}
                      >
                        {isAll ? (
                          'all'
                        ) : color === theColor ? (
                          <FaCheck />
                        ) : null}
                      </button>
                    )
                  })}
                </div>
              </div>
              {/* end of colors filter */}
              {/* price filter */}
              <div className='form-control'>
                <h5>price</h5>
                <p className='price'>{formatPrice(price)}</p>
                <input
                  type='range'
                  name='price'
                  min={minPrice}
                  max={maxPrice}
                  value={price}
                  onChange={updateFilters}
                />
              </div>
              {/* end of price filter */}
              {/* shipping filter */}
              <div className='form-control shipping'>
                <label htmlFor='shipping'>free shipping</label>
                <input
                  type='checkbox'
                  name='shipping'
                  id='shipping'
                  checked={shipping}
                  onChange={updateFilters}
                />
              </div>
              {/* end of shipping filter */}
            </form>
            <button type='button' className='clear-btn' onClick={clearFilters}>
              clear filters
            </button>
          </>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
