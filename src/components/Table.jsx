import React from 'react'

function Table({col1, col2, data}) {
  return (
    <div className=''>
        <table className='w-full text-left border-collapse'>
          <colgroup>
            <col className='w-1/2' />
            <col className='w-1/2' />
          </colgroup>
          <thead className=''>
            <tr>
              <th className='px-4 py-2 text-center bg-pink-700 border border-gray-200 text-white'>{col1}</th>
              <th className='px-4 py-2 text-center bg-pink-700 border border-gray-200 text-white'>{col2}</th>
            </tr>
          </thead>
          <tbody className=''>
            {data.map((item, index) => (
              <tr key={index}>
                <td className='border px-4 py-2 text-center border-gray-200 h-10'>{item}</td>
                <td className='border px-4 py-2 text-center border-gray-200 h-10'>{item}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default Table
