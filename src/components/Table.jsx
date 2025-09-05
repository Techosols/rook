function Table({ col1, col2, data }) {
  return (
    <div className='overflow-x-auto w-full'>
      <table className='min-w-[320px] w-full text-left border-collapse text-xs sm:text-sm'>
        <colgroup>
          <col className='w-1/2' />
          <col className='w-1/2' />
        </colgroup>
        <thead className=''>
          <tr>
            <th className='px-4 py-2 text-center bg-primary dark:bg-primary-dark border border-gray-200 text-white'>{col1}</th>
            <th className='px-4 py-2 text-center bg-primary dark:bg-primary-dark border border-gray-200 text-white'>{col2}</th>
          </tr>
        </thead>
        <tbody className=''>
          {data.map(([label, count], idx) => (
            <tr key={label} className={` ${idx % 2 === 1 ? 'bg-gray-100 dark:bg-gray-800' : ''}`}>
              <td className='border px-4 py-2 text-center border-gray-200 h-10'>{label}</td>
              <td className='border px-4 py-2 text-center border-gray-200 h-10'>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
