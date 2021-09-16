import React, { useState } from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'
import Loading from './Loading'

const ProductList = () => {
  const { isLoading, filtered: products, gridView } = useFilterContext()

  if (isLoading) return <Loading />

  if (products.length < 1)
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search...
      </h5>
    )

  return (
    <>
      {gridView ? (
        <GridView products={products} />
      ) : (
        <ListView products={products} />
      )}
    </>
  )
}

export default ProductList
